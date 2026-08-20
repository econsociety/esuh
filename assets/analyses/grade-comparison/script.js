(function () {
  'use strict';

  // ── Configuration ────────────────────────────────────────────────
  var BASE = document.currentScript.dataset.base;
  var MIN_STUDENTS = 20;
  var COLOR_A = '#D6495A'; // ESUH pink-red — Instructor A
  var COLOR_B = '#5B8DB8'; // Muted blue — Instructor B

  // ── Math helpers ─────────────────────────────────────────────────

  function mean(arr) {
    if (!arr.length) return 0;
    return arr.reduce(function (s, v) { return s + v; }, 0) / arr.length;
  }

  function variance(arr) {
    if (arr.length < 2) return 0;
    var m = mean(arr);
    return arr.reduce(function (s, v) { return s + (v - m) * (v - m); }, 0) / (arr.length - 1);
  }

  // Regularised incomplete beta via continued-fraction expansion (Lentz's method)
  function betaCF(a, b, x) {
    var MAXIT = 200, EPS = 3e-7, FPMIN = 1e-30;
    var qab = a + b, qap = a + 1, qam = a - 1;
    var c = 1, d = 1 - qab * x / qap;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    d = 1 / d;
    var h = d;
    for (var m = 1; m <= MAXIT; m++) {
      var m2 = 2 * m;
      var aa = m * (b - m) * x / ((qam + m2) * (a + m2));
      d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
      c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
      d = 1 / d; h *= d * c;
      aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
      d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
      c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
      d = 1 / d;
      var del = d * c;
      h *= del;
      if (Math.abs(del - 1) < EPS) break;
    }
    return h;
  }

  function logGamma(x) {
    // Lanczos approximation
    var cof = [76.18009172947146, -86.50532032941677, 24.01409824083091,
               -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
    var y = x, tmp = x + 5.5;
    tmp = (x + 0.5) * Math.log(tmp) - tmp;
    var ser = 1.000000000190015;
    for (var j = 0; j < 6; j++) { ser += cof[j] / ++y; }
    return tmp + Math.log(2.5066282746310005 * ser / x);
  }

  function betaInc(a, b, x) {
    if (x < 0 || x > 1) return NaN;
    if (x === 0) return 0;
    if (x === 1) return 1;
    var lbeta = logGamma(a) + logGamma(b) - logGamma(a + b);
    var bt = Math.exp(Math.log(x) * a + Math.log(1 - x) * b - lbeta);
    if (x < (a + 1) / (a + b + 2)) {
      return bt * betaCF(a, b, x) / a;
    }
    return 1 - bt * betaCF(b, a, 1 - x) / b;
  }

  function twoTailedP(t, df) {
    var x = df / (df + t * t);
    return betaInc(df / 2, 0.5, x);
  }

  function welchTTest(arrA, arrB) {
    var na = arrA.length, nb = arrB.length;
    var ma = mean(arrA), mb = arrB.length ? mean(arrB) : 0;
    var va = variance(arrA), vb = variance(arrB);
    var se2 = va / na + vb / nb;
    var se = Math.sqrt(se2);
    var t = se > 0 ? (ma - mb) / se : 0;
    var df = (se2 * se2) /
             ((va / na) * (va / na) / (na - 1) + (vb / nb) * (vb / nb) / (nb - 1));
    var p = twoTailedP(Math.abs(t), df);
    return { t_stat: t, df: df, p_value: p };
  }

  function cohensD(arrA, arrB) {
    var na = arrA.length, nb = arrB.length;
    var va = variance(arrA), vb = variance(arrB);
    var pooled = Math.sqrt(((na - 1) * va + (nb - 1) * vb) / (na + nb - 2));
    return pooled > 0 ? Math.abs(mean(arrA) - mean(arrB)) / pooled : 0;
  }

  var GRADE_POINTS = { A: 4.0, B: 3.0, C: 2.0, D: 1.0, F: 0.0 };

  function expandGrades(gradeCounts) {
    var arr = [];
    ['A', 'B', 'C', 'D', 'F'].forEach(function (g) {
      for (var i = 0; i < (gradeCounts[g] || 0); i++) arr.push(GRADE_POINTS[g]);
    });
    return arr;
  }

  // ── Interpretation helpers ────────────────────────────────────────

  function fmtP(p) {
    if (p < 0.001) return '< 0.001';
    return p.toFixed(3).replace(/\.?0+$/, '') || '0';
  }

  function fmtGPA(v) { return (Math.round(v * 100) / 100).toFixed(2); }

  function fmtPct(v) { return Math.round(v * 100) + '%'; }

  function effectLabel(d) {
    if (d < 0.2) return 'negligible';
    if (d < 0.5) return 'small';
    if (d < 0.8) return 'medium';
    return 'large';
  }

  function effectSentence(label, significant) {
    if (label === 'negligible') {
      return significant
        ? 'Though statistically significant, the effect size is negligible, suggesting the difference is unlikely to be meaningful in practice.'
        : 'The effect size is negligible.';
    }
    if (label === 'small') {
      return significant
        ? 'The effect size is small, so while the difference is real, its practical magnitude is modest.'
        : 'The effect size is small.';
    }
    if (label === 'medium') {
      return significant
        ? 'A medium effect size suggests this difference is likely meaningful in practice and not merely a statistical artifact of sample size.'
        : 'The effect size is medium \u2014 the practical difference may be real even if the sample sizes do not yet support a firm conclusion.';
    }
    return significant
      ? 'The effect size is large, indicating a substantial and practically meaningful difference between these instructors.'
      : 'The effect size is large \u2014 the practical difference appears substantial, though the current sample sizes do not yield significance at \u03b1\u202f=\u202f0.05.';
  }

  function buildExcludedFootnote(results) {
    var rows = [];
    [results.instructorA, results.instructorB].forEach(function (inst) {
      var ex = inst.excluded || {};
      var parts = [];
      if (ex.W)   parts.push(ex.W   + ' W');
      if (ex.S)   parts.push(ex.S   + ' S');
      if (ex.NCR) parts.push(ex.NCR + ' NCR');
      if (parts.length) {
        rows.push('<strong>' + inst.name + '</strong>: ' + parts.join(', ') + ' excluded');
      }
    });
    if (!rows.length) return '';
    return '<div class="ae-footnote"><em>Note \u2014 grades excluded from analysis: '
      + rows.join('; ') + '.</em></div>';
  }

  function buildInterpretationHTML(results) {
    var a = results.instructorA, b = results.instructorB;
    var metric = results.metric;
    var p = results.p_value, d = results.cohens_d, sig = results.significant;

    var valA, valB, metricLabel, unitA, unitB;
    if (metric === 'pct_a') {
      valA = fmtPct(a.pct_a); valB = fmtPct(b.pct_a);
      metricLabel = 'percentage of students receiving an A';
      unitA = valA; unitB = valB;
    } else {
      valA = fmtGPA(a.avg_gpa); valB = fmtGPA(b.avg_gpa);
      metricLabel = 'average GPA';
      unitA = valA + ' GPA'; unitB = valB + ' GPA';
    }

    var aNum = metric === 'pct_a' ? a.pct_a : a.avg_gpa;
    var bNum = metric === 'pct_a' ? b.pct_a : b.avg_gpa;
    var higherName, lowerName, higherVal, lowerVal;
    if (aNum >= bNum) {
      higherName = a.name; higherVal = unitA;
      lowerName  = b.name; lowerVal  = unitB;
    } else {
      higherName = b.name; higherVal = unitB;
      lowerName  = a.name; lowerVal  = unitA;
    }

    var effect = effectLabel(d);
    var effectSent = effectSentence(effect, sig);
    var html;

    if (sig) {
      html = '<p class="ae-interpretation ae-interpretation--significant">'
        + 'There is a <strong>statistically significant</strong> difference between '
        + '<strong>' + a.name + '</strong> and <strong>' + b.name + '</strong> '
        + '(p\u202f=\u202f' + fmtP(p) + ', Cohen\u2019s\u202fd\u202f=\u202f' + d.toFixed(2) + '). '
        + '<strong>' + higherName + '</strong>\u2019s students had a ' + metricLabel + ' of '
        + '<strong>' + higherVal + '</strong> compared to '
        + '<strong>' + lowerName + '</strong>\u2019s '
        + '<strong>' + lowerVal + '</strong>. '
        + effectSent + '</p>';
    } else {
      html = '<p class="ae-interpretation ae-interpretation--not-significant">'
        + 'There is <strong>no statistically significant difference</strong> between '
        + '<strong>' + a.name + '</strong> and <strong>' + b.name + '</strong> '
        + '(p\u202f=\u202f' + fmtP(p) + ', Cohen\u2019s\u202fd\u202f=\u202f' + d.toFixed(2) + '). '
        + 'The observed difference in ' + metricLabel + ' ('
        + valA + ' vs.\u202f' + valB
        + ') is within the range expected from random variation alone. '
        + effectSent + '</p>';
    }

    return html + buildExcludedFootnote(results);
  }

  // ── Analysis logic ────────────────────────────────────────────────

  function runComparison(data, subject, catalog, instNameA, instNameB, metric) {
    var courseKey = subject + ' ' + catalog;
    var course = data.courses[courseKey];
    if (!course) return null;

    var instA = course.instructors[instNameA];
    var instB = course.instructors[instNameB];
    if (!instA || !instB) return null;

    var arrA = expandGrades(instA.grade_counts);
    var arrB = expandGrades(instB.grade_counts);
    var tt = welchTTest(arrA, arrB);
    var d = cohensD(arrA, arrB);

    return {
      metric: metric || 'avg_gpa',
      instructorA: {
        name: instNameA,
        n_students: instA.n_students,
        n_sections: instA.n_sections,
        avg_gpa: instA.avg_gpa,
        pct_a: instA.pct_a,
        grade_counts: instA.grade_counts,
        excluded: instA.excluded
      },
      instructorB: {
        name: instNameB,
        n_students: instB.n_students,
        n_sections: instB.n_sections,
        avg_gpa: instB.avg_gpa,
        pct_a: instB.pct_a,
        grade_counts: instB.grade_counts,
        excluded: instB.excluded
      },
      t_stat: tt.t_stat,
      df: tt.df,
      p_value: tt.p_value,
      cohens_d: d,
      significant: tt.p_value < 0.05
    };
  }

  // ── Chart rendering ───────────────────────────────────────────────

  var _chartInstance = null;

  function gradePct(inst, grade) {
    var count = inst.grade_counts[grade] || 0;
    return inst.n_students > 0 ? (count / inst.n_students) * 100 : 0;
  }

  function buildChartData(results) {
    var grades = ['A', 'B', 'C', 'D', 'F'];
    var a = results.instructorA, b = results.instructorB;
    return {
      labels: grades,
      datasets: [
        {
          label: a.name,
          data: grades.map(function (g) { return gradePct(a, g); }),
          backgroundColor: COLOR_A + 'CC',
          borderColor: COLOR_A,
          borderWidth: 1
        },
        {
          label: b.name,
          data: grades.map(function (g) { return gradePct(b, g); }),
          backgroundColor: COLOR_B + 'CC',
          borderColor: COLOR_B,
          borderWidth: 1
        }
      ]
    };
  }

  function renderChart(results, resultsEl) {
    if (_chartInstance) {
      _chartInstance.destroy();
      _chartInstance = null;
    }

    resultsEl.innerHTML = '';

    var card = document.createElement('div');
    card.className = 'ae-results-card';

    var heading = document.createElement('p');
    heading.className = 'ae-results-title';
    heading.textContent = 'Comparison Results';
    card.appendChild(heading);

    var summaryEl = document.createElement('div');
    summaryEl.innerHTML = (function () {
      function row(inst, color) {
        return '<div class="ae-summary-row">'
          + '<span class="ae-legend-swatch" style="background:' + color + '"></span>'
          + '<span class="ae-summary-name">' + inst.name + '</span>'
          + '<span class="ae-summary-stat">Avg GPA<br><strong>' + inst.avg_gpa.toFixed(2) + '</strong></span>'
          + '<span class="ae-summary-stat">% A<br><strong>' + Math.round(inst.pct_a * 100) + '%</strong></span>'
          + '<span class="ae-summary-stat">Students<br><strong>' + inst.n_students + '</strong></span>'
          + '</div>';
      }
      return '<div class="ae-summary">'
        + row(results.instructorA, COLOR_A)
        + row(results.instructorB, COLOR_B)
        + '</div>';
    }());
    card.appendChild(summaryEl);

    var canvasWrapper = document.createElement('div');
    canvasWrapper.className = 'ae-chart-wrapper';
    var canvas = document.createElement('canvas');
    canvas.id = 'ae-bar-chart';
    canvasWrapper.appendChild(canvas);
    card.appendChild(canvasWrapper);

    var interpEl = document.createElement('div');
    interpEl.className = 'ae-interpretation-wrapper';
    interpEl.innerHTML = buildInterpretationHTML(results);
    card.appendChild(interpEl);

    resultsEl.appendChild(card);

    var styles = getComputedStyle(document.documentElement);
    var textColor = styles.getPropertyValue('--text-color').trim() || '#1a1a1a';
    var gridColor = styles.getPropertyValue('--border-gray').trim() || '#e0e0e0';

    _chartInstance = new Chart(canvas, {
      type: 'bar',
      data: buildChartData(results),
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { color: textColor, font: { family: "'Inter', sans-serif" } }
          },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return ctx.dataset.label + ': ' + ctx.parsed.y.toFixed(1) + '%';
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true, text: 'Grade', color: textColor,
              font: { family: "'Inter', sans-serif", weight: '600' }
            },
            ticks: { color: textColor, font: { family: "'Inter', sans-serif" } },
            grid: { color: gridColor }
          },
          y: {
            title: {
              display: true, text: '% of Students', color: textColor,
              font: { family: "'Inter', sans-serif", weight: '600' }
            },
            ticks: {
              color: textColor,
              font: { family: "'Inter', sans-serif" },
              callback: function (v) { return v.toFixed(0) + '%'; }
            },
            grid: { color: gridColor },
            min: 0
          }
        }
      }
    });
  }

  // ── UI builder ────────────────────────────────────────────────────

  function makeFieldGroup(labelText) {
    var g = document.createElement('div');
    g.className = 'ae-field-group';
    var lbl = document.createElement('label');
    lbl.className = 'ae-label';
    lbl.textContent = labelText;
    g.appendChild(lbl);
    return g;
  }

  function setBlankOption(sel, text) {
    sel.innerHTML = '';
    var opt = document.createElement('option');
    opt.value = '';
    opt.textContent = text;
    sel.appendChild(opt);
  }

  function resetSelect(sel, blankText) {
    setBlankOption(sel, blankText);
    sel.disabled = true;
  }

  function populateCatalog(data, subject, catalogSel) {
    setBlankOption(catalogSel, '\u2014 Select course \u2014');
    if (!subject) { catalogSel.disabled = true; return; }
    var catalogs = [];
    Object.keys(data.courses).forEach(function (key) {
      var c = data.courses[key];
      if (c.subject === subject) catalogs.push({ catalog: c.catalog, title: c.title });
    });
    catalogs.sort(function (a, b) { return parseInt(a.catalog, 10) - parseInt(b.catalog, 10); });
    catalogs.forEach(function (c) {
      var opt = document.createElement('option');
      opt.value = c.catalog;
      opt.textContent = subject + ' ' + c.catalog + ' \u2014 ' + c.title;
      catalogSel.appendChild(opt);
    });
    catalogSel.disabled = catalogs.length === 0;
  }

  function populateInstructors(data, subject, catalog, instASel, instBSel) {
    resetSelect(instASel, '\u2014 Select instructor \u2014');
    resetSelect(instBSel, '\u2014 Select instructor \u2014');
    if (!subject || !catalog) return;
    var course = data.courses[subject + ' ' + catalog];
    if (!course) return;

    var instructors = Object.keys(course.instructors).filter(function (name) {
      return course.instructors[name].n_students >= MIN_STUDENTS;
    });
    instructors.sort();

    if (instructors.length === 0) {
      var msg = document.createElement('option');
      msg.disabled = true;
      msg.textContent = 'No instructors meet the minimum sample size (n \u2265 ' + MIN_STUDENTS + ').';
      instASel.appendChild(msg);
      instBSel.appendChild(msg.cloneNode(true));
      return;
    }

    instructors.forEach(function (name) {
      var n = course.instructors[name].n_students;
      var optA = document.createElement('option');
      optA.value = name;
      optA.textContent = name + ' (n\u202f=\u202f' + n + ' students)';
      instASel.appendChild(optA);

      var optB = document.createElement('option');
      optB.value = name;
      optB.textContent = name + ' (n\u202f=\u202f' + n + ' students)';
      instBSel.appendChild(optB);
    });

    instASel.disabled = false;
    instBSel.disabled = false;
  }

  function syncInstructorB(instASel, instBSel) {
    var selectedA = instASel.value;
    Array.prototype.forEach.call(instBSel.options, function (opt) {
      opt.disabled = (opt.value && opt.value === selectedA);
    });
    if (instBSel.value === selectedA) instBSel.value = '';
  }

  function buildUI(data) {
    var root = document.getElementById('analysis-root');
    if (!root) return;
    root.innerHTML = '';

    // Controls card
    var form = document.createElement('div');
    form.className = 'analysis-controls';

    var header = document.createElement('div');
    header.className = 'ae-controls-header';
    header.innerHTML =
      '<div class="ae-controls-header-icon">'
      + '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">'
      + '<path d="M2 4h12v1.5H2zm2 3h8v1.5H4zm2 3h4v1.5H6z"/>'
      + '</svg></div>'
      + '<h4>Configure Comparison</h4>';
    form.appendChild(header);

    var grid = document.createElement('div');
    grid.className = 'ae-dropdowns-grid';

    // Subject dropdown
    var subjectGroup = makeFieldGroup('Subject');
    var subjectSel = document.createElement('select');
    subjectSel.id = 'ae-subject';
    subjectSel.className = 'ae-select';
    var subjectBlank = document.createElement('option');
    subjectBlank.value = '';
    subjectBlank.textContent = '\u2014 Select subject \u2014';
    subjectSel.appendChild(subjectBlank);
    (data.meta.subjects || []).forEach(function (s) {
      var opt = document.createElement('option');
      opt.value = s; opt.textContent = s;
      subjectSel.appendChild(opt);
    });
    subjectGroup.appendChild(subjectSel);
    grid.appendChild(subjectGroup);

    // Catalog dropdown
    var catalogGroup = makeFieldGroup('Course');
    var catalogSel = document.createElement('select');
    catalogSel.id = 'ae-catalog';
    catalogSel.className = 'ae-select';
    catalogSel.disabled = true;
    setBlankOption(catalogSel, '\u2014 Select course \u2014');
    catalogGroup.appendChild(catalogSel);
    grid.appendChild(catalogGroup);

    // Instructor A dropdown
    var instAGroup = makeFieldGroup('Instructor A');
    var instASel = document.createElement('select');
    instASel.id = 'ae-instructor-a';
    instASel.className = 'ae-select';
    instASel.disabled = true;
    setBlankOption(instASel, '\u2014 Select instructor \u2014');
    instAGroup.appendChild(instASel);
    grid.appendChild(instAGroup);

    // Instructor B dropdown
    var instBGroup = makeFieldGroup('Instructor B');
    var instBSel = document.createElement('select');
    instBSel.id = 'ae-instructor-b';
    instBSel.className = 'ae-select';
    instBSel.disabled = true;
    setBlankOption(instBSel, '\u2014 Select instructor \u2014');
    instBGroup.appendChild(instBSel);
    grid.appendChild(instBGroup);

    form.appendChild(grid);

    var divider = document.createElement('hr');
    divider.className = 'ae-controls-divider';
    form.appendChild(divider);

    // Bottom row: metric pill toggle + run button
    var bottom = document.createElement('div');
    bottom.className = 'ae-controls-bottom';

    var metricField = document.createElement('div');
    metricField.className = 'ae-metric-field';
    var metricLabel = document.createElement('label');
    metricLabel.className = 'ae-label';
    metricLabel.textContent = 'Metric';
    metricField.appendChild(metricLabel);

    var pillToggle = document.createElement('div');
    pillToggle.className = 'ae-pill-toggle';
    var activeMetric = 'avg_gpa';
    var metricDefs = [
      { value: 'avg_gpa', label: 'Average GPA' },
      { value: 'pct_a',   label: '% Receiving an A' }
    ];
    metricDefs.forEach(function (m) {
      var pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'ae-pill' + (m.value === activeMetric ? ' ae-pill--active' : '');
      pill.dataset.metric = m.value;
      pill.textContent = m.label;
      pill.addEventListener('click', function () {
        activeMetric = m.value;
        pillToggle.querySelectorAll('.ae-pill').forEach(function (p) {
          p.classList.toggle('ae-pill--active', p.dataset.metric === activeMetric);
        });
      });
      pillToggle.appendChild(pill);
    });
    metricField.appendChild(pillToggle);
    bottom.appendChild(metricField);

    var runBtn = document.createElement('button');
    runBtn.id = 'ae-run-btn';
    runBtn.type = 'button';
    runBtn.className = 'ae-run-btn';
    runBtn.textContent = 'Run Comparison';
    runBtn.disabled = true;
    bottom.appendChild(runBtn);

    form.appendChild(bottom);
    root.appendChild(form);

    var resultsDiv = document.createElement('div');
    resultsDiv.id = 'ae-results';
    resultsDiv.className = 'ae-results';
    root.appendChild(resultsDiv);

    // Event wiring
    subjectSel.addEventListener('change', function () {
      populateCatalog(data, subjectSel.value, catalogSel);
      resetSelect(instASel, '\u2014 Select instructor \u2014');
      resetSelect(instBSel, '\u2014 Select instructor \u2014');
      runBtn.disabled = true;
      resultsDiv.innerHTML = '';
    });

    catalogSel.addEventListener('change', function () {
      populateInstructors(data, subjectSel.value, catalogSel.value, instASel, instBSel);
      runBtn.disabled = true;
      resultsDiv.innerHTML = '';
    });

    instASel.addEventListener('change', function () {
      syncInstructorB(instASel, instBSel);
      runBtn.disabled = !(instASel.value && instBSel.value);
    });

    instBSel.addEventListener('change', function () {
      runBtn.disabled = !(instASel.value && instBSel.value);
    });

    runBtn.addEventListener('click', function () {
      var results = runComparison(
        data,
        subjectSel.value,
        catalogSel.value,
        instASel.value,
        instBSel.value,
        activeMetric
      );
      if (!results) {
        resultsDiv.innerHTML = '<p class="ae-error">Could not compute results. Check selections.</p>';
        return;
      }
      renderChart(results, resultsDiv);
    });
  }

  // ── Data loader ───────────────────────────────────────────────────

  var _dataCache = null;

  function loadData() {
    if (_dataCache) return Promise.resolve(_dataCache);
    return fetch(BASE + 'data.json')
      .then(function (r) {
        if (!r.ok) throw new Error('Failed to load dataset: ' + r.status);
        return r.json();
      })
      .then(function (json) {
        _dataCache = json;
        return json;
      });
  }

  // ── Bootstrap ─────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    loadData()
      .then(buildUI)
      .catch(function (err) {
        var root = document.getElementById('analysis-root');
        if (root) root.innerHTML = '<p class="ae-error">Error loading dataset: ' + err.message + '</p>';
      });
  });

}());
