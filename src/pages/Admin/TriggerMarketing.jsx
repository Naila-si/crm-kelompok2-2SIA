import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../supabase";

const TriggerMarketing = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ id: null, schedule: "", content: "", isDraft: false });
  const [filter, setFilter] = useState("all");
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchPromos();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("trigger_marketing")
      .select("*")
      .order("schedule", { ascending: true });

    if (error) {
      toast.error("Gagal memuat konten promosi");
      console.error(error);
    } else {
      setPosts(data);
    }
  };

  const fetchPromos = async () => {
    const { data, error } = await supabase
      .from("seasonal_promos")
      .select("*")
      .order("start", { ascending: true });

    if (error) {
      toast.error("Gagal memuat promo musiman");
      console.error(error);
    } else {
      setPromos(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.content || !form.schedule) return;

    if (form.id) {
      const { error } = await supabase
        .from("trigger_marketing")
        .update({
          content: form.content,
          schedule: form.schedule,
          is_draft: form.isDraft,
        })
        .eq("id", form.id);

      if (error) {
        toast.error("Gagal memperbarui konten");
        console.error(error);
      } else {
        toast.success(form.isDraft ? "Draft diperbarui" : "Konten diperbarui");
      }
    } else {
      const { error } = await supabase.from("trigger_marketing").insert([
        {
          content: form.content,
          schedule: form.schedule,
          is_draft: form.isDraft,
        },
      ]);

      if (error) {
        toast.error("Gagal menyimpan konten");
        console.error(error);
      } else {
        toast.success(form.isDraft ? "Draft disimpan" : "Konten dijadwalkan");
      }
    }

    setForm({ id: null, schedule: "", content: "", isDraft: false });
    fetchPosts();
  };

  const handleEdit = (item) => setForm({
    id: item.id,
    schedule: item.schedule,
    content: item.content,
    isDraft: item.is_draft,
  });

  const handleDelete = async (id) => {
    if (window.confirm("Hapus konten ini?")) {
      const { error } = await supabase.from("trigger_marketing").delete().eq("id", id);
      if (error) {
        toast.error("Gagal menghapus");
        console.error(error);
      } else {
        toast.success("Konten dihapus");
        fetchPosts();
      }
    }
  };

  const filteredPosts =
    filter === "all"
      ? posts
      : posts.filter((p) => (filter === "draft" ? p.is_draft : !p.is_draft));

  const [promoForm, setPromoForm] = useState({ id: null, title: "", start: "", end: "" });

  const handlePromoSubmit = async (e) => {
    e.preventDefault();
    if (!promoForm.title || !promoForm.start || !promoForm.end) return;

    if (promoForm.id) {
      const { error } = await supabase
        .from("seasonal_promos")
        .update({
          title: promoForm.title,
          start: promoForm.start,
          end: promoForm.end,
        })
        .eq("id", promoForm.id);

      if (error) {
        toast.error("Gagal memperbarui promo");
        console.error(error);
      } else {
        toast.success("Promo diperbarui");
      }
    } else {
      const { error } = await supabase.from("seasonal_promos").insert([
        {
          title: promoForm.title,
          start: promoForm.start,
          end: promoForm.end,
        },
      ]);

      if (error) {
        toast.error("Gagal menambahkan promo");
        console.error(error);
      } else {
        toast.success("Promo ditambahkan");
      }
    }

    setPromoForm({ id: null, title: "", start: "", end: "" });
    fetchPromos();
  };

  const handlePromoEdit = (promo) => setPromoForm(promo);

  const handlePromoDelete = async (id) => {
    if (window.confirm("Hapus promo ini?")) {
      const { error } = await supabase.from("seasonal_promos").delete().eq("id", id);
      if (error) {
        toast.error("Gagal menghapus promo");
        console.error(error);
      } else {
        toast.success("Promo dihapus");
        fetchPromos();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-orange-800 mb-4 border-b-4 border-orange-400 pb-2 font-serif">
          Atur Konten Promosi: Promosi Mingguan, Bulanan, Tahunan
        </h2>
        <p className="text-gray-600 mb-6">Admin dapat menjadwalkan dan menulis konten promosi.</p>

        {/* Filter */}
        <div className="mb-4 flex gap-4 text-sm font-medium text-orange-700">
          <button onClick={() => setFilter("all")} className={filter === "all" ? "underline font-semibold" : ""}>Semua</button>
          <button onClick={() => setFilter("scheduled")} className={filter === "scheduled" ? "underline font-semibold" : ""}>Terjadwal</button>
          <button onClick={() => setFilter("draft")} className={filter === "draft" ? "underline font-semibold" : ""}>Draft</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid gap-4 mb-10">
          <input
            type="datetime-local"
            value={form.schedule}
            onChange={(e) => setForm({ ...form, schedule: e.target.value })}
            className="border border-orange-300 px-4 py-2 rounded"
            required
          />
          <textarea
            placeholder="Tulis konten promosi di sini..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={3}
            className="border border-orange-300 px-4 py-2 rounded"
            required
          ></textarea>

          <div className="flex gap-2">
            <button
              type="submit"
              onClick={() => setForm({ ...form, isDraft: false })}
              className="bg-orange-700 text-white px-4 py-2 rounded hover:bg-orange-800"
            >
              {form.id ? "Update Jadwal" : "Jadwalkan Sekarang"}
            </button>
            <button
              type="submit"
              onClick={() => setForm({ ...form, isDraft: true })}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              {form.id ? "Simpan sebagai Draft" : "Tambah Draft"}
            </button>
          </div>
        </form>

        {/* Seasonal Promo */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-orange-700 mb-4 border-b border-orange-300 pb-1">
            Atur Konten Promosi: Promo Musiman 🎯
          </h3>
          <form onSubmit={handlePromoSubmit} className="grid gap-4 mb-6">
            <input
              type="text"
              placeholder="Judul Promo Musiman"
              value={promoForm.title}
              onChange={(e) => setPromoForm({ ...promoForm, title: e.target.value })}
              className="border border-orange-300 px-4 py-2 rounded"
              required
            />
            <div className="flex gap-2">
              <input
                type="date"
                value={promoForm.start}
                onChange={(e) => setPromoForm({ ...promoForm, start: e.target.value })}
                className="border border-orange-300 px-4 py-2 rounded w-full"
                required
              />
              <input
                type="date"
                value={promoForm.end}
                onChange={(e) => setPromoForm({ ...promoForm, end: e.target.value })}
                className="border border-orange-300 px-4 py-2 rounded w-full"
                required
              />
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-fit">
              {promoForm.id ? "Update Promo" : "Tambah Promo"}
            </button>
          </form>

          {/* Daftar Promo */}
          {promos.length === 0 ? (
            <p className="text-sm italic text-gray-500">Belum ada promo musiman.</p>
          ) : (
            promos.map((p) => (
              <div key={p.id} className="border border-green-200 bg-green-50 rounded p-4 mb-3 shadow-sm">
                <p className="font-semibold text-green-800">{p.title}</p>
                <p className="text-sm text-gray-600">
                  {new Date(p.start).toLocaleDateString()} - {new Date(p.end).toLocaleDateString()}
                </p>
                <div className="text-sm mt-2 space-x-2">
                  <button onClick={() => handlePromoEdit(p)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handlePromoDelete(p.id)} className="text-red-600 hover:underline">Hapus</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* List Konten Promosi */}
        <div className="space-y-4 mt-10">
          {filteredPosts.length === 0 ? (
            <p className="text-sm italic text-gray-500">Belum ada konten.</p>
          ) : (
            filteredPosts.map((p) => (
              <div key={p.id} className="border border-orange-200 p-4 rounded bg-orange-50 shadow-sm">
                <p className="font-semibold text-orange-900">
                  {new Date(p.schedule).toLocaleString()} {p.is_draft && <span className="text-sm italic text-gray-500">(Draft)</span>}
                </p>
                <p className="mt-2 text-gray-700">{p.content}</p>
                <div className="mt-2 space-x-2 text-sm">
                  <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">Hapus</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TriggerMarketing;