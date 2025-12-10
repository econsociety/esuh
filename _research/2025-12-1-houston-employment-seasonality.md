---
title: Houston's Seasonal Employment Patterns
subtitle: How contract cycles create predictable job losses twice a year
author: Isaac Turner
date: 2025-12-01
featured: true
excerpt: In January, Houston typically loses 1-2% of its employed non-farm workforce. Using monthly, non-seasonally adjusted employment data from FRED, I analyzed the employment patterns of 35 years of Texas metro areas. The data reveal a consistent "double-dip" seasonal pattern...
topic:
  - Labor Market
citations:
  - "U.S. Bureau of Labor Statistics, All Employees: Total Nonfarm in Austin-Round Rock-San Marcos, TX (MSA) [AUST448NAN], retrieved from FRED, Federal Reserve Bank of St. Louis; https://fred.stlouisfed.org/series/AUST448NAN, December 1, 2025.\r"
  - "U.S. Bureau of Labor Statistics, All Employees: Total Nonfarm in Dallas-Fort Worth-Arlington, TX (MSA) [DALL148NAN], retrieved from FRED, Federal Reserve Bank of St. Louis; https://fred.stlouisfed.org/series/DALL148NAN, December 1, 2025."
  -  "U.S. Bureau of Labor Statistics, All Employees: Total Nonfarm in Houston-Pasadena-The Woodlands, TX (MSA) [HOUS448NA], retrieved from FRED, Federal Reserve Bank of St. Louis; https://fred.stlouisfed.org/series/HOUS448NA, December 1, 2025."
  - "U.S. Bureau of Labor Statistics, All Employees: Total Nonfarm in Houston-Pasadena-The Woodlands, TX (MSA) [HOUS448NAN], retrieved from FRED, Federal Reserve Bank of St. Louis; https://fred.stlouisfed.org/series/HOUS448NAN, December 1, 2025."
  - "U.S. Bureau of Labor Statistics, All Employees: Total Nonfarm in San Antonio-New Braunfels, TX (MSA) [SANA748NAN], retrieved from FRED, Federal Reserve Bank of St. Louis; https://fred.stlouisfed.org/series/SANA748NAN, December 1, 2025."
---

![Houston Skyline]({{ '/assets/images/houston-skyline.jpg' | relative_url }})
[*Christine / Flickr / CC BY-NC-ND 2.0*](https://www.flickr.com/photos/bigpinkcookie/13289288/in/photolist-7uqHnu-obGXq7-nUmEvY-qBUi-oBtAY5-eDKSha-HmtMQ-ozrucr-oP7fEC-4Ntqk-2b7rE-5QCuqF-jvn1oG-M52Cg-DSq7j5-dBrXTP-nndKE4-23cSyw9-7e3G9V-wmmCAG-p4bhJv-dUQjY2-4Xy6He-2exb7QK-F7NdLj-fcenw2-dHXTon-c7ADKY-ePBUY6-c7ANi1-e9YjTo-omiuVc-pwgBCW-dEy6w8-B3XJ-22aQmjQ-M52Fe-ioCj41-c7AFhC-dExdVG-S2MUut-6RaMwB-S2Ne7t-9bVPhL-oL1Eff-oNA5i6-bbXpdM-CoWD1u)

#### Introduction
In January, Houston typically loses 1-2% of its employed non-farm workforce. Using monthly, non-seasonally adjusted employment data from FRED, I analyzed Houston's employment patterns alongside other major Texas metro areas from 1990 to 2025. The data reveal a consistent "double-dip" seasonal pattern. Employment drops sharply in January and experiences a secondary dip in July, despite consistent growth during all other months.

![Average Month to Month Employment Change % by Texas Metro Area]({{ '/assets/images/avgmmemployment.png' | relative_url }})
#### Analysis
The January decline is substantial and predictable. Houston's employment falls by an average of 1.77% each January, translating to approximately 40,000 jobs based on current employment levels. This is followed by a rebound in February, which makes it one of the highest growth months. Across the other major metro areas in Texas, we see the following January employment changes:

| Metro Area                                                   | Average Jan Employment Change | Average Feb Employment Change |
| ------------------------------------------------------------ | ----------------------------- | ----------------------------- |
| [Austin](https://fred.stlouisfed.org/series/AUST448NAN)      | -1.46%                        | 1.03%                         |
| [Dallas](https://fred.stlouisfed.org/series/DALL148NAN)      | -1.88%                        | 0.61%                         |
| **[Houston](https://fred.stlouisfed.org/series/HOUS448NAN)** | **-1.77%**                    | **0.77%**                     |
| [San Antonio](https://fred.stlouisfed.org/series/SANA748NAN) | -1.84%                        | 0.92%                         |

This January decline shows the combination of post-holiday seasonal position layoffs and the end of annual employment contracts. The less pronounced drawback in July likely has a similar explanation. Similar to annual employment contracts being associated with January's decline, layoffs in July are probably caused by temporary employment contracts expiring.

Running a simple regression analysis with dummy variables, we see that the calendar month alone explains ~51% of the variation in Houston's month-to-month employment changes since 1990. This R-squared value demonstrates that seasonal factors are more of a dominant driver of employment fluctuations than just noise. Remaining variation comes from business cycle effects, economic shocks, and industry-specific trends.

This finding underscores why economists and policymakers rely on seasonally adjusted data when analyzing labor market health. Without accounting for these predictable patterns, raw employment figures would suggest economic recession in Houston twice every year. The Bureau of Labor Statistics and Federal Reserve banks use [sophisticated seasonal adjustment methods](https://www.dallasfed.org/research/basics/twostep) to remove these annual effects, allowing analysts to differentiate between genuine economic trends and seasonal variations.

#### Conclusion
For anyone following Houston's economy, understanding these patterns provides context for interpreting employment reports. Upcoming jobs figures for January 2026 may look dramatic, especially looking at the raw number of jobs lost. However, by looking in the long term and removing seasonality from data (combined with regular backwards revisions) we can get a better view of economic trends of the region.
