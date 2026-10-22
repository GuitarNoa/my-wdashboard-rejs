import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <main className="grid min-h-dvh place-items-center bg-slate-50 p-5 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:p-12 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">A small detour</p>
        <p className="my-6 text-8xl font-bold tracking-tighter text-teal-700 dark:text-teal-400" aria-hidden="true">404</p>
        <h1 className="text-2xl font-bold tracking-tight">Page not found</h1>
        <p className="mb-8 mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">This address does not match a page in your workspace. Head back to the dashboard to keep exploring.</p>
        <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800"><ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />Back to dashboard</Link>
      </div>
    </main>
  );
}
