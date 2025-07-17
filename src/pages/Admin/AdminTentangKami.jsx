import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import toast from "react-hot-toast";

const AdminTentangKami = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ judul: "", deskripsi: "", gambar: "" });
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // ✅ PREVIEW BARU

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
    if (!form.judul || !form.deskripsi)
      return toast.error("Judul dan Deskripsi wajib diisi");

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
    }

    const payload = {
      judul: form.judul,
      deskripsi: form.deskripsi,
      gambar,
    };

    if (editId) {
      const { error } = await supabase
        .from("tentang_kami")
        .update(payload)
        .eq("id", editId);
      if (!error) toast.success("Berhasil diupdate!");
    } else {
      const { error } = await supabase
        .from("tentang_kami")
        .insert([payload]);
      if (!error) toast.success("Berhasil ditambahkan!");
    }

    setForm({ judul: "", deskripsi: "", gambar: "" });
    setImageFile(null);
    setPreviewImage(null); // ✅ reset preview
    setEditId(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    setPreviewImage(item.gambar); // ✅ tampilkan gambar lama
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from("tentang_kami")
      .delete()
      .eq("id", id);
    if (!error) {
      toast.success("Berhasil dihapus!");
      fetchData();
    }
  };

  return (
    <div className="p-6 bg-[#FDF6E3] min-h-screen">
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#8B4513] mb-8 font-serif">
          Manajemen Tentang Kami
        </h1>

        {/* Form Tambah/Edit */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#FFF8F0] p-6 rounded-2xl shadow-md mb-10 border border-[#F4A460]"
        >
          <h2 className="text-xl font-semibold text-[#A0522D] mb-4">
            {editId ? "Edit Informasi" : "Tambah Informasi Baru"}
          </h2>
          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Judul"
              value={form.judul}
              onChange={(e) => setForm({ ...form, judul: e.target.value })}
              className="w-full p-3 rounded-lg border border-[#DEB887] focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
            />
            <textarea
              placeholder="Deskripsi"
              value={form.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
              className="w-full p-3 rounded-lg border border-[#DEB887] h-32 focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImageFile(file);
                setPreviewImage(URL.createObjectURL(file)); // ✅ PREVIEW BARU
              }}
              className="w-full p-3 rounded-lg border border-[#DEB887] bg-white"
            />

            {/* ✅ Preview Gambar */}
            {previewImage && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Preview Gambar:</p>
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg border border-[#F4A460] shadow-sm"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="mt-4 bg-[#D2691E] hover:bg-[#A0522D] text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
          >
            {editId ? "Update" : "Tambah"}
          </button>
        </form>

        {/* Daftar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#F5DEB3] p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-200"
            >
              <img
                src={item.gambar}
                alt={item.judul}
                onError={() => console.log("Gagal load:", item.gambar)}
                className="w-full h-52 object-cover rounded-lg mb-4 border border-[#F4A460]"
              />
              <h2 className="text-2xl font-bold text-[#8B4513] mb-2">
                {item.judul}
              </h2>
              <p className="text-gray-700 mb-4">{item.deskripsi}</p>
              <div className="flex gap-3">
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-sm px-4 py-1 rounded-lg font-medium"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded-lg font-medium"
                  onClick={() => handleDelete(item.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTentangKami;
