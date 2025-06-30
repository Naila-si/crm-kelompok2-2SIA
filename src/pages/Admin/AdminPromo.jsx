import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import toast from "react-hot-toast";

const AdminPromo = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ judul: "", deskripsi: "", gambar_url: "" });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const { data, error } = await supabase.from("promo").select("*");
    if (!error) setData(data);
    else toast.error("Gagal mengambil data promo");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.judul || !form.deskripsi || !form.gambar_url) {
      return toast.error("Semua field wajib diisi");
    }

    if (editId) {
      const { error } = await supabase.from("promo").update(form).eq("id", editId);
      if (!error) toast.success("Promo berhasil diperbarui");
    } else {
      const { error } = await supabase.from("promo").insert([form]);
      if (!error) toast.success("Promo berhasil ditambahkan");
    }

    setForm({ judul: "", deskripsi: "", gambar_url: "" });
    setEditId(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("promo").delete().eq("id", id);
    if (!error) {
      toast.success("Promo berhasil dihapus");
      fetchData();
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-orange-700 mb-6">Kelola Promo</h1>

      {/* Form Tambah/Edit */}
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-2xl mb-10">
        <input
          type="text"
          placeholder="Judul Promo"
          value={form.judul}
          onChange={(e) => setForm({ ...form, judul: e.target.value })}
          className="w-full p-3 rounded border mb-4"
        />
        <textarea
          placeholder="Deskripsi Promo"
          value={form.deskripsi}
          onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
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
          {editId ? "Update Promo" : "Tambah Promo"}
        </button>
      </form>

      {/* Daftar Promo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow hover:shadow-lg p-4">
            <img src={item.gambar_url} alt={item.judul} className="w-full h-40 object-cover rounded mb-4" />
            <h2 className="text-xl font-bold text-orange-700">{item.judul}</h2>
            <p className="text-gray-700 mt-2">{item.deskripsi}</p>
            <div className="mt-4 flex gap-3">
              <button
                className="bg-yellow-400 px-4 py-1 rounded hover:bg-yellow-500 text-sm"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 text-sm text-white"
                onClick={() => handleDelete(item.id)}
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

export default AdminPromo;
