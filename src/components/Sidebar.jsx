import {
  LayoutDashboard,
  ClipboardList,
  CalendarCheck,
  Users,
  Settings,
  Package,
  Search,
  Lightbulb,
  LogIn,
  UserPlus,
  Users,
  ShoppingCart,
  Box,
  BarChart2,
  Settings,
  User,
  LogIn,
  UserPlus,
  User2,
  DollarSign,
  CalendarClock, // Icon untuk Social Media Marketing
  Megaphone,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard />, path: "/" },
  { name: "Pesanan", icon: <ClipboardList />, path: "/pesanan" },
  { name: "Aktivitas", icon: <CalendarCheck />, path: "/aktivitas" },
  { name: "Kontak", icon: <Users />, path: "/kontak" },
  { name: "Produk", icon: <Package />, path: "/produk" },
  { name: "Lacak", icon: <Search />, path: "/lacak" },
  { name: "Lead", icon: <Lightbulb />, path: "/lead", soon: true },
];

const accountItems = [
  { name: "Pengaturan Akun", icon: <Settings />, path: "/akun" },
  { name: "Masuk", icon: <LogIn />, path: "/signin" },
  { name: "Daftar", icon: <UserPlus />, path: "/signup" },
  { name: "Produk", icon: <Box />, path: "/produk" },
  { name: "Penjualan", icon: <DollarSign />, path: "/penjualan" },
  { name: "Pelanggan", icon: <Users />, path: "/pelanggan" },
  { name: "Manajemen Aktivitas", icon: <CalendarClock />, path: "/activity" }, // Baru
  { name: "Social Media Marketing", icon: <Megaphone />, path: "/social-media" }, // << Tambahan baru
];

const accountItems = [
  { name: "Sign In", icon: <LogIn />, path: "/signin" },
  { name: "Sign Up", icon: <UserPlus />, path: "/signup" },
];

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-[#FDF6E3] w-64 h-screen shadow-lg px-4 py-6 hidden md:block">
      {/* Logo Selera Kampung */}
      <div className="flex justify-center items-center mb-4">
        <img
          src="https://img.mbizmarket.co.id/company/thumbs/343x343/2022/10/18/276eec9fcac3d3767af9c010ad6340bb.jpg"
          alt="Logo Selera Kampung"
          className="w-40 h-auto object-contain"
        />
      </div>

      <div className="text-sm font-semibold text-[#5E3B1E] mb-3 px-1">FITUR</div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition ${
              isActive(item.path)
                ? "bg-[#A02B2B] text-white font-semibold"
                : "text-[#1F1F1F] hover:bg-[#D7B85B] hover:text-[#5E3B1E]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-5 h-5">{item.icon}</span>
              {item.name}
            </div>
            {item.soon && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md">Segera</span>
            )}
          </Link>
        ))}
      </nav>

      <div className="mt-8 text-xs font-semibold text-[#5E3B1E] px-1">AKUN</div>
      <nav className="mt-2 space-y-1">
        {accountItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive(item.path)
                ? "bg-[#A02B2B] text-white font-semibold"
                : "text-[#1F1F1F] hover:bg-[#D7B85B] hover:text-[#5E3B1E]"
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
