import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, AreaChart, Area, ComposedChart } from 'recharts';
import { Calculator, TrendingUp, BarChart3, Activity, Target, DollarSign, Zap, Globe, Shield, Layers, Brain, Building, Users, Briefcase, BookOpen, Eye, AlertTriangle } from 'lucide-react';

const CFALevel2Visualizer = () => {
  const [activeCategory, setActiveCategory] = useState('quantitative');
  const [activeFormula, setActiveFormula] = useState('multipleRegression');
  const [inputs, setInputs] = useState({
    // Quantitative Methods
    sampleSize: 100,
    rSquared: 0.75,
    numIndepVars: 3,
    alpha: 0.05,
    testStatistic: 2.5,
    criticalValue: 1.96,
    pValue: 0.012,
    
    // Economics
    spotRate: 1.2000,
    forwardRate: 1.2050,
    domesticRate: 3.0,
    foreignRate: 2.0,
    inflationDomestic: 2.5,
    inflationForeign: 1.8,
    timeHorizon: 1,
    
    // Financial Statement Analysis
    netIncome: 1000000,
    totalAssets: 10000000,
    shareholderEquity: 6000000,
    totalDebt: 3000000,
    revenue: 5000000,
    beginningEquity: 5500000,
    dividendsPaid: 250000,
    cfo: 1200000,
    
    // Corporate Finance
    currentDividend: 2.00,
    dividendGrowthRate: 8,
    requiredReturn: 12,
    retentionRatio: 60,
    roe: 15,
    payoutRatio: 40,
    equityWeight: 0.6,
    debtWeight: 0.4,
    costOfDebt: 5,
    taxRate: 25,
    
    // Equity Valuation
    eps: 5.00,
    peRatio: 18,
    bookValuePerShare: 25,
    priceToBook: 1.8,
    terminalGrowthRate: 3,
    
    // Fixed Income
    faceValue: 1000,
    couponRate: 5.0,
    ytm: 4.0,
    timeToMaturity: 10,
    frequency: 2,
    currentPrice: 1081,
    
    // Derivatives
    spotPrice: 100,
    strikePrice: 105,
    timeToExpiry: 0.25,
    volatility: 25,
    riskFreeRate: 3,
    dividendYield: 2,
    
    // Alternatives
    nav: 50,
    marketPrice: 52,
    noi: 1000000,
    capRate: 8,
    
    // Portfolio Management
    portfolioReturn: 10,
    benchmarkReturn: 8,
    riskFreeReturn: 3,
    trackingError: 2,
    beta: 1.2,
    portfolioStdDev: 15
  });

  const categories = {
    quantitative: {
      name: 'Quantitative Methods',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'blue',
      formulas: {
        multipleRegression: { 
          name: 'Multiple Regression Model', 
          formula: 'Y = b₀ + b₁X₁ + b₂X₂ + ... + bₖXₖ + ε',
          concept: 'Explains dependent variable using multiple independent variables',
          numerator: 'Predicted Y Value',
          denominator: 'Linear combination of independent variables',
          keyInsight: 'Each coefficient represents the marginal effect of that variable holding others constant'
        },
        rSquaredAdjusted: { 
          name: 'Adjusted R-Squared', 
          formula: 'Adjusted R² = 1 - [(1-R²)(n-1)/(n-k-1)]',
          concept: 'Measures model fit while penalizing for additional variables',
          numerator: '1 - Adjusted Sum of Squared Errors',
          denominator: 'Adjusted Total Sum of Squares',
          keyInsight: 'Unlike R², this can decrease when adding irrelevant variables'
        },
        hypothesisTesting: { 
          name: 'T-Test for Significance', 
          formula: 't = (b̂ⱼ - Bⱼ)/SE(b̂ⱼ)',
          concept: 'Tests whether a regression coefficient is statistically significant',
          numerator: 'Difference between estimated and hypothesized coefficient',
          denominator: 'Standard error of the coefficient estimate',
          keyInsight: 'Larger t-statistics indicate more significant relationships'
        },
        fStatistic: { 
          name: 'F-Test for Joint Significance', 
          formula: 'F = [(RSS_R - RSS_U)/k] / [RSS_U/(n-k-1)]',
          concept: 'Tests whether multiple coefficients are jointly significant',
          numerator: 'Improvement in fit from adding variables (scaled by degrees of freedom)',
          denominator: 'Unexplained variation per degree of freedom',
          keyInsight: 'Tests if the model as a whole is statistically significant'
        }
      }
    },
    economics: {
      name: 'Economics',
      icon: <Globe className="w-5 h-5" />,
      color: 'green',
      formulas: {
        ppp: { 
          name: 'Purchasing Power Parity', 
          formula: 'S₁/S₀ = (1 + πf)/(1 + πd)',
          concept: 'Exchange rate changes should reflect inflation differentials',
          numerator: 'Foreign inflation adjustment (1 + foreign inflation)',
          denominator: 'Domestic inflation adjustment (1 + domestic inflation)',
          keyInsight: 'Higher inflation country should see currency depreciation'
        },
        coveredInterestParity: { 
          name: 'Covered Interest Rate Parity', 
          formula: 'F/S = (1 + rf)/(1 + rd)',
          concept: 'Forward rate reflects interest rate differentials to prevent arbitrage',
          numerator: 'Foreign interest rate adjustment (1 + foreign rate)',
          denominator: 'Domestic interest rate adjustment (1 + domestic rate)',
          keyInsight: 'Higher interest rate currency trades at forward discount'
        },
        uncoveredInterestParity: { 
          name: 'Uncovered Interest Rate Parity', 
          formula: 'E(S₁)/S₀ = (1 + rf)/(1 + rd)',
          concept: 'Expected exchange rate changes should offset interest rate differentials',
          numerator: 'Expected future spot rate',
          denominator: 'Current spot rate times interest rate differential',
          keyInsight: 'Often violated due to risk premiums and market imperfections'
        },
        forwardRateValuation: { 
          name: 'Forward Contract Valuation', 
          formula: 'Vt = (Ft - F₀) × Contract Size / (1 + r)^(T-t)',
          concept: 'Value of forward contract as market rates change',
          numerator: 'Difference between current forward rate and contract rate',
          denominator: 'Discount factor for remaining time to maturity',
          keyInsight: 'Positive when current forward rate exceeds contract rate'
        }
      }
    },
    financial: {
      name: 'Financial Statement Analysis',
      icon: <Building className="w-5 h-5" />,
      color: 'purple',
      formulas: {
        roeDuPont: { 
          name: 'ROE DuPont Analysis', 
          formula: 'ROE = (Net Income/Sales) × (Sales/Assets) × (Assets/Equity)',
          concept: 'Decomposes ROE into profitability, efficiency, and leverage components',
          numerator: 'Net Profit Margin × Asset Turnover × Financial Leverage',
          denominator: 'Each component represents a different aspect of performance',
          keyInsight: 'Identifies whether ROE comes from operations or financial leverage'
        },
        sustainableGrowthRate: { 
          name: 'Sustainable Growth Rate', 
          formula: 'g = ROE × Retention Ratio',
          concept: 'Maximum growth rate without external equity financing',
          numerator: 'Return on Equity',
          denominator: 'Portion of earnings retained (not paid as dividends)',
          keyInsight: 'Higher ROE and retention ratio enable faster sustainable growth'
        },
        earningsQuality: { 
          name: 'Cash Flow to Net Income', 
          formula: 'Quality Ratio = Cash Flow from Operations / Net Income',
          concept: 'Measures how much of earnings are backed by actual cash flows',
          numerator: 'Cash Flow from Operations',
          denominator: 'Net Income',
          keyInsight: 'Ratios significantly above 1 indicate high earnings quality'
        },
        workingCapitalTurnover: { 
          name: 'Working Capital Turnover', 
          formula: 'WC Turnover = Revenue / Average Working Capital',
          concept: 'Efficiency of working capital utilization',
          numerator: 'Annual Revenue',
          denominator: 'Average Working Capital (Current Assets - Current Liabilities)',
          keyInsight: 'Higher turnover indicates more efficient working capital management'
        }
      }
    },
    corporate: {
      name: 'Corporate Finance',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'red',
      formulas: {
        dividendPayout: { 
          name: 'Dividend Payout Ratio', 
          formula: 'Payout Ratio = Dividends per Share / Earnings per Share',
          concept: 'Proportion of earnings paid out as dividends',
          numerator: 'Dividends per Share',
          denominator: 'Earnings per Share',
          keyInsight: 'Higher ratios indicate more income-focused, less growth-oriented policy'
        },
        wacc: { 
          name: 'Weighted Average Cost of Capital', 
          formula: 'WACC = (E/V)×re + (D/V)×rd×(1-T)',
          concept: 'Blended cost of equity and debt financing',
          numerator: 'Weighted cost of equity + After-tax weighted cost of debt',
          denominator: 'Total firm value (equity + debt)',
          keyInsight: 'Tax shield makes debt cheaper, but financial risk increases cost of equity'
        },
        capm: { 
          name: 'Capital Asset Pricing Model', 
          formula: 're = rf + β(rm - rf)',
          concept: 'Cost of equity based on systematic risk',
          numerator: 'Risk-free rate + Risk premium',
          denominator: 'Beta measures sensitivity to market movements',
          keyInsight: 'Only systematic risk is compensated in well-diversified portfolios'
        },
        modigliani: { 
          name: 'MM Cost of Equity with Leverage', 
          formula: 're = r₀ + (r₀ - rd)(D/E)',
          concept: 'How leverage affects cost of equity under MM assumptions',
          numerator: 'Unlevered cost + Risk premium from financial leverage',
          denominator: 'Debt-to-equity ratio determines the risk premium',
          keyInsight: 'Cost of equity increases linearly with leverage'
        }
      }
    },
    equity: {
      name: 'Equity Valuation',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'indigo',
      formulas: {
        gordonGrowthModel: { 
          name: 'Gordon Growth Model', 
          formula: 'V₀ = D₁/(r - g)',
          concept: 'Values stock based on constant dividend growth assumption',
          numerator: 'Next period dividend (D₁)',
          denominator: 'Required return minus growth rate',
          keyInsight: 'Very sensitive to assumptions about r and g; g must be < r'
        },
        justifiedPE: { 
          name: 'Justified P/E Ratio', 
          formula: 'P/E = (1-b)(1+g)/(r-g)',
          concept: 'Theoretical P/E based on dividend policy and growth',
          numerator: 'Payout ratio × Growth adjustment',
          denominator: 'Required return minus growth rate',
          keyInsight: 'Higher growth and payout ratios justify higher P/E multiples'
        },
        pvgo: { 
          name: 'Present Value of Growth Opportunities', 
          formula: 'PVGO = P₀ - E₁/r',
          concept: 'Value attributable to future growth versus current earnings',
          numerator: 'Current stock price minus no-growth value',
          denominator: 'No-growth value = E₁/r (perpetuity of current earnings)',
          keyInsight: 'High PVGO indicates market expects significant future growth'
        },
        residualIncome: { 
          name: 'Residual Income Model', 
          formula: 'RI = E - (r × B₋₁)',
          concept: 'Economic profit after charging for cost of equity capital',
          numerator: 'Net Income minus equity charge',
          denominator: 'Equity charge = required return × beginning book value',
          keyInsight: 'Positive RI indicates value creation above cost of equity'
        }
      }
    },
    fixedIncome: {
      name: 'Fixed Income',
      icon: <Shield className="w-5 h-5" />,
      color: 'teal',
      formulas: {
        bondPricing: { 
          name: 'Bond Pricing Formula', 
          formula: 'P = Σ[C/(1+r)ᵗ] + FV/(1+r)ⁿ',
          concept: 'Present value of all future cash flows from bond',
          numerator: 'Sum of discounted coupon payments plus discounted face value',
          denominator: 'Discount factors based on yield to maturity',
          keyInsight: 'Bond price moves inversely with yield changes'
        },
        modifiedDuration: { 
          name: 'Modified Duration', 
          formula: 'ModDur = MacDur / (1 + YTM/m)',
          concept: 'Price sensitivity to yield changes',
          numerator: 'Macaulay Duration',
          denominator: '1 + yield per compounding period',
          keyInsight: '1% yield change causes approximately ModDur% price change'
        },
        convexity: { 
          name: 'Convexity Adjustment', 
          formula: '%ΔP ≈ -ModDur×Δy + ½×Convexity×(Δy)²',
          concept: 'Improved price change estimate accounting for curvature',
          numerator: 'Linear duration effect plus convexity adjustment',
          denominator: 'Convexity term becomes significant for large yield changes',
          keyInsight: 'Convexity is beneficial - provides upside when yields fall'
        },
        creditSpread: { 
          name: 'Credit Spread', 
          formula: 'Credit Spread = YTM_Corporate - YTM_Treasury',
          concept: 'Additional yield demanded for default risk',
          numerator: 'Corporate bond yield to maturity',
          denominator: 'Risk-free Treasury yield of similar maturity',
          keyInsight: 'Spreads widen during economic stress as default risk increases'
        }
      }
    },
    derivatives: {
      name: 'Derivatives',
      icon: <Zap className="w-5 h-5" />,
      color: 'orange',
      formulas: {
        blackScholesCall: { 
          name: 'Black-Scholes Call Option', 
          formula: 'C = S₀N(d₁) - Xe^(-rT)N(d₂)',
          concept: 'Theoretical value of European call option',
          numerator: 'Expected benefit from stock ownership minus strike payment',
          denominator: 'Risk-neutral probabilities N(d₁) and N(d₂)',
          keyInsight: 'Higher volatility increases option value due to asymmetric payoff'
        },
        blackScholesPut: { 
          name: 'Black-Scholes Put Option', 
          formula: 'P = Xe^(-rT)N(-d₂) - S₀N(-d₁)',
          concept: 'Theoretical value of European put option',
          numerator: 'Expected strike receipt minus stock cost',
          denominator: 'Risk-neutral probabilities for put payoff scenarios',
          keyInsight: 'Put-call parity: C - P = S₀ - Xe^(-rT)'
        },
        deltaHedge: { 
          name: 'Delta Hedging', 
          formula: 'Hedge Ratio = ∂V/∂S = Delta',
          concept: 'Number of shares needed to hedge option position',
          numerator: 'Change in option value',
          denominator: 'Change in underlying stock price',
          keyInsight: 'Delta changes as stock price moves, requiring dynamic hedging'
        },
        impliedVolatility: { 
          name: 'Implied Volatility', 
          formula: 'Market Price = BS(S,K,T,r,σ_implied)',
          concept: 'Volatility that makes theoretical price equal market price',
          numerator: 'Market option price',
          denominator: 'Black-Scholes formula solved for volatility',
          keyInsight: 'IV often differs from historical volatility due to supply/demand'
        }
      }
    },
    alternatives: {
      name: 'Alternative Investments',
      icon: <Layers className="w-5 h-5" />,
      color: 'pink',
      formulas: {
        reitValuation: { 
          name: 'REIT Net Asset Value', 
          formula: 'NAV = (Market Value of Assets - Liabilities) / Shares Outstanding',
          concept: 'Per-share value of underlying real estate assets',
          numerator: 'Market value of real estate portfolio minus debt',
          denominator: 'Number of shares outstanding',
          keyInsight: 'REIT may trade at premium/discount to NAV due to management quality'
        },
        ffoMultiple: { 
          name: 'Funds From Operations', 
          formula: 'FFO = Net Income + Depreciation - Gains on Sales',
          concept: 'REIT earnings excluding non-cash depreciation',
          numerator: 'Net income plus back depreciation',
          denominator: 'Adjusted for non-recurring gains from property sales',
          keyInsight: 'FFO better reflects REIT operating performance than net income'
        },
        commodityReturn: { 
          name: 'Commodity Futures Return', 
          formula: 'Total Return = Spot Return + Collateral Return + Roll Return',
          concept: 'Components of commodity futures investment returns',
          numerator: 'Change in spot price plus financing plus roll effects',
          denominator: 'Spot return from price changes, roll return from curve shape',
          keyInsight: 'Contango creates negative roll return; backwardation positive'
        },
        hedgeFundAlpha: { 
          name: 'Hedge Fund Alpha', 
          formula: 'α = Rp - [Rf + β₁(F₁) + β₂(F₂) + ... + βn(Fn)]',
          concept: 'Risk-adjusted excess return from hedge fund strategy',
          numerator: 'Portfolio return minus factor-based expected return',
          denominator: 'Multi-factor model capturing systematic risk exposures',
          keyInsight: 'True alpha represents manager skill after adjusting for risk factors'
        }
      }
    },
    portfolio: {
      name: 'Portfolio Management',
      icon: <Target className="w-5 h-5" />,
      color: 'gray',
      formulas: {
        informationRatio: { 
          name: 'Information Ratio', 
          formula: 'IR = (Rp - Rb) / σ(Rp - Rb)',
          concept: 'Risk-adjusted measure of active management skill',
          numerator: 'Active return (portfolio return minus benchmark)',
          denominator: 'Tracking error (standard deviation of active returns)',
          keyInsight: 'Higher IR indicates better risk-adjusted active performance'
        },
        treynorRatio: { 
          name: 'Treynor Ratio', 
          formula: 'Treynor = (Rp - Rf) / βp',
          concept: 'Excess return per unit of systematic risk',
          numerator: 'Portfolio excess return over risk-free rate',
          denominator: 'Portfolio beta (systematic risk)',
          keyInsight: 'Useful for comparing portfolios with different diversification levels'
        },
        jensenAlpha: { 
          name: 'Jensen\'s Alpha', 
          formula: 'α = Rp - [Rf + βp(Rm - Rf)]',
          concept: 'CAPM-based measure of risk-adjusted excess return',
          numerator: 'Actual portfolio return minus CAPM expected return',
          denominator: 'CAPM expected return based on beta and market premium',
          keyInsight: 'Positive alpha indicates outperformance after adjusting for systematic risk'
        },
        var: { 
          name: 'Value at Risk (Parametric)', 
          formula: 'VaR = μ - z × σ',
          concept: 'Maximum expected loss at given confidence level',
          numerator: 'Expected return minus confidence interval adjustment',
          denominator: 'Z-score times portfolio standard deviation',
          keyInsight: '5% VaR means 5% chance of losing more than VaR amount'
        }
      }
    }
  };

  const getFormulaCalculation = () => {
    const currentFormula = categories[activeCategory].formulas[activeFormula];
    
    switch(activeCategory) {
      case 'quantitative':
        switch(activeFormula) {
          case 'multipleRegression':
            return {
              calculation: `Adjusted R² = 1 - [(1-${inputs.rSquared})×(${inputs.sampleSize}-1)/(${inputs.sampleSize}-${inputs.numIndepVars}-1)]`,
              result: (1 - ((1 - inputs.rSquared) * (inputs.sampleSize - 1)) / (inputs.sampleSize - inputs.numIndepVars - 1)).toFixed(4),
              interpretation: `The model explains ${(inputs.rSquared * 100).toFixed(1)}% of variance. Adjusted R² of ${(1 - ((1 - inputs.rSquared) * (inputs.sampleSize - 1)) / (inputs.sampleSize - inputs.numIndepVars - 1)).toFixed(4)} accounts for the ${inputs.numIndepVars} variables used.`
            };
          case 'rSquaredAdjusted':
            const adjR2 = 1 - ((1 - inputs.rSquared) * (inputs.sampleSize - 1)) / (inputs.sampleSize - inputs.numIndepVars - 1);
            return {
              calculation: `1 - [(1-${inputs.rSquared})×(${inputs.sampleSize}-1)/(${inputs.sampleSize}-${inputs.numIndepVars}-1)]`,
              result: adjR2.toFixed(4),
              interpretation: `Adjusted R² of ${adjR2.toFixed(4)} is ${adjR2 < inputs.rSquared ? 'lower' : 'equal to'} the unadjusted R² of ${inputs.rSquared}, ${adjR2 < inputs.rSquared ? 'reflecting the penalty for additional variables' : 'suggesting the variables add explanatory power'}.`
            };
          case 'hypothesisTesting':
            const tStat = inputs.testStatistic;
            const critical = inputs.criticalValue;
            return {
              calculation: `t = ${tStat}, Critical Value = ±${critical}`,
              result: tStat > critical ? 'Reject H₀' : 'Fail to Reject H₀',
              interpretation: `With t-statistic = ${tStat} ${tStat > critical ? '>' : '<'} ${critical}, we ${tStat > critical ? 'reject' : 'fail to reject'} the null hypothesis at α = ${inputs.alpha}.`
            };
          case 'fStatistic':
            const fStat = (inputs.rSquared / inputs.numIndepVars) / ((1 - inputs.rSquared) / (inputs.sampleSize - inputs.numIndepVars - 1));
            return {
              calculation: `F = [${inputs.rSquared}/${inputs.numIndepVars}] / [(1-${inputs.rSquared})/(${inputs.sampleSize}-${inputs.numIndepVars}-1)]`,
              result: fStat.toFixed(4),
              interpretation: `F-statistic of ${fStat.toFixed(4)} tests joint significance of all ${inputs.numIndepVars} independent variables.`
            };
        }
        break;
      
      case 'corporate':
        switch(activeFormula) {
          case 'dividendPayout':
            const dps = inputs.currentDividend;
            const payoutRatio = (dps / inputs.eps) * 100;
            return {
              calculation: `Payout Ratio = ${dps} / ${inputs.eps}`,
              result: `${payoutRatio.toFixed(1)}%`,
              interpretation: `Payout ratio of ${payoutRatio.toFixed(1)}% indicates ${payoutRatio > 60 ? 'income-focused' : payoutRatio > 30 ? 'balanced' : 'growth-focused'} dividend policy.`
            };
          case 'wacc':
            const costOfEquity = inputs.riskFreeReturn + inputs.beta * (9 - inputs.riskFreeReturn); // Assume 9% market return
            const afterTaxCostOfDebt = inputs.costOfDebt * (1 - inputs.taxRate/100);
            const wacc = (inputs.equityWeight * costOfEquity) + (inputs.debtWeight * afterTaxCostOfDebt);
            return {
              calculation: `WACC = (${inputs.equityWeight} × ${costOfEquity.toFixed(1)}%) + (${inputs.debtWeight} × ${afterTaxCostOfDebt.toFixed(1)}%)`,
              result: `${wacc.toFixed(2)}%`,
              interpretation: `WACC of ${wacc.toFixed(2)}% with ${(inputs.equityWeight*100).toFixed(0)}% equity weight and ${(afterTaxCostOfDebt).toFixed(1)}% after-tax cost of debt.`
            };
          case 'capm':
            const marketRiskPremium = 6; // Assumed 6% market risk premium
            const costOfEquityCAPM = inputs.riskFreeReturn + inputs.beta * marketRiskPremium;
            return {
              calculation: `re = ${inputs.riskFreeReturn}% + ${inputs.beta} × ${marketRiskPremium}%`,
              result: `${costOfEquityCAPM.toFixed(2)}%`,
              interpretation: `Cost of equity of ${costOfEquityCAPM.toFixed(2)}% with beta of ${inputs.beta} and ${marketRiskPremium}% market risk premium.`
            };
          case 'modigliani':
            const unleveredCost = 8; // Assumed
            const debtToEquity = inputs.debtWeight / inputs.equityWeight;
            const leveredCost = unleveredCost + (unleveredCost - inputs.costOfDebt) * debtToEquity;
            return {
              calculation: `re = ${unleveredCost}% + (${unleveredCost}% - ${inputs.costOfDebt}%) × ${debtToEquity.toFixed(2)}`,
              result: `${leveredCost.toFixed(2)}%`,
              interpretation: `Levered cost of equity of ${leveredCost.toFixed(2)}% with D/E ratio of ${debtToEquity.toFixed(2)}.`
            };
        }
        break;
      
      case 'equity':
        switch(activeFormula) {
          case 'gordonGrowthModel':
            const nextDividend = inputs.currentDividend * (1 + inputs.dividendGrowthRate/100);
            const value = nextDividend / ((inputs.requiredReturn - inputs.dividendGrowthRate) / 100);
            return {
              calculation: `V₀ = ${nextDividend.toFixed(2)} / (${inputs.requiredReturn}% - ${inputs.dividendGrowthRate}%) = ${nextDividend.toFixed(2)} / ${((inputs.requiredReturn - inputs.dividendGrowthRate)/100).toFixed(4)}`,
              result: `${value.toFixed(2)}`,
              interpretation: `Stock value of ${value.toFixed(2)} assumes ${inputs.dividendGrowthRate}% perpetual growth with ${inputs.requiredReturn}% required return.`
            };
          case 'justifiedPE':
            const payoutRatioDecimal = inputs.payoutRatio / 100;
            const growthRateDecimal = inputs.dividendGrowthRate / 100;
            const requiredRetDecimal = inputs.requiredReturn / 100;
            const justifiedPE = (payoutRatioDecimal * (1 + growthRateDecimal)) / (requiredRetDecimal - growthRateDecimal);
            return {
              calculation: `P/E = (${payoutRatioDecimal} × ${(1 + growthRateDecimal).toFixed(3)}) / (${requiredRetDecimal} - ${growthRateDecimal})`,
              result: justifiedPE.toFixed(2),
              interpretation: `Justified P/E of ${justifiedPE.toFixed(2)} vs current ${inputs.peRatio} suggests stock is ${justifiedPE > inputs.peRatio ? 'undervalued' : 'overvalued'}.`
            };
          case 'pvgo':
            const noGrowthValue = inputs.eps / (inputs.requiredReturn / 100);
            const currentPrice = inputs.eps * inputs.peRatio;
            const pvgo = currentPrice - noGrowthValue;
            return {
              calculation: `PVGO = ${currentPrice.toFixed(2)} - (${inputs.eps}/${inputs.requiredReturn/100}) = ${currentPrice.toFixed(2)} - ${noGrowthValue.toFixed(2)}`,
              result: `${pvgo.toFixed(2)}`,
              interpretation: `PVGO of ${pvgo.toFixed(2)} represents ${(pvgo/currentPrice*100).toFixed(1)}% of stock value from growth opportunities.`
            };
          case 'residualIncome':
            const equityCharge = inputs.bookValuePerShare * (inputs.requiredReturn / 100);
            const residualIncome = inputs.eps - equityCharge;
            return {
              calculation: `RI = ${inputs.eps} - (${inputs.bookValuePerShare} × ${inputs.requiredReturn}%) = ${inputs.eps} - ${equityCharge.toFixed(2)}`,
              result: `${residualIncome.toFixed(2)}`,
              interpretation: `${residualIncome > 0 ? 'Positive' : 'Negative'} RI of ${residualIncome.toFixed(2)} indicates ${residualIncome > 0 ? 'value creation' : 'value destruction'} above cost of equity.`
            };
        }
        break;
      
      case 'fixedIncome':
        switch(activeFormula) {
          case 'bondPricing':
            const periodicCoupon = inputs.faceValue * (inputs.couponRate/100) / inputs.frequency;
            const periodicYield = (inputs.ytm/100) / inputs.frequency;
            const totalPeriods = inputs.timeToMaturity * inputs.frequency;
            
            let pv = 0;
            for (let period = 1; period <= totalPeriods; period++) {
              pv += periodicCoupon / Math.pow(1 + periodicYield, period);
            }
            pv += inputs.faceValue / Math.pow(1 + periodicYield, totalPeriods);
            
            return {
              calculation: `PV = Σ[${periodicCoupon}/(1.${(periodicYield*100).toFixed(2)})^t] + ${inputs.faceValue}/(1.${(periodicYield*100).toFixed(2)})^${totalPeriods}`,
              result: `${pv.toFixed(2)}`,
              interpretation: `Bond priced at ${pv.toFixed(2)} ${pv > inputs.faceValue ? 'premium' : pv < inputs.faceValue ? 'discount' : 'par'} with ${inputs.couponRate}% coupon vs ${inputs.ytm}% YTM.`
            };
          case 'modifiedDuration':
            const macDuration = 7.5; // Approximate for 10-year bond
            const modDuration = macDuration / (1 + inputs.ytm/100/inputs.frequency);
            return {
              calculation: `ModDur = ${macDuration} / (1 + ${inputs.ytm}%/${inputs.frequency}) = ${macDuration} / ${(1 + inputs.ytm/100/inputs.frequency).toFixed(4)}`,
              result: modDuration.toFixed(3),
              interpretation: `Modified duration of ${modDuration.toFixed(3)} means 1% yield change causes ~${modDuration.toFixed(2)}% price change.`
            };
          case 'convexity':
            const convexity = 65; // Approximate for 10-year bond
            const yieldChange = 0.01; // 1% change
            const modDur = 7.5 / (1 + inputs.ytm/100/inputs.frequency);
            const durationEffect = -modDur * yieldChange * 100;
            const convexityEffect = 0.5 * convexity * yieldChange * yieldChange * 100;
            return {
              calculation: `%ΔP = -${modDur.toFixed(2)}×1% + 0.5×${convexity}×(1%)² = ${durationEffect.toFixed(2)}% + ${convexityEffect.toFixed(2)}%`,
              result: `${(durationEffect + convexityEffect).toFixed(2)}%`,
              interpretation: `For 1% yield increase: ${durationEffect.toFixed(2)}% duration effect + ${convexityEffect.toFixed(2)}% convexity benefit.`
            };
          case 'creditSpread':
            const treasuryYield = 3.5; // Assumed treasury yield
            const creditSpread = inputs.ytm - treasuryYield;
            return {
              calculation: `Credit Spread = ${inputs.ytm}% - ${treasuryYield}% = ${creditSpread.toFixed(1)}%`,
              result: `${(creditSpread*100).toFixed(0)} bps`,
              interpretation: `${(creditSpread*100).toFixed(0)} basis points spread compensates for default risk above Treasury rate.`
            };
        }
        break;
      
      case 'derivatives':
        switch(activeFormula) {
          case 'blackScholesCall':
            const d1 = (Math.log(inputs.spotPrice/inputs.strikePrice) + (inputs.riskFreeRate/100 + 0.5*Math.pow(inputs.volatility/100,2))*inputs.timeToExpiry) / (inputs.volatility/100*Math.sqrt(inputs.timeToExpiry));
            const d2 = d1 - inputs.volatility/100*Math.sqrt(inputs.timeToExpiry);
            const callValue = inputs.spotPrice * normalCDF(d1) - inputs.strikePrice * Math.exp(-inputs.riskFreeRate/100*inputs.timeToExpiry) * normalCDF(d2);
            return {
              calculation: `C = ${inputs.spotPrice}×N(${d1.toFixed(3)}) - ${inputs.strikePrice}×e^(-${inputs.riskFreeRate/100}×${inputs.timeToExpiry})×N(${d2.toFixed(3)})`,
              result: `${callValue.toFixed(2)}`,
              interpretation: `Call option worth ${callValue.toFixed(2)} with ${inputs.volatility}% volatility and ${(inputs.timeToExpiry*365).toFixed(0)} days to expiry.`
            };
          case 'blackScholesPut':
            const d1Put = (Math.log(inputs.spotPrice/inputs.strikePrice) + (inputs.riskFreeRate/100 + 0.5*Math.pow(inputs.volatility/100,2))*inputs.timeToExpiry) / (inputs.volatility/100*Math.sqrt(inputs.timeToExpiry));
            const d2Put = d1Put - inputs.volatility/100*Math.sqrt(inputs.timeToExpiry);
            const putValue = inputs.strikePrice * Math.exp(-inputs.riskFreeRate/100*inputs.timeToExpiry) * normalCDF(-d2Put) - inputs.spotPrice * normalCDF(-d1Put);
            const callValuePut = inputs.spotPrice * normalCDF(d1Put) - inputs.strikePrice * Math.exp(-inputs.riskFreeRate/100*inputs.timeToExpiry) * normalCDF(d2Put);
            return {
              calculation: `P = ${inputs.strikePrice}×e^(-${inputs.riskFreeRate/100}×${inputs.timeToExpiry})×N(${(-d2Put).toFixed(3)}) - ${inputs.spotPrice}×N(${(-d1Put).toFixed(3)})`,
              result: `${putValue.toFixed(2)}`,
              interpretation: `Put option worth ${putValue.toFixed(2)}. Put-call parity: C - P = S - PV(K) = ${(callValuePut - putValue).toFixed(2)}.`
            };
          case 'deltaHedge':
            const d1Delta = (Math.log(inputs.spotPrice/inputs.strikePrice) + (inputs.riskFreeRate/100 + 0.5*Math.pow(inputs.volatility/100,2))*inputs.timeToExpiry) / (inputs.volatility/100*Math.sqrt(inputs.timeToExpiry));
            const delta = normalCDF(d1Delta);
            return {
              calculation: `Delta = N(d₁) = N(${d1Delta.toFixed(3)}) = ${delta.toFixed(3)}`,
              result: delta.toFixed(3),
              interpretation: `Need ${delta.toFixed(3)} shares per call option to create delta-neutral hedge. Delta changes as stock moves.`
            };
          case 'impliedVolatility':
            const marketPrice = 8.50;
            const impliedVol = 28;
            return {
              calculation: `Market Price = ${marketPrice}, Theoretical Price varies with σ`,
              result: `${impliedVol}%`,
              interpretation: `Implied volatility of ${impliedVol}% vs historical ${inputs.volatility}% suggests ${impliedVol > inputs.volatility ? 'elevated' : 'low'} option demand.`
            };
        }
        break;
      
      case 'alternatives':
        switch(activeFormula) {
          case 'reitValuation':
            const totalAssets = 500000000;
            const totalLiabilities = 200000000;
            const sharesOut = 10000000;
            const navPerShare = (totalAssets - totalLiabilities) / sharesOut;
            return {
              calculation: `NAV = (${totalAssets/1000000}M - ${totalLiabilities/1000000}M) / ${sharesOut/1000000}M shares`,
              result: `${navPerShare.toFixed(2)}`,
              interpretation: `NAV of ${navPerShare.toFixed(2)} vs market price ${inputs.marketPrice} shows ${inputs.marketPrice > navPerShare ? 'premium' : 'discount'} of ${(Math.abs(inputs.marketPrice - navPerShare)/navPerShare*100).toFixed(1)}%.`
            };
          case 'ffoMultiple':
            const netIncome = 50000000;
            const depreciation = 25000000;
            const gainsOnSales = 5000000;
            const ffo = netIncome + depreciation - gainsOnSales;
            const ffoPerShare = ffo / 10000000;
            return {
              calculation: `FFO = ${netIncome/1000000}M + ${depreciation/1000000}M - ${gainsOnSales/1000000}M = ${ffo/1000000}M`,
              result: `${ffoPerShare.toFixed(2)} per share`,
              interpretation: `FFO of ${ffoPerShare.toFixed(2)} per share provides better REIT operating metric than net income.`
            };
          case 'commodityReturn':
            const spotReturn = 5.2;
            const collateralReturn = 2.8;
            const rollReturn = -1.5;
            const totalReturn = spotReturn + collateralReturn + rollReturn;
            return {
              calculation: `Total = ${spotReturn}% (spot) + ${collateralReturn}% (collateral) + ${rollReturn}% (roll)`,
              result: `${totalReturn.toFixed(1)}%`,
              interpretation: `${totalReturn.toFixed(1)}% total return despite ${spotReturn}% commodity gain due to ${rollReturn < 0 ? 'contango' : 'backwardation'} roll effect.`
            };
          case 'hedgeFundAlpha':
            const portfolioRet = 12.5;
            const riskFreeRet = 2.5;
            const marketFactor = 0.7 * 8.0;
            const sizeFactor = 0.3 * 3.0;
            const expectedReturn = riskFreeRet + marketFactor + sizeFactor;
            const alpha = portfolioRet - expectedReturn;
            return {
              calculation: `α = ${portfolioRet}% - [${riskFreeRet}% + 0.7×8% + 0.3×3%] = ${portfolioRet}% - ${expectedReturn}%`,
              result: `${alpha.toFixed(1)}%`,
              interpretation: `Alpha of ${alpha.toFixed(1)}% represents ${alpha > 0 ? 'skill-based' : 'below-expected'} performance after risk adjustment.`
            };
        }
        break;
      
      case 'portfolio':
        switch(activeFormula) {
          case 'informationRatio':
            const activeReturn = inputs.portfolioReturn - inputs.benchmarkReturn;
            const informationRatio = activeReturn / inputs.trackingError;
            return {
              calculation: `IR = (${inputs.portfolioReturn}% - ${inputs.benchmarkReturn}%) / ${inputs.trackingError}% = ${activeReturn}% / ${inputs.trackingError}%`,
              result: informationRatio.toFixed(3),
              interpretation: `Information ratio of ${informationRatio.toFixed(3)} indicates ${informationRatio > 0.5 ? 'strong' : informationRatio > 0 ? 'modest' : 'poor'} risk-adjusted active performance.`
            };
          case 'treynorRatio':
            const excessReturn = inputs.portfolioReturn - inputs.riskFreeReturn;
            const treynorRatio = excessReturn / inputs.beta;
            return {
              calculation: `Treynor = (${inputs.portfolioReturn}% - ${inputs.riskFreeReturn}%) / ${inputs.beta} = ${excessReturn}% / ${inputs.beta}`,
              result: `${treynorRatio.toFixed(2)}%`,
              interpretation: `Treynor ratio of ${treynorRatio.toFixed(2)}% shows return per unit of systematic risk.`
            };
          case 'jensenAlpha':
            const marketReturn = 9;
            const expectedReturnJensen = inputs.riskFreeReturn + inputs.beta * (marketReturn - inputs.riskFreeReturn);
            const jensenAlpha = inputs.portfolioReturn - expectedReturnJensen;
            return {
              calculation: `α = ${inputs.portfolioReturn}% - [${inputs.riskFreeReturn}% + ${inputs.beta}×(${marketReturn}% - ${inputs.riskFreeReturn}%)] = ${inputs.portfolioReturn}% - ${expectedReturnJensen.toFixed(1)}%`,
              result: `${jensenAlpha.toFixed(2)}%`,
              interpretation: `Jensen's alpha of ${jensenAlpha.toFixed(2)}% indicates ${jensenAlpha > 0 ? 'outperformance' : 'underperformance'} vs CAPM prediction.`
            };
          case 'var':
            const confidence = 0.05;
            const zScore = 1.645;
            const varAmount = inputs.portfolioReturn - zScore * inputs.portfolioStdDev;
            return {
              calculation: `VaR = ${inputs.portfolioReturn}% - ${zScore}×${inputs.portfolioStdDev}% = ${inputs.portfolioReturn}% - ${(zScore * inputs.portfolioStdDev).toFixed(1)}%`,
              result: `${varAmount.toFixed(1)}%`,
              interpretation: `5% VaR of ${varAmount.toFixed(1)}% means 5% chance of losing more than ${Math.abs(varAmount).toFixed(1)}% in one period.`
            };
        }
        break;
      
      default:
        return {
          calculation: 'Select a formula to see calculation',
          result: 'N/A',
          interpretation: 'Choose a specific formula to view detailed calculation and interpretation'
        };
    }
  };

  // Helper function for normal CDF (simplified)
  const normalCDF = (x) => {
    return 0.5 * (1 + erf(x / Math.sqrt(2)));
  };

  const erf = (x) => {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
  };

  const getChartData = () => {
    switch(activeCategory) {
      case 'quantitative':
        if (activeFormula === 'multipleRegression') {
          const data = [];
          for (let sample = 50; sample <= 200; sample += 10) {
            const adjR2 = 1 - ((1 - inputs.rSquared) * (sample - 1)) / (sample - inputs.numIndepVars - 1);
            data.push({
              sampleSize: sample,
              adjustedR2: parseFloat(adjR2.toFixed(4)),
              unadjustedR2: inputs.rSquared
            });
          }
          return data;
        }
        break;
      
      case 'economics':
        if (activeFormula === 'ppp') {
          const data = [];
          for (let inflationDiff = -3; inflationDiff <= 3; inflationDiff += 0.2) {
            const foreignInflation = inputs.inflationDomestic + inflationDiff;
            const expectedRate = inputs.spotRate * (1 + foreignInflation/100) / (1 + inputs.inflationDomestic/100);
            data.push({
              inflationDifference: parseFloat(inflationDiff.toFixed(1)),
              expectedExchangeRate: parseFloat(expectedRate.toFixed(4)),
              currentRate: inputs.spotRate
            });
          }
          return data;
        }
        break;
      
      case 'equity':
        if (activeFormula === 'gordonGrowthModel') {
          const data = [];
          for (let growth = 1; growth <= 10; growth += 0.5) {
            if (growth < inputs.requiredReturn) {
              const nextDiv = inputs.currentDividend * (1 + growth/100);
              const value = nextDiv / ((inputs.requiredReturn - growth) / 100);
              data.push({
                growthRate: growth,
                stockValue: parseFloat(value.toFixed(2)),
                sensitivity: parseFloat((value / (inputs.currentDividend * 20)).toFixed(2))
              });
            }
          }
          return data;
        }
        break;
      
      case 'fixedIncome':
        if (activeFormula === 'bondPricing') {
          const data = [];
          for (let yield_ = 1; yield_ <= 8; yield_ += 0.25) {
            const periodicCoupon = inputs.faceValue * (inputs.couponRate/100) / inputs.frequency;
            const periodicYield = yield_/100 / inputs.frequency;
            const totalPeriods = inputs.timeToMaturity * inputs.frequency;
            
            let price = 0;
            for (let period = 1; period <= totalPeriods; period++) {
              price += periodicCoupon / Math.pow(1 + periodicYield, period);
            }
            price += inputs.faceValue / Math.pow(1 + periodicYield, totalPeriods);
            
            data.push({
              yield: yield_,
              price: parseFloat(price.toFixed(2)),
              parValue: inputs.faceValue
            });
          }
          return data;
        }
        break;
      
      case 'derivatives':
        if (activeFormula === 'blackScholesCall') {
          const data = [];
          for (let spot = 80; spot <= 120; spot += 2) {
            const d1 = (Math.log(spot/inputs.strikePrice) + (inputs.riskFreeRate/100 + 0.5*Math.pow(inputs.volatility/100,2))*inputs.timeToExpiry) / (inputs.volatility/100*Math.sqrt(inputs.timeToExpiry));
            const d2 = d1 - inputs.volatility/100*Math.sqrt(inputs.timeToExpiry);
            const callValue = spot * normalCDF(d1) - inputs.strikePrice * Math.exp(-inputs.riskFreeRate/100*inputs.timeToExpiry) * normalCDF(d2);
            const intrinsicValue = Math.max(0, spot - inputs.strikePrice);
            
            data.push({
              spotPrice: spot,
              optionValue: parseFloat(callValue.toFixed(2)),
              intrinsicValue: intrinsicValue,
              timeValue: parseFloat((callValue - intrinsicValue).toFixed(2))
            });
          }
          return data;
        }
        break;
      
      case 'portfolio':
        if (activeFormula === 'informationRatio') {
          const data = [];
          for (let trackingErr = 0.5; trackingErr <= 8; trackingErr += 0.5) {
            const activeRet = inputs.portfolioReturn - inputs.benchmarkReturn;
            const ir = activeRet / trackingErr;
            data.push({
              trackingError: trackingErr,
              informationRatio: parseFloat(ir.toFixed(3)),
              threshold: 0.5
            });
          }
          return data;
        }
        break;
      
      default:
        return [];
    }
    return [];
  };

  const renderChart = () => {
    const data = getChartData();
    const currentFormula = categories[activeCategory].formulas[activeFormula];
    
    if (data.length === 0) {
      return (
        <div className="flex items-center justify-center h-80 text-gray-500">
          <div className="text-center">
            <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Interactive chart for {currentFormula.name}</p>
            <p className="text-sm">Adjust parameters to see sensitivity analysis</p>
          </div>
        </div>
      );
    }

    switch(activeCategory) {
      case 'quantitative':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sampleSize" label={{value: 'Sample Size', position: 'insideBottom', offset: -5}} />
              <YAxis label={{value: 'R-Squared', angle: -90, position: 'insideLeft'}} />
              <Tooltip formatter={(value, name) => [value, name === 'adjustedR2' ? 'Adjusted R²' : 'Unadjusted R²']} />
              <Line type="monotone" dataKey="adjustedR2" stroke="#3b82f6" strokeWidth={2} name="Adjusted R²" />
              <Line type="monotone" dataKey="unadjustedR2" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Unadjusted R²" />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'economics':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="inflationDifference" label={{value: 'Inflation Difference (%)', position: 'insideBottom', offset: -5}} />
              <YAxis label={{value: 'Exchange Rate', angle: -90, position: 'insideLeft'}} />
              <Tooltip />
              <Line type="monotone" dataKey="expectedExchangeRate" stroke="#10b981" strokeWidth={2} name="PPP Expected Rate" />
              <Line type="monotone" dataKey="currentRate" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Current Rate" />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'equity':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="growthRate" label={{value: 'Growth Rate (%)', position: 'insideBottom', offset: -5}} />
              <YAxis yAxisId="left" label={{value: 'Stock Value ($)', angle: -90, position: 'insideLeft'}} />
              <YAxis yAxisId="right" orientation="right" label={{value: 'Sensitivity', angle: 90, position: 'insideRight'}} />
              <Tooltip />
              <Area yAxisId="left" type="monotone" dataKey="stockValue" fill="#3b82f6" fillOpacity={0.6} stroke="#3b82f6" strokeWidth={2} name="Stock Value" />
              <Line yAxisId="right" type="monotone" dataKey="sensitivity" stroke="#ef4444" strokeWidth={2} name="Sensitivity" />
            </ComposedChart>
          </ResponsiveContainer>
        );
      
      case 'fixedIncome':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="yield" label={{value: 'Yield to Maturity (%)', position: 'insideBottom', offset: -5}} />
              <YAxis label={{value: 'Bond Price ($)', angle: -90, position: 'insideLeft'}} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#0891b2" strokeWidth={2} name="Bond Price" />
              <Line type="monotone" dataKey="parValue" stroke="#ef4444" strokeWidth={1} strokeDasharray="5 5" name="Par Value" />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'derivatives':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="spotPrice" label={{value: 'Spot Price ($)', position: 'insideBottom', offset: -5}} />
              <YAxis label={{value: 'Option Value ($)', angle: -90, position: 'insideLeft'}} />
              <Tooltip />
              <Area type="monotone" dataKey="intrinsicValue" stackId="1" fill="#10b981" fillOpacity={0.6} stroke="#10b981" strokeWidth={1} name="Intrinsic Value" />
              <Area type="monotone" dataKey="timeValue" stackId="1" fill="#3b82f6" fillOpacity={0.6} stroke="#3b82f6" strokeWidth={1} name="Time Value" />
              <Line type="monotone" dataKey="optionValue" stroke="#ef4444" strokeWidth={2} name="Total Option Value" />
            </ComposedChart>
          </ResponsiveContainer>
        );
      
      case 'portfolio':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="trackingError" label={{value: 'Tracking Error (%)', position: 'insideBottom', offset: -5}} />
              <YAxis label={{value: 'Information Ratio', angle: -90, position: 'insideLeft'}} />
              <Tooltip />
              <Line type="monotone" dataKey="informationRatio" stroke="#3b82f6" strokeWidth={2} name="Information Ratio" />
              <Line type="monotone" dataKey="threshold" stroke="#ef4444" strokeWidth={1} strokeDasharray="5 5" name="Good Performance Threshold" />
            </LineChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  const renderInputs = () => {
    switch(activeCategory) {
      case 'quantitative':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Sample Size (n)</label>
              <input
                type="number"
                min="10"
                max="1000"
                value={inputs.sampleSize}
                onChange={(e) => setInputs({...inputs, sampleSize: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">R-Squared</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={inputs.rSquared}
                onChange={(e) => setInputs({...inputs, rSquared: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Number of Independent Variables (k)</label>
              <input
                type="number"
                min="1"
                max="20"
                value={inputs.numIndepVars}
                onChange={(e) => setInputs({...inputs, numIndepVars: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Significance Level (α)</label>
              <select
                value={inputs.alpha}
                onChange={(e) => setInputs({...inputs, alpha: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value={0.01}>0.01 (99% confidence)</option>
                <option value={0.05}>0.05 (95% confidence)</option>
                <option value={0.10}>0.10 (90% confidence)</option>
              </select>
            </div>
          </div>
        );
      
      case 'economics':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Current Spot Rate</label>
              <input
                type="number"
                step="0.0001"
                value={inputs.spotRate}
                onChange={(e) => setInputs({...inputs, spotRate: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Forward Rate</label>
              <input
                type="number"
                step="0.0001"
                value={inputs.forwardRate}
                onChange={(e) => setInputs({...inputs, forwardRate: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Domestic Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.domesticRate}
                onChange={(e) => setInputs({...inputs, domesticRate: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Foreign Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.foreignRate}
                onChange={(e) => setInputs({...inputs, foreignRate: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Domestic Inflation (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.inflationDomestic}
                onChange={(e) => setInputs({...inputs, inflationDomestic: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Foreign Inflation (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.inflationForeign}
                onChange={(e) => setInputs({...inputs, inflationForeign: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        );
      
      case 'financial':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Net Income ($)</label>
              <input
                type="number"
                value={inputs.netIncome}
                onChange={(e) => setInputs({...inputs, netIncome: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Assets ($)</label>
              <input
                type="number"
                value={inputs.totalAssets}
                onChange={(e) => setInputs({...inputs, totalAssets: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Shareholder Equity ($)</label>
              <input
                type="number"
                value={inputs.shareholderEquity}
                onChange={(e) => setInputs({...inputs, shareholderEquity: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Revenue ($)</label>
              <input
                type="number"
                value={inputs.revenue}
                onChange={(e) => setInputs({...inputs, revenue: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cash Flow from Operations ($)</label>
              <input
                type="number"
                value={inputs.cfo}
                onChange={(e) => setInputs({...inputs, cfo: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Dividends Paid ($)</label>
              <input
                type="number"
                value={inputs.dividendsPaid}
                onChange={(e) => setInputs({...inputs, dividendsPaid: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        );
      
      case 'corporate':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Current Dividend ($)</label>
              <input
                type="number"
                step="0.01"
                value={inputs.currentDividend}
                onChange={(e) => setInputs({...inputs, currentDividend: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">EPS ($)</label>
              <input
                type="number"
                step="0.01"
                value={inputs.eps}
                onChange={(e) => setInputs({...inputs, eps: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Equity Weight</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={inputs.equityWeight}
                onChange={(e) => setInputs({...inputs, equityWeight: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Debt Weight</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={inputs.debtWeight}
                onChange={(e) => setInputs({...inputs, debtWeight: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cost of Debt (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.costOfDebt}
                onChange={(e) => setInputs({...inputs, costOfDebt: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tax Rate (%)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="50"
                value={inputs.taxRate}
                onChange={(e) => setInputs({...inputs, taxRate: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        );
      
      case 'equity':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Current Dividend ($)</label>
              <input
                type="number"
                step="0.01"
                value={inputs.currentDividend}
                onChange={(e) => setInputs({...inputs, currentDividend: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Growth Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.dividendGrowthRate}
                onChange={(e) => setInputs({...inputs, dividendGrowthRate: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Required Return (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.requiredReturn}
                onChange={(e) => setInputs({...inputs, requiredReturn: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">P/E Ratio</label>
              <input
                type="number"
                step="0.1"
                value={inputs.peRatio}
                onChange={(e) => setInputs({...inputs, peRatio: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">EPS ($)</label>
              <input
                type="number"
                step="0.01"
                value={inputs.eps}
                onChange={(e) => setInputs({...inputs, eps: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Book Value per Share ($)</label>
              <input
                type="number"
                step="0.01"
                value={inputs.bookValuePerShare}
                onChange={(e) => setInputs({...inputs, bookValuePerShare: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        );
      
      case 'fixedIncome':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Face Value ($)</label>
              <input
                type="number"
                value={inputs.faceValue}
                onChange={(e) => setInputs({...inputs, faceValue: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Coupon Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.couponRate}
                onChange={(e) => setInputs({...inputs, couponRate: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">YTM (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.ytm}
                onChange={(e) => setInputs({...inputs, ytm: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time to Maturity (years)</label>
              <input
                type="number"
                value={inputs.timeToMaturity}
                onChange={(e) => setInputs({...inputs, timeToMaturity: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Payment Frequency</label>
              <select
                value={inputs.frequency}
                onChange={(e) => setInputs({...inputs, frequency: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
              >
                <option value={1}>Annual</option>
                <option value={2}>Semi-annual</option>
                <option value={4}>Quarterly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Current Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={inputs.currentPrice}
                onChange={(e) => setInputs({...inputs, currentPrice: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        );
      
      case 'derivatives':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Spot Price ($)</label>
              <input
                type="number"
                value={inputs.spotPrice}
                onChange={(e) => setInputs({...inputs, spotPrice: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Strike Price ($)</label>
              <input
                type="number"
                value={inputs.strikePrice}
                onChange={(e) => setInputs({...inputs, strikePrice: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time to Expiry (years)</label>
              <input
                type="number"
                step="0.01"
                value={inputs.timeToExpiry}
                onChange={(e) => setInputs({...inputs, timeToExpiry: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Volatility (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.volatility}
                onChange={(e) => setInputs({...inputs, volatility: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Risk-Free Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.riskFreeRate}
                onChange={(e) => setInputs({...inputs, riskFreeRate: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Dividend Yield (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.dividendYield}
                onChange={(e) => setInputs({...inputs, dividendYield: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        );
      
      case 'alternatives':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">NAV ($)</label>
              <input
                type="number"
                step="0.01"
                value={inputs.nav}
                onChange={(e) => setInputs({...inputs, nav: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Market Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={inputs.marketPrice}
                onChange={(e) => setInputs({...inputs, marketPrice: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Net Operating Income ($)</label>
              <input
                type="number"
                value={inputs.noi}
                onChange={(e) => setInputs({...inputs, noi: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cap Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.capRate}
                onChange={(e) => setInputs({...inputs, capRate: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        );
      
      case 'portfolio':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Portfolio Return (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.portfolioReturn}
                onChange={(e) => setInputs({...inputs, portfolioReturn: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Benchmark Return (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.benchmarkReturn}
                onChange={(e) => setInputs({...inputs, benchmarkReturn: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Risk-Free Return (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.riskFreeReturn}
                onChange={(e) => setInputs({...inputs, riskFreeReturn: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tracking Error (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.trackingError}
                onChange={(e) => setInputs({...inputs, trackingError: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Beta</label>
              <input
                type="number"
                step="0.01"
                value={inputs.beta}
                onChange={(e) => setInputs({...inputs, beta: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Portfolio Std Dev (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.portfolioStdDev}
                onChange={(e) => setInputs({...inputs, portfolioStdDev: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-500"
              />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center text-gray-500 p-4">
            Select a formula to configure parameters
          </div>
        );
    }
  };

  const results = getFormulaCalculation();
  const currentFormula = categories[activeCategory].formulas[activeFormula];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">CFA Level II Formula Visualizer</h1>
        <p className="text-xl text-gray-600">Interactive exploration of the complete CFA Level II curriculum formulas</p>
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Educational Tool:</strong> Comprehensive formula calculator with detailed explanations and sensitivity analysis
          </p>
        </div>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {Object.entries(categories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => {
              setActiveCategory(key);
              setActiveFormula(Object.keys(category.formulas)[0]);
            }}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              activeCategory === key
                ? `border-${category.color}-500 bg-${category.color}-50 shadow-lg transform scale-105`
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <div className={`p-2 rounded-lg ${activeCategory === key ? `bg-${category.color}-100` : 'bg-gray-100'}`}>
                {category.icon}
              </div>
            </div>
            <h3 className="font-semibold text-sm mb-1 text-center">{category.name}</h3>
            <p className="text-xs text-gray-600 text-center">
              {Object.keys(category.formulas).length} formulas
            </p>
          </button>
        ))}
      </div>

      {/* Formula Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {categories[activeCategory].name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(categories[activeCategory].formulas).map(([key, formula]) => (
            <button
              key={key}
              onClick={() => setActiveFormula(key)}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                activeFormula === key
                  ? `border-${categories[activeCategory].color}-500 bg-${categories[activeCategory].color}-50`
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <h3 className="font-semibold text-base mb-2">{formula.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{formula.concept}</p>
              <div className="text-xs text-gray-500 italic mb-2">{formula.formula}</div>
              <div className="text-xs text-blue-600 font-medium">{formula.keyInsight}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Formula Details */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-8 border">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {currentFormula.name}
          </h2>
          <div className="bg-white px-6 py-3 rounded-lg border inline-block mb-3">
            <code className="text-lg font-mono text-gray-800">
              {currentFormula.formula}
            </code>
          </div>
          <p className="text-gray-700 text-lg mb-4">{currentFormula.concept}</p>
          
          {/* Numerator/Denominator Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-semibold text-blue-800">Numerator/Component</h4>
              </div>
              <p className="text-blue-700 text-sm">{currentFormula.numerator}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <Eye className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="font-semibold text-green-800">Denominator/Context</h4>
              </div>
              <p className="text-green-700 text-sm">{currentFormula.denominator}</p>
            </div>
          </div>
          
          {/* Key Insight */}
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 max-w-4xl mx-auto mt-4">
            <div className="flex items-center mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
              <h4 className="font-semibold text-amber-800">Key Insight</h4>
            </div>
            <p className="text-amber-700 text-sm">{currentFormula.keyInsight}</p>
          </div>
        </div>
      </div>

      {/* Input Controls */}
      <div className="bg-white rounded-xl border p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Calculator className="w-5 h-5 mr-2" />
          Input Parameters
        </h3>
        {renderInputs()}
      </div>

      {/* Results and Visualization */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Calculation Results & Analysis
        </h3>
        
        {/* Detailed Calculation */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-semibold text-gray-800 mb-2">Step-by-Step Calculation:</h4>
          <code className="text-sm text-gray-700 bg-white p-2 rounded border block">
            {results.calculation}
          </code>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`text-center p-6 bg-${categories[activeCategory].color}-50 rounded-xl border border-${categories[activeCategory].color}-200`}>
            <div className={`text-3xl font-bold text-${categories[activeCategory].color}-600 mb-1`}>
              {results.result}
            </div>
            <div className={`text-sm text-${categories[activeCategory].color}-500`}>Final Result</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200 md:col-span-2">
            <div className="text-lg font-semibold text-gray-600 mb-1">Interpretation</div>
            <div className="text-sm text-gray-700">{results.interpretation}</div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-gray-50 rounded-lg p-4 border">
          <h4 className="font-semibold text-gray-800 mb-4">Sensitivity Analysis</h4>
          <div className="h-96">
            {renderChart()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Interactive CFA Level II Formula Learning Tool • Adjust parameters to explore sensitivity • Educational purposes only</p>
      </div>
    </div>
  );
};

export default CFALevel2Visualizer;
      
      case 'economics':
        switch(activeFormula) {
          case 'ppp':
            const expectedRate = inputs.spotRate * (1 + inputs.inflationForeign/100) / (1 + inputs.inflationDomestic/100);
            return {
              calculation: `S₁ = ${inputs.spotRate} × (1+${inputs.inflationForeign/100})/(1+${inputs.inflationDomestic/100})`,
              result: expectedRate.toFixed(4),
              interpretation: `PPP predicts exchange rate of ${expectedRate.toFixed(4)} based on ${inputs.inflationForeign}% foreign vs ${inputs.inflationDomestic}% domestic inflation.`
            };
          case 'coveredInterestParity':
            const theoreticalForward = inputs.spotRate * (1 + inputs.foreignRate/100 * inputs.timeHorizon) / (1 + inputs.domesticRate/100 * inputs.timeHorizon);
            return {
              calculation: `F = ${inputs.spotRate} × (1+${inputs.foreignRate/100})/(1+${inputs.domesticRate/100})`,
              result: theoreticalForward.toFixed(4),
              interpretation: `CIP implies forward rate of ${theoreticalForward.toFixed(4)} vs actual ${inputs.forwardRate}. ${Math.abs(theoreticalForward - inputs.forwardRate) < 0.001 ? 'No arbitrage opportunity.' : 'Potential arbitrage exists.'}`
            };
          case 'uncoveredInterestParity':
            const expectedSpot = inputs.spotRate * (1 + inputs.foreignRate/100) / (1 + inputs.domesticRate/100);
            return {
              calculation: `E(S₁) = ${inputs.spotRate} × (1+${inputs.foreignRate/100})/(1+${inputs.domesticRate/100})`,
              result: expectedSpot.toFixed(4),
              interpretation: `UIP suggests expected future spot rate of ${expectedSpot.toFixed(4)}, implying ${((expectedSpot/inputs.spotRate - 1) * 100).toFixed(2)}% expected appreciation.`
            };
          case 'forwardRateValuation':
            const timeRemaining = inputs.timeHorizon * 0.75;
            const contractValue = (inputs.forwardRate - 1.2030) * 100000 / Math.pow(1 + inputs.domesticRate/100, timeRemaining);
            return {
              calculation: `V = (${inputs.forwardRate} - 1.2030) × 100,000 / (1.03)^${timeRemaining}`,
              result: contractValue.toFixed(0),
              interpretation: `Forward contract has value of $${contractValue.toFixed(0)} ${contractValue > 0 ? 'profit' : 'loss'} due to rate changes.`
            };
        }
        break;
      
      case 'financial':
        switch(activeFormula) {
          case 'roeDuPont':
            const netProfitMargin = inputs.netIncome / inputs.revenue;
            const assetTurnover = inputs.revenue / inputs.totalAssets;
            const financialLeverage = inputs.totalAssets / inputs.shareholderEquity;
            const roeDuPont = netProfitMargin * assetTurnover * financialLeverage;
            return {
              calculation: `ROE = (${inputs.netIncome}/${inputs.revenue}) × (${inputs.revenue}/${inputs.totalAssets}) × (${inputs.totalAssets}/${inputs.shareholderEquity})`,
              result: `${(roeDuPont * 100).toFixed(2)}%`,
              interpretation: `ROE of ${(roeDuPont * 100).toFixed(2)}% = ${(netProfitMargin * 100).toFixed(1)}% margin × ${assetTurnover.toFixed(2)} turnover × ${financialLeverage.toFixed(2)} leverage.`
            };
          case 'sustainableGrowthRate':
            const roe = inputs.netIncome / inputs.shareholderEquity;
            const retentionRatio = 1 - (inputs.dividendsPaid / inputs.netIncome);
            const sgr = roe * retentionRatio;
            return {
              calculation: `g = ${(roe * 100).toFixed(2)}% × ${(retentionRatio * 100).toFixed(1)}%`,
              result: `${(sgr * 100).toFixed(2)}%`,
              interpretation: `Sustainable growth rate of ${(sgr * 100).toFixed(2)}% with ${(roe * 100).toFixed(2)}% ROE and ${(retentionRatio * 100).toFixed(1)}% retention ratio.`
            };
          case 'earningsQuality':
            const qualityRatio = inputs.cfo / inputs.netIncome;
            return {
              calculation: `Quality = $${inputs.cfo.toLocaleString()} / $${inputs.netIncome.toLocaleString()}`,
              result: qualityRatio.toFixed(2),
              interpretation: `Cash flow quality ratio of ${qualityRatio.toFixed(2)} indicates ${qualityRatio > 1.2 ? 'high' : qualityRatio > 0.8 ? 'moderate' : 'low'} earnings quality.`
            };
          case 'workingCapitalTurnover':
            const avgWorkingCapital = 800000; // Assumed
            const wcTurnover = inputs.revenue / avgWorkingCapital;
            return {
              calculation: `WC Turnover = $${inputs.revenue.toLocaleString()} / $${avgWorkingCapital.toLocaleString()}`,
              result: `${wcTurnover.toFixed(1)}x`,
              interpretation: `Working capital turnover of ${wcTurnover.toFixed(1)}x indicates ${wcTurnover > 5 ? 'efficient' : wcTurnover > 3 ? 'moderate' : 'poor'} working capital management.`
            };
        }
        break;
