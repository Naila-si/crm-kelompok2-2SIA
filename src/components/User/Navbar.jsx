import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  let avatarSrc = "/profil.png";

  if (user?.email === "admin@gmail.com") avatarSrc = "/Ikon Perempuan.jpg";
  else if (user?.email === "user1@gmail.com") avatarSrc = "/Ikon Perempuan2.jpg";
  else if (user?.email === "user2@gmail.com") avatarSrc = "/Ikon Laki-Laki.png";
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <span className="font-bold text-[#9C2D2D] text-lg">Selera Kampung</span>
        </div>
        <nav className="flex gap-6 text-sm font-semibold text-[#5D3A1A]">
          {[
            { label: "Beranda", path: "/" },
            { label: "Tentang Kami", path: "/tentang-kami" },
            { label: "Menu", path: "/menu" },
            { label: "Promo", path: "/promo" },
          ].map((item, i) => (
            <button key={i} onClick={() => navigate(item.path)} className="hover:text-[#9C2D2D] transition">
              {item.label}
            </button>
          ))}

          <div className="relative">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="ml-4 flex items-center gap-1 hover:text-[#9C2D2D] transition"
            >
              <img src={avatarSrc} alt="Profile" className="w-8 h-8 rounded-full border border-orange-300" />
              <span>Profil</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
                <button
                  onClick={() => navigate("/profil")}
                  className="block w-full text-left px-4 py-2 hover:bg-orange-100"
                >
                  Profil Saya
                </button>
                <button
                  onClick={() => navigate("/rewards")}
                  className="block w-full text-left px-4 py-2 hover:bg-orange-100"
                >
                  Poin & Rewards
                </button>
                <button
                  onClick={() => navigate("/faq")}
                  className="block w-full text-left px-4 py-2 hover:bg-orange-100"
                >
                  FAQ
                </button>
                <button
                  onClick={() => navigate("/riwayat")}
                  className="block w-full text-left px-4 py-2 hover:bg-orange-100"
                >
                  Riwayat Pesanan
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/signin");
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-orange-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
