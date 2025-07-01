import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import UserLayout from "../../components/User/UserLayout";
import Testimoni from "../../components/User/Testimoni";

const Beranda = () => {
  const navigate = useNavigate();
  const [menuUnggulan, setMenuUnggulan] = useState([]);
  const [testimoni, setTestimoni] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // 🔐 Cek login otomatis
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const fetchMenu = async () => {
      const { data, error } = await supabase.from("menu_unggulan").select("*");
      if (error) {
        console.error("Gagal ambil data menu:", error.message);
      } else {
        setMenuUnggulan(data);
      }
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    const fetchTestimoni = async () => {
      const { data, error } = await supabase.from("testimoni").select("*");
      if (error) {
        console.error("Gagal ambil testimoni:", error.message);
      } else {
        setTestimoni(data);
      }
    };
    fetchTestimoni();
  }, []);

  const [user, setUser] = useState(null);
  // Ambil data user dari localStorage saat mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login", { replace: true });
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const crmInfo = {
    "": {
      message: "Hai! Kamu pelanggan baru. Yuk mulai belanja dan nikmati keuntungan member!",
      color: "#bbb",
    },
    bronze: {
      message: "Selamat datang member Bronze! Dapatkan promo menarik setiap minggu!",
      color: "#CD7F32",
    },
    silver: {
      message: "Halo member Silver! Kamu dapat akses kupon spesial dan diskon tambahan!",
      color: "#C0C0C0",
    },
    gold: {
      message: "Welcome Gold Member! Nikmati diskon eksklusif dan akses prioritas event!",
      color: "#FFD700",
    },
  };

  const crmLevel = user?.level ?? "";
  const crmMessage = crmInfo[crmLevel]?.message ?? "";
  const crmColor = crmInfo[crmLevel]?.color ?? "#bbb";

  return (
    <div className="font-sans text-gray-800 bg-[#fff8f0]">
      <UserLayout>
        {/* Hero Section */}
        <section
          className="h-[85vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
          style={{
            backgroundImage:
              "url('https://s1-id.alongwalker.co/wp-content/uploads/2024/07/image-top-10-pilihan-catering-di-pekanbaru-riau-buat-acara-maupun-harian-manakah-yang-paling-enak-dan-murah-62258e4294ff1f402c284956a551228f.jpg')",
          }}
        >
          <div className="bg-black/60 p-10 rounded-2xl max-w-xl shadow-xl">
            <img src="/logo.png" alt="Logo" className="mx-auto mb-4 h-20" />
            <h1 className="text-4xl font-extrabold">Food Catering Service</h1>
            <p className="mt-2 text-lg font-medium">Nikmati layanan catering sesuai kebutuhanmu!</p>
            <button
              onClick={() => navigate("/informasi-menu")}
              className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md"
            >
              Pesan Sekarang
            </button>
          </div>
        </section>

        {/* CRM Info Section */}
        {user && (
          <section className="py-8 px-6 bg-gradient-to-br from-orange-200 via-white to-yellow-100 text-center shadow-inner">
            <div className="inline-block bg-white px-8 py-6 rounded-2xl border border-orange-300 shadow-lg hover:shadow-2xl transition-all duration-300 max-w-xl w-full">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-xl">👋</span>
                <h3 className="text-xl font-bold" style={{ color: crmColor }}>
                  Halo, {user.name}!
                </h3>
                {crmLevel && (
                  <span
                    className={`text-xs font-semibold uppercase px-3 py-1 rounded-full shadow-sm`}
                    style={{
                      backgroundColor: crmColor,
                      color: crmLevel === "gold" ? "#000" : "#fff",
                    }}
                  >
                    {crmLevel === "bronze" && "🥉 Bronze"}
                    {crmLevel === "silver" && "🥈 Silver"}
                    {crmLevel === "gold" && "🥇 Gold"}
                    {crmLevel === "" && "Pelanggan Baru"}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-700 animate-pulse">{crmMessage}</p>
            </div>
          </section>
        )}

        {/* Tentang Kami */}
        <section className="py-20 px-6 bg-white text-center">
          <h2 className="text-4xl font-extrabold text-orange-700 mb-6">Tentang Kami</h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-6">
            Selera Kampung Pekanbaru adalah layanan katering yang menyajikan menu rumahan khas Indonesia dengan rasa autentik dan pelayanan terbaik untuk harian maupun acara spesial Anda.
          </p>
          <button
            onClick={() => navigate("/tentang-kami")}
            className="mt-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full text-sm"
          >
            Lihat Selengkapnya
          </button>
        </section>

        {/* Our Services */}
        <section className="py-20 px-6 bg-[#fff4eb] text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-orange-600">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Kami menyediakan layanan cepat dan informatif seputar menu, harga, dan pemesanan,
            agar pelanggan dapat mengambil keputusan dengan mudah dan nyaman.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "📦",
                title: "Order Management",
                desc: "Pantau riwayat dan status pesanan Anda.",
                action: () => navigate("/order-management"),
              },
              {
                icon: "📋",
                title: "Informasi Menu",
                desc: "Lihat daftar menu lengkap dengan harga.",
                action: () => navigate("/informasi-menu"),
              },
              {
                icon: "📍",
                title: "Tracking Delivery",
                desc: "Lacak status pengiriman secara real-time.",
                action: () => navigate("/tracking"),
              },
              {
                icon: "💬",
                title: "Customer Support",
                desc: "Kami siap bantu Anda 24/7.",
                action: () => navigate("/support"),
              },
              {
                icon: "🧑‍🍳",
                title: "Konsultasi Catering",
                desc: "Bantu pilih menu terbaik sesuai acara Anda.",
                action: () => navigate("/konsultasi"),
              },
              {
                icon: "📢",
                title: "Promo & Diskon",
                desc: "Lihat promo menarik & penawaran spesial.",
                action: () => navigate("/promo"),
              },
            ].map((service, i) => (
              <div
                key={i}
                className="border border-orange-200 rounded-2xl p-6 shadow-md hover:shadow-2xl hover:scale-105 transform transition duration-300 bg-white cursor-pointer"
                onClick={service.action}
              >
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="font-bold text-xl mb-2 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Menu Unggulan */}
        <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-white">
          <h2 className="text-4xl font-extrabold text-center text-orange-700 mb-10">Menu Unggulan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {menuUnggulan.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <img src={item.gambar_url} alt={item.nama} className="w-full h-52 object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{item.nama}</h3>
                  <p className="text-orange-600 font-bold">{item.harga}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Promo Info */}
        <section className="py-16 px-6 bg-[#fff1e8] text-center">
          <h2 className="text-4xl font-extrabold text-orange-700 mb-6">Promo Spesial!</h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Dapatkan potongan 10% untuk pesanan pertama kamu! Gunakan kode: <span className="font-bold">SELERA10</span>
          </p>
          <button
            onClick={() => navigate("/promo")}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full shadow text-sm"
          >
            Lihat Semua Promo
          </button>
        </section>
        <Testimoni testimoni={testimoni} />
      </UserLayout>
    </div>
  );
};

export default Beranda;
