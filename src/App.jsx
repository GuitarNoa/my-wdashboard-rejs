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
import Bar from "./pages/charts/Bar";
import Donut from "./pages/charts/Donut";
import Line from "./pages/charts/Line";
import Pie from "./pages/charts/Pie";
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
        <Route path="/charts/line" element={<Line />} />
        <Route path="/charts/bar" element={<Bar />} />
        <Route path="/charts/pie" element={<Pie />} />
        <Route path="/charts/donut" element={<Donut />} />
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
