import React, { useState } from "react";
import {
  Search,
  Filter,
  Utensils,
  Coffee,
  IceCream,
  Sandwich,
  Box,
} from "lucide-react";

const alaCarteMenus = [
  // Makanan Berat
  { id: 1, name: "Nasi Goreng Kampung", category: "Makanan", price: 18000 },
  { id: 2, name: "Ayam Bakar Sambal Ijo", category: "Makanan", price: 22000 },
  { id: 3, name: "Sate Ayam + Lontong", category: "Makanan", price: 20000 },
  { id: 4, name: "Rendang Daging", category: "Makanan", price: 28000 },
  { id: 5, name: "Nasi Uduk Komplit", category: "Makanan", price: 23000 },
  // Makanan Ringan
  { id: 6, name: "Risoles Mayo", category: "Makanan Ringan", price: 7000 },
  { id: 7, name: "Pastel Goreng", category: "Makanan Ringan", price: 6000 },
  { id: 8, name: "Tahu Isi Pedas", category: "Makanan Ringan", price: 5000 },
  { id: 9, name: "Pisang Coklat", category: "Makanan Ringan", price: 8000 },
  { id: 10, name: "Lemper Ayam", category: "Makanan Ringan", price: 4000 },
  // Minuman
  { id: 11, name: "Es Teh Manis", category: "Minuman", price: 5000 },
  { id: 12, name: "Kopi Tubruk", category: "Minuman", price: 7000 },
  { id: 13, name: "Es Jeruk Segar", category: "Minuman", price: 6000 },
  { id: 14, name: "Teh Tarik", category: "Minuman", price: 8000 },
  { id: 15, name: "Jus Alpukat", category: "Minuman", price: 10000 },
  // Dessert
  { id: 16, name: "Es Buah Segar", category: "Dessert", price: 12000 },
  { id: 17, name: "Puding Coklat Vla", category: "Dessert", price: 10000 },
  { id: 18, name: "Klepon Isi Gula", category: "Dessert", price: 7000 },
  { id: 19, name: "Kolak Pisang", category: "Dessert", price: 8000 },
  { id: 20, name: "Dadar Gulung", category: "Dessert", price: 6000 },
];

const paketMenus = [
  {
    id: "P1",
    name: "Paket Hemat 1",
    items: ["Nasi + Ayam Goreng + Es Teh"],
    price: 25000,
  },
  {
    id: "P2",
    name: "Paket Arisan",
    items: ["Nasi + Rendang + Sayur Asem + Teh Manis"],
    price: 35000,
  },
  {
    id: "P3",
    name: "Paket Kantoran",
    items: ["Nasi + Ayam Bakar + Tahu + Es Jeruk"],
    price: 30000,
  },
  {
    id: "P4",
    name: "Paket Snack Box",
    items: ["Pastel + Risoles + Teh Kotak"],
    price: 15000,
  },
  {
    id: "P5",
    name: "Paket Nasi Uduk",
    items: ["Nasi Uduk + Telur Balado + Sambal + Es Teh"],
    price: 27000,
  },
];

const categories = ["Semua", "Makanan", "Makanan Ringan", "Minuman", "Dessert"];

export default function Product() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMenus = alaCarteMenus.filter(
    (menu) =>
      (selectedCategory === "Semua" || menu.category === selectedCategory) &&
      menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderIcon = (category) => {
    switch (category) {
      case "Makanan":
        return <Utensils className="w-5 h-5 mr-2 text-orange-600" />;
      case "Makanan Ringan":
        return <Sandwich className="w-5 h-5 mr-2 text-yellow-500" />;
      case "Minuman":
        return <Coffee className="w-5 h-5 mr-2 text-blue-500" />;
      case "Dessert":
        return <IceCream className="w-5 h-5 mr-2 text-pink-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-amber-800 mb-2">Menu Catering Selera Kampung</h1>
      <p className="text-center text-gray-600 mb-8">Pilih dari berbagai menu ala carte atau paket hemat untuk acara Anda</p>

      {/* Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari menu ala carte..."
            className="w-full pl-10 pr-4 py-2 border rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center ${
                selectedCategory === cat
                  ? "bg-amber-700 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <Filter className="w-4 h-4 mr-1" />
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ala Carte Section */}
      <h2 className="text-2xl font-semibold text-amber-700 mb-4">Menu Ala Carte</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filteredMenus.map((menu) => (
          <div
            key={menu.id}
            className="p-4 border rounded-xl shadow hover:shadow-md transition bg-white"
          >
            <div className="flex items-center mb-2">
              {renderIcon(menu.category)}
              <h3 className="text-lg font-semibold text-amber-900">{menu.name}</h3>
            </div>
            <p className="text-sm text-gray-500 mb-2">{menu.category}</p>
            <div className="text-right font-bold text-green-600">
              Rp {menu.price.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Paket Section */}
      <h2 className="text-2xl font-semibold text-amber-700 mb-4">Menu Paket Spesial</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {paketMenus.map((paket) => (
          <div
            key={paket.id}
            className="p-5 border-l-4 border-amber-600 bg-amber-50 rounded-xl shadow-sm"
          >
            <div className="flex items-center mb-2">
              <Box className="w-5 h-5 mr-2 text-amber-700" />
              <h3 className="text-lg font-semibold text-amber-900">{paket.name}</h3>
            </div>
            <ul className="list-disc ml-6 text-sm text-gray-700 mb-2">
              {paket.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div className="text-right font-bold text-green-700">
              Rp {paket.price.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
