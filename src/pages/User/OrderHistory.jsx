import React, { useEffect, useState } from "react";
import UserLayout from "../../components/User/UserLayout";

const dummyHistory = [
  {
    id: 1,
    date: "2025-06-20",
    items: [
      {
        name: "Nasi Box Spesial",
        qty: 2,
        price: 30000,
        image: "https://source.unsplash.com/80x80/?rice-box",
      },
      {
        name: "Tumpeng Mini",
        qty: 1,
        price: 50000,
        image: "https://source.unsplash.com/80x80/?tumpeng",
      },
    ],
    total: 110000,
    status: "Selesai",
  },
  {
    id: 2,
    date: "2025-06-10",
    items: [
      {
        name: "Snack Box",
        qty: 3,
        price: 20000,
        image: "https://source.unsplash.com/80x80/?snack-box",
      },
    ],
    total: 60000,
    status: "Dibatalkan",
  },
];

const OrderHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Ganti dengan fetch data asli dari Supabase kalau nanti sudah tersedia
    setHistory(dummyHistory);
  }, []);

  return (
    <UserLayout>
      <section
        className="h-[50vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage:
            "url('https://s1-id.alongwalker.co/wp-content/uploads/2024/07/image-top-10-pilihan-catering-di-pekanbaru-riau-buat-acara-maupun-harian-manakah-yang-paling-enak-dan-murah-62258e4294ff1f402c284956a551228f.jpg')",
        }}
      >
        <div className="bg-black/60 p-8 rounded-xl max-w-2xl">
          <h1 className="text-4xl font-extrabold mb-2">Riwayat Pesanan Kamu 🧾</h1>
          <p className="text-white text-sm sm:text-base">
            Lihat kembali pesanan sebelumnya dan lakukan repeat order dengan mudah!
          </p>
        </div>
      </section>

      <div className="min-h-screen bg-[#FFF8F0] py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow border border-orange-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[#D2691E] mb-6 text-center font-serif">
            Riwayat Transaksi
          </h2>

          {history.length === 0 ? (
            <p className="text-center text-gray-600 italic">
              Belum ada transaksi yang tercatat.
            </p>
          ) : (
            history.map((order) => (
              <div
                key={order.id}
                className="mb-6 border border-orange-100 rounded-lg p-4 shadow-sm bg-orange-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-[#8B4513]">
                      Tanggal Pesanan: {order.date}
                    </p>
                    <p className="text-sm text-gray-500">Status: {order.status}</p>
                  </div>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1 rounded-full text-sm">
                    Repeat Order
                  </button>
                </div>

                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.qty} x Rp {item.price.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-[#D2691E]">
                      Rp {(item.qty * item.price).toLocaleString()}
                    </p>
                  </div>
                ))}

                <hr className="my-2" />
                <div className="text-right font-semibold text-[#A0522D]">
                  Total: Rp {order.total.toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default OrderHistory;
