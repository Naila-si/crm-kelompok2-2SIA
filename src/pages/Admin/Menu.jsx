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
import toast, { Toaster } from "react-hot-toast";

const initialMenus = [
  { id: 1, name: "Nasi Goreng Kampung", category: "Makanan", price: 18000, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Ayam Bakar Sambal Ijo", category: "Makanan", price: 22000, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Sate Ayam + Lontong", category: "Makanan", price: 20000, image: "https://via.placeholder.com/150" },
  { id: 4, name: "Rendang Daging", category: "Makanan", price: 28000, image: "https://via.placeholder.com/150" },
  { id: 5, name: "Nasi Uduk Komplit", category: "Makanan", price: 23000, image: "https://via.placeholder.com/150" },
  { id: 6, name: "Risoles Mayo", category: "Makanan Ringan", price: 7000, image: "https://via.placeholder.com/150" },
  { id: 7, name: "Pastel Goreng", category: "Makanan Ringan", price: 6000, image: "https://via.placeholder.com/150" },
  { id: 8, name: "Tahu Isi Pedas", category: "Makanan Ringan", price: 5000, image: "https://via.placeholder.com/150" },
  { id: 9, name: "Pisang Coklat", category: "Makanan Ringan", price: 8000, image: "https://via.placeholder.com/150" },
  { id: 10, name: "Lemper Ayam", category: "Makanan Ringan", price: 4000, image: "https://via.placeholder.com/150" },
  { id: 11, name: "Es Teh Manis", category: "Minuman", price: 5000, image: "https://via.placeholder.com/150" },
  { id: 12, name: "Kopi Tubruk", category: "Minuman", price: 7000, image: "https://via.placeholder.com/150" },
  { id: 13, name: "Es Jeruk Segar", category: "Minuman", price: 6000, image: "https://via.placeholder.com/150" },
  { id: 14, name: "Teh Tarik", category: "Minuman", price: 8000, image: "https://via.placeholder.com/150" },
  { id: 15, name: "Jus Alpukat", category: "Minuman", price: 10000, image: "https://via.placeholder.com/150" },
  { id: 16, name: "Es Buah Segar", category: "Dessert", price: 12000, image: "https://via.placeholder.com/150" },
  { id: 17, name: "Puding Coklat Vla", category: "Dessert", price: 10000, image: "https://via.placeholder.com/150" },
  { id: 18, name: "Klepon Isi Gula", category: "Dessert", price: 7000, image: "https://via.placeholder.com/150" },
  { id: 19, name: "Kolak Pisang", category: "Dessert", price: 8000, image: "https://via.placeholder.com/150" },
  { id: 20, name: "Dadar Gulung", category: "Dessert", price: 6000, image: "https://via.placeholder.com/150" },
];

const categories = ["Semua", "Makanan", "Makanan Ringan", "Minuman", "Dessert"];

export default function Menu() {
  const [menus, setMenus] = useState(initialMenus);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [editMenu, setEditMenu] = useState(null);
  const [detailMenu, setDetailMenu] = useState(null);
  const [editPaket, setEditPaket] = useState(null);
  const [detailPaket, setDetailPaket] = useState(null);
  const [lastUpdatedMenu, setLastUpdatedMenu] = useState(new Date());
  const [lastUpdatedPaket, setLastUpdatedPaket] = useState(new Date());

  const [paketMenus, setPaketMenus] = useState([
  { id: "P1", name: "Paket Hemat 1", items: ["Nasi + Ayam Goreng + Es Teh"], price: 25000, image: "https://via.placeholder.com/150" },
  { id: "P2", name: "Paket Arisan", items: ["Nasi + Rendang + Sayur Asem + Teh Manis"], price: 35000, image: "https://via.placeholder.com/150" },
  { id: "P3", name: "Paket Kantoran", items: ["Nasi + Ayam Bakar + Tahu + Es Jeruk"], price: 30000, image: "https://via.placeholder.com/150" },
  { id: "P4", name: "Paket Snack Box", items: ["Pastel + Risoles + Teh Kotak"], price: 15000, image: "https://via.placeholder.com/150" },
  { id: "P5", name: "Paket Nasi Uduk", items: ["Nasi Uduk + Telur Balado + Sambal + Es Teh"], price: 27000, image: "https://via.placeholder.com/150" },
]);

  const filteredMenus = menus.filter(
    (menu) =>
      (selectedCategory === "Semua" || menu.category === selectedCategory) &&
      menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderIcon = (category) => {
    switch (category) {
      case "Makanan": return <Utensils className="w-5 h-5 mr-2 text-orange-600" />;
      case "Makanan Ringan": return <Sandwich className="w-5 h-5 mr-2 text-yellow-500" />;
      case "Minuman": return <Coffee className="w-5 h-5 mr-2 text-blue-500" />;
      case "Dessert": return <IceCream className="w-5 h-5 mr-2 text-pink-500" />;
      default: return null;
    }
  };

  const handleAddMenu = (e) => {
    e.preventDefault();
    const form = e.target;
    const newMenu = {
      id: menus.length + 1,
      name: form.name.value,
      category: form.category.value,
      price: parseInt(form.price.value),
      image: form.image.value || "",
    };
    setMenus([...menus, newMenu]);
    form.reset();
    toast.success("Menu berhasil ditambah!");
    setLastUpdatedMenu(new Date());
  };

  const handleEdit = (menu) => {
    console.log("Edit klik:", menu);
    setEditMenu(menu);
  };

  const handleDelete = (menu) => {
    if (window.confirm(`Hapus menu "${menu.name}"?`)) {
      setMenus(menus.filter((item) => item.id !== menu.id));
      toast.success("Menu berhasil dihapus!");
      // setLastUpdated(new Date());
    }
  };

  const handleDetail = (menu) => setDetailMenu(menu);
  const handleEditPaket = (paket) => {
    setEditPaket(paket);
  };

  const handleAddPaket = (e) => {
    e.preventDefault();
    const form = e.target;
    const newPaket = {
      id: "P" + (paketMenus.length + 1),
      name: form.name.value,
      items: form.items.value.split(",").map((item) => item.trim()),
      price: parseInt(form.price.value),
      image: form.image.value || "",
    };
    setPaketMenus([...paketMenus, newPaket]);
    form.reset();
    toast.success("Paket berhasil ditambah!");
    setLastUpdatedPaket(new Date());
  };

  const handleDeletePaket = (paket) => {
    if (window.confirm(`Hapus paket "${paket.name}"?`)) {
      setPaketMenus((prev) => prev.filter((item) => item.id !== paket.id));
      toast.success("Paket berhasil dihapus!");
    }
  };

  const handleDetailPaket = (paket) => {
    setDetailPaket(paket);
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center py-0 px-0" style={{ backgroundImage: 'url("/background.jpg")' }}>
      <div className="bg-white bg-opacity-95 rounded-xl shadow-lg w-full max-w-[1440px] mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-amber-800 mb-2">Manajemen Informasi Menu & Harga</h1>
        <p className="text-center text-gray-600 mb-8">Halaman ini berguna untuk menambahkan, mengedit, atau menghapus informasi menu dan harga sesuai kebutuhan pelanggan</p>

        {/* Detail Menu */}
        {detailMenu?.id && (
          <div className="bg-blue-50 p-4 rounded-xl shadow mb-8 w-full border border-blue-300">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Detail Menu</h3>
            {detailMenu.image && (
              <img src={detailMenu.image} alt={detailMenu.name} className="w-full max-w-xs h-48 object-cover rounded mb-4" />
            )}
            <p><strong>Nama:</strong> {detailMenu.name}</p>
            <p><strong>Kategori:</strong> {detailMenu.category}</p>
            <p><strong>Harga:</strong> Rp {detailMenu.price.toLocaleString()}</p>
            <button onClick={() => setDetailMenu(null)} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Tutup</button>
          </div>
        )}

        {/* Form Edit Menu */}
        {editMenu?.id && (
          <div className="bg-yellow-100 p-4 rounded-xl shadow mb-8 w-full">
            <h3 className="text-lg font-semibold mb-2 text-amber-800">Edit Menu: {editMenu.name}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updated = {
                  ...editMenu,
                  name: e.target.name.value,
                  category: e.target.category.value,
                  price: parseInt(e.target.price.value),
                  image: e.target.image.value || "",
                };
                setMenus((prev) =>
                  prev.map((item) => (item.id === editMenu.id ? updated : item))
                );
                toast.success("Menu berhasil diperbarui!");
                setEditMenu(null);
                setLastUpdatedMenu(new Date());
              }}
              className="flex flex-col md:flex-row gap-3 items-center"
            >
              <input
                name="name"
                defaultValue={editMenu.name}
                className="border p-2 rounded w-full md:w-1/3"
                required
              />
              <select
                name="category"
                defaultValue={editMenu.category}
                className="border p-2 rounded w-full md:w-1/3"
                required
              >
                {categories.filter((c) => c !== "Semua").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                name="price"
                type="number"
                defaultValue={editMenu.price}
                className="border p-2 rounded w-full md:w-1/3"
                required
              />
              <input
                name="image"
                type="url"
                defaultValue={editMenu.image}
                placeholder="Link Gambar (opsional)"
                className="border p-2 rounded w-full md:w-1/3"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Simpan
              </button>
              <button
                type="button"
                onClick={() => setEditMenu(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
            </form>

          </div>
        )}

        {/* Form Tambah Menu */}
        <div className="bg-gray-50 p-4 rounded-xl shadow mb-8 w-full">
          <h3 className="text-lg font-semibold mb-2 text-amber-800">Tambah Menu Baru</h3>
          <form onSubmit={handleAddMenu} className="flex flex-col md:flex-row gap-3 items-center">
            <input name="name" placeholder="Nama Menu" className="border p-2 rounded w-full md:w-1/4" required />
            <select name="category" className="border p-2 rounded w-full md:w-1/4" required>
              {categories.filter((c) => c !== "Semua").map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input name="price" type="number" placeholder="Harga" className="border p-2 rounded w-full md:w-1/4" required />
            <input name="image" type="url" placeholder="Link Gambar (opsional)" className="border p-2 rounded w-full md:w-1/4" />
            <button type="submit" className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700">Tambah</button>
          </form>
          <p className="text-sm text-right text-gray-400 mt-8">
            Terakhir diperbarui: {lastUpdatedMenu.toLocaleString()}
          </p>
        </div>

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
                className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center ${selectedCategory === cat ? "bg-amber-700 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                <Filter className="w-4 h-4 mr-1" />
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Ala Carte Section */}
        <h2 className="text-2xl font-semibold text-amber-700 mb-4">Menu Ala Carte</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {filteredMenus.map((menu) => (
            <div key={menu.id} className="p-4 border border-amber-200 rounded-xl shadow hover:shadow-md transition-all duration-200 bg-gradient-to-b from-yellow-50 to-white">
              {menu.image && <img src={menu.image} alt={menu.name} className="w-full h-48 object-cover rounded-lg mb-2" />}
              <div className="flex items-center mb-2">{renderIcon(menu.category)}<h3 className="text-lg font-semibold text-amber-900">{menu.name}</h3></div>
              <p className="text-sm text-gray-500 mb-2">{menu.category}</p>
              <div className="flex justify-between items-center mt-2">
                <div className="font-bold text-green-600">Rp {menu.price.toLocaleString()}</div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(menu)} className="text-sm text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(menu)} className="text-sm text-red-600 hover:underline">Hapus</button>
                  <button onClick={() => handleDetail(menu)} className="text-sm text-amber-700 hover:underline">Detail</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form Tambah Paket */}
        <div className="bg-gray-50 p-4 rounded-xl shadow mb-8 w-full">
          <h3 className="text-lg font-semibold mb-2 text-amber-800">Tambah Paket Baru</h3>
          <form onSubmit={handleAddPaket} className="flex flex-col md:flex-row gap-3 items-center">
            <input name="name" placeholder="Nama Paket" className="border p-2 rounded w-full md:w-1/4" required />
            <input name="items" placeholder="Isi Paket (pisahkan dengan koma)" className="border p-2 rounded w-full md:w-1/4" required />
            <input name="price" type="number" placeholder="Harga" className="border p-2 rounded w-full md:w-1/4" required />
            <input name="image" type="url" placeholder="Link Gambar (opsional)" className="border p-2 rounded w-full md:w-1/4" />
            <button type="submit" className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700">Tambah</button>
          </form>
          <p className="text-sm text-right text-gray-400 mt-8">
            Terakhir diperbarui: {lastUpdatedPaket.toLocaleString()}
          </p>
        </div>

        {/* Detail Paket */}
        {detailPaket?.id && (
          <div className="bg-blue-50 p-4 rounded-xl shadow mb-8 w-full border border-blue-300">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Detail Paket</h3>
            {detailPaket.image && (
              <img src={detailPaket.image} alt={detailPaket.name} className="w-full max-w-xs h-48 object-cover rounded mb-4" />
            )}
            <p><strong>Nama:</strong> {detailPaket.name}</p>
            <p><strong>Harga:</strong> Rp {detailPaket.price.toLocaleString()}</p>
            <p><strong>Isi Paket:</strong></p>
            <ul className="list-disc ml-6 text-gray-700">
              {detailPaket.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <button onClick={() => setDetailPaket(null)} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Tutup</button>
          </div>
        )}

        {/* Form Edit Paket */}
        {editPaket?.id && (
          <div className="bg-yellow-50 p-4 rounded-xl shadow mb-8 w-full">
            <h3 className="text-lg font-semibold mb-2 text-amber-800">Edit Paket: {editPaket.name}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updated = {
                  ...editPaket,
                  name: e.target.name.value,
                  price: parseInt(e.target.price.value),
                  items: e.target.items.value.split(",").map((i) => i.trim()),
                };
                setPaketMenus((prev) =>
                  prev.map((item) => (item.id === editPaket.id ? updated : item))
                );
                toast.success("Paket berhasil diperbarui!");
                setEditPaket(null);
                setLastUpdatedPaket(new Date()); 
              }}
              className="flex flex-col md:flex-row gap-3 items-center"
            >
              <input
                name="name"
                defaultValue={editPaket.name}
                className="border p-2 rounded w-full md:w-1/3"
                required
              />
              <input
                name="items"
                defaultValue={editPaket.items.join(", ")}
                placeholder="Pisahkan dengan koma"
                className="border p-2 rounded w-full md:w-1/3"
                required
              />
              <input
                name="price"
                type="number"
                defaultValue={editPaket.price}
                className="border p-2 rounded w-full md:w-1/3"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Simpan
              </button>
              <button
                type="button"
                onClick={() => setEditPaket(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
            </form>
          </div>
        )}

        {/* Paket Section */}
        <h2 className="text-2xl font-semibold text-amber-700 mb-4">Menu Paket Spesial</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paketMenus.map((paket) => (
            <div key={paket.id} className="p-5 border-l-4 border-amber-600 bg-amber-50 rounded-xl shadow-sm">
              <div className="flex items-center mb-2">
                {paket.image && (
                  <img src={paket.image} alt={paket.name} className="w-full h-48 object-cover rounded-lg mb-3" />
                )}
                <Box className="w-5 h-5 mr-2 text-amber-700" />
                <h3 className="text-lg font-semibold text-amber-900">{paket.name}</h3>
              </div>
              <ul className="list-disc ml-6 text-sm text-gray-700 mb-2">
                {paket.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-2">
                <div className="font-bold text-green-700">Rp {paket.price.toLocaleString()}</div>
                <div className="flex gap-2">
                  <button onClick={() => handleEditPaket(paket)} className="text-sm text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDeletePaket(paket)} className="text-sm text-red-600 hover:underline">Hapus</button>
                  <button onClick={() => handleDetailPaket(paket)} className="text-sm text-amber-700 hover:underline">Detail</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}