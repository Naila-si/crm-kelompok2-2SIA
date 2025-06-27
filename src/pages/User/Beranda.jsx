import React from 'react';
import { useNavigate } from 'react-router-dom';

const Beranda = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section
        className="h-[80vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage:
            "url('https://s1-id.alongwalker.co/wp-content/uploads/2024/07/image-top-10-pilihan-catering-di-pekanbaru-riau-buat-acara-maupun-harian-manakah-yang-paling-enak-dan-murah-62258e4294ff1f402c284956a551228f.jpg')",
        }}
      >
        <div className="bg-black/60 p-10 rounded-2xl max-w-xl shadow-xl">
          <img src="/logo.png" alt="Logo" className="mx-auto mb-4 h-20" />
          <h1 className="text-4xl font-extrabold">Food Catering Service</h1>
          <p className="mt-2 text-lg font-medium">Nikmati layanan catering sesuai kebutuhanmu!</p>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-orange-600">Our Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Kami menyediakan layanan cepat dan informatif seputar menu, harga, dan pemesanan,
          agar pelanggan dapat mengambil keputusan dengan mudah dan nyaman.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: "📦",
              title: "Order Management",
              desc: "Pantau riwayat dan status pesanan Anda.",
              action: () => navigate('/order-management'),
            },
            {
              icon: "📋",
              title: "Informasi Menu",
              desc: "Lihat daftar menu lengkap dengan harga.",
              action: () => navigate('/informasi-menu'),
            },
            {
              icon: "📍",
              title: "Tracking Delivery",
              desc: "Lacak status pengiriman secara real-time.",
              action: () => navigate('/tracking'),
            },
            {
              icon: "💬",
              title: "Customer Support",
              desc: "Kami siap bantu Anda 24/7.",
              action: null,
            },
            {
              icon: "🧑‍🍳",
              title: "Konsultasi Catering",
              desc: "Bantu pilih menu terbaik sesuai acara Anda.",
              action: null,
            },
          ].map((service, i) => (
            <div
              key={i}
              className="border border-orange-200 rounded-2xl p-6 shadow-md hover:shadow-2xl hover:scale-105 transform transition duration-300 bg-white cursor-pointer"
              onClick={service.action}
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="font-bold text-xl mb-2 text-gray-800">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Orders */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-white">
        <h2 className="text-4xl font-extrabold text-center text-orange-700 mb-10">Popular Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Udang Saus Thai",
              price: "Rp 25.000",
              image: "https://dlinacatering.com/wp-content/uploads/2012/05/udang-mayonnaise.jpg",
            },
            {
              name: "Goreng Ati Ampela",
              price: "Rp 18.000",
              image: "https://asset.kompas.com/crops/chbuyJr95kXOjX87OzwiCXb4spY=/0x295:750x795/1200x800/data/photo/2021/05/25/60ac66ba41720.jpg",
            },
            {
              name: "Sayur Asem",
              price: "Rp 12.000",
              image: "https://graciacatering.com/wp-content/uploads/2020/05/Sayur-asem.jpg",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-orange-600 font-bold">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-20 px-6 bg-orange-100">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Feedback From Customers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              name: "Christine",
              message: "Makanannya enak, pengirimannya cepat, dan pelayanannya sangat ramah!",
            },
            {
              name: "Dodi",
              message: "Rekomendasi terbaik untuk acara kantor, semua puas dengan makanannya!",
            },
          ].map((fb, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
              <p className="italic mb-4 text-gray-700">"{fb.message}"</p>
              <p className="font-bold text-right text-orange-600">- {fb.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Beranda;
