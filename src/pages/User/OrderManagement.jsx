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
    <div className="font-sans text-[#333] bg-[#F8F4E3] min-h-screen px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4 text-[#5D3A1A]">Order Management</h1>
        <p className="text-center text-gray-700 mb-10">
          Pantau riwayat dan status pesanan Anda.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border rounded-xl p-6 shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{order.name}</h3>
                <span className={`font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">Tanggal: {order.date}</p>
              <p className="text-sm text-gray-600">Harga: {order.price}</p>
              <p className="text-xs text-gray-400 mt-2">Kode Pesanan: {order.id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
