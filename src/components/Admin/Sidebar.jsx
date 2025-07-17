import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, ClipboardList, Users, CalendarClock, 
  Megaphone, BarChart2 
} from "lucide-react";
import { 
  MdStarRate, MdLoyalty, MdRestaurantMenu 
} from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { BsPercent } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

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
        { name: "Tentang Kami", icon: <FcAbout />, path: "/tentang" },
        { name: "Visi & Misi", icon: <MdStarRate />, path: "/visimisi" },
        { name: "FAQ", icon: <FaQuestion />, path: "/faq" },
      ],
    },
    {
      title: "LAYANAN PELANGGAN",
      items: [
        { name: "Daftar Pesanan", icon: <ClipboardList />, path: "/pesanan" },
        { name: "Kontak", icon: <Users />, path: "/kontak" },
        { name: "Testimoni", icon: <MdStarRate />, path: "/testimoni" },
        { name: "Loyalty", icon: <MdLoyalty />, path: "/loyalty" },
      ],
    },
    {
      title: "MANAJEMEN MENU",
      items: [
        { name: "Menu", icon: <MdRestaurantMenu />, path: "/menu" },
        { name: "Promo", icon: <BsPercent />, path: "/promo" },
      ],
    },
    {
      title: "AKTIVITAS",
      items: [
        { name: "Follow Up", icon: <Megaphone />, path: "/follow-up" },
        { name: "Pengingat", icon: <CalendarClock />, path: "/activity" },
      ],
    },
    {
      title: "PREDIKSI",
      items: [
        { name: "Prediksi Promo", icon: <BarChart2 />, path: "/loyalty-prediksi" },
      ],
    },
  ];

  return (
    <aside className="bg-[#FDF6E3] w-64 h-screen fixed top-0 left-0 shadow-lg px-4 py-6 hidden md:block z-20 overflow-y-auto">
      {/* Logo */}
      <div className="flex justify-center items-center mb-6">
        <img
          src="/logo.png"
          alt="Logo Selera Kampung"
          className="w-40 h-auto object-contain"
        />
      </div>

      {sections.map((section) => (
        <div key={section.title} className="mb-6">
          <div className="text-sm font-semibold text-[#5E3B1E] mb-2 px-1 uppercase tracking-wide">
            {section.title}
          </div>
          <nav className="space-y-1">
            {section.items.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-orange-100 text-orange-900 font-semibold border-l-4 border-[#8B4513]"
                    : "text-gray-700 hover:bg-orange-50 hover:text-[#8B4513]"
                }`}
              >
                <span className="w-5 h-5">{item.icon}</span>
                <span className="truncate">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
