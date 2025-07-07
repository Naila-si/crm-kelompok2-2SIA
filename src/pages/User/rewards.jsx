import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../components/User/UserLayout";
import confetti from "canvas-confetti";

const rewards = [
  {
    level: "Sahabat Selera",
    tag: "bronze",
    color: "bg-orange-100",
    border: "border-orange-300",
    requirement: "Minimal 3 Transaksi",
    benefits: [
      "Diskon 5% untuk semua menu",
      "Voucher Pelanggan Baru Rp 10.000",
    ],
  },
  {
    level: "Keluarga Selera",
    tag: "silver",
    color: "bg-purple-100",
    border: "border-purple-300",
    requirement: "Minimal 5 Transaksi",
    benefits: [
      "Diskon 10% semua menu",
      "Gratis Ongkir 1x",
      "Akses Promo musiman",
    ],
  },
  {
    level: "Raja Selera",
    tag: "gold",
    color: "bg-yellow-100",
    border: "border-yellow-300",
    requirement: "Minimal 10 Transaksi",
    benefits: [
      "Diskon 15% semua kategori",
      "Langganan Aktif",
      "Prioritas Pesanan",
      "Undangan Acara Spesial",
    ],
  },
];


const dummyHistory = [
  { date: "03 Juli 2025", activity: "Klaim Poin Harian", point: "+10" },
  { date: "02 Juli 2025", activity: "Pesanan #12345", point: "+25" },
  { date: "01 Juli 2025", activity: "Klaim Voucher Ulang Tahun", point: "+50" },
];

const dummyVoucherOptions = [
  { name: "Voucher Diskon Rp 10.000", cost: 50 },
  { name: "Gratis Ongkir", cost: 30 },
  { name: "Voucher Rp 25.000", cost: 100 },
];

export default function RewardsPage() {
  const [claimed, setClaimed] = useState(false);
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(100);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const userLevelData = rewards.find((r) => r.tag === user?.level);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleClaim = () => {
    setClaimed(true);
    setPoints(points + 10);
    alert("Poin harian berhasil diklaim! 🎉");
  };

  const handleRedeem = (voucher) => {
    if (points >= voucher.cost) {
      setPoints(points - voucher.cost);
      alert(`🎁 Berhasil tukar ${voucher.name}`);
    } else {
      alert("❌ Poin kamu belum cukup");
    }
  };

  const getEmoji = (levelTag) => {
    switch (levelTag) {
      case "bronze":
        return "🥉";
      case "silver":
        return "🥈";
      case "gold":
        return "🥇";
      default:
        return "❔";
    }
  };

  useEffect(() => {
    if (points >= 120 && !showConfetti) {
      confetti({ particleCount: 200, spread: 100 });
      setShowConfetti(true);
    }
  }, [points]);

  return (
    <div className="font-sans text-gray-800 bg-[#fff8f0]">
      <>
        <section
          className="h-[50vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
          style={{
            backgroundImage:
              "url('https://s1-id.alongwalker.co/wp-content/uploads/2024/07/image-top-10-pilihan-catering-di-pekanbaru-riau-buat-acara-maupun-harian-manakah-yang-paling-enak-dan-murah-62258e4294ff1f402c284956a551228f.jpg')",
          }}
        >
        <div className="bg-black/60 p-8 rounded-xl">
            <h1 className="text-4xl font-extrabold text-white-700 mb-2">Selamat Datang di Halaman Rewards</h1>
            <p className="text-white-700 max-w-xl">Kumpulkan poin dari setiap aktivitas dan dapatkan berbagai keuntungan eksklusif dari Selera Kampung!</p>
          </div>
        </section>

        <section className="py-16 px-6 bg-gradient-to-br from-orange-200 via-white to-yellow-100">
          <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-2 items-center text-center md:text-left">
            {/* Card Level */}
            <div className={`bg-white rounded-2xl p-6 shadow-lg border-l-8 ${userLevelData?.border || "border-gray-300"}`}>
              <p className="text-sm text-gray-500 mb-1">Level Kamu Saat Ini</p>
              <h2 className="text-2xl font-bold text-orange-600 flex items-center gap-2">
                {getEmoji(user?.level)} {userLevelData?.level || "Belum Ada"}
              </h2>
              <p className="mt-3 text-gray-600 text-sm">
                Poin kamu saat ini: <span className="font-bold text-green-600">{points}</span>
              </p>
            </div>

            {/* Klaim Poin */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-300">
              <h3 className="text-lg font-semibold text-green-700 mb-2">🎁 Klaim Poin Harian</h3>
              <p className="text-sm text-gray-600 mb-4">Dapatkan 10 poin gratis setiap hari!</p>
              <button
                onClick={handleClaim}
                disabled={claimed}
                className={`w-full px-6 py-3 rounded-full text-white font-semibold transition ${
                  claimed ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {claimed ? "Poin Harian Sudah Diklaim" : "Klaim Sekarang"}
              </button>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-white">
          <h2 className="text-3xl font-bold text-center text-orange-700 mb-8">Tingkatan & Keuntungan Member</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {rewards.map((tier, idx) => (
              <div
                key={idx}
                className={`min-w-[300px] rounded-xl shadow-md border-2 ${tier.border} ${tier.color} p-6`}
              >
                <h3 className="text-xl font-semibold text-center mb-2">{tier.level}</h3>
                <p className="text-center text-sm text-gray-600 mb-4">{tier.requirement}</p>
                <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1 text-left">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-6 bg-yellow-50">
          <h2 className="text-3xl font-bold text-center text-orange-700 mb-8">🎁 Tukarkan Poin Kamu</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {dummyVoucherOptions.map((voucher, i) => (
              <div
                key={i}
                className="bg-white border border-orange-200 rounded-xl shadow p-5 text-center hover:shadow-xl transition"
              >
                <h3 className="text-orange-700 font-semibold text-lg">{voucher.name}</h3>
                <p className="text-sm text-gray-500 mb-3">Butuh {voucher.cost} poin</p>
                <button
                  onClick={() => handleRedeem(voucher)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full text-sm"
                >
                  Tukar Sekarang
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-6 bg-[#fff4eb]">
          <h2 className="text-3xl font-bold text-center text-orange-700 mb-8">Cara Mendapatkan Poin</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {["Pesan makanan minimal Rp 50.000", "Klaim poin harian", "Ikut promo & event spesial", "Ulang tahun kamu!", "Menjadi pelanggan aktif", "Memberikan testimoni"].map((item, i) => (
              <div
                key={i}
                className="bg-white border border-orange-200 rounded-xl shadow p-5 text-center hover:shadow-xl transition"
              >
                <p className="text-orange-700 font-semibold">🎯 {item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-6 bg-white">
          <h2 className="text-3xl font-bold text-center text-orange-700 mb-8">Histori Poin</h2>
          <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 shadow">
            <table className="w-full text-sm text-left border-t">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2">Tanggal</th>
                  <th>Aktivitas</th>
                  <th className="text-right">Poin</th>
                </tr>
              </thead>
              <tbody>
                {dummyHistory.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-orange-50">
                    <td className="py-2">{item.date}</td>
                    <td>{item.activity}</td>
                    <td className="text-right font-semibold text-green-600">{item.point}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </>
    </div>
  );
}
