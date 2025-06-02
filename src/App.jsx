import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MainLayout from './components/MainLayout'
import SalesManagement from './pages/SalesManagement'
import Customers from './pages/Customers'
import Product from './pages/Product';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/penjualan" element={<SalesManagement/>} />
        <Route path="/pelanggan" element={<Customers />} />
        <Route path="/produk" element={<Product />} />
      </Route>
    </Routes>
  )
}

export default App