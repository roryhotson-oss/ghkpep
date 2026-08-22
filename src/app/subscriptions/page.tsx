'use client';

import { useState } from 'react';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export default function SubscriptionsPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>('research-pro');

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 19.99,
      features: [
        'Access to all compounds',
        'Standard COAs',
        'Email support',
        '5% discount on orders',
      ],
    },
    {
      id: 'research-pro',
      name: 'Research Pro',
      price: 49.99,
      popular: true,
      features: [
        'Everything in Basic',
        'Priority COA access',
        'Priority support',
        '15% discount on orders',
        'Early access to new compounds',
        'Free shipping on orders over £100',
      ],
    },
    {
      id: 'institutional',
      name: 'Institutional',
      price: 149.99,
      features: [
        'Everything in Research Pro',
        'Multi-user access (up to 10)',
        'Custom COAs',
        'Dedicated account manager',
        '25% discount on orders',
        'Free shipping on all orders',
        'Bulk ordering discounts',
        'API access',
      ],
    },
  ];

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    // In production, this would integrate with a payment processor
    alert(`Subscribing to ${plans.find(p => p.id === planId)?.name} plan. Payment integration coming soon!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Subscription Plans</h1>
        <p className="text-[#888] max-w-2xl mx-auto">
          Choose the plan that fits your research needs. All plans include access to our full catalog and independent testing verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-[#141414] rounded-xl p-8 border-2 transition ${
              plan.popular
                ? 'border-[#00d4aa] relative'
                : 'border-[#222] hover:border-[#00d4aa]/30'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 bg-[#00d4aa] text-black text-xs font-bold rounded-full">
                  MOST POPULAR
                </span>
              </div>
            )}

            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <div className="mb-6">
              <span className="text-4xl font-bold">£{plan.price}</span>
              <span className="text-[#888]">/month</span>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-[#00d4aa] mt-0.5">✓</span>
                  <span className="text-[#ccc]">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.id)}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                plan.popular
                  ? 'bg-[#00d4aa] text-black hover:bg-[#00b894]'
                  : 'border border-[#222] text-[#ccc] hover:border-[#00d4aa] hover:text-[#00d4aa]'
              }`}
            >
              {selectedPlan === plan.id ? 'Current Plan' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>

      {/* Features Comparison */}
      <div className="bg-[#141414] rounded-xl p-8 border border-[#222] mb-8">
        <h2 className="text-2xl font-bold mb-6">Why Subscribe?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-3 text-[#00d4aa]">Save Money</h3>
            <p className="text-[#888] text-sm">
              Get exclusive discounts on all orders, ranging from 5% to 25% depending on your plan.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-[#00d4aa]">Priority Access</h3>
            <p className="text-[#888] text-sm">
              Be the first to access new compounds and get priority COA documentation.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-[#00d4aa]">Free Shipping</h3>
            <p className="text-[#888] text-sm">
              Higher tier plans include free shipping, saving you money on every order.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-[#00d4aa]">Dedicated Support</h3>
            <p className="text-[#888] text-sm">
              Get priority support and dedicated account management for institutional plans.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-[#141414] rounded-xl p-8 border border-[#222]">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="group">
            <summary className="cursor-pointer flex justify-between items-center font-semibold text-sm hover:text-[#00d4aa] transition">
              Can I cancel my subscription anytime?
              <span className="text-[#00d4aa] group-open:rotate-45 transition-transform text-lg">+</span>
            </summary>
            <p className="text-[#888] text-sm mt-3">
              Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.
            </p>
          </details>
          <details className="group">
            <summary className="cursor-pointer flex justify-between items-center font-semibold text-sm hover:text-[#00d4aa] transition">
              Do discounts apply to all products?
              <span className="text-[#00d4aa] group-open:rotate-45 transition-transform text-lg">+</span>
            </summary>
            <p className="text-[#888] text-sm mt-3">
              Yes, subscription discounts apply to all products in our catalog, including boxes of 10 vials.
            </p>
          </details>
          <details className="group">
            <summary className="cursor-pointer flex justify-between items-center font-semibold text-sm hover:text-[#00d4aa] transition">
              Can I upgrade or downgrade my plan?
              <span className="text-[#00d4aa] group-open:rotate-45 transition-transform text-lg">+</span>
            </summary>
            <p className="text-[#888] text-sm mt-3">
              Absolutely. You can change your plan at any time from your dashboard. Changes take effect in your next billing cycle.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
