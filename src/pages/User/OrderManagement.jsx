import React from 'react';

const orders = [
  {
    id: 'ORD001',
    name: 'Nasi Box Spesial',
    status: 'Diproses',
    date: '2025-06-24',
    price: 'Rp 30.000',
  },
  {
    id: 'ORD002',
    name: 'Tumpeng Mini',
    status: 'Dikirim',
    date: '2025-06-22',
    price: 'Rp 40.000',
  },
  {
    id: 'ORD003',
    name: 'Snack Box',
    status: 'Selesai',
    date: '2025-06-20',
    price: 'Rp 18.000',
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Diproses':
      return 'text-yellow-600';
    case 'Dikirim':
      return 'text-blue-600';
    case 'Selesai':
      return 'text-green-600';
    default:
      return 'text-gray-500';
  }
};

const OrderManagement = () => {
  return (
    <div className="font-sans text-[#333] bg-[#FFFDF7] min-h-screen">
      
      {/* Header */}
      <section
        className="h-[50vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/top-view-catering-dishes_23-2148484454.jpg')",
        }}
      >
        <div className="bg-black/50 p-8 rounded-xl shadow-lg max-w-xl">
          <img src="/logo.png" alt="Logo" className="h-20 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold">Manajemen Pesanan</h1>
          <p className="mt-2 text-base">Pantau semua pesananmu di satu tempat</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        {/* Filter Dummy */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {['Semua', 'Diproses', 'Dikirim', 'Selesai'].map((label, i) => (
            <button
              key={i}
              className="px-5 py-2 border border-[#9C2D2D] text-[#9C2D2D] rounded-full hover:bg-[#9C2D2D] hover:text-white transition text-sm"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-[#f0e5d8] rounded-2xl p-6 shadow hover:shadow-md transition relative"
            >
              <div className="absolute top-0 right-0 px-3 py-1 bg-orange-100 text-xs rounded-bl-xl font-semibold text-orange-700">
                #{order.id}
              </div>

              <h3 className="text-xl font-bold text-[#5D3A1A] mb-1">{order.name}</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">Tanggal: {order.date}</span>
                <span className={`text-sm font-semibold ${getStatusColor(order.status)}`}>
                  ● {order.status}
                </span>
              </div>

              <p className="text-lg font-bold text-[#9C2D2D] mb-1">{order.price}</p>

              <div className="text-sm text-gray-500">
                Status pesanan Anda saat ini: <span className="font-medium">{order.status}</span>.
                Kami akan terus memperbarui jika ada perubahan.
              </div>

              <div className="mt-4 flex justify-end">
                <button className="text-sm text-[#9C2D2D] font-medium hover:underline">
                  Detail Pesanan
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-[#9C2D2D] text-white text-center mt-10">
        <h2 className="text-3xl font-bold mb-3">Pesanan Baru? Kami Siap!</h2>
        <p className="mb-6">Nikmati layanan cepat dan menu lezat hanya di Selera Kampung.</p>
        <button className="bg-white text-[#9C2D2D] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
          Buat Pesanan Baru
        </button>
      </section>
    </div>
  );
};

export default OrderManagement;
