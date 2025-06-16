import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MainLayout from './components/MainLayout'
import SalesManagement from './pages/SalesManagement'
import Customers from './pages/Customers'
import Product from './pages/Product'
import Pesanan from './pages/Pesanan'
import Login from './pages/Login'
import Register from './pages/Register'
import Produk from './pages/Produk'
import Lacak from './pages/Lacak'

function App() {
  return (
    <Routes>
      {/* Routes tanpa layout */}
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />

      {/* Routes dengan layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/penjualan" element={<SalesManagement />} />
        <Route path="/pelanggan" element={<Customers />} />
        <Route path="/produk" element={<Product />} />
        <Route path="/penjualan" element={<SalesManagement/>} />
        <Route path="/Pesanan" element={<Pesanan/>} />
        <Route path="/signin" element={<Login/>} />
        <Route path="/signup" element={<Register/>} />
         <Route path="/Produk" element={<Produk/>} />
         <Route path="/lacak" element={<Lacak/>} />
      </Route>
    </Routes>
  )
}

export default App
