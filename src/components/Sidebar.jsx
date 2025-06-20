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
  ShoppingCart,
  Box,
  BarChart2,
  User,
  DollarSign,
  CalendarClock,
  Megaphone,
  User2,
} from "lucide-react";
import { MdRestaurantMenu } from "react-icons/md"; 
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard />, path: "/" },
  { name: "Pesanan", icon: <ClipboardList />, path: "/pesanan" },
  { name: "Kontak Pelanggan", icon: <Users />, path: "/kontak" },
  { name: "Menu", icon: <MdRestaurantMenu />, path: "/menu" },
  { name: "Lacak", icon: <Search />, path: "/lacak" },
  { name: "Lead", icon: <Lightbulb />, path: "/lead", soon: true },
  { name: "Manajemen Aktivitas", icon: <CalendarClock />, path: "/activity" },
  { name: "Social Media Marketing", icon: <Megaphone />, path: "/social-media" },
];

const accountItems = [
  { name: "Pengaturan Akun", icon: <Settings />, path: "/akun" },
  { name: "Pelanggan", icon: <Users />, path: "/pelanggan" },
];

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-[#FDF6E3] w-64 h-screen fixed top-0 left-0 shadow-lg px-4 py-6 hidden md:block z-20 overflow-y-auto">
      {/* Logo Selera Kampung */}
      <div className="flex justify-center items-center mb-4">
        <img
          src="/public/logo.png"
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
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-100 transition ${
              isActive(item.path)
                ? "bg-orange-200 text-orange-900 font-semibold"
                : "text-gray-700"
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