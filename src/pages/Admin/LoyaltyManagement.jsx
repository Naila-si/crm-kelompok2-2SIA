import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import toast from "react-hot-toast";

const defaultLevels = [
  { id: 1, name: "Bronze", minPoints: 0 },
  { id: 2, name: "Silver", minPoints: 100 },
  { id: 3, name: "Gold", minPoints: 250 },
];

const LoyaltyManagement = () => {
  const [rules, setRules] = useState([]);
  const [levels] = useState(defaultLevels);
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    level: "",
  });

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    const { data, error } = await supabase
      .from("loyalty_rules")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Gagal memuat data");
      console.error(error);
    } else {
      setRules(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.level) return;

    if (form.id) {
      console.log("Mengirim data:", form);
      const { error } = await supabase
        .from("loyalty_rules")
        .update({
          title: form.title,
          description: form.description,
          level: form.level,
        })
        .eq("id", form.id);

      if (error) return toast.error("Gagal memperbarui aturan");
      toast.success("Aturan diperbarui");
    } else {
      const { error } = await supabase.from("loyalty_rules").insert([
        {
          title: form.title,
          description: form.description,
          level: form.level,
        },
      ]);

      if (error) {
         console.error("Insert error:", error.message, error.details, error.hint);
        return toast.error("Gagal menambahkan aturan");
      }
      toast.success("Aturan ditambahkan");
    }

    setForm({ id: null, title: "", description: "", level: "" });
    fetchRules();
  };

  const handleEdit = (item) => setForm(item);

  const handleDelete = async (id) => {
    if (window.confirm("Hapus aturan ini?")) {
      const { error } = await supabase.from("loyalty_rules").delete().eq("id", id);
      if (error) return toast.error("Gagal menghapus aturan");
      toast.success("Aturan dihapus");
      fetchRules();
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
