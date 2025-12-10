---
title: How Financial Crises Spread Like Diseases
subtitle: The Epidemic Economics of the 2008 Crash
author: Isaac Turner
date: 2025-12-09
featured: true
excerpt: By 1997, 49% of financial crisis transmission was global. The same math that tracked COVID-19 explains why Lehman Brothers' collapse infected the global economy. Epidemiological models allow economists to study market crises...
topic:
  - Macroeconomics
citations:
  - "On the epidemic of financial crises | Journal of the Royal Statistical Society Series A: Statistics in Society | Oxford academic. (n.d.). https://academic.oup.com/jrsssa/article/177/3/697/7077874 "
  - Wikimedia Foundation. (2025a, November 19). Bankruptcy of Lehman Brothers. Wikipedia. https://en.wikipedia.org/wiki/Bankruptcy_of_Lehman_Brothers 
  - Wikimedia Foundation. (2025b, December 9). Compartmental models (epidemiology). Wikipedia. https://en.wikipedia.org/wiki/Compartmental_models_(epidemiology) 
a:
b:
---

![Lehman Brothers Building]({{ '/assets/images/lehman-brothers.jpg' | relative_url }})
[*Sachab / Flickr / CC BY 2.0*](https://www.flickr.com/photos/sachab/1423748612/in/photolist-GcQmmt-5mSZTo-64Ltjy-64Lsum-64Luuf-3aP5RS-5SRYt3-s2T93f-p3VaJf-51ZWtt-5GYJcv-5mSLFG-6r2gHp-y6CtZ-5mSbBG-2aXoNUo-NU8yW5-2b2Pkm2-7CnXBZ-2aXoP1L-MgMn8D-23k2rAN-6JScQs-2ruE884-9qUAKx-DJ66Ve-xGvxeZ-7rVhyC-xpkMqe-wK2EV8-xDypoq-xDyBZN-xGsQCT-2qwoWTe-xDwv11-tYzHuD-xpi72j-xF54kE-tYzHak-uCYr5g-tYpW8A-tYzHHe-uVqGJv-2fnMCm6-53QWm9-5GYB9R-4SeFHg-5GYG1K)

During the COVID-19 pandemic, many scientific resources were allocated towards predicting and mitigating the spread of the disease. Many such efforts used established numerical models for predicting contagious disease spread. The most common of these is the [SIR model](https://en.wikipedia.org/wiki/Compartmental_models_(epidemiology)) (Susceptible/Infected/Recovered). In this model, there is a fixed population, and we start with a small number of infected individuals with all others labeled susceptible. The disease then spreads with certain parameters (based on the disease's contagious attributes and individual interaction levels). As individuals contract the disease, they are then able to spread it to others and eventually they become recovered at a rate based on the specific disease. They can then neither contract nor spread the disease. Mathematically, this is described by the following system of differential equations:

<center>
$$S(t):   \frac{dS}{dt} = -\beta*I(t)*S(t)$$
$$I(t):   \frac{dI}{dt} = \beta*I(t)*S(t) - \alpha*I(t)$$
$$R(t):   \frac{dR}{dt} = \alpha*I(t)$$
$$\alpha: \text{recovery rate}$$
$$\beta: \text{contagion rate}$$
</center>

The resulting curves for $S(t)$, $I(t)$, and $R(t)$ outline the predicted spread of the disease over time by predicting how many people will be in each of the three categories.

![SIR Model Graph]({{ '/assets/images/sir-model.jpg' | relative_url }})
[Cory M. Simon / PeerJ](https://peerj.com/articles/pchem-14/)

On September 15th, 2008 the Lehman Brothers filed Chapter 11 bankruptcy, associated with their overleveraging of subprime mortgages. Within the next 48 hours, the crisis spread across financial markets globally. The Dow Jones dropped ~4%, which was its biggest drop since September 11, 2001. By September 16th, 2008, AIG required an $85 billion emergency bailout. The contagion spread, collapsing European banks, crashing Asian markets, and causing sovereign debt crises in Europe. 26,000 Lehman Brothers employees lost their jobs, and the global economy experienced the worst recession in almost a decade.

The same mathematical framework used to model the spread of infectious diseases such as COVID-19 can explain the so-called contagion in financial markets as well. Research by [Demiris, Kypraios, and Smith (2014)](https://academic.oup.com/jrsssa/article/177/3/697/7077874) shows that financial crises spread across markets and nations in a similar manner to disease transmission. Their framework is as follows:
- **Susceptible (S)**: Financially healthy institutions exposed to crisis risk
- **Infected (I)**: Institutions in financial distress that can transmit crisis to others
- **Recovered (R)**: Institutions stabilized through bailouts, restructuring, or regulation

Crisis transmission occurs through two channels: **local contagion** (direct counterparty relationships, regional banking networks) at a rate $\lambda_L$, and **global contagion** (fear-based market selloffs, liquidity crises) at rate $\lambda_G$. Just as COVID spread through close and even passing contact, financial crises propagate through direct market relationships as well as broader market panic.

**Demiris, Kypraios, and Smith (2014) also find that financial crises have shifted from local to global spread.** In the currency crises of the 1970s, only **0.5-1%** of crisis transmission occurred globally between regions. By the 1997 Asian Financial Crisis, this had surged to **49%**, meaning crises were spreading worldwide through market panic rather than through direct regional linkages. This nearly 50x increase reflects the dramatic interconnectedness of modern financial markets, where a crisis starting in Thailand can instantly affect Brazil or South Africa.

The model includes a critical threshold parameter $R^\*$ (the basic reproduction number), which represents the expected number of institutions which one failing institution will 'infect'. When $R^\*>1$, a major crisis outbreak becomes likely. When $R^\*≤1$ , crises can die out quickly. Lehman's collapse had a high reproduction number value, triggering failures across the globe. Understanding transmission dynamics helps policymakers determine how many institutions require interventions such as bailouts or regulation adjustments to prevent large-scale collapse. **The paper found that preventing a major crisis outbreak required financially supporting approximately 21-29% of vulnerable countries**, similar to the idea of herd immunity thresholds in disease control. During the 2008 crisis, the massive bailouts weren't arbitrary, but rather attempted to reach this critical threshold to prevent complete systemic collapse. As financial markets grow increasingly interconnected, these epidemic models offer policymakers a mathematical framework for identifying when and where to intervene before the next crisis spreads beyond control.
