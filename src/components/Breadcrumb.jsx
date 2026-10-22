import { HomeIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const labels = {
  ecommerce: "E-commerce", crm: "CRM", ui: "Components", buttonsui: "Buttons", badgesui: "Badges", cardsui: "Cards", tabsui: "Tabs",
  forms: "Forms", formelements: "Form elements", formvalidation: "Validation", formwizard: "Form wizard",
  tables: "Tables", basictable: "Basic table", datatable: "Data table", charts: "Charts", areas: "Area", bars: "Bar", bubbles: "Bubble",
  donuts: "Doughnut", lines: "Line", pies: "Pie", polararea: "Polar area", radars: "Radar", scatter: "Scatter",
  profile: "Profile", setting: "Settings", pricing: "Pricing", faq: "Help center",
};

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-slate-500 dark:text-slate-400">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link to="/" aria-label="Dashboard home" aria-current={segments.length ? undefined : "page"} className="flex items-center gap-2 hover:text-teal-700 dark:hover:text-teal-300"><HomeIcon aria-hidden="true" className="h-4 w-4" /><span>Dashboard</span></Link></li>
        {segments.map((segment, index) => <li key={index} className="flex items-center gap-2"><ChevronRightIcon aria-hidden="true" className="h-3 w-3" /><span aria-current={index === segments.length - 1 ? "page" : undefined} className={index === segments.length - 1 ? "font-medium text-slate-700 dark:text-slate-200" : ""}>{labels[segment.toLowerCase()] || segment}</span></li>)}
      </ol>
    </nav>
  );
}
