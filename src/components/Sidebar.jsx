import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Box,
  DollarSign,
  CalendarClock,
  Megaphone,
  LogIn,
  UserPlus,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard />, path: "/" },
  { name: "Produk", icon: <Box />, path: "/produk" },
  { name: "Penjualan", icon: <DollarSign />, path: "/penjualan" },
  { name: "Pelanggan", icon: <Users />, path: "/pelanggan" },
  {
    name: "Manajemen Aktivitas",
    icon: <CalendarClock />,
    path: "/activity-management",
  },
  {
    name: "Promo di Medsos", // Bahasa yang lebih lokal
    icon: <Megaphone />,
    path: "/social-media",
  },
];

const accountItems = [
  { name: "Sign In", icon: <LogIn />, path: "/signin" },
  { name: "Sign Up", icon: <UserPlus />, path: "/signup" },
];

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-white w-64 h-screen shadow-xl px-4 py-6 hidden md:block border-r border-orange-100">
      <div className="text-2xl font-bold mb-10 text-orange-800 font-serif tracking-wide">
        UMKM CRM
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-100 transition ${
              isActive(item.path)
                ? "bg-orange-200 text-orange-900 font-semibold"
                : "text-gray-700"
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-10 text-xs font-semibold text-gray-500 uppercase tracking-widest">
        Akun
      </div>

      <nav className="mt-2 space-y-1">
        {accountItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-100 transition ${
              isActive(item.path)
                ? "bg-orange-200 text-orange-900 font-semibold"
                : "text-gray-700"
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
