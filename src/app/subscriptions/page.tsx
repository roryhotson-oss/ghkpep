'use client';

import { useState } from 'react';

interface Plan {
  id: string;
  name: string;
  price: number;
  billing: string;
  features: string[];
  popular?: boolean;
}

export default function SubscriptionsPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>('research-pro');

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Monthly Research',
      price: 25,
      billing: 'per month',
      features: [
        '5% discount each month',
        'Free shipping',
        'Discount activates after payment clears',
      ],
    },
    {
      id: 'research-pro',
      name: 'Quarterly Research',
      price: 95,
      billing: 'every 3 months',
      popular: true,
      features: [
        '15% discount every 3 months',
        '2 peptides included every 3 months',
        'Free shipping',
        'Discount activates after payment clears',
      ],
    },
    {
      id: 'institutional',
      name: 'Research Plus',
      price: 150,
      billing: 'per month',
      features: [
        '25% discount on every paid order',
        '3 additional peptides every 5 months',
        'Free shipping',
        'Discount activates after payment clears',
      ],
    },
  ];

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    alert(`Direct debit setup for ${plans.find(p => p.id === planId)?.name} will activate discounts after the first payment clears.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Subscription Plans</h1>
        <p className="text-[#a7b0b2] max-w-2xl mx-auto">
          Choose the plan that fits your research needs. All plans include access to our full catalog and independent testing verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-[#141414] rounded-xl p-8 border-2 transition ${
              plan.popular
                ? 'border-[#8298aa] relative'
                : 'border-[#2b3538] hover:border-[#8298aa]/30'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 bg-[#8298aa] text-black text-xs font-bold rounded-full">
                  MOST POPULAR
                </span>
              </div>
            )}

            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <div className="mb-6">
              <span className="text-4xl font-bold">£{plan.price}</span>
              <span className="text-[#a7b0b2]">{plan.billing}</span>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-[#8298aa] mt-0.5">✓</span>
                  <span className="text-[#e1e7e5]">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.id)}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                plan.popular
                  ? 'bg-[#8298aa] text-black hover:bg-[#657c8f]'
                  : 'border border-[#2b3538] text-[#e1e7e5] hover:border-[#8298aa] hover:text-[#8298aa]'
              }`}
            >
              {selectedPlan === plan.id ? 'Current Plan' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>

      {/* Features Comparison */}
      <div className="bg-[#141414] rounded-xl p-8 border border-[#2b3538] mb-8">
        <h2 className="text-2xl font-bold mb-6">Why Subscribe?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-3 text-[#8298aa]">Save Money</h3>
            <p className="text-[#a7b0b2] text-sm">
              Discounts are activated after the direct debit payment has cleared. Every plan includes free shipping.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-[#8298aa]">Priority Access</h3>
            <p className="text-[#a7b0b2] text-sm">
              Be the first to access new compounds and get priority COA documentation.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-[#8298aa]">Free Shipping</h3>
            <p className="text-[#a7b0b2] text-sm">
              Shipping is free on subscription orders, including globally sourced box-of-10 deliveries.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-[#8298aa]">Dedicated Support</h3>
            <p className="text-[#a7b0b2] text-sm">
              Get priority support and dedicated account management for institutional plans.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-[#141414] rounded-xl p-8 border border-[#2b3538]">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="group">
            <summary className="cursor-pointer flex justify-between items-center font-semibold text-sm hover:text-[#8298aa] transition">
              Can I cancel my subscription anytime?
              <span className="text-[#8298aa] group-open:rotate-45 transition-transform text-lg">+</span>
            </summary>
            <p className="text-[#a7b0b2] text-sm mt-3">
              Yes, you can cancel your subscription at any time. Discount access continues until the end of the paid billing period.
            </p>
          </details>
          <details className="group">
            <summary className="cursor-pointer flex justify-between items-center font-semibold text-sm hover:text-[#8298aa] transition">
              Do discounts apply to all products?
              <span className="text-[#8298aa] group-open:rotate-45 transition-transform text-lg">+</span>
            </summary>
            <p className="text-[#a7b0b2] text-sm mt-3">
              Yes, subscription discounts apply to all products in our catalog, including boxes of 10 vials.
            </p>
          </details>
          <details className="group">
            <summary className="cursor-pointer flex justify-between items-center font-semibold text-sm hover:text-[#8298aa] transition">
              Can I upgrade or downgrade my plan?
              <span className="text-[#8298aa] group-open:rotate-45 transition-transform text-lg">+</span>
            </summary>
            <p className="text-[#a7b0b2] text-sm mt-3">
              Absolutely. You can change your plan at any time from your dashboard. Changes take effect in your next billing cycle.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
