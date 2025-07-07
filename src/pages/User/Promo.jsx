import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import UserLayout from "../../components/User/UserLayout";

const Promo = () => {
  const [scheduledPromos, setScheduledPromos] = useState([]);
  const [seasonalPromos, setSeasonalPromos] = useState([]);
  const [filter, setFilter] = useState("Semua");
  const navigate = useNavigate();
  const [userLevel, setUserLevel] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserLevel(user?.level || "");
  }, []);

  useEffect(() => {
    fetchScheduledPromos();
    fetchSeasonalPromos();
  }, []);

  const getAvailableCategories = () => {
    if (!userLevel) return ["Semua"]; // tidak login atau level belum ditentukan
    if (userLevel === "bronze") return ["Semua", "Bronze"];
    if (userLevel === "silver") return ["Semua", "Bronze", "Silver"];
    if (userLevel === "gold") return ["Semua", "Bronze", "Silver", "Gold"];
    return ["Semua"];
  };

  const availableCategories = getAvailableCategories();

  const fetchScheduledPromos = async () => {
    const { data, error } = await supabase
      .from("trigger_marketing")
      .select("*")
      .eq("is_draft", false)
      .order("schedule", { ascending: true });
    if (!error) setScheduledPromos(data);
  };

  const fetchSeasonalPromos = async () => {
    const { data, error } = await supabase
      .from("seasonal_promos")
      .select("*")
      .order("start", { ascending: true });
    if (!error) setSeasonalPromos(data);
  };

  const handleGunakanPromo = (promo) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart.length === 0) {
      alert("⚠️ Kamu belum menambahkan item ke pesanan. Silakan pilih menu terlebih dahulu.");
      return;
    }

    localStorage.setItem("promo_aktif", JSON.stringify(promo));
    alert("✅ Promo diterapkan! Kamu akan diarahkan ke halaman pemesanan.");
    navigate("/checkout");
  };

  const categories = ["Semua", "Bronze", "Silver", "Gold"];
  const filterPromos = (data) => {
    return data.filter((p) => {
      if (filter !== "Semua" && p.kategori?.toLowerCase() !== filter.toLowerCase()) return false;

      // ⛔ Batasi tampilan promo berdasarkan level user
      if (userLevel === "bronze" && ["silver", "gold"].includes(p.kategori?.toLowerCase())) return false;
      if (userLevel === "silver" && ["gold"].includes(p.kategori?.toLowerCase())) return false;

      return true;
    });
  };

  const filteredScheduled = filterPromos(scheduledPromos);
  const filteredSeasonal = filterPromos(seasonalPromos);

  return (
    <>
      {/* 🔶 Header with background image */}
      <section
        className="h-[50vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage:
            "url('https://s1-id.alongwalker.co/wp-content/uploads/2024/07/image-top-10-pilihan-catering-di-pekanbaru-riau-buat-acara-maupun-harian-manakah-yang-paling-enak-dan-murah-62258e4294ff1f402c284956a551228f.jpg')",
        }}
      >
        <div className="bg-black/60 p-8 rounded-xl">
          <h1 className="text-4xl font-bold">Promo Menarik 🍽️</h1>
          <p className="text-lg mt-2">Temukan berbagai penawaran spesial untukmu!</p>
        </div>
      </section>

      {/* 🔸 Konten utama */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Filter Kategori */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === cat
                  ? "bg-orange-600 text-white"
                  : "bg-orange-100 text-orange-600 hover:bg-orange-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Promo Terjadwal */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-xl font-semibold text-orange-700 mb-4">
            Promo Terjadwal 📅
          </h2>
          {filteredScheduled.length > 0 ? (
            <div className="space-y-4">
              {filteredScheduled.map((item) => (
                <div
                  key={item.id}
                  className="bg-orange-50 border-l-4 border-orange-400 rounded-xl p-4 shadow"
                >
                  <p className="text-sm text-gray-600">
                    Jadwal: {new Date(item.schedule).toLocaleString()}
                  </p>
                  <p className="mt-2 text-gray-800">{item.content}</p>
                  <p className="text-xs text-gray-500 italic">
                    Kategori: {item.kategori || "Umum"}
                  </p>
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
              Tidak ada promo terjadwal untuk kategori <strong>{filter}</strong>.
            </p>
          )}
        </div>

        {/* Promo Musiman */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Promo Musiman 🌤️
          </h2>
          {filteredSeasonal.length > 0 ? (
            <div className="space-y-4">
              {filteredSeasonal.map((promo) => (
                <div
                  key={promo.id}
                  className="bg-green-50 border-l-4 border-green-400 rounded-xl p-4 shadow"
                >
                  <p className="text-lg font-bold text-green-700">{promo.title}</p>
                  <p className="text-sm text-gray-600">
                    Berlaku: {new Date(promo.start).toLocaleDateString()} -{" "}
                    {new Date(promo.end).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500 italic">
                    Kategori: {promo.kategori || "Umum"}
                  </p>
                  <button
                    onClick={() => handleGunakanPromo(promo)}
                    className="mt-3 bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700"
                  >
                    Gunakan Promo Ini
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 italic">
              Tidak ada promo musiman untuk kategori <strong>{filter}</strong>.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Promo;
