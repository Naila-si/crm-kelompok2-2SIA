import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
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
            <li><button onClick={() => navigate("/")} className="hover:text-orange-500">Beranda</button></li>
            <li><button onClick={() => navigate("/informasi-menu")} className="hover:text-orange-500">Menu</button></li>
            <li><button onClick={() => navigate("/order-management")} className="hover:text-orange-500">Pesanan</button></li>
            <li><button onClick={() => navigate("/tracking")} className="hover:text-orange-500">Tracking</button></li>
            <li><button onClick={() => navigate("/kontak")} className="hover:text-orange-500">Kontak</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">FAQ / Contact</h4>
          <form className="flex flex-col space-y-3">
            <select className="p-2 rounded bg-white text-black">
              <option value="faq">Tanya FAQ</option>
              <option value="lapor">Laporkan Masalah</option>
            </select>
            <input type="text" placeholder="Pesan Anda" className="p-2 rounded bg-white text-black" />
            <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-sm">Kirim</button>
          </form>
          <div className="mt-4">
            <p className="text-sm text-gray-300">Whatsapp: 0812-3456-7890</p>
            <p className="text-sm text-gray-300">Email: info@selerakampung.id</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;