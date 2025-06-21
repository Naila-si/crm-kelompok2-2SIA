import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

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
      .then((data) => {
        // asumsi JSON array berisi objek dengan field id,nama,kontak,alamat,level
        setDataPelanggan(data.slice(0, 15));
      })
      .catch((e) => console.error("Gagal ambil data:", e));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newList = editId
      ? dataPelanggan.map((p) => (p.id === editId ? { ...form, id: editId } : p))
      : [...dataPelanggan, { ...form, id: Date.now() }];
    setDataPelanggan(newList);
    if (editId) {
      toast.success("Data pelanggan berhasil diperbarui!");
    } else {
      toast.success("Pelanggan baru berhasil ditambahkan!");
    }
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
    <div className="p-6 bg-[#FDF6E3] min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#5E3B1E] mb-4">Kontak Pelanggan</h1>

        <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">{editId ? "Edit Pelanggan" : "Tambah Pelanggan"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Nama"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              placeholder="Kontak"
              value={form.kontak}
              onChange={(e) => setForm({ ...form, kontak: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              placeholder="Alamat"
              value={form.alamat}
              onChange={(e) => setForm({ ...form, alamat: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <select
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
              className="border p-2 rounded"
            >
              <option>Gold</option>
              <option>Silver</option>
              <option>Bronze</option>
            </select>
          </div>
          <button type="submit" className="mt-4 bg-[#5E3B1E] text-white px-4 py-2 rounded">
            {editId ? "Update" : "Tambah"}
          </button>
        </form>

        <div className="bg-white border border-[#5E3B1E]/20 shadow rounded p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-amber-50 text-[#5E3B1E] uppercase text-xs">
                <th className="p-2 text-left">Nama</th>
                <th className="p-2 text-left">Kontak</th>
                <th className="p-2 text-left">Alamat</th>
                <th className="p-2 text-left">Level</th>
                <th className="p-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataPelanggan.map((p) => (
                <tr key={p.id} className="border-b even:bg-gray-50 hover:bg-amber-50">
                  <td className="p-2">{p.nama}</td>
                  <td className="p-2">{p.kontak}</td>
                  <td className="p-2">{p.alamat}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded-full ${levelStyle[p.level]}`}>{p.level}</span>
                  </td>
                  <td className="p-2 space-x-2">
                    <button onClick={() => handleEdit(p)} className="text-blue-600">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600">Hapus</button>
                  </td>
                </tr>
              ))}
              {dataPelanggan.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 italic text-gray-500">
                    Tidak ada data
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
