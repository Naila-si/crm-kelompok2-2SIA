import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import toast from "react-hot-toast";

const AdminTentangKami = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ judul: "", deskripsi: "", gambar: "" });
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Ambil data dari Supabase
  const fetchData = async () => {
    const { data, error } = await supabase.from("tentang_kami").select("*");
    if (error) {
      toast.error("Gagal ambil data");
    } else {
      setData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.judul || !form.deskripsi) return toast.error("Judul dan Deskripsi wajib diisi");

    let gambar = form.gambar;

    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("gambar")
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error("Upload Gagal:", uploadError.message);
        toast.error("Upload gambar gagal");
        return;
      }

      const { data: urlData } = supabase.storage
        .from("gambar")
        .getPublicUrl(fileName);

      gambar = urlData.publicUrl;
      console.log("URL Gambar:", gambar);
    }

    const payload = {
      judul: form.judul,
      deskripsi: form.deskripsi,
      gambar,
    };

    if (editId) {
      const { error } = await supabase.from("tentang_kami").update(payload).eq("id", editId);
      if (!error) toast.success("Berhasil update!");
    } else {
      const { error } = await supabase.from("tentang_kami").insert([payload]);
      if (!error) toast.success("Berhasil tambah!");
    }

    setForm({ judul: "", deskripsi: "", gambar: "" });
    setImageFile(null);
    setEditId(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("tentang_kami").delete().eq("id", id);
    if (!error) {
      toast.success("Dihapus!");
      fetchData();
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-orange-700 mb-6">Tentang Kami</h1>

      {/* Form Tambah/Edit */}
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-2xl mb-10">
        <input
          type="text"
          placeholder="Judul"
          value={form.judul}
          onChange={(e) => setForm({ ...form, judul: e.target.value })}
          className="w-full p-3 rounded border mb-4"
        />
        <textarea
          placeholder="Deskripsi"
          value={form.deskripsi}
          onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
          className="w-full p-3 rounded border mb-4"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full p-3 rounded border mb-4"
        />
        <button className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700">
          {editId ? "Update" : "Tambah"}
        </button>
      </form>

      {/* Daftar Tentang Kami */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow hover:shadow-lg p-4">
            <img src={item.gambar} alt="Tentang Kami" 
            onError={() => console.log("Gagal load:", item.gambar)}
            className="w-full h-48 object-cover rounded mb-4" />
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

export default AdminTentangKami;
