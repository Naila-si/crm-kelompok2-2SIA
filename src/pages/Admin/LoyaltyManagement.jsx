import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const defaultLevels = [
  { id: 1, name: "Bronze", minPoints: 0 },
  { id: 2, name: "Silver", minPoints: 100 },
  { id: 3, name: "Gold", minPoints: 250 },
];

const defaultRules = [
  {
    id: 1,
    title: "1 poin tiap pembelian Rp10.000",
    description: "Berlaku untuk pelanggan Bronze.",
    level: "Bronze",
  },
  {
    id: 2,
    title: "2 poin tiap pembelian Rp10.000",
    description: "Bonus poin untuk pelanggan Silver.",
    level: "Silver",
  },
  {
    id: 3,
    title: "3 poin tiap pembelian Rp10.000",
    description: "Pelanggan Gold mendapat poin lebih banyak.",
    level: "Gold",
  },
];

const LoyaltyManagement = () => {
  const [rules, setRules] = useState([]);
  const [levels, setLevels] = useState(defaultLevels);
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    level: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("loyaltyRules")) || defaultRules;
    setRules(saved);
  }, []);

  const saveRules = (data) => {
    setRules(data);
    localStorage.setItem("loyaltyRules", JSON.stringify(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.level) return;

    if (form.id) {
      const updated = rules.map((r) => (r.id === form.id ? form : r));
      saveRules(updated);
      toast.success("Aturan diperbarui");
    } else {
      const newRule = { ...form, id: Date.now() };
      saveRules([...rules, newRule]);
      toast.success("Aturan ditambahkan");
    }

    setForm({ id: null, title: "", description: "", level: "" });
  };

  const handleEdit = (item) => setForm(item);

  const handleDelete = (id) => {
    if (window.confirm("Hapus aturan ini?")) {
      const updated = rules.filter((r) => r.id !== id);
      saveRules(updated);
      toast.success("Aturan dihapus");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-orange-800 mb-6 border-b-4 border-orange-400 pb-2 font-serif">
          Loyalty Management
        </h2>

        {/* Form Aturan */}
        <form onSubmit={handleSubmit} className="grid gap-4 mb-10">
          <h3 className="text-xl font-semibold text-orange-700">Aturan Poin berdasarkan Level</h3>

          <input
            type="text"
            placeholder="Judul Aturan"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border border-orange-300 px-4 py-2 rounded"
            required
          />
          <textarea
            placeholder="Deskripsi aturan"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="border border-orange-300 px-4 py-2 rounded"
            required
          ></textarea>

          <select
            value={form.level}
            onChange={(e) => setForm({ ...form, level: e.target.value })}
            className="border border-orange-300 px-4 py-2 rounded"
            required
          >
            <option value="">Pilih Level Pelanggan</option>
            {levels.map((lvl) => (
              <option key={lvl.id} value={lvl.name}>
                {lvl.name}
              </option>
            ))}
          </select>

          <button className="bg-orange-700 text-white px-4 py-2 rounded hover:bg-orange-800 w-fit">
            {form.id ? "Update Aturan" : "Tambah Aturan"}
          </button>
        </form>

        {/* Daftar Aturan */}
        <div>
          <h3 className="text-xl font-bold text-orange-800 mb-2">Daftar Aturan Poin</h3>
          {rules.length === 0 ? (
            <p className="italic text-gray-500">Belum ada aturan.</p>
          ) : (
            rules.map((rule) => (
              <div
                key={rule.id}
                className="border border-orange-200 p-4 mb-3 rounded bg-orange-50 shadow-sm"
              >
                <p className="font-semibold text-orange-900">{rule.title}</p>
                <p className="text-gray-700 text-sm">{rule.description}</p>
                <p className="text-sm mt-1 text-orange-600 italic">Berlaku untuk: {rule.level}</p>
                <div className="text-sm mt-2 space-x-2">
                  <button
                    onClick={() => handleEdit(rule)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(rule.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LoyaltyManagement;
