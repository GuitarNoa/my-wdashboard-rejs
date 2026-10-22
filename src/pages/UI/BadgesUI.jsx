import Badges from "../../components/Badges";

const sections = [
  ["basic", "Basic badges", "A compact label for a category or status."],
  ["pill", "Pill badges", "A softer shape for tags and counts."],
  ["icons", "Status with icons", "Pair color with an icon and text so the meaning stays clear."],
  ["outline", "Outline badges", "A quieter treatment for secondary information."],
];

export default function BadgesUI() {
  return (
    <main className="mx-auto max-w-5xl space-y-7 p-4 text-slate-900 sm:p-6 lg:p-8 dark:text-slate-100">
      <header><p className="text-xs font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">Component library</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Badges</h1><p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Readable labels that communicate status without relying on color alone.</p></header>
      <div className="grid gap-5 lg:grid-cols-2">
        {sections.map(([variant, title, description]) => <section key={variant} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"><h2 className="font-semibold">{title}</h2><p className="mb-6 mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p><Badges variant={variant} /></section>)}
      </div>
    </main>
  );
}
