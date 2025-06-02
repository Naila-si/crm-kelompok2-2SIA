import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MainLayout from './components/MainLayout'
import SalesManagement from './pages/SalesManagement'
import Product from './pages/Products'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/penjualan" element={<SalesManagement/>} />
        <Route path="/produk" element={<Product/>} />
        <Route path="/signin" element={<Login/>} />
        <Route path="/signup" element={<Register/>} />
      </Route>
    </Routes>
  )
}

export default App