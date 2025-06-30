import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import toast from "react-hot-toast";

const AdminMenuUnggulan = () => {
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState({ nama: "", harga: "", gambar_url: "" });
  const [editId, setEditId] = useState(null);

  const fetchMenus = async () => {
    const { data, error } = await supabase.from("menu_unggulan").select("*");
    if (error) {
      toast.error("Gagal mengambil data");
    } else {
      setMenus(data);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama || !form.harga || !form.gambar_url)
      return toast.error("Semua field wajib diisi");

    if (editId) {
      const { error } = await supabase
        .from("menu_unggulan")
        .update(form)
        .eq("id", editId);
      if (!error) {
        toast.success("Menu berhasil diupdate");
      }
    } else {
      const { error } = await supabase.from("menu_unggulan").insert([form]);
      if (!error) {
        toast.success("Menu berhasil ditambahkan");
      }
    }

    setForm({ nama: "", harga: "", gambar_url: "" });
    setEditId(null);
    fetchMenus();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("menu_unggulan").delete().eq("id", id);
    if (!error) {
      toast.success("Menu berhasil dihapus");
      fetchMenus();
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-orange-700 text-center mb-6">Kelola Menu Unggulan</h1>

      {/* Form Tambah / Edit */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-10">
        <input
          type="text"
          placeholder="Nama Menu"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
          className="w-full p-3 rounded border mb-4"
        />
        <input
          type="text"
          placeholder="Harga (contoh: Rp30.000)"
          value={form.harga}
          onChange={(e) => setForm({ ...form, harga: e.target.value })}
          className="w-full p-3 rounded border mb-4"
        />
        <input
          type="text"
          placeholder="URL Gambar"
          value={form.gambar_url}
          onChange={(e) => setForm({ ...form, gambar_url: e.target.value })}
          className="w-full p-3 rounded border mb-4"
        />
        <button className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700">
          {editId ? "Update Menu" : "Tambah Menu"}
        </button>
      </form>

      {/* Tabel Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menus.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <img src={item.gambar_url} alt={item.nama} className="w-full h-48 object-cover rounded mb-4" />
            <h2 className="text-xl font-semibold text-orange-700">{item.nama}</h2>
            <p className="text-gray-700 mt-1">{item.harga}</p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-400 px-4 py-1 rounded hover:bg-yellow-500 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 text-sm text-white"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMenuUnggulan;
