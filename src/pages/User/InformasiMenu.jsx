import React from 'react';

const menuList = [
  {
    name: "Udang Sambal",
    image: "https://dlinacatering.com/wp-content/uploads/2012/05/udang-mayonnaise.jpg",
    price: "Rp 20.000",
    desc: "Pedas gurih bikin nagih! Udang segar berpadu sambal khas rumahan.",
  },
  {
    name: "Goreng Ati Ampela",
    image: "https://asset.kompas.com/crops/chbuyJr95kXOjX87OzwiCXb4spY=/0x295:750x795/1200x800/data/photo/2021/05/25/60ac66ba41720.jpg",
    price: "Rp 15.000",
    desc: "Gorengan ati ampela kriuk dengan bumbu meresap, bikin susah berhenti.",
  },
  {
    name: "Sayur Asem",
    image: "https://graciacatering.com/wp-content/uploads/2020/05/Sayur-asem.jpg",
    price: "Rp 10.000",
    desc: "Sayur asem khas rumahan dengan kuah bening dan isian lengkap.",
  },
];

const InformasiMenu = () => {
  return (
    <div className="font-sans text-[#5D3A1A] bg-[#F8F4E3]">
      {/* Header */}
      <section
        className="h-[60vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage:
            "url('https://s1-id.alongwalker.co/wp-content/uploads/2024/07/image-top-10-pilihan-catering-di-pekanbaru-riau-buat-acara-maupun-harian-manakah-yang-paling-enak-dan-murah-62258e4294ff1f402c284956a551228f.jpg')",
        }}
      >
        <div className="bg-black/60 p-8 rounded-xl max-w-xl shadow-xl">
          <img src="/logo.png" alt="Logo" className="h-20 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold">Informasi Menu</h1>
          <p className="mt-2 text-base">
            Menu favorit pelanggan Selera Kampung Pekanbaru, dari lauk pedas sampai sayur segar!
          </p>
        </div>
      </section>

      {/* Popular Orders */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 text-orange-700">Popular Orders</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Menu paling laris, rasa paling dicari! Ini dia pilihan spesial yang jadi favorit banyak pelanggan.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {menuList.map((menu, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <img
                src={menu.image}
                alt={menu.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-bold">{menu.name}</h3>
                <p className="text-orange-600 font-bold">{menu.price}</p>
                <p className="text-sm text-gray-700 mt-2">{menu.desc}</p>
                <button className="mt-4 bg-[#9C2D2D] text-white px-4 py-2 rounded hover:bg-[#801c1c] transition text-sm">
                  Pesan
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-20 px-6 bg-[#FFF9ED] text-center">
        <h2 className="text-3xl font-bold mb-10 text-[#9C2D2D]">Kategori Menu</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {["Menu Harian", "Paket Nasi Kotak", "Catering Acara", "Makanan Ringan", "Minuman Segar"].map((kategori, i) => (
            <div key={i} className="bg-white px-6 py-4 rounded-xl shadow hover:shadow-lg transition text-lg font-medium">
              {kategori}
            </div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-6 text-center bg-white">
        <h2 className="text-3xl font-bold mb-6">Kenapa Pilih Selera Kampung?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-left">
          {[
            {
              title: "✅ Rasa Otentik",
              desc: "Kami menghidangkan cita rasa rumahan yang autentik, bumbu meresap hingga ke hati.",
            },
            {
              title: "🚚 Pengiriman Cepat",
              desc: "Pesanan Anda akan diantar tepat waktu dengan sistem pelacakan langsung.",
            },
            {
              title: "💰 Harga Bersahabat",
              desc: "Nikmati menu lezat tanpa menguras dompet. Cocok untuk harian maupun acara besar.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-orange-50 p-6 rounded-xl shadow hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimoni Singkat */}
      <section className="py-20 px-6 bg-[#FFEFD5] text-center">
        <h2 className="text-3xl font-bold mb-8">Apa Kata Mereka?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              name: "Lina, Mahasiswa",
              msg: "Makanan bergizi dan murah, cocok buat anak kos kayak aku!",
            },
            {
              name: "Pak Rudi, Dosen",
              msg: "Pernah pakai untuk acara kantor, semua puas dan porsinya pas!",
            },
          ].map((fb, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow text-left">
              <p className="italic text-gray-700 mb-2">"{fb.msg}"</p>
              <p className="text-right font-bold text-orange-700">- {fb.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-[#9C2D2D] text-white">
        <h2 className="text-3xl font-bold mb-4">Siap Pesan Hari Ini?</h2>
        <p className="mb-6 text-lg">Langsung klik tombol di bawah dan rasakan sendiri kelezatan Selera Kampung!</p>
        <button className="bg-white text-[#9C2D2D] px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-200 transition">
          Lihat Menu Lengkap
        </button>
      </section>
    </div>
  );
};

export default InformasiMenu;
