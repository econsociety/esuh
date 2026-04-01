/* interpretations.js
 * Generates human-readable HTML interpretation strings for analysis results.
 * Exposes: window.Interpretations
 */

(function (global) {
  'use strict';

  // ── Helpers ──────────────────────────────────────────────────────

  function fmtP(p) {
    if (p < 0.001) return '< 0.001';
    return p.toFixed(3).replace(/\.?0+$/, '') || '0';
  }

  function fmtGPA(v) {
    return (Math.round(v * 100) / 100).toFixed(2);
  }

  function fmtPct(v) {
    return Math.round(v * 100) + '%';
  }

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
        : 'The effect size is medium — the practical difference may be real even if the sample sizes do not yet support a firm conclusion.';
    }
    // large
    return significant
      ? 'The effect size is large, indicating a substantial and practically meaningful difference between these instructors.'
      : 'The effect size is large — the practical difference appears substantial, though the current sample sizes do not yield significance at \u03b1 = 0.05.';
  }

  // ── Footnote for excluded grades ─────────────────────────────────

  function excludedFootnote(results) {
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
    return '<div class="ae-footnote"><em>Note — grades excluded from analysis: '
      + rows.join('; ') + '.</em></div>';
  }

  // ── Main function ─────────────────────────────────────────────────

  function grade_comparison(results) {
    var a = results.instructorA;
    var b = results.instructorB;
    var metric = results.metric;
    var p = results.p_value;
    var d = results.cohens_d;
    var sig = results.significant;

    var labelA = a.name;
    var labelB = b.name;

    // Metric values and labels
    var valA, valB, metricLabel, unitA, unitB;
    if (metric === 'pct_a') {
      valA = fmtPct(a.pct_a);
      valB = fmtPct(b.pct_a);
      metricLabel = 'percentage of students receiving an A';
      unitA = valA;
      unitB = valB;
    } else {
      valA = fmtGPA(a.avg_gpa);
      valB = fmtGPA(b.avg_gpa);
      metricLabel = 'average GPA';
      unitA = valA + ' GPA';
      unitB = valB + ' GPA';
    }

    // Direction
    var higherName, lowerName, higherVal, lowerVal;
    var aNum = metric === 'pct_a' ? a.pct_a : a.avg_gpa;
    var bNum = metric === 'pct_a' ? b.pct_a : b.avg_gpa;
    if (aNum >= bNum) {
      higherName = labelA; higherVal = unitA;
      lowerName  = labelB; lowerVal  = unitB;
    } else {
      higherName = labelB; higherVal = unitB;
      lowerName  = labelA; lowerVal  = unitA;
    }

    var effect = effectLabel(d);
    var effectSent = effectSentence(effect, sig);

    var html;
    if (sig) {
      html = '<p class="ae-interpretation ae-interpretation--significant">'
        + 'There is a <strong>statistically significant</strong> difference between '
        + '<strong>' + labelA + '</strong> and <strong>' + labelB + '</strong> '
        + '(p\u202f=\u202f' + fmtP(p) + ', Cohen\u2019s\u202fd\u202f=\u202f' + d.toFixed(2) + '). '
        + '<strong>' + higherName + '</strong>\u2019s students had a ' + metricLabel + ' of '
        + '<strong>' + higherVal + '</strong> compared to '
        + '<strong>' + lowerName + '</strong>\u2019s '
        + '<strong>' + lowerVal + '</strong>. '
        + effectSent
        + '</p>';
    } else {
      html = '<p class="ae-interpretation ae-interpretation--not-significant">'
        + 'There is <strong>no statistically significant difference</strong> between '
        + '<strong>' + labelA + '</strong> and <strong>' + labelB + '</strong> '
        + '(p\u202f=\u202f' + fmtP(p) + ', Cohen\u2019s\u202fd\u202f=\u202f' + d.toFixed(2) + '). '
        + 'The observed difference in ' + metricLabel + ' ('
        + valA + ' vs.\u202f' + valB
        + ') is within the range expected from random variation alone. '
        + effectSent
        + '</p>';
    }

    html += excludedFootnote(results);
    return html;
  }

  // ── Public API ────────────────────────────────────────────────────

  global.Interpretations = {
    grade_comparison: grade_comparison
  };

}(window));
