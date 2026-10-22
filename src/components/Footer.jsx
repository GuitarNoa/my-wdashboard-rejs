import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white px-5 py-5 text-xs text-slate-500 sm:px-8 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <p>&copy; {new Date().getFullYear()} Metree workspace</p>
        <div className="flex items-center gap-4"><span>Demo workspace</span><Link to="/faq" className="font-medium text-teal-700 hover:underline dark:text-teal-300">Help center</Link></div>
      </div>
    </footer>
  );
}
