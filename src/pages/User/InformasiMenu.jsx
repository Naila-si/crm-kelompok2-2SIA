import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../../components/User/UserLayout';

const menuList = [
  {
    name: "Udang Sambal",
    image: "https://dlinacatering.com/wp-content/uploads/2012/05/udang-mayonnaise.jpg",
    price: "Rp 20.000",
    desc: "Pedas gurih bikin nagih! Udang segar berpadu sambal khas rumahan.",
    category: "Nasi Box",
  },
  {
    name: "Goreng Ati Ampela",
    image: "https://asset.kompas.com/crops/chbuyJr95kXOjX87OzwiCXb4spY=/0x295:750x795/1200x800/data/photo/2021/05/25/60ac66ba41720.jpg",
    price: "Rp 15.000",
    desc: "Gorengan ati ampela kriuk dengan bumbu meresap, bikin susah berhenti.",
    category: "Nasi Box",
  },
  {
    name: "Sayur Asem",
    image: "https://graciacatering.com/wp-content/uploads/2020/05/Sayur-asem.jpg",
    price: "Rp 10.000",
    desc: "Sayur asem khas rumahan dengan kuah bening dan isian lengkap.",
    category: "Sayur",
  },
];

const categories = ["Semua", "Nasi Box", "Sayur", "Snack", "Minuman"];

const testimoni = [
  { nama: "Dina", pesan: "Makanannya enak banget, pengiriman cepat!" },
  { nama: "Riko", pesan: "Puas banget pesen buat acara kantor. Recommended!" },
  { nama: "Siti", pesan: "Pelayanan ramah dan makanannya selalu hangat." },
];

const InformasiMenu = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [cart, setCart] = useState([]);

  const filteredMenu = selectedCategory === "Semua"
    ? menuList
    : menuList.filter((menu) => menu.category === selectedCategory);

  const addToCart = (menuItem) => {
    setCart([...cart, menuItem]);
  };

  return (
    <div className="font-sans text-[#5D3A1A] bg-[#F8F4E3]">
      <UserLayout>
        <section
          className="h-[80vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
          style={{
            backgroundImage:
              "url('https://s1-id.alongwalker.co/wp-content/uploads/2024/07/image-top-10-pilihan-catering-di-pekanbaru-riau-buat-acara-maupun-harian-manakah-yang-paling-enak-dan-murah-62258e4294ff1f402c284956a551228f.jpg')",
          }}
        >
          <div className="bg-black/60 p-10 rounded-2xl max-w-xl shadow-xl">
            <img src="/logo.png" alt="Logo" className="mx-auto mb-4 h-20" />
            <h1 className="text-4xl font-extrabold">Informasi Menu</h1>
            <p className="mt-2 text-lg font-medium">
              Temukan semua menu favorit pelanggan – lengkap dengan harga & deskripsi.
            </p>
          </div>
        </section>


        {/* Kategori */}
        <section className="py-10 px-6 bg-[#FFF9ED] text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#9C2D2D]">Pilih Kategori</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full font-medium border transition ${
                  selectedCategory === cat
                    ? 'bg-[#9C2D2D] text-white'
                    : 'bg-white text-[#9C2D2D] border-[#9C2D2D]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Menu List */}
        <section className="py-16 px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {filteredMenu.map((menu, index) => (
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
                  <button
                    onClick={() => addToCart(menu)}
                    className="mt-4 bg-[#9C2D2D] text-white px-4 py-2 rounded hover:bg-[#801c1c] transition text-sm"
                  >
                    + Tambah ke Pesanan
                  </button>
                </div>
              </div>
            ))}
          </div>

          {cart.length > 0 && (
            <div className="text-center mt-12">
              <p className="mb-4 text-lg font-medium text-[#5D3A1A]">
                Total item di keranjang: {cart.length}
              </p>
              <button
                onClick={() => navigate('/checkout')}
                className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition"
              >
                Lanjutkan Pesanan
              </button>
            </div>
          )}
        </section>

        {/* Testimoni */}
        <section className="py-20 px-6 bg-orange-100">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Apa Kata Pelanggan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimoni.map((fb, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
                <p className="italic mb-4 text-gray-700">"{fb.pesan}"</p>
                <p className="font-bold text-right text-orange-600">- {fb.nama}</p>
              </div>
            ))}
          </div>
        </section>
      </UserLayout>
    </div>
  );
};

export default InformasiMenu;