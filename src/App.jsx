import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, Profiler } from 'react';

import Dashboard from './pages/Admin/Dashboard';
import MainLayout from './components/Admin/MainLayout';
import SalesManagement from './pages/Admin/SalesManagement';
import Pesanan from './pages/Admin/Pesanan';
import Menu from './pages/Admin/Menu';
import ActivityManagement from './pages/Admin/ActivityManagement';
import Akun from './pages/Akun';
import Kontak from './pages/Admin/Kontak';
import Lacak from './pages/Admin/Lacak';
import LeadManagement from './pages/Admin/LeadManagement';
import KnowledgeBase from './pages/Admin/KnowledgeBase';
import TriggerMarketing from './pages/Admin/TriggerMarketing';
import LoyaltyManagement from './pages/Admin/LoyaltyManagement';

import Login from './pages/Login';
import Register from './pages/Register';

import Beranda from './pages/User/Beranda';
import InformasiMenu from './pages/User/InformasiMenu';
import OrderManagement from './pages/User/OrderManagement';
import TrackingDelivery from './pages/User/TrackingDelivery';
import TentangKami from './pages/User/TentangKami';
import AdminTentangKami from './pages/Admin/AdminTentangKami';
import AdminNilaiKami from './pages/Admin/AdminNilaiKami';
import CustomerChat from './pages/User/CustomerChat';
import AdminMenuUnggulan from './pages/Admin/AdminMenuunggulan';
import Promo from './pages/User/Promo';
import AdminTestimoni from './pages/Admin/AdminTestimoni';
import Profil from "./components/User/Profil";
import RewardsPage from './pages/User/rewards';
import FaqUser from './pages/User/FaqUser';
import OrderHistory from './pages/User/OrderHistory';
import LoyaltyPrediction from './pages/Admin/LoyaltyPrediction';
import UserLayout from './components/User/UserLayout';

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
    <Routes key={user?.email || "guest"}>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signin" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register />} />

      {/* Admin */}
      {user && user.role === "admin" && (
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard orders={orders} />} />
          <Route path="/penjualan" element={<SalesManagement />} />
          <Route path="/pesanan" element={<Pesanan orders={orders} setOrders={setOrders} />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/activity" element={<ActivityManagement />} />
          <Route path="/akun" element={<Akun />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/lacak" element={<Lacak />} />
          <Route path="/follow-up" element={<LeadManagement />} />
          <Route path="/faq" element={<KnowledgeBase />} />
          <Route path="/promo" element={<TriggerMarketing />} />
          <Route path="/loyalty" element={<LoyaltyManagement />} />
          <Route path="/tentang" element={<AdminTentangKami />} />
          <Route path="/visimisi" element={<AdminNilaiKami />} />
          <Route path="/menu-unggul" element={<AdminMenuUnggulan />} />
          <Route path="/testimoni" element={<AdminTestimoni />} />
          <Route path="/loyalty-prediksi" element={<LoyaltyPrediction />} />
        </Route>
      )}

      {/* User */}
      {user && user.role === "user" && (
        <Route element={<UserLayout />}>
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/menu" element={<InformasiMenu />} />
          <Route path="/checkout" element={<OrderManagement />} />
          <Route path="/tracking" element={<TrackingDelivery />} />
          <Route path="/tentang-kami" element={<TentangKami />} />
          <Route path="/support" element={<CustomerChat />} />
          <Route path="/promo" element={<Promo />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/faq" element={<FaqUser />} />
          <Route path="/riwayat" element={<OrderHistory />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
