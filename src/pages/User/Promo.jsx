import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";

const Promo = () => {
  const [scheduledPromos, setScheduledPromos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchScheduledPromos();
  }, []);

  const fetchScheduledPromos = async () => {
    const { data, error } = await supabase
      .from("trigger_marketing")
      .select("*")
      .eq("is_draft", false)
      .order("schedule", { ascending: true });

    if (!error) setScheduledPromos(data);
  };

  const handleGunakanPromo = (promo) => {
    localStorage.setItem("promo_aktif", JSON.stringify(promo));
    alert("Promo diterapkan! Kamu bisa gunakan saat melakukan pemesanan.");
    navigate("/order-management");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-orange-700 text-center mb-8">
        Promo Menarik 🍽️
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        {scheduledPromos.length > 0 ? (
          <div className="space-y-4">
            {scheduledPromos.map((item) => (
              <div
                key={item.id}
                className="bg-orange-50 border-l-4 border-orange-400 rounded-xl p-4 shadow"
              >
                <p className="text-sm text-gray-600">
                  Jadwal: {new Date(item.schedule).toLocaleString()}
                </p>
                <p className="mt-2 text-gray-800">{item.content}</p>

                <button
                  onClick={() => handleGunakanPromo(item)}
                  className="mt-3 bg-orange-600 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-700"
                >
                  Gunakan Promo Ini
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 italic">
            Belum ada konten promo terjadwal.
          </p>
        )}
      </div>

      <div className="text-center mt-10">
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
