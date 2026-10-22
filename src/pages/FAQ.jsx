import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const faqs = [
  { question: "Is this dashboard connected to a live business?", answer: "The dashboard currently displays sample data. Charts, plan prices, and activity examples are for demonstrating the interface." },
  { question: "Where are my profile changes saved?", answer: "Profile changes are saved in this browser on this device. They do not update an online account or sync between devices. Clearing browser storage removes your saved profile." },
  { question: "Can I purchase or upgrade a plan?", answer: "The pricing page lets you compare sample plans. Checkout and subscription management are not connected, so selecting a plan does not create a subscription or charge you." },
  { question: "How do I change the appearance?", answer: "Use the theme control in the header to switch between light and dark mode. You can open the navigation menu on smaller screens using the menu button." },
  { question: "Can I sign in or reset my password?", answer: "The authentication screens are interface examples. A real account service is not connected yet, so they cannot sign you in, create an account, or send a password reset email." },
];

export default function FAQ() {
  return (
    <main className="mx-auto max-w-4xl space-y-7 p-4 text-slate-900 sm:p-6 lg:p-8 dark:text-slate-100">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">Help center</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">A little guidance.</h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Get to know your workspace and what is available in this demo.</p>
      </header>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <details key={faq.question} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900" open={index === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium hover:bg-slate-50 sm:px-6 dark:hover:bg-slate-800 [&::-webkit-details-marker]:hidden">
              {faq.question}<ChevronDownIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
            </summary>
            <p className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-7 text-slate-600 sm:px-6 dark:border-slate-800 dark:text-slate-300">{faq.answer}</p>
          </details>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-teal-50 p-6 dark:bg-teal-950/40">
        <div><h2 className="font-semibold">Make the workspace yours</h2><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Add your introduction and skills to your profile.</p></div>
        <Link to="/profile" className="rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800">Open profile</Link>
      </div>
    </main>
  );
}
