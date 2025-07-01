import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import toast from "react-hot-toast"; // Pastikan kamu sudah install react-hot-toast

const Footer = () => {
  const navigate = useNavigate();
  const [faqMessage, setFaqMessage] = useState("");

  const handleFaqSubmit = async (e) => {
    e.preventDefault();
    if (!faqMessage.trim()) {
      toast.error("Pesan tidak boleh kosong!");
      return;
    }

    const { error } = await supabase.from("faqs").insert([
      {
        question: faqMessage,
        answer: "",
        is_draft: true, // status pertanyaan baru
      },
    ]);

    if (error) {
      toast.error("Gagal mengirim pertanyaan.");
      console.error(error);
    } else {
      toast.success("Pertanyaan berhasil dikirim!");
      setFaqMessage("");
    }
  };

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
          <form onSubmit={handleFaqSubmit} className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Pertanyaan Anda"
              className="p-2 rounded bg-white text-black"
              value={faqMessage}
              onChange={(e) => setFaqMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-sm"
            >
              Kirim Pertanyaan
            </button>
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
