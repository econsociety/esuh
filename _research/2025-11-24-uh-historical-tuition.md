---
title: University of Houston Historical Tuition
subtitle: How the up-front cost of attending UH has changed over the years
author: Isaac Turner
date: 2025-11-24
excerpt: "Using the Internet Archive's Wayback Machine, I analyzed how UH tuition has changed since fiscal year 2009. Three trends emerge: a relatively constant increase of 2-3% most years, a large jump (~38%) between FY2012 and FY2013, and no tuition increases since FY2022. Comparing costs for an undergraduate student taking 12 credits in FY2009..."
topic:
  - Inflation
citations:
  - Trends in higher education series trends in college pricing and student. College Board. (n.d.). https://research.collegeboard.org/media/pdf/Trends-in-College-Pricing-and-Student-Aid-2024-ADA.pdf 
  - U.S. Bureau of Labor Statistics. (n.d.-a). Consumer price index factsheets. U.S. Bureau of Labor Statistics. https://www.bls.gov/cpi/factsheets/ 
  - U.S. Bureau of Labor Statistics. (n.d.-b). CPI inflation calculator. U.S. Bureau of Labor Statistics. https://www.bls.gov/data/inflation_calculator.htm 
  - "Undergraduate tuition - fiscal year 2026: Costs & Financial Aid: University of Houston. Undergraduate Tuition - Fiscal Year 2026 | Costs & Financial Aid | University of Houston. (n.d.). https://www.uh.edu/financial/undergraduate/tuition-fees/tuition/index.php "
  - Wayback Machine- University of Houston Undergraduate Tuition. Internet Archive. (n.d.). https://web.archive.org/web/20250000000000*/http://www.uh.edu/financial/undergraduate/tuition-fees/tuition/index.php 
working_paper: "true"
installment: "1"
working_paper_series: UH Inflation Index
---
<iframe src="{{ '/assets/graphs/uh_resident_tuition.html' | relative_url }}" width = "1000" height="700" frameborder="0"></iframe>
*Various Select UH Colleges' Resident Tuition per Credit hour*
#### Introduction
The [Consumer Price Index](https://www.bls.gov/cpi/) (CPI), which measures price inflation, takes a variety of goods into account in its "basket of goods". For most college students, however, this may be an inaccurate view of spending. In this working paper series, I wish to quantify not only the cost of attendance for students at the University of Houston, but also how those costs have changed in recent years. This should cumulate into the development of a UH Inflation Index, which can quantify total cost change year over year. I will focus on tuition and college fees, rent, transportation, and other direct costs. Additionally, opportunity costs inflicted by low/no employment during college years will be taken into account. In this first installment, I analyze how UH tuition by college/program has changed since fiscal year 2009.

#### Methods
UH tuition per credit hour is provided for the current fiscal year [here](https://www.uh.edu/financial/undergraduate/tuition-fees/tuition/index.php) by the office of financial aid. Using the Internet Archive's [Wayback Machine](https://web.archive.org/web/20250000000000*/http://www.uh.edu/financial/undergraduate/tuition-fees/tuition/index.php), I found snapshots of this website going back as far as 2009. Collecting those data gives an idea of how the university has changed tuition over the years.

Note: tuition rates are set by fiscal year. Fiscal year 2024 (FY2024), for example includes Fall 2023, Spring 2024, and Summer 2024 semesters.

#### Results
As shown in the chart above, we can identify 3 trends in tuition since FY2009.
- A relatively constant increase of 2-3% most years
- A large jump (~38%) between FY2012 and FY2013
- No tuition increases since FY2022

These results indicate that tuition increases are not tied with general inflation. College Board highlights that, between FY2023 and FY2024, in-state tuition among public four-year colleges has increased 2.7% before adjusting for inflation. UH stands out with its lack of tuition hikes in recent years. Still, comparing costs for an undergraduate student taking 12 credits in FY2009 with the same in FY2026 highlights a large increase over the last ~15 years, even when compared to CPI inflation in the same time period.

|  | FY2009 | FY2026 | Change |
|---|--------|--------|--------|
| Avg $/Credit | $188.47 | $397.59 | +110.9% |
| Avg $: 12 Credits | $2,261.64 | $4,771.08 | +110.9% |
| CPI* | $100 | $150.50 | +50.5% |

\*$100 baseline, from Jan 2008 to Jan 2025
#### Conclusion
Tuition and total cost of attendance (COA) are major factors for potential students when weighing which college to attend or whether to attend college at all. As a public institution, the University of Houston has access to government funding on top of tuition revenue, which partially insulates it from market pressures and allows for greater discretion in tuition-setting decisions. The dramatic increase between FY2012 and FY2013 likely reflects shifts in state funding during that period, warranting further investigation.

UH's decision to freeze tuition increases since FY2022 represents a notable policy choice, directly benefiting current students. However, tuition is only one component of total costs students face. To accurately assess financial burden on UH students, this analysis will expand to include housing, transportation, and short-term foregone job earnings. This will culminate in a UH Inflation Index which reflects the true economic reality for UH students.

## Next Steps
Next I plan on analyzing 2 aspects:
- Correlation between UH tuition increases and more relevant economic factors such as median Houston-area income growth as well as UH rankings and fiscal health
- Continuing to quantify student costs such as median Houston-area rent as well as financial aid
