import "./index.css";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Dashborad from "./pages/Dashborad";
import Profile from "./pages/Profile";

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
        <Route path="/Profile" element={<Profile />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </>
  );
}
