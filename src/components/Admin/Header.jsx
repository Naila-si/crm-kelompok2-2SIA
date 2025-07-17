import { Search, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const sections = [
  {
    title: "DASHBOARD",
    items: [{ name: "Dashboard", path: "/dashboard" }],
  },
  {
    title: "INFORMASI UMUM",
    items: [
      { name: "Pengaturan 'Tentang Kami'", path: "/tentang" },
      { name: "Pengaturan 'Visi & Misi'", path: "/visimisi" },
      { name: "Pengaturan FAQ", path: "/faq" },
    ],
  },
  {
    title: "LAYANAN PELANGGAN",
    items: [
      { name: "Daftar Pesanan", path: "/pesanan" },
      { name: "Kontak Pelanggan", path: "/kontak" },
      { name: "Testimoni Pelanggan", path: "/testimoni" },
      { name: "Pengaturan Loyalty Pelanggan", path: "/loyalty" },
    ],
  },
  {
    title: "MANAJEMEN MENU",
    items: [
      { name: "Daftar Menu", path: "/menu" },
      { name: "Pengaturan Promo", path: "/promo" },
    ],
  },
  {
    title: "AKTIVITAS & FOLLOW-UP",
    items: [
      { name: "Follow Up", path: "/follow-up" },
      { name: "Pengingat", path: "/activity" },
    ],
  },
  {
      title: "PREDIKSI",
      items: [
        { name: "Rekomendasi Promo", path: "/loyalty-prediksi" },
      ],
    },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // ⛳️ Temukan kategori & nama halaman dari pathname
  const currentPath = location.pathname;
  let currentSection = "";
  let currentPage = "";

  sections.forEach((section) => {
    section.items.forEach((item) => {
      if (item.path === currentPath) {
        currentSection = section.title;
        currentPage = item.name;
      }
    });
  });

  // 🔍 Fitur Search Menu
  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);

    if (!keyword.trim()) {
      setSearchResults([]);
      return;
    }

    const results = [];
    sections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.name.toLowerCase().includes(keyword.toLowerCase())) {
          results.push({ ...item, section: section.title });
        }
      });
    });

    setSearchResults(results);
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b sticky top-0 z-10">
      {/* Kiri: Breadcrumb */}
      <div className="text-sm text-gray-500 whitespace-nowrap">
        Pages /{" "}
        <span className="text-gray-700 font-semibold">{currentSection}</span> /{" "}
        <span className="text-gray-900 font-semibold">{currentPage}</span>
      </div>

      {/* Kanan: Search + Login */}
      <div className="relative flex items-center gap-4 w-full max-w-md justify-end">
        {/* Search Box */}
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Cari halaman..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 pl-10 text-sm border rounded-full w-full focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />

          {/* Hasil Search */}
          {searchResults.length > 0 && (
            <ul className="absolute mt-2 w-full bg-white border rounded-md shadow z-50 text-sm">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  onClick={() => {
                    navigate(result.path);
                    setSearchTerm("");
                    setSearchResults([]);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {result.section} / <span className="font-semibold">{result.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Login */}
        <div
          className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 hover:text-purple-700"
          onClick={() => navigate("/signin")}
        >
          <User className="w-4 h-4" />
          Login
        </div>
      </div>
    </header>
  );
};

export default Header;
