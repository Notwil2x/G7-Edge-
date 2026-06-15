/**
 * Stripe Subscription Plans Configuration
 * Defines feature access and limits for each subscription tier
 */

export const PLANS = {
  FREE: {
    name: 'Free Plan',
    price: 0,
    interval: 'month',
    stripePriceId: process.env.STRIPE_FREE_PRICE_ID,
    features: {
      tradeLimit: 10,
      aiAnalysis: false,
      patternDiscovery: false,
      propFirmTracker: false,
      coachChat: false,
    },
    description: '10 trades/mo, basic analysis'
  },
  PRO: {
    name: 'Pro Plan',
    price: 2900, // $29.00 in cents
    interval: 'month',
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
    features: {
      tradeLimit: Infinity,
      aiAnalysis: true,
      patternDiscovery: true,
      propFirmTracker: false,
      coachChat: true,
      coachMessagesPerDay: 20,
    },
    description: 'Unlimited trades, full AI, patterns'
  },
  ELITE: {
    name: 'Elite Plan',
    price: 7900, // $79.00 in cents
    interval: 'month',
    stripePriceId: process.env.STRIPE_ELITE_PRICE_ID,
    features: {
      tradeLimit: Infinity,
      aiAnalysis: true,
      patternDiscovery: true,
      propFirmTracker: true,
      coachChat: true,
      coachMessagesPerDay: Infinity,
      priorityProcessing: true,
    },
    description: 'All Pro + prop firm tracker, priority AI'
  }
};

/**
 * Get plan by key
 */
export function getPlan(planKey: keyof typeof PLANS) {
  return PLANS[planKey];
}

/**
 * Check if user has feature access
 */
export function hasFeature(
  planKey: keyof typeof PLANS,
  feature: keyof typeof PLANS['FREE']['features']
): boolean {
  const plan = PLANS[planKey];
  const featureValue = plan.features[feature as keyof typeof plan.features];
  
  if (typeof featureValue === 'boolean') {
    return featureValue;
  }
  
  // For numeric features like limits and message counts
  return featureValue > 0;
}

/**
 * Get feature limit for plan
 */
export function getFeatureLimit(
  planKey: keyof typeof PLANS,
  feature: 'tradeLimit' | 'coachMessagesPerDay'
): number {
  const plan = PLANS[planKey];
  return plan.features[feature] as number;
}

/**
 * Check if plan has unlimited feature
 */
export function isFeatureUnlimited(
  planKey: keyof typeof PLANS,
  feature: 'tradeLimit' | 'coachMessagesPerDay'
): boolean {
  const limit = getFeatureLimit(planKey, feature);
  return limit === Infinity;
}

/**
 * Get all public plan info for display
 */
export function getPublicPlans() {
  return Object.entries(PLANS).map(([key, plan]) => ({
    key,
    name: plan.name,
    price: plan.price,
    interval: plan.interval,
    description: plan.description,
    features: plan.features,
  }));
}
