import { FiCheck, FiX, FiAlertTriangle } from "react-icons/fi";

const variants = [
  ["Default", "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"],
  ["Primary", "bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-200"],
  ["Success", "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200"],
  ["Warning", "bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200"],
  ["Danger", "bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200"],
];

export default function Badges({ variant = "basic" }) {
  if (variant === "icons") return (
    <div className="flex flex-wrap gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200"><FiCheck aria-hidden="true" />Approved</span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-800 dark:bg-rose-900/60 dark:text-rose-200"><FiX aria-hidden="true" />Rejected</span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-900 dark:bg-amber-900/60 dark:text-amber-200"><FiAlertTriangle aria-hidden="true" />Pending</span>
    </div>
  );
  return <div className="flex flex-wrap gap-2">{variants.map(([label, style]) => <span key={label} className={`px-3 py-1.5 text-xs font-semibold ${variant === "pill" ? "rounded-full" : "rounded-md"} ${variant === "outline" ? "border border-current bg-transparent" : ""} ${style}`}>{label}</span>)}</div>;
}
