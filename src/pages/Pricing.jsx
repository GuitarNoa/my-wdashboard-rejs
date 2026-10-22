import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

const plans = [
  { name: "Basic", price: 19, description: "A focused space for individual work.", features: ["1 project", "5 GB storage", "Basic support"] },
  { name: "Pro", price: 49, description: "Room to grow with your team.", features: ["10 projects", "50 GB storage", "Priority support"], popular: true },
  { name: "Enterprise", price: 99, description: "More capacity for larger organizations.", features: ["Unlimited projects", "200 GB storage", "24/7 support"] },
];

export default function Pricing() {
  const [selected, setSelected] = useState(null);
  return (
    <main className="mx-auto max-w-6xl space-y-8 p-4 text-slate-900 sm:p-6 lg:p-8 dark:text-slate-100">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">Workspace plans</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Find your fit.</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">Compare sample plans for your next project. This is a pricing preview; subscriptions and payments are not connected.</p>
      </header>
      <div className="grid items-stretch gap-5 lg:grid-cols-3">
        {plans.map(plan => (
          <section key={plan.name} className={`relative flex flex-col rounded-2xl border p-6 shadow-sm sm:p-7 ${plan.popular ? "border-teal-600 bg-teal-50/70 dark:border-teal-500 dark:bg-teal-950/40" : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"}`} aria-labelledby={`plan-${plan.name}`}>
            <div className="flex min-h-7 flex-wrap items-center justify-between gap-2">
              <h2 id={`plan-${plan.name}`} className="text-lg font-semibold">{plan.name}</h2>
              {plan.popular && <span className="rounded-full bg-teal-700 px-3 py-1 text-xs font-semibold text-white">Featured</span>}
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{plan.description}</p>
            <p className="my-7"><span className="text-4xl font-bold tracking-tight">${plan.price}</span><span className="ml-1 text-sm text-slate-500 dark:text-slate-400">/ month</span></p>
            <ul className="mb-8 flex-1 space-y-4 text-sm">
              {plan.features.map(feature => <li key={feature} className="flex items-center gap-3"><CheckIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-teal-700 dark:text-teal-300" />{feature}</li>)}
            </ul>
            <button type="button" aria-pressed={selected === plan.name} onClick={() => setSelected(plan.name)} className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${plan.popular ? "bg-teal-700 text-white hover:bg-teal-800" : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"}`}>{selected === plan.name ? "Selected for preview" : `Preview ${plan.name}`}</button>
          </section>
        ))}
      </div>
      <div role="status" className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
        {selected ? `${selected} selected for comparison. No subscription was created and no payment was taken.` : "All prices and features shown here are demonstration content. Select a plan to preview your choice."}
      </div>
    </main>
  );
}
