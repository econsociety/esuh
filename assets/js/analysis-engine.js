/* analysis-engine.js
 * Registry-based engine for dynamic statistical analyses.
 * Globals: window.ANALYSIS_CONFIG, window.UI_CONFIG, window.DATASET_PATH
 * Exposes: window.AnalysisEngine
 */

(function (global) {
  'use strict';

  // ─────────────────────────────────────────────────────────────────
  // Welch's t-test helpers (no external library)
  // ─────────────────────────────────────────────────────────────────

  function mean(arr) {
    if (!arr.length) return 0;
    return arr.reduce(function (s, v) { return s + v; }, 0) / arr.length;
  }

  function variance(arr) {
    if (arr.length < 2) return 0;
    var m = mean(arr);
    return arr.reduce(function (s, v) { return s + (v - m) * (v - m); }, 0) / (arr.length - 1);
  }

  // Regularised incomplete beta function via continued-fraction expansion
  // (Lentz's method), accurate enough for t-distribution p-values.
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

  // Two-tailed p-value from t-statistic and degrees of freedom (Welch)
  function twoTailedP(t, df) {
    var x = df / (df + t * t);
    return betaInc(df / 2, 0.5, x);
  }

  // Welch's t-test
  function welchTTest(arrA, arrB) {
    var na = arrA.length, nb = arrB.length;
    var ma = mean(arrA), mb = arrB.length ? mean(arrB) : 0;
    var va = variance(arrA), vb = variance(arrB);
    var se2 = va / na + vb / nb;
    var se = Math.sqrt(se2);
    var t = se > 0 ? (ma - mb) / se : 0;
    // Welch–Satterthwaite degrees of freedom
    var df = (se2 * se2) /
             ((va / na) * (va / na) / (na - 1) + (vb / nb) * (vb / nb) / (nb - 1));
    var p = twoTailedP(Math.abs(t), df);
    return { t_stat: t, df: df, p_value: p };
  }

  // Cohen's d (pooled SD)
  function cohensD(arrA, arrB) {
    var na = arrA.length, nb = arrB.length;
    var va = variance(arrA), vb = variance(arrB);
    var pooled = Math.sqrt(((na - 1) * va + (nb - 1) * vb) / (na + nb - 2));
    return pooled > 0 ? Math.abs(mean(arrA) - mean(arrB)) / pooled : 0;
  }

  // Expand grade_counts into a numeric array for t-test
  var GRADE_POINTS = { A: 4.0, B: 3.0, C: 2.0, D: 1.0, F: 0.0 };

  function expandGrades(gradeCounts) {
    var arr = [];
    ['A', 'B', 'C', 'D', 'F'].forEach(function (g) {
      var count = gradeCounts[g] || 0;
      var pts = GRADE_POINTS[g];
      for (var i = 0; i < count; i++) arr.push(pts);
    });
    return arr;
  }

  // ─────────────────────────────────────────────────────────────────
  // Analysis type registry
  // ─────────────────────────────────────────────────────────────────

  var types = {};

  types.group_comparison = {
    // Return all instructor records for the course specified in selections
    load: function (data, config, selections) {
      var courseKey = (selections.subject || '') + ' ' + (selections.catalog || '');
      var course = data.courses[courseKey];
      if (!course) return null;
      return { course: course, courseKey: courseKey };
    },

    // selections: { instructorA, instructorB, metric, subject, catalog }
    run: function (processed, selections) {
      if (!processed) return null;
      var course = processed.course;
      var instA = course.instructors[selections.instructorA];
      var instB = course.instructors[selections.instructorB];
      if (!instA || !instB) return null;

      var arrA = expandGrades(instA.grade_counts);
      var arrB = expandGrades(instB.grade_counts);

      var tt = welchTTest(arrA, arrB);
      var d = cohensD(arrA, arrB);

      return {
        metric: selections.metric || 'avg_gpa',
        instructorA: {
          name: selections.instructorA,
          n_students: instA.n_students,
          n_sections: instA.n_sections,
          avg_gpa: instA.avg_gpa,
          pct_a: instA.pct_a,
          grade_counts: instA.grade_counts,
          excluded: instA.excluded
        },
        instructorB: {
          name: selections.instructorB,
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
    },

    render: function (results, uiConfig) {
      if (!results) return;
      if (typeof GroupedBarChart !== 'undefined') {
        GroupedBarChart.render(results, 'analysis-widget');
      }
    }
  };

  // ─────────────────────────────────────────────────────────────────
  // Data loader
  // ─────────────────────────────────────────────────────────────────

  var _dataCache = null;
  var _dataPromise = null;

  function getData() {
    if (_dataCache) return Promise.resolve(_dataCache);
    if (_dataPromise) return _dataPromise;
    _dataPromise = fetch(global.DATASET_PATH)
      .then(function (r) {
        if (!r.ok) throw new Error('Failed to load dataset: ' + r.status);
        return r.json();
      })
      .then(function (json) {
        _dataCache = json;
        return json;
      });
    return _dataPromise;
  }

  // ─────────────────────────────────────────────────────────────────
  // UI Builder
  // ─────────────────────────────────────────────────────────────────

  function buildUI(data) {
    var uiCfg = global.UI_CONFIG || {};
    var anCfg = global.ANALYSIS_CONFIG || {};
    var minStudents = uiCfg.min_students != null ? uiCfg.min_students : 20;
    var widget = document.getElementById('analysis-widget');
    if (!widget) return;

    widget.innerHTML = '';

    // ── Controls card ─────────────────────────────────────────────
    var form = document.createElement('div');
    form.className = 'analysis-controls';

    // Header
    var header = document.createElement('div');
    header.className = 'ae-controls-header';
    header.innerHTML =
      '<div class="ae-controls-header-icon">'
      + '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">'
      + '<path d="M2 4h12v1.5H2zm2 3h8v1.5H4zm2 3h4v1.5H6z"/>'
      + '</svg></div>'
      + '<h4>Configure Comparison</h4>';
    form.appendChild(header);

    // 2-column dropdown grid
    var grid = document.createElement('div');
    grid.className = 'ae-dropdowns-grid';

    // Subject dropdown
    var subjectGroup = makeFieldGroup('Subject');
    var subjectSel = document.createElement('select');
    subjectSel.id = 'ae-subject';
    subjectSel.className = 'ae-select';
    var subjectBlank = document.createElement('option');
    subjectBlank.value = '';
    subjectBlank.textContent = '— Select subject —';
    subjectSel.appendChild(subjectBlank);
    (data.meta.subjects || []).forEach(function (s) {
      var opt = document.createElement('option');
      opt.value = s;
      opt.textContent = s;
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
    setBlankOption(catalogSel, '— Select course —');
    catalogGroup.appendChild(catalogSel);
    grid.appendChild(catalogGroup);

    // Instructor A dropdown
    var instAGroup = makeFieldGroup('Instructor A');
    var instASel = document.createElement('select');
    instASel.id = 'ae-instructor-a';
    instASel.className = 'ae-select';
    instASel.disabled = true;
    setBlankOption(instASel, '— Select instructor —');
    instAGroup.appendChild(instASel);
    grid.appendChild(instAGroup);

    // Instructor B dropdown
    var instBGroup = makeFieldGroup('Instructor B');
    var instBSel = document.createElement('select');
    instBSel.id = 'ae-instructor-b';
    instBSel.className = 'ae-select';
    instBSel.disabled = true;
    setBlankOption(instBSel, '— Select instructor —');
    instBGroup.appendChild(instBSel);
    grid.appendChild(instBGroup);

    form.appendChild(grid);

    // Divider
    var divider = document.createElement('hr');
    divider.className = 'ae-controls-divider';
    form.appendChild(divider);

    // Bottom row: metric pill toggle + run button
    var bottom = document.createElement('div');
    bottom.className = 'ae-controls-bottom';

    // Metric pill toggle
    var metricField = document.createElement('div');
    metricField.className = 'ae-metric-field';
    var metricLabel = document.createElement('label');
    metricLabel.className = 'ae-label';
    metricLabel.textContent = 'Metric';
    metricField.appendChild(metricLabel);

    var pillToggle = document.createElement('div');
    pillToggle.className = 'ae-pill-toggle';
    pillToggle.id = 'ae-metric-toggle';
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

    // Run button
    var runBtn = document.createElement('button');
    runBtn.id = 'ae-run-btn';
    runBtn.type = 'button';
    runBtn.className = 'ae-run-btn';
    runBtn.textContent = 'Run Comparison';
    runBtn.disabled = true;
    bottom.appendChild(runBtn);

    form.appendChild(bottom);
    widget.appendChild(form);

    // ── Results container ─────────────────────────────────────────
    var resultsDiv = document.createElement('div');
    resultsDiv.id = 'ae-results';
    resultsDiv.className = 'ae-results';
    widget.appendChild(resultsDiv);

    // ── Event wiring ──────────────────────────────────────────────

    subjectSel.addEventListener('change', function () {
      var subject = subjectSel.value;
      populateCatalog(data, subject, catalogSel);
      resetSelect(instASel, '— Select instructor —');
      resetSelect(instBSel, '— Select instructor —');
      runBtn.disabled = true;
      resultsDiv.innerHTML = '';
    });

    catalogSel.addEventListener('change', function () {
      var subject = subjectSel.value;
      var catalog = catalogSel.value;
      populateInstructors(data, subject, catalog, minStudents, instASel, instBSel);
      runBtn.disabled = true;
      resultsDiv.innerHTML = '';
    });

    instASel.addEventListener('change', function () {
      syncInstructorB(instASel, instBSel);
      updateRunBtn(runBtn, instASel, instBSel);
    });

    instBSel.addEventListener('change', function () {
      updateRunBtn(runBtn, instASel, instBSel);
    });

    runBtn.addEventListener('click', function () {
      var subject = subjectSel.value;
      var catalog = catalogSel.value;
      var instA = instASel.value;
      var instB = instBSel.value;
      var metric = activeMetric;

      var analysisType = (anCfg.type || 'group_comparison');
      var handler = types[analysisType];
      if (!handler) {
        resultsDiv.innerHTML = '<p class="ae-error">Unknown analysis type: ' + analysisType + '</p>';
        return;
      }

      var processed = handler.load(data, anCfg, { subject: subject, catalog: catalog });
      var results = handler.run(processed, {
        subject: subject, catalog: catalog,
        instructorA: instA, instructorB: instB, metric: metric
      });

      if (!results) {
        resultsDiv.innerHTML = '<p class="ae-error">Could not compute results. Check selections.</p>';
        return;
      }

      resultsDiv.innerHTML = '';
      handler.render(results, uiCfg, resultsDiv);
    });
  }

  // ── Helpers ────────────────────────────────────────────────────────

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
    setBlankOption(catalogSel, '— Select course —');
    if (!subject) { catalogSel.disabled = true; return; }
    var catalogs = [];
    Object.keys(data.courses).forEach(function (key) {
      var c = data.courses[key];
      if (c.subject === subject) catalogs.push({ catalog: c.catalog, key: key, title: c.title });
    });
    catalogs.sort(function (a, b) { return parseInt(a.catalog, 10) - parseInt(b.catalog, 10); });
    catalogs.forEach(function (c) {
      var opt = document.createElement('option');
      opt.value = c.catalog;
      opt.textContent = subject + ' ' + c.catalog + ' — ' + c.title;
      catalogSel.appendChild(opt);
    });
    catalogSel.disabled = catalogs.length === 0;
  }

  function populateInstructors(data, subject, catalog, minStudents, instASel, instBSel) {
    resetSelect(instASel, '— Select instructor —');
    resetSelect(instBSel, '— Select instructor —');
    if (!subject || !catalog) return;
    var courseKey = subject + ' ' + catalog;
    var course = data.courses[courseKey];
    if (!course) return;

    var instructors = Object.keys(course.instructors).filter(function (name) {
      return course.instructors[name].n_students >= minStudents;
    });
    instructors.sort();

    if (instructors.length === 0) {
      var msg = document.createElement('option');
      msg.disabled = true;
      msg.textContent = 'No instructors meet the minimum sample size for this course (n \u2265 ' + minStudents + ').';
      instASel.appendChild(msg);
      instBSel.appendChild(msg.cloneNode(true));
      return;
    }

    instructors.forEach(function (name) {
      var n = course.instructors[name].n_students;
      var optA = document.createElement('option');
      optA.value = name;
      optA.textContent = name + ' (n = ' + n + ' students)';
      instASel.appendChild(optA);

      var optB = document.createElement('option');
      optB.value = name;
      optB.textContent = name + ' (n = ' + n + ' students)';
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
    if (instBSel.value === selectedA) {
      instBSel.value = '';
    }
  }

  function updateRunBtn(runBtn, instASel, instBSel) {
    runBtn.disabled = !(instASel.value && instBSel.value);
  }

  // ─────────────────────────────────────────────────────────────────
  // Bootstrap
  // ─────────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    var anCfg = global.ANALYSIS_CONFIG;
    if (!anCfg) return; // not on a dynamic analysis page
    getData().then(function (data) {
      buildUI(data);
    }).catch(function (err) {
      var w = document.getElementById('analysis-widget');
      if (w) w.innerHTML = '<p class="ae-error">Error loading dataset: ' + err.message + '</p>';
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Public API
  // ─────────────────────────────────────────────────────────────────

  global.AnalysisEngine = {
    types: types,
    getData: getData,
    // Exported for testing
    _welchTTest: welchTTest,
    _cohensD: cohensD,
    _expandGrades: expandGrades
  };

}(window));
