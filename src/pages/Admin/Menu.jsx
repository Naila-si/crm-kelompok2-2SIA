import React, { useState, useEffect } from "react";
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
import { supabase } from "../../supabase";

const categories = ["Semua", "Makanan", "Makanan Ringan", "Minuman", "Dessert"];
export default function Menu() {
  const [menus, setMenus] = useState([]);
  const [paketMenus, setPaketMenus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [editMenu, setEditMenu] = useState(null);
  const [detailMenu, setDetailMenu] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editPaket, setEditPaket] = useState(null);
  const [detailPaket, setDetailPaket] = useState(null);

  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const getHargaSetelahDiskon = (harga) => {
    if (typeof harga !== "number") return 0; // 🛑 tambahkan ini
    if (!user?.level) return harga;
    switch (user.level) {
      case "bronze":
        return harga * 0.95;
      case "silver":
        return harga * 0.9;
      case "gold":
        return harga * 0.85;
      default:
        return harga;
    }
  };


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

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    const { data, error } = await supabase.from("menus").select("*");
    if (error) toast.error("Gagal mengambil data menu");
    else setMenus(data);
  };

  useEffect(() => {
    const fetchPakets = async () => {
      const { data, error } = await supabase.from("pakets").select("*");
      if (error) {
        toast.error("Gagal memuat paket");
        return;
      }
      setPaketMenus(data);
    };

    fetchPakets();
  }, []);

  const handleAddMenu = async (e) => {
    e.preventDefault();
    const form = e.target;
    const file = form.imageFile.files[0];
    let imageUrl = "https://via.placeholder.com/150";

    if (file) {
      const uploadedUrl = await uploadImage(file);
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const newMenu = {
      name: form.name.value,
      category: form.category.value,
      price: parseInt(form.price.value),
      image: imageUrl,
    };

    const { error } = await supabase.from("menus").insert([newMenu]);
    if (error) toast.error("Gagal menambahkan menu");
    else {
      toast.success("Menu berhasil ditambah!");
      form.reset();
      fetchMenus();
    }
  };

  const handleEdit = (menu) => setEditMenu(menu);

  const handleDelete = async (menu) => {
    if (window.confirm(`Hapus menu "${menu.name}"?`)) {
      const { error } = await supabase.from("menus").delete().eq("id", menu.id);
      if (error) toast.error("Gagal menghapus menu");
      else {
        toast.success("Menu berhasil dihapus!");
        fetchMenus();
      }
    }
  };

  const handleDetail = (menu) => setDetailMenu(menu);

  const handleUpdateMenu = async (e, id) => {
    e.preventDefault();
    const form = e.target;
    const file = form.imageFile.files[0];
    let imageUrl = editMenu.image;

    if (file) {
      const uploadedUrl = await uploadImage(file);
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const updatedMenu = {
      name: form.name.value,
      category: form.category.value,
      price: parseInt(form.price.value),
      image: imageUrl,
    };

    const { error } = await supabase.from("menus").update(updatedMenu).eq("id", id);
    if (error) toast.error("Gagal memperbarui menu");
    else {
      toast.success("Menu berhasil diperbarui!");
      setEditMenu(null);
      form.reset();
      fetchMenus();
    }
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("menu-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload Error:", uploadError.message);
      toast.error(`Gagal upload gambar: ${uploadError.message}`);
      return null;
    }

    const { data: publicData } = supabase.storage
      .from("menu-images")
      .getPublicUrl(filePath);

    return publicData.publicUrl;
  };

  const [menuUnggulan, setMenuUnggulan] = useState([]);

  useEffect(() => {
    const fetchUnggulan = async () => {
      const { data, error } = await supabase.from("menu_unggulan").select("*");
      if (error) toast.error("Gagal memuat menu unggulan");
      else setMenuUnggulan(data);
    };

    fetchUnggulan();
  }, []);


  const handleSetMenuUnggulan = async (menu) => {
    if (isSubmitting) return; // cegah double click
    setIsSubmitting(true);

    const unggulan = {
      nama: menu.name,
      harga: menu.price,
      gambar_url: menu.image,
    };

    const { error } = await supabase.from("menu_unggulan").insert([unggulan]);

    if (error) {
      toast.error("Gagal menjadikan menu unggulan");
      console.error(error);
    } else {
      toast.success(`"${menu.name}" jadi Menu Unggulan!`);
    }

    setIsSubmitting(false);
  };

  const handleDeleteMenuUnggulan = async (id) => {
    if (!window.confirm("Yakin ingin menghapus menu unggulan ini?")) return;

    const { error } = await supabase.from("menu_unggulan").delete().eq("id", id);
    if (error) toast.error("Gagal menghapus menu unggulan");
    else {
      toast.success("Berhasil dihapus dari menu unggulan");
      setMenuUnggulan(menuUnggulan.filter((item) => item.id !== id));
    }
  };

  const filteredMenuUnggulan = menuUnggulan.filter((item) => {
    if (!item.level) return true; // tampilkan semua jika tidak ada level khusus
    return item.level === user?.level;
  });


  const handleAddPaket = async (e) => {
    e.preventDefault();
    const form = e.target;
    const file = form.imageFile.files[0];
    let imageUrl = "https://via.placeholder.com/150";

    if (file) {
      const uploadedUrl = await uploadImage(file); // pakai fungsi yang sama
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const newPaket = {
      name: form.name.value,
      items: form.items.value.split(",").map((item) => item.trim()),
      price: parseInt(form.price.value),
      image: imageUrl,
    };

    const { error } = await supabase.from("pakets").insert([newPaket]);
    if (error) {
      toast.error("Gagal menambahkan paket");
      return;
    }

    toast.success("Paket berhasil ditambah!");
    form.reset();

    const { data: updated, error: fetchErr } = await supabase.from("pakets").select("*");
    if (!fetchErr) setPaketMenus(updated);
  };

  const handleEditPaket = (paket) => {
    setEditPaket(paket);
  };

  const handleDetailPaket = (paket) => {
    setDetailPaket(paket);
  };

  const handleDeletePaket = async (paket) => {
    if (!window.confirm(`Hapus paket "${paket.name}"?`)) return;

    const { error } = await supabase.from("pakets").delete().eq("id", paket.id);
    if (error) return toast.error("Gagal menghapus paket");

    toast.success("Paket berhasil dihapus!");
    setPaketMenus((prev) => prev.filter((item) => item.id !== paket.id));
  };

  const handleUpdatePaket = async (e, id) => {
    e.preventDefault();
    const form = e.target;
    const file = form.imageFile.files[0];
    let imageUrl = editPaket.image;

    if (file) {
      const uploadedUrl = await uploadImage(file);
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const updatedPaket = {
      name: form.name.value,
      items: form.items.value.split(",").map((item) => item.trim()),
      price: parseInt(form.price.value),
      image: imageUrl,
    };

    const { error } = await supabase.from("pakets").update(updatedPaket).eq("id", id);
    if (error) toast.error("Gagal memperbarui paket");
    else {
      toast.success("Paket berhasil diperbarui!");
      setEditPaket(null);
      form.reset();
      const { data, error: fetchErr } = await supabase.from("pakets").select("*");
      if (!fetchErr) setPaketMenus(data);
    }
  };

  const handleDeleteAllMenuUnggulan = async () => {
    if (!window.confirm("Yakin ingin menghapus semua menu unggulan?")) return;

    const { error } = await supabase.from("menu_unggulan").delete().neq("id", 0);
    if (error) toast.error("Gagal menghapus semua menu unggulan");
    else {
      toast.success("Semua menu unggulan berhasil dihapus");
      setMenuUnggulan([]);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center" style={{ backgroundImage: 'url("/background.jpg")' }}>
      <div className="bg-white bg-opacity-95 rounded-xl shadow-lg w-full max-w-[1440px] mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-amber-800 mb-2">Manajemen Informasi Menu & Harga</h1>
        <p className="text-center text-gray-600 mb-8">Halaman ini berguna untuk menambahkan, mengedit, atau menghapus informasi menu dan harga sesuai kebutuhan pelanggan</p>

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

        {/* Menu Ala Carte */}
        <h2 className="text-2xl font-semibold text-amber-700 mb-4">Menu Ala Carte</h2>
        {/* Form Tambah/Edit Menu Ala Carte */}
        <form onSubmit={editMenu ? (e) => handleUpdateMenu(e, editMenu.id) : handleAddMenu} className="mb-8 bg-yellow-50 p-4 rounded-xl shadow-md max-w-xl mx-auto">
          <h3 className="text-lg font-bold text-amber-800 mb-2">
            {editMenu ? "Edit Menu Ala Carte" : "Tambah Menu Ala Carte"}
          </h3>

          <input
            type="text"
            name="name"
            defaultValue={editMenu?.name || ""}
            placeholder="Nama Menu"
            className="w-full mb-2 px-4 py-2 border rounded"
            required
          />
          <select
            name="category"
            defaultValue={editMenu?.category || ""}
            className="w-full mb-2 px-4 py-2 border rounded"
            required
          >
            <option value="" disabled>Pilih Kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Makanan Ringan">Makanan Ringan</option>
            <option value="Minuman">Minuman</option>
            <option value="Dessert">Dessert</option>
          </select>
          <input
            type="number"
            name="price"
            defaultValue={editMenu?.price || ""}
            placeholder="Harga"
            className="w-full mb-2 px-4 py-2 border rounded"
            required
          />
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            className="w-full mb-4 px-4 py-2 border rounded"
          />

          <div className="flex justify-between">
            <button type="submit" className="bg-amber-700 text-white py-2 px-4 rounded hover:bg-amber-800">
              {editMenu ? "Simpan Perubahan" : "Tambah Menu"}
            </button>
            {editMenu && (
              <button type="button" onClick={() => setEditMenu(null)} className="text-red-600 hover:underline">
                Batal Edit
              </button>
            )}
          </div>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {filteredMenus.map((menu) => {
            const harga = getHargaSetelahDiskon(menu.price);
            return (
              <div key={menu.id} className="p-4 border ...">
                <div className="flex items-center mb-2">
                  {renderIcon(menu.category)}
                  <h3 className="text-lg font-semibold text-amber-900">{menu.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-2">{menu.category}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm font-bold text-green-700">
                    Rp {(harga != null ? harga : 0).toLocaleString()}
                  </p>
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => handleEdit(menu)} className="text-sm text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(menu)} className="text-sm text-red-600 hover:underline">Hapus</button>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => handleDetail(menu)} className="text-sm text-amber-700 hover:underline">Detail</button>
                    <button onClick={() => handleSetMenuUnggulan(menu)} className="text-sm text-amber-600 hover:underline">Jadikan Menu Unggulan</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Paket */}
        <h2 className="text-2xl font-semibold text-amber-700 mb-4 mt-12">Paket Menu</h2>
        {/* Form Tambah/Edit Paket */}
      <form onSubmit={editPaket ? (e) => handleUpdatePaket(e, editPaket.id) : handleAddPaket} className="mb-8 bg-green-50 p-4 rounded-xl shadow-md max-w-xl mx-auto">
        <h3 className="text-lg font-bold text-green-800 mb-2">{editPaket ? "Edit Paket Menu" : "Tambah Paket Menu"}</h3>

        <input
          type="text"
          name="name"
          defaultValue={editPaket?.name || ""}
          placeholder="Nama Paket"
          className="w-full mb-2 px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          name="items"
          defaultValue={Array.isArray(editPaket?.items) ? editPaket.items.join(", ") : ""}
          placeholder="Isi Paket (pisahkan dengan koma)"
          className="w-full mb-2 px-4 py-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          defaultValue={editPaket?.price || ""}
          placeholder="Harga Paket"
          className="w-full mb-2 px-4 py-2 border rounded"
          required
        />
        <input
          type="file"
          name="imageFile"
          accept="image/*"
          className="w-full mb-4 px-4 py-2 border rounded"
        />

        <div className="flex justify-between">
          <button type="submit" className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800">
            {editPaket ? "Simpan Perubahan" : "Tambah Paket"}
          </button>
          {editPaket && (
            <button type="button" onClick={() => setEditPaket(null)} className="text-red-600 hover:underline">
              Batal Edit
            </button>
          )}
        </div>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {paketMenus.map((paket) => (
          <div key={paket.id} className="p-4 border border-green-200 rounded-xl shadow bg-gradient-to-b from-green-50 to-white">
            <img
              src={paket.image || "https://via.placeholder.com/150"}
              alt={paket.name}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-semibold text-green-900">{paket.name}</h3>
            <p className="text-sm text-gray-600 mb-1">
              Isi: {Array.isArray(paket.items) ? paket.items.join(", ") : paket.items}
            </p>
              {user?.level ? (
                <p className="text-sm text-gray-500 line-through">Rp {paket.price.toLocaleString()}</p>
              ) : null}
              <p className="text-sm font-bold text-green-700">
                Rp {(getHargaSetelahDiskon(paket.price) || 0).toLocaleString()}
              </p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEditPaket(paket)} className="text-sm text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDetailPaket(paket)} className="text-sm text-amber-700 hover:underline">Detail</button>
              <button onClick={() => handleDeletePaket(paket)} className="text-sm text-red-600 hover:underline">Hapus</button>
            </div>
          </div>
        ))}
      </div>

      {/* Menu Unggulan */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDeleteAllMenuUnggulan}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
        >
          Hapus Semua Menu Unggulan
        </button>
      </div>
      <h2 className="text-2xl font-semibold text-amber-700 mb-4 mt-12">Menu Unggulan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {filteredMenuUnggulan.map((item) => (
          <div key={item.id} className="p-4 border border-amber-200 rounded-xl shadow bg-gradient-to-b from-yellow-50 to-white">
            <img
              src={item.gambar_url || "https://via.placeholder.com/150"}
              alt={item.nama}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-semibold text-amber-900">{item.nama}</h3>
            <p className="text-sm font-bold text-green-700">Rp {item.harga.toLocaleString()}</p>
            <button
              onClick={() => handleDeleteMenuUnggulan(item.id)}
              className="mt-2 text-sm text-red-600 hover:underline"
            >
              Hapus dari Unggulan
            </button>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
