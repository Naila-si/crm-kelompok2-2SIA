import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import { useEffect } from "react";

const TentangKami = () => {
  const navigate = useNavigate();
  const [dataNilai, setDataNilai] = useState([]);

  useEffect(() => {
    const fetchNilaiKami = async () => {
      const { data, error } = await supabase.from("nilai_kami").select("*");
      if (!error) setDataNilai(data);
    };
    fetchNilaiKami();
  }, []);

  const [dataTentang, setDataTentang] = useState([]);

  useEffect(() => {
    const fetchTentangKami = async () => {
      const { data, error } = await supabase.from("tentang_kami").select("*");
      if (!error) setDataTentang(data);
    };
    fetchTentangKami();
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-[#fff8f0]">
      {/* Header Navbar */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src="/logo.png" alt="Logo" className="h-10" />
            <span className="font-bold text-[#9C2D2D] text-lg">
              Selera Kampung
            </span>
          </div>
          <nav className="flex gap-6 text-sm font-semibold text-[#5D3A1A]">
            {[
              { label: "Beranda", path: "/beranda" },
              { label: "Menu", path: "/informasi-menu" },
              { label: "Pesanan", path: "/order-management" },
              { label: "Tracking", path: "/tracking" },
              { label: "Kontak", path: "/kontak" },
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
      <section className="h-[60vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
        style={{ backgroundImage: "url('/hero-tentang.jpg')" }}>
        <div className="bg-black/60 p-10 rounded-2xl max-w-2xl shadow-xl">
          <h1 className="text-4xl font-extrabold mb-2">Tentang Kami</h1>
          <p className="text-lg font-medium">
            Kenali lebih dekat Selera Kampung, layanan catering khas Pekanbaru
          </p>
        </div>
      </section>

      {/* Konten Tentang Kami */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          {dataTentang.length > 0 ? (
            dataTentang.map((item) => (
              <div key={item.id} className="mb-10">
                <h2 className="text-3xl font-bold text-orange-700 mb-6">{item.judul}</h2>
                <img src={item.gambar_url} alt="Tentang Kami" className="w-full h-64 object-cover rounded-xl mb-6" />
                <p className="text-gray-700 text-lg leading-relaxed">{item.deskripsi}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">Memuat informasi...</p>
          )}


          <h2 className="text-2xl font-bold text-orange-700 mt-16 mb-10">
            Nilai Kami 💡
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {dataNilai.map((item) => (
              <div key={item.id} className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl shadow hover:shadow-md transition duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-orange-700 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
          </div>
        </section>

      {/* Call to Action */}
      <section className="py-12 bg-[#fff4eb] text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Siap pesan makanan enak hari ini?
        </h2>
        <button
          onClick={() => navigate("/informasi-menu")}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full text-sm font-semibold shadow"
        >
          Lihat Menu Sekarang
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-[#2d2d2d] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">Selera Kampung</h4>
            <p className="text-sm text-gray-300">
              Layanan catering Pekanbaru yang siap menemani harimu, dari
              makanan harian hingga acara spesial.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button onClick={() => navigate("/")} className="hover:text-orange-500 focus:text-orange-700 transition duration-200">Beranda</button>
              </li>
              <li>
                <button onClick={() => navigate("/informasi-menu")} className="hover:text-orange-500 focus:text-orange-700 transition duration-200">Menu</button>
              </li>
              <li>
                <button onClick={() => navigate("/order-management")} className="hover:text-orange-500 focus:text-orange-700 transition duration-200">Pesanan</button>
              </li>
              <li>
                <button onClick={() => navigate("/tracking")} className="hover:text-orange-500 focus:text-orange-700 transition duration-200">Tracking</button>
              </li>
              <li>
                <button onClick={() => navigate("/kontak")} className="hover:text-orange-500 focus:text-orange-700 transition duration-200">Kontak</button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Hubungi Kami</h4>
            <p className="text-sm text-gray-300">Whatsapp: 0812-3456-7890</p>
            <p className="text-sm text-gray-300">Email: info@selerakampung.id</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TentangKami;
