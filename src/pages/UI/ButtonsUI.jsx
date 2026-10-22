import { useState } from "react";
import { HeartIcon, PlusIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import Buttons from "../../components/Buttons";

function Section({ title, description, children }) {
  return <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"><h2 className="font-semibold">{title}</h2><p className="mb-5 mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>{children}</section>;
}

export default function ButtonsUI() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [size, setSize] = useState("");
  return (
    <main className="mx-auto max-w-5xl space-y-7 p-4 text-slate-900 sm:p-6 lg:p-8 dark:text-slate-100">
      <header><p className="text-xs font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">Component library</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Buttons</h1><p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Clear actions, consistent states, and useful feedback. Try the interactive examples.</p></header>
      <Section title="Variants" description="Use a clear visual hierarchy to make the next action easy to find."><Buttons /></Section>
      <div className="grid gap-5 lg:grid-cols-2">
        <Section title="Sizes" description="Choose a size that fits the context and remains easy to use.">
          <div className="flex flex-wrap items-center gap-3">{[["Small", "px-3 py-2 text-xs"], ["Medium", "px-4 py-2.5 text-sm"], ["Large", "px-5 py-3 text-base"]].map(([label, style]) => <button key={label} type="button" onClick={() => setSize(label)} className={`rounded-xl bg-teal-700 font-semibold text-white hover:bg-teal-800 ${style}`}>{label}</button>)}</div>
          <p role="status" className="mt-4 text-xs text-slate-500 dark:text-slate-400">{size ? `${size} button clicked.` : "Select any size to try it."}</p>
        </Section>
        <Section title="With icons" description="Combine a familiar icon with a clear text label.">
          <div className="flex flex-wrap gap-3"><button type="button" aria-pressed={liked} onClick={() => setLiked(value => !value)} className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-200"><HeartIcon aria-hidden="true" className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />{liked ? "Liked" : "Like"}</button><button type="button" onClick={() => setCount(value => value + 1)} className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"><PlusIcon aria-hidden="true" className="h-4 w-4" />Add item</button></div>
          <p role="status" className="mt-4 text-xs text-slate-500 dark:text-slate-400">{count} sample {count === 1 ? "item" : "items"} added for this visit.</p>
        </Section>
        <Section title="Disabled" description="Unavailable actions are disabled and explained.">
          <button type="button" disabled className="cursor-not-allowed rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">Action unavailable</button>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">This example cannot be activated.</p>
        </Section>
        <Section title="Loading preview" description="Show progress while a real action is running.">
          <button type="button" disabled className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white"><ArrowPathIcon aria-hidden="true" className="h-4 w-4 animate-spin motion-reduce:animate-none" />Loading…</button>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">Visual example only; no request is being processed.</p>
        </Section>
      </div>
    </main>
  );
}
