---
title: "Instructor Grade Comparison"
subtitle: "Compare grade distributions between two instructors for any UH course"
layout: dynamic-analysis
topic: Education
dynamic: true
excerpt: "Interactively compare how two instructors grade in the same course,
with hypothesis testing to determine if differences are statistically significant."
date: 2026-04-01
author: isaac
---

This tool lets you compare the grade distributions of two instructors teaching the same course at the University of Houston. Select a subject, course number, and two instructors from the dropdowns, then choose a metric — average GPA or the percentage of students receiving an A — and click **Run Comparison**. The chart will show side-by-side bar plots of letter-grade distributions, along with the results of a Welch's two-sample *t*-test that tests whether the difference between the two instructors is statistically significant.

A *p*-value answers a narrow but useful question: if there were truly no difference between these two instructors, how likely would we be to observe a gap this large (or larger) by chance alone? A *p*-value below 0.05 means that gap is unlikely to be pure noise. The tool also reports Cohen's *d*, a standardized measure of the size of the difference — small, medium, or large — which gives context that a *p*-value alone cannot: a result can be statistically significant yet practically trivial if the sample is very large, or practically meaningful yet not statistically significant if the sample is small.

What this tool cannot tell you is *why* any difference exists. Instructors who assign lower grades are not necessarily worse teachers — their courses may attract students with different preparation, they may teach sections at harder times of day, or they may be grading to a stricter standard that better prepares students for later coursework. Self-selection, course difficulty, and departmental culture all play a role. Treat the output here as a starting point for questions, not as a verdict on teaching quality.
