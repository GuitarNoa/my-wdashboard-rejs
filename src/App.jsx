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
//Page
import Profile from "./pages/Profile";
import Table from "./pages/Table";

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
        <Route
          index
          element={
            <>
              <Dashborad />
            </>
          }
        />
        <Route path="/ECommerce" element={<ECommerce />} />
        <Route path="/CRM" element={<CRM />} />
        {/* UI */}
        <Route path="/ui/buttonsUI" element={<ButtonsUI />} />
        <Route path="/ui/badgesUI" element={<BadgesUI />} />
        <Route path="/ui/cardsUI" element={<CardsUI />} />
        <Route path="/ui/tabsUI" element={<TabsUI />} />
        {/* Pages */}
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Table" element={<Table />} />
      </Routes>
    </>
  );
}
