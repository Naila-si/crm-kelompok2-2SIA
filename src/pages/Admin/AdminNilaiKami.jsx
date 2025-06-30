import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import toast from "react-hot-toast";

const AdminNilaiKami = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ icon: "", title: "", content: "" });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const { data, error } = await supabase.from("nilai_kami").select("*");
    if (!error) setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.icon || !form.title || !form.content)
      return toast.error("Semua field wajib diisi");

    if (editId) {
      const { error } = await supabase.from("nilai_kami").update(form).eq("id", editId);
      if (!error) toast.success("Berhasil update!");
    } else {
      const { error } = await supabase.from("nilai_kami").insert([form]);
      if (!error) toast.success("Berhasil tambah!");
    }

    setForm({ icon: "", title: "", content: "" });
    setEditId(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("nilai_kami").delete().eq("id", id);
    if (!error) {
      toast.success("Dihapus!");
      fetchData();
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-orange-700 mb-6">Kelola Nilai Kami</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded-xl mb-6">
        <input
          type="text"
          placeholder="Icon (contoh: 🌿)"
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="text"
          placeholder="Judul"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded mb-3"
        />
        <textarea
          placeholder="Konten"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full p-2 border rounded mb-3"
        />
        <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
          {editId ? "Update" : "Tambah"}
        </button>
      </form>

      {data.map((item) => (
        <div key={item.id} className="bg-orange-50 p-4 rounded-xl mb-4 shadow">
          <div className="flex items-center gap-2 text-xl mb-2">
            <span>{item.icon}</span>
            <h3 className="font-bold">{item.title}</h3>
          </div>
          <p className="text-gray-700 text-sm">{item.content}</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => handleEdit(item)}
              className="bg-yellow-400 px-3 py-1 rounded text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminNilaiKami;
