import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import toast from "react-hot-toast";

const AdminTestimoni = () => {
  const [testimoni, setTestimoni] = useState([]);
  const [form, setForm] = useState({ id: null, nama: "", pesan: "" });

  useEffect(() => {
    fetchTestimoni();
  }, []);

  const fetchTestimoni = async () => {
    const { data, error } = await supabase.from("testimoni").select("*").order("id", { ascending: false });
    if (error) {
      toast.error("Gagal mengambil data testimoni");
      console.error(error);
    } else {
      setTestimoni(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, nama, pesan } = form;
    if (!nama || !pesan) return toast.error("Semua kolom harus diisi!");

    if (id) {
      const { error } = await supabase
        .from("testimoni")
        .update({ nama, pesan })
        .eq("id", id);
      if (error) toast.error("Gagal update testimoni");
      else toast.success("Berhasil update testimoni");
    } else {
      const { error } = await supabase.from("testimoni").insert([{ nama, pesan }]);
      if (error) toast.error("Gagal menambahkan testimoni");
      else toast.success("Testimoni berhasil ditambahkan");
    }

    setForm({ id: null, nama: "", pesan: "" });
    fetchTestimoni();
  };

  const handleEdit = (item) => setForm(item);

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus testimoni ini?")) {
      const { error } = await supabase.from("testimoni").delete().eq("id", id);
      if (error) toast.error("Gagal menghapus testimoni");
      else {
        toast.success("Testimoni dihapus");
        fetchTestimoni();
      }
    }
  };

  return (
    <div className="p-6 bg-[#FDF6E3] min-h-screen">
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-orange-700 mb-6">Kelola Testimoni Pelanggan</h1>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-10 bg-white p-6 rounded shadow">
          <input
            type="text"
            placeholder="Nama Pelanggan"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          <textarea
            placeholder="Pesan Testimoni"
            value={form.pesan}
            onChange={(e) => setForm({ ...form, pesan: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          ></textarea>
          <button
            type="submit"
            className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
          >
            {form.id ? "Update Testimoni" : "Tambah Testimoni"}
          </button>
        </form>

        {/* List Testimoni */}
        <div className="space-y-4">
          {testimoni.length === 0 ? (
            <p className="italic text-gray-500">Belum ada testimoni.</p>
          ) : (
            testimoni.map((item) => (
              <div
                key={item.id}
                className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded shadow"
              >
                <p className="text-sm font-bold text-orange-800">{item.nama}</p>
                <p className="text-gray-700 mt-1">{item.pesan}</p>
                <div className="text-sm mt-2 space-x-2">
                  <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Hapus</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTestimoni;
