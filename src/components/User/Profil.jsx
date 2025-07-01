import React, { useEffect, useState } from "react";

const Profil = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) setUser(stored);
  }, []);

  if (!user) return <div className="text-center py-20">Memuat data profil...</div>;

  const badgeColor = {
    bronze: "text-[#CD7F32]",
    silver: "text-gray-500",
    gold: "text-yellow-500",
  }[user.level] || "text-gray-400";

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4 text-[#9C2D2D] text-center">Profil Saya</h1>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Nama</p>
        <p className="text-lg font-semibold">{user.name}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Email</p>
        <p className="text-lg font-semibold">{user.email}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Level Member</p>
        <p className={`text-lg font-bold capitalize ${badgeColor}`}>{user.level}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Total Transaksi</p>
        <p className="text-lg font-semibold">{user.totalTransaksi} kali</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Status Langganan</p>
        <p className={`text-lg font-semibold ${user.langgananAktif ? "text-green-600" : "text-red-500"}`}>
          {user.langgananAktif ? "Aktif" : "Tidak Aktif"}
        </p>
      </div>
    </div>
  );
};

export default Profil;
