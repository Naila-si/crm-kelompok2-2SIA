import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";

const Promo = () => {
  const [promos, setPromos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPromos = async () => {
      const { data, error } = await supabase.from("promo").select("*");
      if (!error) setPromos(data);
    };
    fetchPromos();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-orange-700 text-center mb-10">Promo Menarik 🍽️</h1>

      {promos.length === 0 ? (
        <p className="text-center text-gray-500 italic">Belum ada promo tersedia saat ini.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {promos.map((promo) => (
            <div key={promo.id} className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
              <img
                src={promo.gambar_url}
                alt={promo.judul}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold text-orange-700">{promo.judul}</h2>
              <p className="text-gray-700 text-sm mt-2">{promo.deskripsi}</p>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/beranda")}
          className="bg-orange-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow hover:bg-orange-700"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default Promo;
