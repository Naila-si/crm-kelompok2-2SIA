import React from "react";

const orders = [
  {
    id: 1,
    nama: "Andi",
    pesanan: "Nasi Ayam Kampung",
    status: "Diproses",
    waktu: "10:30 WIB",
    lokasi: "Politeknik Caltex Riau",
  },
  {
    id: 2,
    nama: "Siti",
    pesanan: "Soto Kampung",
    status: "Dikirim",
    waktu: "10:45 WIB",
    lokasi: "Jl. Soekarno Hatta Pekanbaru",
  },
  {
    id: 3,
    nama: "Budi",
    pesanan: "Pecel Lele",
    status: "Selesai",
    waktu: "11:10 WIB",
    lokasi: "Universitas Riau",
  },
];

const statusColor = {
  Diproses: "bg-yellow-100 text-yellow-800",
  Dikirim: "bg-blue-100 text-blue-800",
  Selesai: "bg-green-100 text-green-800",
};

const Lacak = () => {
  return (
    <div className="p-6 bg-[#FDF6E3] min-h-screen">
      <h1 className="text-2xl font-bold text-[#5E3B1E] mb-2">Lacak Pesanan</h1>
      <p className="text-[#1F1F1F] mb-6">
        Admin bisa memantau status pesanan secara real-time sehingga proses penjualan transparan.
      </p>

      {/* Tabel Pesanan */}
      <div className="bg-white rounded-xl shadow p-4 overflow-auto mb-8">
        <table className="min-w-full text-sm">
          <thead className="bg-[#D7B85B] text-[#5E3B1E] uppercase text-left">
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Pesanan</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Waktu</th>
              <th className="px-4 py-2">Lokasi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-200 hover:bg-[#FFF7E8]">
                <td className="px-4 py-2">{order.nama}</td>
                <td className="px-4 py-2">{order.pesanan}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full font-semibold ${statusColor[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">{order.waktu}</td>
                <td className="px-4 py-2">{order.lokasi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Peta Lokasi Terakhir */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold text-[#5E3B1E] mb-3">Peta Lokasi Terakhir Pengiriman</h2>
        <div className="w-full h-[400px] rounded overflow-hidden">
          <iframe
            title="Peta Lokasi Pengiriman"
            src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Politeknik+Caltex+Riau"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <p className="mt-2 text-sm text-gray-600">Lokasi ini akan otomatis diperbarui berdasarkan pengiriman terakhir.</p>
      </div>
    </div>
  );
};

export default Lacak;
