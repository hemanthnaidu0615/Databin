import { Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layout/AuthLayout";
import { Login } from "./pages/Login";
import { AppLayout } from "./layout/AppLayout";
import { SalesDashboard } from "./pages/Sales/SalesDashboard";
import { Analysis } from "./pages/Sales/Analysis";
import { UserManagement } from "./pages/UserManagement";
import { Settings } from "./pages/Settings";
import "./App.css";
import { SalesByRegion } from "./pages/Sales/SalesByRegion";
import SalesFlow from "./pages/Sales/SalesFlow";
import { Dashboard } from "./pages/Dashboard";
import { Returns } from "./pages/Returns";
import Timeseries from "./pages/Timeseries/Timeseries";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice";
import { ForgotPassword } from "./pages/ForgotPassword";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData: any = localStorage.getItem("userData");
    dispatch(setUser(JSON.parse(userData)));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}></Route>
      <Route index element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      
      <Route path="/" element={<AppLayout />}>
        <Route path="/home-dashboard" element={<Dashboard />} />
        <Route path="/sales/dashboard" element={<SalesDashboard />} />
        <Route path="/sales/sales-by-region" element={<SalesByRegion />} />
        <Route path="/sales/analysis" element={<Analysis />} />
        <Route path="/sales/flow" element={<SalesFlow />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/timeseries" element={<Timeseries />} />
        <Route path="user-management" element={<UserManagement />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
