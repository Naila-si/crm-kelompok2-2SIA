import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Beranda() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fdf6e3] p-4">
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h1 className="text-3xl font-bold text-[#8B4513]">Selamat datang, {user?.email}!</h1>
        <p className="text-gray-600 mt-2">Nikmati layanan catering kami sesuai kebutuhan Anda.</p>
      </div>

      {/* Gambar Hero */}
      <div className="mb-6">
        <img src="https://source.unsplash.com/800x300/?catering,food" alt="Catering" className="rounded-xl w-full" />
      </div>

      {/* Order Management */}
      <div className="bg-white rounded-xl shadow p-6 mb-4">
        <h2 className="text-xl font-bold text-[#8B4513] mb-2">Order Management</h2>
        <p className="text-sm text-gray-700">Lacak pesanan Anda dengan mudah dan cepat.</p>
        <button onClick={() => navigate("/pesanan")} className="mt-3 text-[#D2691E] hover:underline">Lihat Semua Pesanan</button>
      </div>

      {/* Case Management */}
      <div className="bg-white rounded-xl shadow p-6 mb-4">
        <h2 className="text-xl font-bold text-[#8B4513] mb-2">Layanan Bantuan</h2>
        <p className="text-sm text-gray-700">Punya kendala? Sampaikan langsung kepada tim kami.</p>
        <button onClick={() => navigate("/kontak")} className="mt-3 text-[#D2691E] hover:underline">Laporkan Masalah</button>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-xl shadow p-6 mb-4">
        <h2 className="text-xl font-bold text-[#8B4513] mb-2">Pertanyaan Umum</h2>
        <p className="text-sm text-gray-700">Cari tahu jawaban dari pertanyaan paling umum.</p>
        <button onClick={() => navigate("/faq")} className="mt-3 text-[#D2691E] hover:underline">Lihat FAQ</button>
      </div>

      {/* Promo */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-[#8B4513] mb-2">Promo & Diskon</h2>
        <p className="text-sm text-gray-700">Lihat menu dengan harga spesial!</p>
        <button onClick={() => navigate("/menu")} className="mt-3 text-[#D2691E] hover:underline">Lihat Menu</button>
      </div>
    </div>
  );
}

export default Beranda;