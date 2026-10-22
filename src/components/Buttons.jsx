import { useState } from "react";

const variants = [
  ["Primary", "bg-teal-700 text-white hover:bg-teal-800"],
  ["Secondary", "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"],
  ["Success", "bg-emerald-700 text-white hover:bg-emerald-800"],
  ["Warning", "bg-amber-200 text-amber-950 hover:bg-amber-300"],
  ["Info", "bg-sky-700 text-white hover:bg-sky-800"],
  ["Danger", "bg-rose-700 text-white hover:bg-rose-800"],
];

export default function Buttons() {
  const [selected, setSelected] = useState("");
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {variants.map(([label, style]) => <button key={label} type="button" onClick={() => setSelected(label)} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${style}`}>{label}</button>)}
      </div>
      <p role="status" className="text-xs text-slate-500 dark:text-slate-400">{selected ? `${selected} button clicked. This is a component preview.` : "Select a button to preview its interaction."}</p>
    </div>
  );
}
