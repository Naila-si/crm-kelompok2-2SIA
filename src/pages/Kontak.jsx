import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const levelStyle = {
  Gold: "bg-yellow-100 text-yellow-700",
  Silver: "bg-gray-100 text-gray-600",
  Bronze: "bg-amber-100 text-amber-700",
};

const Kontak = () => {
  const [dataPelanggan, setDataPelanggan] = useState([]);
  const [form, setForm] = useState({ nama: "", kontak: "", alamat: "", level: "Bronze" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch("https://api.npoint.io/9ade4bf30f88c5b7e1dd")
      .then((res) => res.json())
      .then((data) => setDataPelanggan(data.slice(0, 15)))
      .catch((e) => console.error("Gagal ambil data:", e));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newList = editId
      ? dataPelanggan.map((p) => (p.id === editId ? { ...form, id: editId } : p))
      : [...dataPelanggan, { ...form, id: Date.now() }];
    setDataPelanggan(newList);
    toast.success(editId ? "Data pelanggan diperbarui!" : "Pelanggan baru ditambahkan!");
    setForm({ nama: "", kontak: "", alamat: "", level: "Bronze" });
    setEditId(null);
  };

  const handleEdit = (p) => {
    setForm({ nama: p.nama, kontak: p.kontak, alamat: p.alamat, level: p.level });
    setEditId(p.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Hapus pelanggan ini?")) {
      setDataPelanggan(dataPelanggan.filter((p) => p.id !== id));
      toast.success("Pelanggan berhasil dihapus!");
      if (editId === id) {
        setForm({ nama: "", kontak: "", alamat: "", level: "Bronze" });
        setEditId(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF6E3] py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <h1 className="text-4xl font-bold text-[#5E3B1E] border-b-4 border-amber-400 pb-3 font-serif">
          Kontak Pelanggan
        </h1>

        {/* Form Tambah/Edit */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md space-y-6">
          <h2 className="text-2xl font-semibold text-[#5E3B1E]">
            {editId ? "Edit Pelanggan" : "Tambah Pelanggan"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Nama"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="border border-amber-400 rounded px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300 text-base"
              required
            />
            <input
              type="text"
              placeholder="Kontak"
              value={form.kontak}
              onChange={(e) => setForm({ ...form, kontak: e.target.value })}
              className="border border-amber-400 rounded px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300 text-base"
              required
            />
            <input
              type="text"
              placeholder="Alamat"
              value={form.alamat}
              onChange={(e) => setForm({ ...form, alamat: e.target.value })}
              className="border border-amber-400 rounded px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300 text-base"
              required
            />
            <select
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
              className="border border-amber-400 rounded px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300 text-base"
            >
              <option>Gold</option>
              <option>Silver</option>
              <option>Bronze</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-2 bg-[#5E3B1E] hover:bg-[#7B4C20] text-white px-6 py-3 rounded shadow font-semibold text-base transition"
          >
            {editId ? "Update" : "Tambah"}
          </button>
        </form>

        {/* Tabel Kontak */}
        <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <table className="w-full text-sm table-auto">
            <thead>
              <tr className="bg-amber-50 text-[#5E3B1E] uppercase text-xs font-semibold">
                <th className="p-4 text-left">Nama</th>
                <th className="p-4 text-left">Kontak</th>
                <th className="p-4 text-left">Alamat</th>
                <th className="p-4 text-left">Level</th>
                <th className="p-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataPelanggan.map((p) => (
                <tr
                  key={p.id}
                  className="border-b last:border-none even:bg-[#FFFDF4] hover:bg-[#FFF7E0] transition"
                >
                  <td className="p-4 text-base">{p.nama}</td>
                  <td className="p-4 text-base">{p.kontak}</td>
                  <td className="p-4 text-base">{p.alamat}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${levelStyle[p.level]}`}>
                      {p.level}
                    </span>
                  </td>
                  <td className="p-4 space-x-4">
                    <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline text-sm">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline text-sm">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {dataPelanggan.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 italic text-gray-500 text-base">
                    Tidak ada data pelanggan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Kontak;
