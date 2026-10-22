import { ChartPieIcon, SquaresPlusIcon, DocumentTextIcon, TableCellsIcon, ChartBarSquareIcon, LockClosedIcon, UserPlusIcon, UserCircleIcon, Cog6ToothIcon, ExclamationCircleIcon, CurrencyDollarIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
export const MENUS = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: ChartPieIcon,
    children: [
      { to: "/", label: "Overview" },
      { to: "/ECommerce", label: "eCommerce" },
      { to: "/CRM", label: "CRM" },
    ],
  },
  {
    key: "ui",
    label: "UI Elements",
    icon: SquaresPlusIcon,
    children: [
      { to: "/ui/buttonsUI", label: "Buttons" },
      { to: "/ui/badgesUI", label: "Badges" },
      { to: "/ui/cardsUI", label: "Cards" },
      { to: "/ui/tabsUI", label: "Tabs" },
    ],
  },
  {
    key: "forms",
    label: "Forms",
    icon: DocumentTextIcon,
    children: [
      { to: "/forms/formelements", label: "Form Elements" },
      { to: "/forms/formvalidation", label: "Form Validation" },
      { to: "/forms/formwizard", label: "Form Wizard" },
    ],
  },
  {
    key: "tables",
    label: "Tables",
    icon: TableCellsIcon,
    children: [
      { to: "/tables/basictable", label: "Basic Tables" },
      { to: "/tables/datatable", label: "DataTables" },
    ],
  },
  {
    key: "charts",
    label: "Charts",
    icon: ChartBarSquareIcon,
    children: [
      { to: "/charts/areas", label: "Area" },
      { to: "/charts/bars", label: "Bar" },
      { to: "/charts/bubbles", label: "Bubble" },
      { to: "/charts/donuts", label: "Donut" },
      { to: "/charts/lines", label: "Line" },
      { to: "/charts/pies", label: "Pie" },
      { to: "/charts/polararea", label: "PolarArea" },
      { to: "/charts/radars", label: "Radar" },
      { to: "/charts/scatter", label: "Scatter" },
    ],
  },
];

export const SINGLE_LINKS = [
  { to: "/auth/login", label: "Login", icon: LockClosedIcon },
  { to: "/auth/register", label: "Register", icon: UserPlusIcon },
  { to: "/profile", label: "Profile", icon: UserCircleIcon },
  { to: "/setting", label: "Settings", icon: Cog6ToothIcon },
  { to: "/error", label: "Error", icon: ExclamationCircleIcon },
  { to: "/pricing", label: "Pricing", icon: CurrencyDollarIcon },
  { to: "/faq", label: "FAQ", icon: QuestionMarkCircleIcon },
];


export const PAGES = [...MENUS.flatMap(menu => menu.children), ...SINGLE_LINKS];
