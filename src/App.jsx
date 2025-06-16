import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/MainLayout';
import SalesManagement from './pages/SalesManagement';
import Customers from './pages/Customers';
import Pesanan from './pages/Pesanan';
import Login from './pages/Login';
import Register from './pages/Register';
import Produk from './pages/Produk';
import Lacak from './pages/Lacak';
import ActivityManagement from './pages/ActivityManagement';
import SocialMediaMarketing from './pages/SocialMediaMarketing';
import Riwayat from './pages/Riwayat';
import Akun from './pages/Akun';

function App() {
  return (
    <Routes>
      {/* Routes tanpa layout */}
      <Route path="/signin" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Routes dengan layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/penjualan" element={<SalesManagement />} />
        <Route path="/pelanggan" element={<Customers />} />
        <Route path="/pesanan" element={<Pesanan />} />
        <Route path="/riwayat" element={<Riwayat />} />
        <Route path="/produk" element={<Produk />} />
        <Route path="/lacak" element={<Lacak />} />
        <Route path="/activity" element={<ActivityManagement />} />
        <Route path="/activity-management" element={<ActivityManagement />} />
        <Route path="/social-media" element={<SocialMediaMarketing />} />
        <Route path="/akun" element={<Akun />} />
      </Route>
    </Routes>
  );
}

export default App;
