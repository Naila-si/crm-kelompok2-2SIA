import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/MainLayout';
import SalesManagement from './pages/SalesManagement';
import Pesanan from './pages/Pesanan';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';
import ActivityManagement from './pages/ActivityManagement';
import SocialMediaMarketing from './pages/SocialMediaMarketing';
import Akun from './pages/Akun';

import { useState } from 'react'; 
import Kontak from './pages/Kontak';
import { Menu as MenuIcon } from 'lucide-react';
import LeadManagement from './pages/LeadManagement';

function App() {
  const [orders, setOrders] = useState([]); 

  return (
    <Routes>
      {/* Routes tanpa layout */}
      <Route path="/signin" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Routes dengan layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard orders={orders} />} /> 
        <Route path="/penjualan" element={<SalesManagement />} />
        <Route path="/pesanan" element={<Pesanan orders={orders} setOrders={setOrders} />} /> 
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/activity" element={<ActivityManagement />} />
        <Route path="/activity-management" element={<ActivityManagement />} />
        <Route path="/social-media" element={<SocialMediaMarketing />} />
        <Route path="/akun" element={<Akun />} />
        <Route path="/follow-up" element={<LeadManagement />} />
      </Route>
    </Routes>
  );
}

export default App;
