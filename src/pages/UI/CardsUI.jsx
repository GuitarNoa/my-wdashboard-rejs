import { ArrowUpRightIcon, CodeBracketIcon, SwatchIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const cards = [
  { title: "Make every action clear", category: "Interaction", description: "Explore buttons with clear hierarchy, accessible labels, and visible feedback.", to: "/ui/buttonsUI", link: "Explore buttons", Icon: CodeBracketIcon, style: "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300" },
  { title: "Small details, useful context", category: "Communication", description: "Add readable status indicators to help people understand what is happening.", to: "/ui/badgesUI", link: "Explore badges", Icon: SwatchIcon, style: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" },
  { title: "Keep related work together", category: "Organization", description: "Group content into focused views that work with a mouse or a keyboard.", to: "/ui/tabsUI", link: "Explore tabs", Icon: Squares2X2Icon, style: "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300" },
];

export default function CardsUI() {
  return (
    <main className="mx-auto max-w-6xl space-y-7 p-4 text-slate-900 sm:p-6 lg:p-8 dark:text-slate-100">
      <header><p className="text-xs font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">Component library</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Cards</h1><p className="mt-3 text-sm text-slate-500 dark:text-slate-400">A consistent home for content, context, and a clear next step.</p></header>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map(card => <article key={card.title} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className={`relative grid h-44 place-items-center overflow-hidden ${card.style}`} aria-hidden="true">
            <div className="absolute -right-8 -top-14 h-52 w-52 rounded-full border-[28px] border-current opacity-10" /><div className="absolute -bottom-12 left-7 h-36 w-36 rounded-full border border-current opacity-20" /><card.Icon className="relative h-14 w-14" strokeWidth={1} />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-300">{card.category}</p>
            <h2 className="mt-3 text-xl font-semibold leading-7 tracking-tight">{card.title}</h2>
            <p className="mb-6 mt-3 flex-1 text-sm leading-7 text-slate-500 dark:text-slate-400">{card.description}</p>
            <Link to={card.to} className="inline-flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm font-semibold text-teal-700 hover:text-teal-900 dark:border-slate-800 dark:text-teal-300 dark:hover:text-teal-200">{card.link}<ArrowUpRightIcon aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
        </article>)}
      </div>
    </main>
  );
}
