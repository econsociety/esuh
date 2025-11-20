---
title: "Trade Policy and Manufacturing Employment"
subtitle: "Analyzing the Effects of Tariffs on Texas Industries"
author: Serena
date: 2024-11-05
topic: International Economics
working_paper: false
excerpt: This research examines how recent trade policy changes have affected manufacturing employment in Texas, with focus on industries exposed to tariff increases.
citations:
  - "Autor, D. H., Dorn, D., & Hanson, G. H. (2013). The China Syndrome: Local Labor Market Effects of Import Competition in the United States. American Economic Review, 103(6), 2121-2168."
  - "Fajgelbaum, P. D., Goldberg, P. K., Kennedy, P. J., & Khandelwal, A. K. (2020). The Return to Protectionism. Quarterly Journal of Economics, 135(1), 1-55."
  - "Flaaen, A., & Pierce, J. (2019). Disentangling the Effects of the 2018-2019 Tariffs on a Globally Connected U.S. Manufacturing Sector. Federal Reserve Board Finance and Economics Discussion Series."
  - "Pierce, J. R., & Schott, P. K. (2016). The Surprisingly Swift Decline of US Manufacturing Employment. American Economic Review, 106(7), 1632-1662."
---

## Abstract

This paper analyzes the employment effects of recent tariff increases on manufacturing industries in Texas. Using industry-level variation in tariff exposure, I estimate the short-run impact on employment, wages, and establishment dynamics. The results indicate that industries facing higher retaliatory tariffs experienced significant employment declines, while the employment effects of input tariffs were more modest. The findings highlight the importance of global value chains in determining trade policy outcomes.

## Introduction

Trade policy has returned to the forefront of economic policy debates. Between 2018 and 2019, the United States implemented substantial tariff increases on imports from major trading partners, particularly China. These tariffs affected a wide range of products, from steel and aluminum to consumer electronics and machinery.

Texas presents a compelling case for studying trade policy effects due to its:

- Large and diverse manufacturing sector
- Significant export exposure, especially to Mexico
- Integration into global supply chains
- Variation in industry-specific tariff exposure

This paper examines how Texas manufacturing industries responded to these trade policy changes, focusing on employment outcomes.

## Background on Trade Policy Changes

The 2018-2019 tariff increases affected Texas manufacturing through three main channels:

1. **Direct Input Tariffs**: Increased costs for imported intermediate goods
2. **Output Protection**: Higher tariffs on competing imports
3. **Retaliatory Tariffs**: Foreign tariffs on U.S. exports

Understanding the net effect requires accounting for all three channels, as industries differ substantially in their exposure.

## Data and Empirical Strategy

### Data

The analysis combines several data sources:

- Manufacturing employment data from the Quarterly Census of Employment and Wages
- Industry-specific tariff rates from the U.S. International Trade Commission
- Trade flow data from USA Trade Online
- Industry characteristics from the Annual Survey of Manufactures

The sample covers Texas manufacturing establishments from 2016 Q1 through 2023 Q4, providing both pre-treatment and post-treatment periods.

### Measuring Tariff Exposure

I construct three measures of tariff exposure for each industry:

**Input Tariff Exposure** = Σ<sub>k</sub> (share of input k) × (tariff increase on k)

**Output Tariff Protection** = tariff increase on industry's output

**Retaliatory Tariff Exposure** = (industry exports / sales) × (retaliatory tariff increase)

### Empirical Model

The baseline specification estimates:

**ΔE<sub>i</sub> = α + β₁(InputTariff<sub>i</sub>) + β₂(OutputTariff<sub>i</sub>) + β₃(RetaliationTariff<sub>i</sub>) + γX<sub>i</sub> + ε<sub>i</sub>**

Where ΔE<sub>i</sub> is the change in log employment for industry i, and X<sub>i</sub> includes pre-period industry characteristics.

## Results

### Employment Effects by Tariff Type

| Tariff Type | Employment Effect | Standard Error | Interpretation |
|-------------|-------------------|----------------|----------------|
| Input Tariffs (10pp increase) | -1.2% | (0.6%) | Higher input costs reduce employment |
| Output Protection (10pp increase) | +0.8% | (0.4%) | Protection increases domestic production |
| Retaliatory Tariffs (10pp increase) | -3.5% | (0.9%) | Export losses reduce employment |

**Note:** All coefficients significant at 5% level. Effects measured over 2-year period following tariff implementation.

### Industry Heterogeneity

The employment effects vary substantially across manufacturing industries:

**Most Affected Industries (2018-2020):**

1. **Primary Metals** (-8.2%): High input tariff exposure, especially steel and aluminum
2. **Electrical Equipment** (-6.5%): Subject to both input tariffs and retaliation
3. **Machinery Manufacturing** (-5.8%): Strong retaliatory tariff effects
4. **Fabricated Metal Products** (-4.1%): Indirect effects through downstream demand

**Least Affected Industries:**

1. **Food Manufacturing** (-0.5%): Limited trade exposure
2. **Printing** (+0.2%): Primarily serving local markets
3. **Wood Products** (+0.8%): Benefited from housing boom, offsetting trade effects

### Geographic Concentration

The employment effects are concentrated in specific Texas regions:

- **Houston area**: Particularly affected due to concentration of chemical and metal industries
- **Dallas-Fort Worth**: Mixed effects across diverse manufacturing base
- **Border regions**: Some industries benefited from USMCA provisions

## Mechanisms and Additional Results

### Establishment Dynamics

The employment decline operates through two margins:

1. **Intensive Margin**: Existing establishments reduce employment by 2.1% on average
2. **Extensive Margin**: Establishment exit rates increase by 1.3 percentage points in high-exposure industries

### Wage Effects

While employment declined, average wages in affected industries increased by 1.8%, suggesting that marginal workers were more affected by job losses than higher-skilled workers.

### Input Substitution

Industries with high input tariff exposure show evidence of:

- Shifting to domestic suppliers (where available)
- Reducing imported intermediate input shares by 12%
- Some evidence of reshoring production activities

## Policy Implications

The results have several implications for trade policy design:

1. **Account for Global Value Chains**: Industries embedded in international supply chains face competing pressures from input tariffs and output protection

2. **Retaliatory Tariffs Matter**: Export-oriented industries face the largest employment losses, particularly when trading partners retaliate

3. **Adjustment Costs Are Real**: Short-run employment losses may persist as establishments close and workers transition to other industries

4. **Regional Impacts Vary**: Trade policy creates winners and losers across geographic regions based on industrial composition

## Conclusion

This analysis demonstrates that recent tariff increases had significant negative effects on employment in Texas manufacturing industries, particularly those exposed to retaliatory tariffs. While output protection provided some offsetting benefits, the net effect was negative for most industries.

The heterogeneous effects across industries and regions underscore the complexity of trade policy impacts in an economy characterized by global value chains and integrated production networks. Policymakers should carefully consider these distributional effects when designing trade policies.

### Future Research Directions

Several questions merit further investigation:

- Long-run effects as industries complete adjustment processes
- Worker-level outcomes including wage trajectories and geographic mobility
- Productivity effects and innovation responses
- Comparison with other states and industries
- Effects of subsequent trade agreements (e.g., USMCA implementation)

Understanding these dynamics will be crucial for informing future trade policy decisions and supporting affected workers and communities.
