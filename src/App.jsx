import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Dashboard from './pages/Admin/Dashboard';
import MainLayout from './components/MainLayout';
import SalesManagement from './pages/Admin/SalesManagement';
import Pesanan from './pages/Admin/Pesanan';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Admin/Menu';
import ActivityManagement from './pages/Admin/ActivityManagement';
import SocialMediaMarketing from './pages/Admin/SocialMediaMarketing';
import Akun from './pages/Akun';
import Kontak from './pages/Admin/Kontak';
import LeadManagement from './pages/Admin/LeadManagement';
import KnowledgeBase from './pages/Admin/KnowledgeBase';
import TriggerMarketing from './pages/Admin/TriggerMarketing';
import LoyaltyManagement from './pages/Admin/LoyaltyManagement';
import Beranda from './pages/User/Beranda';

function App() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Routes>
      {/* Arahkan root ke dashboard atau beranda tergantung role */}
      <Route
        path="/"
        element={
          user ? (
            user.role === "admin" ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/beranda" />
            )
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

      {/* Auth Pages */}
      <Route path="/signin" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      {user && user.role === "admin" && (
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard orders={orders} />} />
          <Route path="/penjualan" element={<SalesManagement />} />
          <Route path="/pesanan" element={<Pesanan orders={orders} setOrders={setOrders} />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/activity" element={<ActivityManagement />} />
          <Route path="/activity-management" element={<ActivityManagement />} />
          <Route path="/social-media" element={<SocialMediaMarketing />} />
          <Route path="/akun" element={<Akun />} />
          <Route path="/follow-up" element={<LeadManagement />} />
          <Route path="/faq" element={<KnowledgeBase />} />
          <Route path="/promo" element={<TriggerMarketing />} />
          <Route path="/loyalty" element={<LoyaltyManagement />} />
        </Route>
      )}

      {/* User Routes */}
      {user && user.role === "user" && (
        <Route path="/beranda" element={<Beranda />} />
      )}
    </Routes>
  );
}

export default App;