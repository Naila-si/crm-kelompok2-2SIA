import React from 'react';

const menuList = [
  {
    name: "Udang Sambal",
    image: "https://dlinacatering.com/wp-content/uploads/2012/05/udang-mayonnaise.jpg",
    price: "Rp 20.000",
    desc: "Pedas Gurihnya Bikin Nagih! Udang segar berpadu sambal khas rumahan, pas banget buat yang suka rasa mantap sejak suapan pertama.",
  },
  {
    name: "Goreng Ati Ampela",
    image: "https://asset.kompas.com/crops/chbuyJr95kXOjX87OzwiCXb4spY=/0x295:750x795/1200x800/data/photo/2021/05/25/60ac66ba41720.jpg",
    price: "Rp 15.000",
    desc: "Camilan khas yang satu ini nggak pernah salah. Gorengan ati ampela kriuk dengan bumbu meresap, bikin susah berhenti.",
  },
  {
    name: "Sayur Asem",
    image: "https://graciacatering.com/wp-content/uploads/2020/05/Sayur-asem.jpg",
    price: "Rp 10.000",
    desc: "Sayur asem khas rumahan dengan kuah bening yang segar dan isian lengkap. Cocok jadi penyegar lidah yang gurih.",
  },
];

const InformasiMenu = () => {
  return (
    <div className="font-sans text-[#5D3A1A] bg-[#F8F4E3] min-h-screen">
      
      {/* Header */}
      <section
        className="h-[60vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage:
            "url('https://s1-id.alongwalker.co/wp-content/uploads/2024/07/image-top-10-pilihan-catering-di-pekanbaru-riau-buat-acara-maupun-harian-manakah-yang-paling-enak-dan-murah-62258e4294ff1f402c284956a551228f.jpg')",
        }}
      >
        <div className="bg-black/60 p-8 rounded-lg max-w-xl">
          <img src="/logo.png" alt="Logo" className="h-20 mx-auto mb-4" />
          <h1 className="text-4xl font-bold">Informasi Menu</h1>
          <p className="mt-2 text-base">
            Menu favorit pelanggan Selera Kampung Pekanbaru, dari lauk pedas sampai sayur segar!
          </p>
        </div>
      </section>

      {/* Menu List */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-2">Popular Orders</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Menu paling laris, rasa paling dicari! Ini dia pilihan spesial yang jadi favorit banyak pelanggan.
          Rekomendasi terbaik untuk kamu yang baru pertama kali memesan!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {menuList.map((menu, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={menu.image}
                alt={menu.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="text-xl font-semibold">{menu.name}</h3>
                <p className="text-[#9C2D2D] font-bold">{menu.price}</p>
                <p className="text-sm text-gray-700 mt-2">{menu.desc}</p>
                <button className="mt-4 bg-[#9C2D2D] text-white px-4 py-2 rounded hover:bg-[#801c1c] transition text-sm">
                  Pesan
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default InformasiMenu;
