import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../../components/User/UserLayout';
import { supabase } from '../../supabase';
import Testimoni from "../../components/User/Testimoni";

const categories = ["Semua", "Nasi Box", "Sayur", "Snack", "Minuman"];
const types = ["paket", "ala-carte"]; // Jenis menu

const InformasiMenu = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("paket");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [cart, setCart] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [testimoni, setTestimoni] = useState([]);

  useEffect(() => {
    const fetchTestimoni = async () => {
      const { data, error } = await supabase.from("testimoni").select("*");
      if (error) console.error("Gagal ambil testimoni:", error.message);
      else setTestimoni(data);
    };

    fetchTestimoni();
  }, []);

  useEffect(() => {
    const fetchMenus = async () => {
      const { data, error } = await supabase.from("menus").select("*");
      if (error) {
        console.error("Gagal ambil menu:", error.message);
      } else {
        setMenuList(data);
      }
    };

    fetchMenus();
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const [activePromo, setActivePromo] = useState(null);

  useEffect(() => {
    const promo = JSON.parse(localStorage.getItem("promo_aktif"));
    if (promo) setActivePromo(promo);
  }, []);


  const filteredMenu = menuList.filter((menu) =>
    (selectedCategory === "Semua" || menu.category === selectedCategory) &&
    menu.type === selectedType
  );

  const addToCart = (menuItem) => {
    const existingCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, { ...menuItem, qty: 1 }];
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <div className="font-sans text-[#5D3A1A] bg-[#F8F4E3]">
      <UserLayout>
        {/* Hero */}
        <section
          className="h-[50vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
          style={{
            backgroundImage:
              "url('https://s1-id.alongwalker.co/wp-content/uploads/2024/07/image-top-10-pilihan-catering-di-pekanbaru-riau-buat-acara-maupun-harian-manakah-yang-paling-enak-dan-murah-62258e4294ff1f402c284956a551228f.jpg')",
          }}
        >
          <div className="bg-black/60 p-10 rounded-2xl max-w-xl shadow-xl">
            <h1 className="text-4xl font-extrabold">Informasi Menu</h1>
            <p className="mt-2 text-lg font-medium">
              Temukan semua menu favorit pelanggan – lengkap dengan harga & deskripsi.
            </p>
          </div>
        </section>

        {/* Filter Jenis Menu */}
        <section className="pt-10 px-6 bg-[#FFF9ED] text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#9C2D2D]">Jenis Menu</h2>
          <div className="flex justify-center gap-4 mb-6">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-5 py-2 rounded-full font-medium border transition ${
                  selectedType === type
                    ? 'bg-[#9C2D2D] text-white'
                    : 'bg-white text-[#9C2D2D] border-[#9C2D2D]'
                }`}
              >
                {type === "paket" ? "Paket" : "Ala Carte"}
              </button>
            ))}
          </div>

          {/* Filter Kategori */}
          <h2 className="text-2xl font-semibold mb-3 text-[#5D3A1A]">Pilih Kategori</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm border ${
                  selectedCategory === cat
                    ? 'bg-[#5D3A1A] text-white'
                    : 'bg-white text-[#5D3A1A] border-[#5D3A1A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Menu List */}
        <section className="py-16 px-6">
          {filteredMenu.length > 0 ? (
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
          ) : (
            <p className="text-center text-gray-500">Menu tidak ditemukan.</p>
          )}

          {cart.length > 0 && (
            <div className="text-center mt-12">
              <p className="mb-4 text-lg font-medium text-[#5D3A1A]">
                Total item di keranjang: {cart.length}
              </p>
              {activePromo && (
                <div className="mb-4 text-sm text-green-700 bg-green-100 px-4 py-2 rounded-full inline-block">
                  Promo aktif: <strong>{activePromo.kode}</strong> - Potongan {activePromo.diskon}%
                </div>
              )}
              <button
                onClick={() => navigate('/checkout')}
                className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition"
              >
                Lanjutkan Pesanan
              </button>
            </div>
          )}
        </section>
        <Testimoni testimoni={testimoni} />
      </UserLayout>
    </div>
  );
};

export default InformasiMenu;
