export default function StatisticsCard({ icon: Icon, title = "Title", value = 0 }) {
  return (
    <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-700 dark:bg-slate-900">
      {Icon && <div className="shrink-0 rounded-xl bg-teal-50 p-3 text-teal-700 dark:bg-teal-950 dark:text-teal-300"><Icon aria-hidden="true" className="h-5 w-5" /></div>}
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <p className="mt-1 break-words text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{typeof value === "number" ? value.toLocaleString() : value}</p>
      </div>
    </div>
  );
}
