import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";

export default function InvoicePricing() {
  const plans = [
    {
      id: 1,
      name: "Basic",
      price: "$19/mo",
      features: ["1 Project", "5 GB Storage", "Basic Support"],
      popular: false,
    },
    {
      id: 2,
      name: "Pro",
      price: "$49/mo",
      features: ["10 Projects", "50 GB Storage", "Priority Support"],
      popular: true,
    },
    {
      id: 3,
      name: "Enterprise",
      price: "$99/mo",
      features: ["Unlimited Projects", "200 GB Storage", "24/7 Support"],
      popular: false,
    },
  ];

  return (
    <DefaultLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Pricing Plans</h1>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg p-6 shadow-md flex flex-col justify-between ${
                plan.popular
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full mb-2 self-start">
                  Most Popular
                </span>
              )}
              <h2 className="text-xl font-semibold mb-4">{plan.name}</h2>
              <p className="text-3xl font-bold mb-4">{plan.price}</p>
              <ul className="mb-6 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 rounded font-semibold transition-colors ${
                  plan.popular
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
