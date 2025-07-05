import { MdMenuBook } from "react-icons/md"; 
import { MdStarRate } from "react-icons/md"; 
import { FcAbout } from "react-icons/fc"; 
import { MdLoyalty } from "react-icons/md"; 
import { BsPercent } from "react-icons/bs"; 
import { FaQuestion } from "react-icons/fa"; 
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

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Kategori menu
  const sections = [
    {
      title: "DASHBOARD",
      items: [
        { name: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
      ],
    },
    {
      title: "INFORMASI UMUM",
      items: [
        { name: "Pengaturan 'Tentang Kami'", icon: <FcAbout />, path: "/tentang" },
        { name: "Pengaturan 'Visi & Misi'", icon: <MdStarRate />, path: "/visimisi" },
        { name: "Pengaturan FAQ", icon: <FaQuestion />, path: "/faq" },
      ],
    },
    {
      title: "LAYANAN PELANGGAN",
      items: [
        { name: "Daftar Pesanan", icon: <ClipboardList />, path: "/pesanan" },
        { name: "Kontak Pelanggan", icon: <Users />, path: "/kontak" },
        { name: "Testimoni Pelanggan", icon: <MdLoyalty />, path: "/testimoni" },
        { name: "Pengaturan Loyalty Pelanggan", icon: <MdLoyalty />, path: "/loyalty" },
      ],
    },
    {
      title: "MANAJEMEN MENU",
      items: [
        { name: "Daftar Menu", icon: <MdRestaurantMenu />, path: "/menu" },
        { name: "Pengaturan Promo", icon: <BsPercent />, path: "/promo" },
      ],
    },
    {
      title: "AKTIVITAS & FOLLOW-UP",
      items: [
        { name: "Follow Up", icon: <Lightbulb />, path: "/follow-up" },
        { name: "Pengingat", icon: <CalendarClock />, path: "/activity" },
      ],
    },
  ];

  return (
    <aside className="bg-[#FDF6E3] w-64 h-screen fixed top-0 left-0 shadow-lg px-4 py-6 hidden md:block z-20 overflow-y-auto">
      {/* Logo */}
      <div className="flex justify-center items-center mb-4">
        <img
          src="/logo.png"
          alt="Logo Selera Kampung"
          className="w-40 h-auto object-contain"
        />
      </div>

      {sections.map((section) => (
        <div key={section.title} className="mb-6">
          <div className="text-sm font-semibold text-[#5E3B1E] mb-2 px-1 uppercase">
            {section.title}
          </div>
          <nav className="space-y-1">
            {section.items.map((item) => (
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
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;