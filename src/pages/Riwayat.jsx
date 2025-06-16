import React from "react";

const dataPelanggan = [
  {
    nama: "Andi Pratama",
    kontak: "081234567890",
    alamat: "Jl. Melati No. 12, Pekanbaru",
    level: "Gold",
  },
  {
    nama: "Siti Aminah",
    kontak: "085612345678",
    alamat: "Jl. Mawar No. 5, Pekanbaru",
    level: "Silver",
  },
  {
    nama: "Budi Santoso",
    kontak: "082134567891",
    alamat: "Jl. Kenanga No. 20, Pekanbaru",
    level: "Bronze",
  },
];

const levelStyle = {
  Gold: "bg-yellow-100 text-yellow-700",
  Silver: "bg-gray-100 text-gray-600",
  Bronze: "bg-amber-100 text-amber-700",
};

const Riwayat = () => {
  return (
    <div className="p-6 bg-[#FDF6E3] min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#5E3B1E] mb-2">Riwayat Pelanggan</h1>
        <p className="text-[#1F1F1F] mb-6">
          Menyimpan data pelanggan berdasarkan level: Gold, Silver, dan Bronze.
        </p>

        <div className="bg-white border border-[#5E3B1E]/20 shadow-md rounded-2xl p-6 overflow-x-auto transition-all duration-300">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-amber-50 text-[#5E3B1E] uppercase tracking-wide text-xs">
                <th className="py-3 px-4 text-left">Nama</th>
                <th className="py-3 px-4 text-left">Kontak</th>
                <th className="py-3 px-4 text-left">Alamat</th>
                <th className="py-3 px-4 text-left">Level</th>
              </tr>
            </thead>
            <tbody>
              {dataPelanggan.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-[#5E3B1E]/10 hover:bg-amber-50 transition-all duration-200"
                >
                  <td className="py-3 px-4">{item.nama}</td>
                  <td className="py-3 px-4">{item.kontak}</td>
                  <td className="py-3 px-4">{item.alamat}</td>
                  <td className="py-3 px-4">
                   <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${levelStyle[item.level]}`}
                    >
                        {item.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Riwayat;