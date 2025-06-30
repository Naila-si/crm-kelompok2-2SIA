import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Dashboard from './pages/Admin/Dashboard';
import MainLayout from './components/MainLayout';
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
import TentangKami from './pages/User/TentangKami'; // Tambahan
import AdminTentangKami from './pages/Admin/AdminTentangKami'; // Tambahan
import AdminNilaiKami from './pages/Admin/AdminNilaiKami';
import CustomerChat from './pages/User/CustomerChat';
import AdminMenuUnggulan from './pages/Admin/AdminMenuunggulan';

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
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signin" element={<Login />} />
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
        </Route>
      )}

      {/* User */}
      {user && user.role === "user" && (
        <>
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/informasi-menu" element={<InformasiMenu />} />
          <Route path="/order-management" element={<OrderManagement />} />
          <Route path="/tracking" element={<TrackingDelivery />} />
          <Route path="/tentang-kami" element={<TentangKami />} />
          <Route path="/support" element={<CustomerChat />} />
        </>
      )}
    </Routes>
  );
}

export default App;
