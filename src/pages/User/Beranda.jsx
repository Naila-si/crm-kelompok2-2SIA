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
        <div className="bg-black/50 p-8 rounded-lg max-w-xl">
          <img src="/logo.png" alt="Logo" className="mx-auto mb-4 h-20" />
          <h1 className="text-4xl font-bold">Food Catering Service</h1>
          <p className="mt-2 text-lg">Nikmati layanan catering sesuai kebutuhanmu!</p>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Kami menyediakan layanan cepat dan informatif seputar menu, harga, dan pemesanan,
          agar pelanggan dapat mengambil keputusan dengan mudah dan nyaman.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "Order Management",
              desc: "Pantau riwayat dan status pesanan Anda.",
               action: () => navigate('/order-management'),
            },
            {
              title: "Informasi Menu",
              desc: "Lihat daftar menu lengkap dengan harga.",
              action: () => navigate('/informasi-menu'),
            },
            {
              title: "Tracking Delivery",
              desc: "Lacak status pengiriman secara real-time.",
              action: () => navigate('/tracking'),
            },
            {
              title: "Customer Support",
              desc: "Kami siap bantu Anda 24/7.",
              action: null,
            },
            {
              title: "Konsultasi Catering",
              desc: "Bantu pilih menu terbaik sesuai acara Anda.",
              action: null,
            },
          ].map((service, i) => (
            <div
              key={i}
              className="border rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer"
              onClick={service.action}
            >
              <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Orders */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-orange-600 font-bold">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-16 px-6 bg-orange-100">
        <h2 className="text-3xl font-bold text-center mb-10">Feedback From Customers</h2>
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
            <div key={i} className="bg-white p-6 rounded-xl shadow">
              <p className="italic mb-3">"{fb.message}"</p>
              <p className="font-bold text-right">- {fb.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Beranda;
