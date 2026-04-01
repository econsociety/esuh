/* charts/grouped-bar.js
 * Renders a grouped bar chart for grade distribution comparison.
 * Requires: Chart.js 4.x loaded before this script.
 * Exposes: window.GroupedBarChart
 *
 * Also wires the AnalysisEngine group_comparison render hook.
 */

(function (global) {
  'use strict';

  var COLOR_A = '#C8102E'; // UH red — Instructor A
  var COLOR_B = '#5B8DB8'; // Muted blue — Instructor B

  var _chartInstance = null;

  // ── Summary stats table ──────────────────────────────────────────

  function buildSummaryRow(results) {
    var a = results.instructorA;
    var b = results.instructorB;

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
      + row(a, COLOR_A)
      + row(b, COLOR_B)
      + '</div>';
  }

  // ── Chart data ────────────────────────────────────────────────────

  function gradePct(inst, grade) {
    var count = (inst.grade_counts[grade] || 0);
    return inst.n_students > 0 ? (count / inst.n_students) * 100 : 0;
  }

  function buildChartData(results) {
    var grades = ['A', 'B', 'C', 'D', 'F'];
    var a = results.instructorA;
    var b = results.instructorB;

    return {
      labels: grades,
      datasets: [
        {
          label: a.name,
          data: grades.map(function (g) { return gradePct(a, g); }),
          backgroundColor: COLOR_A + 'CC', // slight transparency
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

  // ── Render ───────────────────────────────────────────────────────

  function render(results, containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    // Destroy previous chart if re-rendering
    if (_chartInstance) {
      _chartInstance.destroy();
      _chartInstance = null;
    }

    // Clear container and build results card
    container.innerHTML = '';

    var card = document.createElement('div');
    card.className = 'ae-results-card';

    // Results heading
    var heading = document.createElement('p');
    heading.className = 'ae-results-title';
    heading.textContent = 'Comparison Results';
    card.appendChild(heading);

    // Summary stats table
    var summaryEl = document.createElement('div');
    summaryEl.innerHTML = buildSummaryRow(results);
    card.appendChild(summaryEl);

    // Canvas wrapper
    var canvasWrapper = document.createElement('div');
    canvasWrapper.className = 'ae-chart-wrapper';
    var canvas = document.createElement('canvas');
    canvas.id = 'ae-bar-chart';
    canvasWrapper.appendChild(canvas);
    card.appendChild(canvasWrapper);

    // Interpretation
    var interpEl = document.createElement('div');
    interpEl.className = 'ae-interpretation-wrapper';
    if (typeof Interpretations !== 'undefined') {
      interpEl.innerHTML = Interpretations.grade_comparison(results);
    }
    card.appendChild(interpEl);

    container.appendChild(card);

    // Detect dark mode via CSS variable (falls back to white)
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
            labels: {
              color: textColor,
              font: { family: "'Inter', sans-serif" }
            }
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
              display: true,
              text: 'Grade',
              color: textColor,
              font: { family: "'Inter', sans-serif", weight: '600' }
            },
            ticks: { color: textColor, font: { family: "'Inter', sans-serif" } },
            grid: { color: gridColor }
          },
          y: {
            title: {
              display: true,
              text: '% of Students',
              color: textColor,
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

  // ── Wire into AnalysisEngine render hook ─────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof AnalysisEngine === 'undefined') return;
    var gc = AnalysisEngine.types.group_comparison;
    if (!gc) return;
    gc.render = function (results /*, uiConfig, resultsDiv */) {
      render(results, 'ae-results');
    };
  });

  // ── Public API ────────────────────────────────────────────────────

  global.GroupedBarChart = {
    render: render
  };

}(window));
