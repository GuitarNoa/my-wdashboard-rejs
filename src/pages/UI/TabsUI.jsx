import { useRef, useState } from "react";
import { ChartBarIcon, UserGroupIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const tabs = [
  { id: "users", label: "Users", Icon: UserGroupIcon, title: "Your people, at a glance.", metric: "1,234", caption: "Sample active users", description: "A compact overview keeps the most useful information close at hand." },
  { id: "sales", label: "Sales", Icon: ChartBarIcon, title: "Every sale adds up.", metric: "$12,345", caption: "Sample daily revenue", description: "Switch between related views without leaving your current page." },
  { id: "reports", label: "Reports", Icon: DocumentTextIcon, title: "See the bigger picture.", metric: "7", caption: "Sample weekly reports", description: "Use the arrow keys, Home, or End to navigate these tabs with a keyboard." },
];

export default function TabsUI() {
  const [activeTab, setActiveTab] = useState("users");
  const tabRefs = useRef([]);
  function handleKey(event, index) {
    const last = tabs.length - 1;
    let next;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    setActiveTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  }
  return (
    <main className="mx-auto max-w-5xl space-y-7 p-4 text-slate-900 sm:p-6 lg:p-8 dark:text-slate-100">
      <header><p className="text-xs font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">Component library</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Tabs</h1><p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Organize related content in a focused, keyboard-friendly view.</p></header>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div role="tablist" aria-label="Workspace preview" className="flex border-b border-slate-200 px-2 pt-2 dark:border-slate-700">
          {tabs.map((tab, index) => <button key={tab.id} ref={node => { tabRefs.current[index] = node; }} type="button" role="tab" id={`tab-${tab.id}`} aria-selected={activeTab === tab.id} aria-controls={`panel-${tab.id}`} tabIndex={activeTab === tab.id ? 0 : -1} onKeyDown={event => handleKey(event, index)} onClick={() => setActiveTab(tab.id)} className={`flex flex-1 items-center justify-center gap-2 rounded-t-lg border-b-2 px-2 py-4 text-sm font-medium transition sm:flex-none sm:px-7 ${activeTab === tab.id ? "border-teal-700 bg-teal-50 text-teal-800 dark:border-teal-400 dark:bg-teal-950 dark:text-teal-200" : "border-transparent text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"}`}><tab.Icon aria-hidden="true" className="hidden h-4 w-4 sm:block" />{tab.label}</button>)}
        </div>
        {tabs.map(tab => <div key={tab.id} id={`panel-${tab.id}`} role="tabpanel" aria-labelledby={`tab-${tab.id}`} tabIndex={0} hidden={activeTab !== tab.id} className="p-6 sm:p-8">
          <span className="inline-flex rounded-xl bg-teal-50 p-3 text-teal-700 dark:bg-teal-950 dark:text-teal-300"><tab.Icon aria-hidden="true" className="h-6 w-6" /></span>
          <h2 className="mt-5 text-xl font-semibold">{tab.title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400">{tab.description}</p>
          <div className="mt-7 border-t border-slate-100 pt-6 dark:border-slate-800"><p className="text-4xl font-bold tracking-tight">{tab.metric}</p><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{tab.caption}</p></div>
        </div>)}
      </section>
    </main>
  );
}
