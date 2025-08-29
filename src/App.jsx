import "./index.css";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
//Dashborad
import Dashborad from "./pages/Dashborad";
import ECommerce from "./pages/ECommerce";
import CRM from "./pages/CRM";
//UI
import ButtonsUI from "./pages/UI/ButtonsUI";
import BadgesUI from "./pages/UI/BadgesUI";
import CardsUI from "./pages/UI/CardsUI";
import TabsUI from "./pages/UI/TabsUI";
//Forms
import FormElements from "./pages/forms/FormElements";
import FormValidation from "./pages/forms/FormValidation";
import FormWizard from "./pages/forms/FormWizard";
//Table
import BasicTables from "./pages/tables/BasicTables";
import DataTables from "./pages/tables/DataTables";
//Chart
import AreaCharts from "./pages/charts/Areas";
import BarCharts from "./pages/charts/Bars";
import BubbleCharts from "./pages/charts/Bubbles";
import DonutCharts from "./pages/charts/Donuts";
import LineCharts from "./pages/charts/Lines";
import PieCharts from "./pages/charts/Pies";
import PolarAreaChart from "./pages/charts/PolarAreas";
import RadarCharts from "./pages/charts/Radars";
import ScatterCharts from "./pages/charts/Scatters";
//Page
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Error from "./pages/Error";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";

export default function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      <Routes>
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
        {/* Pages */}
        {/* Auth */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        {/* Othen */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/error" element={<Error />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </>
  );
}
