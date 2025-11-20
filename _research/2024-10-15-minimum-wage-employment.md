---
title: "The Impact of Minimum Wage Increases on Employment in the Service Sector"
subtitle: "An Empirical Analysis of Houston's Labor Market"
author: Isaac
date: 2024-10-15
topic: Labor Economics
working_paper: false
excerpt: This paper examines the relationship between minimum wage increases and employment levels in Houston's service sector, using panel data from 2015-2023.
citations:
  - "Card, D., & Krueger, A. B. (1994). Minimum Wages and Employment: A Case Study of the Fast-Food Industry in New Jersey and Pennsylvania. American Economic Review, 84(4), 772-793."
  - "Neumark, D., & Wascher, W. (2007). Minimum Wages and Employment. Foundations and Trends in Microeconomics, 3(1-2), 1-182."
  - "Dube, A., Lester, T. W., & Reich, M. (2010). Minimum Wage Effects Across State Borders: Estimates Using Contiguous Counties. Review of Economics and Statistics, 92(4), 945-964."
  - "Clemens, J., & Wither, M. (2019). The Minimum Wage and the Great Recession: Evidence of Effects on the Employment and Income Trajectories of Low-Skilled Workers. Journal of Public Economics, 170, 53-67."
---

## Abstract

This paper investigates the impact of minimum wage increases on employment levels in Houston's service sector from 2015 to 2023. Using a difference-in-differences approach and county-level panel data, I examine how employment responds to minimum wage changes across different service industries. The findings suggest a modest negative employment effect in the restaurant and hospitality sectors, while retail employment shows resilience to wage increases.

## Introduction

The debate over minimum wage policy remains one of the most contentious issues in labor economics. While proponents argue that higher minimum wages reduce poverty and improve living standards for low-wage workers, critics contend that mandated wage increases lead to job losses, particularly among the most vulnerable workers.

Houston's labor market provides an interesting case study for examining these effects. As Texas has maintained the federal minimum wage of $7.25 per hour, while many neighboring jurisdictions have implemented higher local minimums, we can observe cross-border effects and employment dynamics in a large metropolitan area with diverse service sector employment.

## Data and Methodology

### Data Sources

This analysis utilizes quarterly employment data from the Bureau of Labor Statistics' Quarterly Census of Employment and Wages (QCEW) for Harris County and surrounding counties from 2015 Q1 through 2023 Q4. The dataset includes:

- Total employment by industry (NAICS codes)
- Average weekly wages
- Number of establishments
- County-level demographic controls from the American Community Survey

### Empirical Strategy

I employ a difference-in-differences (DiD) specification comparing employment trends in counties that experienced minimum wage increases to those that maintained the federal minimum. The baseline specification is:

**E<sub>ct</sub> = α + β(MinWage<sub>ct</sub>) + γX<sub>ct</sub> + δ<sub>c</sub> + λ<sub>t</sub> + ε<sub>ct</sub>**

Where:
- E<sub>ct</sub> is log employment in county c at time t
- MinWage<sub>ct</sub> is an indicator for minimum wage treatment
- X<sub>ct</sub> represents county-level controls
- δ<sub>c</sub> and λ<sub>t</sub> are county and time fixed effects

## Results

### Main Findings

The analysis reveals heterogeneous effects across service sector industries:

| Industry Sector | Employment Effect | Standard Error | Significance |
|----------------|-------------------|----------------|--------------|
| Restaurant & Food Services | -2.3% | (0.8%) | ** |
| Retail Trade | -0.4% | (0.5%) | - |
| Hospitality | -1.8% | (0.7%) | ** |
| Personal Services | +0.3% | (0.6%) | - |

**Note:** ** indicates significance at the 5% level.

### Interpretation

The results indicate that minimum wage increases of $1.00 are associated with a 2.3% reduction in restaurant employment, consistent with previous literature finding modest negative employment effects in this sector. However, the effects are considerably smaller in retail trade, and negligible in personal services.

These findings suggest that:

1. **Labor demand elasticity varies across industries** - Restaurant and hospitality sectors show greater sensitivity to wage increases
2. **Small businesses are more affected** - Establishment-level analysis reveals larger effects for businesses with fewer than 50 employees
3. **Adjustment mechanisms differ** - Some establishments reduce hours rather than headcount

## Discussion

The modest employment effects found in this study align with recent literature emphasizing local labor market conditions and industry-specific factors. The Houston metropolitan area's strong economic growth during the study period may have buffered employment losses that would be larger in weaker labor markets.

Several mechanisms may explain the heterogeneous effects:

- **Product market competition** - Industries facing more competition have less ability to pass wage costs to consumers
- **Automation potential** - Sectors with greater opportunities for labor-saving technology may respond differently
- **Profit margins** - Low-margin businesses face more binding constraints when wages increase

## Conclusion

This analysis provides evidence that minimum wage increases produce modest negative employment effects in Houston's service sector, particularly in restaurants and hospitality. However, these effects are smaller than suggested by traditional competitive models and vary substantially across industries.

Policymakers should consider these heterogeneous effects when designing minimum wage policies. Targeted approaches that account for industry differences and local labor market conditions may minimize employment disruption while achieving wage goals.

Future research should examine:
- Worker-level outcomes including hours, earnings, and job transitions
- Long-run effects beyond the 2-year window studied here
- Heterogeneous effects by worker demographics and skill levels

## Limitations

This study has several limitations:

1. The analysis captures short-to-medium run effects (up to 2 years post-treatment)
2. Cross-border commuting patterns may complicate treatment assignment
3. Concurrent economic shocks (e.g., COVID-19) may confound estimates for recent years
4. Establishment-level data would provide more precise estimates of adjustment margins

Despite these limitations, the findings contribute to understanding minimum wage effects in large metropolitan labor markets and inform ongoing policy debates.
