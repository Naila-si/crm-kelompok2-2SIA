import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";

const Beranda = () => {
  const navigate = useNavigate();
  const [menuUnggulan, setMenuUnggulan] = useState([]);
  const [testimoni, setTestimoni] = useState([]);

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

  return (
    <div className="font-sans text-gray-800 bg-[#fff8f0]">
      {/* Navbar */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src="/logo.png" alt="Logo" className="h-10" />
            <span className="font-bold text-[#9C2D2D] text-lg">Selera Kampung</span>
          </div>
          <nav className="flex gap-6 text-sm font-semibold text-[#5D3A1A]">
            {[
              { label: "Beranda", path: "/" },
              { label: "Menu", path: "/informasi-menu" },
              { label: "Pesanan", path: "/order-management" },
              { label: "Tracking", path: "/tracking" },
              { label: "Kontak", path: "/tracking" },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => navigate(item.path)}
                className="hover:text-[#9C2D2D] transition"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

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
            onClick={() => navigate('/informasi-menu')}
            className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md"
          >
            Pesan Sekarang
          </button>
        </div>
      </section>

     {/* Tentang Kami */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-4xl font-extrabold text-orange-700 mb-6">Tentang Kami</h2>
        <p className="text-gray-700 max-w-3xl mx-auto mb-6">
          Selera Kampung Pekanbaru adalah layanan katering yang menyajikan menu rumahan khas Indonesia dengan rasa autentik dan pelayanan terbaik untuk harian maupun acara spesial Anda.
        </p>
        <button
          onClick={() => navigate('/tentang-kami')}
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
              action: () => navigate('/order-management'),
            },
            {
              icon: "📋",
              title: "Informasi Menu",
              desc: "Lihat daftar menu lengkap dengan harga.",
              action: () => navigate('/informasi-menu'),
            },
            {
              icon: "📍",
              title: "Tracking Delivery",
              desc: "Lacak status pengiriman secara real-time.",
              action: () => navigate('/tracking'),
            },
            {
              icon: "💬",
              title: "Customer Support",
              desc: "Kami siap bantu Anda 24/7.",
              action: () => navigate('/support'),
            },
            {
              icon: "🧑‍🍳",
              title: "Konsultasi Catering",
              desc: "Bantu pilih menu terbaik sesuai acara Anda.",
              action: () => navigate('/konsultasi'),
            },
            {
              icon: "📢",
              title: "Promo & Diskon",
              desc: "Lihat promo menarik & penawaran spesial.",
              action: () => navigate('/promo'),
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
        <button onClick={() => navigate("/promo")} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full shadow text-sm">
          Lihat Semua Promo
        </button>
      </section>

      {/* Testimoni */}
      <section className="py-20 px-6 bg-orange-100">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Apa Kata Pelanggan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimoni.map((fb, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
              <p className="italic mb-4 text-gray-700">"{fb.pesan}"</p>
              <p className="font-bold text-right text-orange-600">- {fb.nama}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer + Contact Us */}
      <footer className="bg-[#2d2d2d] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">Selera Kampung</h4>
            <p className="text-sm text-gray-300">
              Layanan catering Pekanbaru yang siap menemani harimu, dari makanan harian hingga acara spesial.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><button onClick={() => navigate('/')} className="hover:text-orange-500 focus:text-orange-700 transition duration-200">Beranda</button></li>
              <li><button onClick={() => navigate('/informasi-menu')} className="hover:text-orange-500 focus:text-orange-700 transition duration-200">Menu</button></li>
              <li><button onClick={() => navigate('/order-management')} className="hover:text-orange-500 focus:text-orange-700 transition duration-200">Pesanan</button></li>
              <li><button onClick={() => navigate('/tracking')} className="hover:text-orange-500 focus:text-orange-700 transition duration-200">Tracking</button></li>
              <li><button onClick={() => navigate('/kontak')} className="hover:text-orange-500 focus:text-orange-700 transition duration-200">Kontak</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">FAQ / Contact</h4>
            <form className="flex flex-col space-y-3">
              <select className="p-2 rounded bg-white text-black">
                <input type="text" className="p-2 rounded bg-white text-black" />
                <option value="faq">Tanya FAQ</option>
                <option value="lapor">Laporkan Masalah</option>
              </select>
              <input type="text" placeholder="Pesan Anda" className="p-2 rounded bg-white text-black" />
              <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-sm">Kirim</button>
            </form>
             <div>
            <p className="text-sm text-gray-300">Whatsapp: 0812-3456-7890</p>
            <p className="text-sm text-gray-300">Email: info@selerakampung.id</p>
          </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Beranda;
