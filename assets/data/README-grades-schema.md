# Grades JSON Schema

This document defines the expected schema for any grades JSON file used by the
Dynamic Analysis framework.

## Top-level structure

```json
{
  "meta": { ... },
  "courses": { ... }
}
```

---

## `meta`

| Field | Type | Description |
|---|---|---|
| `subjects` | `string[]` | Sorted list of subject prefixes present in this file, e.g. `["ECON", "MATH"]` |
| `last_updated` | `string` | ISO year-month string, e.g. `"2025-12"` |

---

## `courses`

An object keyed by the full course identifier (subject + space + catalog number),
e.g. `"ECON 2301"`.

### Course object

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Full human-readable course title |
| `subject` | `string` | Subject prefix matching an entry in `meta.subjects` |
| `catalog` | `string` | Catalog number as a string, e.g. `"2301"` |
| `instructors` | `object` | Keyed by instructor name in `"Last, First M"` format |

### Instructor object

| Field | Type | Description |
|---|---|---|
| `n_students` | `integer` | Total students across all terms, **excluding** W, S, NCR grades |
| `n_sections` | `integer` | Total sections taught across all terms |
| `avg_gpa` | `number` | Pre-calculated pooled GPA across all sections (use directly, do not recompute) |
| `pct_a` | `number` | Pre-calculated fraction of students receiving an A (A count / n_students). Use directly. |
| `grade_counts` | `object` | Raw counts for letter grades A, B, C, D, F only (no plus/minus) |
| `excluded` | `object` | Counts of excluded grades: W (withdrawal), S (satisfactory), NCR (no credit) |

### `grade_counts` object

Keys are exactly: `"A"`, `"B"`, `"C"`, `"D"`, `"F"`.
Values are non-negative integers.

### `excluded` object

Keys are exactly: `"W"`, `"S"`, `"NCR"`.
Values are non-negative integers.

---

## Full example

```json
{
  "meta": {
    "subjects": ["ECON", "MATH"],
    "last_updated": "2025-12"
  },
  "courses": {
    "ECON 2301": {
      "title": "Principles of Macroeconomics",
      "subject": "ECON",
      "catalog": "2301",
      "instructors": {
        "Smith, Jane A": {
          "n_students": 312,
          "n_sections": 13,
          "avg_gpa": 2.72,
          "pct_a": 0.124,
          "grade_counts": {
            "A": 38, "B": 95, "C": 110, "D": 45, "F": 24
          },
          "excluded": {
            "W": 3, "S": 0, "NCR": 1
          }
        }
      }
    }
  }
}
```

---

## Aggregation rules

- **Terms are pooled**: all sections across all semesters are combined per
  instructor per course. There is no per-term breakdown in this schema.
- **Excluded grades** (W, S, NCR) are stored in `excluded` for reference but
  are **not** included in `n_students`, `avg_gpa`, `pct_a`, or `grade_counts`.
  They play no role in statistical tests.
- **`avg_gpa` and `pct_a` are pre-calculated** in the source data. The analysis
  engine must use these values directly and must not recompute them from
  `grade_counts`.
- **No plus/minus grades**: `grade_counts` uses whole-letter grades only
  (A, B, C, D, F). The GPA expansion for Welch's t-test uses:
  A → 4.0, B → 3.0, C → 2.0, D → 1.0, F → 0.0.
