import "./index.css";
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
//Dashborad
const Dashborad = lazy(() => import("./pages/Dashborad"));
const ECommerce = lazy(() => import("./pages/ECommerce"));
const CRM = lazy(() => import("./pages/CRM"));
//UI
const ButtonsUI = lazy(() => import("./pages/UI/ButtonsUI"));
const BadgesUI = lazy(() => import("./pages/UI/BadgesUI"));
const CardsUI = lazy(() => import("./pages/UI/CardsUI"));
const TabsUI = lazy(() => import("./pages/UI/TabsUI"));
//Forms
const FormElements = lazy(() => import("./pages/forms/FormElements"));
const FormValidation = lazy(() => import("./pages/forms/FormValidation"));
const FormWizard = lazy(() => import("./pages/forms/FormWizard"));
//Table
const BasicTables = lazy(() => import("./pages/tables/BasicTables"));
const DataTables = lazy(() => import("./pages/tables/DataTables"));
//Chart
const AreaCharts = lazy(() => import("./pages/charts/Areas"));
const BarCharts = lazy(() => import("./pages/charts/Bars"));
const BubbleCharts = lazy(() => import("./pages/charts/Bubbles"));
const DonutCharts = lazy(() => import("./pages/charts/Donuts"));
const LineCharts = lazy(() => import("./pages/charts/Lines"));
const PieCharts = lazy(() => import("./pages/charts/Pies"));
const PolarAreaChart = lazy(() => import("./pages/charts/PolarAreas"));
const RadarCharts = lazy(() => import("./pages/charts/Radars"));
const ScatterCharts = lazy(() => import("./pages/charts/Scatters"));
//Page
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const Setting = lazy(() => import("./pages/Setting"));
const Error = lazy(() => import("./pages/Error"));
const Pricing = lazy(() => import("./pages/Pricing"));
const FAQ = lazy(() => import("./pages/FAQ"));

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense fallback={<div role="status" className="p-10 text-center text-slate-500">Loading page…</div>}>
    <Routes>
      {/* Layout route: ทุก route ลูกจะ render ผ่าน <Outlet /> ใน DefaultLayout */}
      <Route element={<DefaultLayout />}>
        {/* Page */}
        <Route index element={<Dashborad />} />
        <Route path="/ECommerce" element={<ECommerce />} />
        <Route path="/CRM" element={<CRM />} />
        {/* UI */}
        <Route path="/ui/buttonsUI" element={<ButtonsUI />} />
        <Route path="/ui/badgesUI" element={<BadgesUI />} />
        <Route path="/ui/cardsUI" element={<CardsUI />} />
        <Route path="/ui/tabsUI" element={<TabsUI />} />
        {/* Forms */}
        <Route path="/forms/formelements" element={<FormElements />} />
        <Route path="/forms/formvalidation" element={<FormValidation />} />
        <Route path="/forms/formwizard" element={<FormWizard />} />
        {/* Tables */}
        <Route path="/tables/basictable" element={<BasicTables />} />
        <Route path="/tables/datatable" element={<DataTables />} />
        {/* Charts */}
        <Route path="/charts/areas" element={<AreaCharts />} />
        <Route path="/charts/bars" element={<BarCharts />} />
        <Route path="/charts/bubbles" element={<BubbleCharts />} />
        <Route path="/charts/donuts" element={<DonutCharts />} />
        <Route path="/charts/lines" element={<LineCharts />} />
        <Route path="/charts/pies" element={<PieCharts />} />
        <Route path="/charts/polararea" element={<PolarAreaChart />} />
        <Route path="/charts/radars" element={<RadarCharts />} />
        <Route path="/charts/scatter" element={<ScatterCharts />} />
        {/* Othen */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
      </Route>

      {/* Auth: ไม่ควรมี Sidebar/Header ของ DefaultLayout ครอบ */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      {/* Error: แสดงแบบ standalone ไม่ต้องมี layout */}
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Error />} />
    </Routes>
    </Suspense>
  );
}
