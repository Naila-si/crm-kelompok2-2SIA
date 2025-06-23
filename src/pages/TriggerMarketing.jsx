import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const TriggerMarketing = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ id: null, schedule: "", content: "", isDraft: false });
  const [filter, setFilter] = useState("all");
  const dummyPosts = [
    {
        id: 1,
        schedule: "2025-06-24T09:00",
        content: "Diskon 20% untuk semua pesanan di hari Jumat ini! 🎉",
        isDraft: false,
    },
    {
        id: 2,
        schedule: "2025-06-25T14:30",
        content: "Menu baru akan segera hadir! Stay tuned yaa 🍱",
        isDraft: true,
    },
    {
        id: 3,
        schedule: "2025-06-26T11:00",
        content: "Gratis ongkir untuk pesanan minimal 3 box 🍽️",
        isDraft: false,
    },
    {
        id: 4,
        schedule: "2025-06-27T08:00",
        content: "Nasi Liwet Spesial edisi akhir pekan 😋",
        isDraft: true,
    },
    {
        id: 5,
        schedule: "2025-06-28T10:00",
        content: "Dapatkan bonus takjil untuk pesanan hari Minggu 🌙",
        isDraft: false,
    },
    {
        id: 6,
        schedule: "2025-06-29T13:30",
        content: "Catering untuk seminar kampus? Hubungi kami! 🎓",
        isDraft: false,
    },
    {
        id: 7,
        schedule: "2025-06-30T17:00",
        content: "Hari terakhir promo! Jangan sampai ketinggalan 🚨",
        isDraft: true,
    },
    {
        id: 8,
        schedule: "2025-07-01T15:00",
        content: "Buka puasa rame-rame lebih hemat! 🌟",
        isDraft: false,
    },
    {
        id: 9,
        schedule: "2025-07-02T09:30",
        content: "Ada giveaway menarik minggu depan! 🎁",
        isDraft: true,
    },
    {
        id: 10,
        schedule: "2025-07-03T16:00",
        content: "Catering sehat buat kamu yang diet 💪",
        isDraft: false,
    },
    ];
    const SeasonalPromo = () => {
        const [promos, setPromos] = useState([]);
        const [promoForm, setPromoForm] = useState({
            id: null,
            title: "",
            start: "",
            end: "",
        });

        useEffect(() => {
            const stored = JSON.parse(localStorage.getItem("seasonalPromos")) || [];
            setPromos(stored);
        }, []);

        const savePromos = (data) => {
            setPromos(data);
            localStorage.setItem("seasonalPromos", JSON.stringify(data));
        };

        const handlePromoSubmit = (e) => {
            e.preventDefault();
            if (!promoForm.title || !promoForm.start || !promoForm.end) return;

            if (promoForm.id) {
            const updated = promos.map((p) => (p.id === promoForm.id ? promoForm : p));
            savePromos(updated);
            toast.success("Promo diperbarui");
            } else {
            const newPromo = { ...promoForm, id: Date.now() };
            savePromos([...promos, newPromo]);
            toast.success("Promo ditambahkan");
            }

            setPromoForm({ id: null, title: "", start: "", end: "" });
        };

        const handlePromoEdit = (promo) => setPromoForm(promo);

        const handlePromoDelete = (id) => {
            if (window.confirm("Hapus promo ini?")) {
            const updated = promos.filter((p) => p.id !== id);
            savePromos(updated);
            toast.success("Promo dihapus");
            }
        };

        return (
            <>
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
                    <button
                        onClick={() => handlePromoEdit(p)}
                        className="text-blue-600 hover:underline"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handlePromoDelete(p.id)}
                        className="text-red-600 hover:underline"
                    >
                        Hapus
                    </button>
                    </div>
                </div>
                ))
            )}
            </>
        );
        };


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("triggerMarketing"));
    if (!saved || saved.length === 0) {
        localStorage.setItem("triggerMarketing", JSON.stringify(dummyPosts));
        setPosts(dummyPosts);
    } else {
        setPosts(saved);
    }
    }, []);

  const saveToStorage = (data) => {
    setPosts(data);
    localStorage.setItem("triggerMarketing", JSON.stringify(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.content || !form.schedule) return;

    if (form.id) {
      const updated = posts.map(p => (p.id === form.id ? form : p));
      saveToStorage(updated);
      toast.success(form.isDraft ? "Draft diperbarui" : "Konten diperbarui");
    } else {
      const newPost = { ...form, id: Date.now() };
      saveToStorage([...posts, newPost]);
      toast.success(form.isDraft ? "Draft disimpan" : "Konten dijadwalkan");
    }

    setForm({ id: null, schedule: "", content: "", isDraft: false });
  };

  const handleEdit = (item) => setForm(item);

  const handleDelete = (id) => {
    if (window.confirm("Hapus konten ini?")) {
      const updated = posts.filter(p => p.id !== id);
      saveToStorage(updated);
      toast.success("Konten dihapus");
    }
  };

  const filteredPosts =
    filter === "all"
      ? posts
      : posts.filter((p) => (filter === "draft" ? p.isDraft : !p.isDraft));

  return (
    <div className="min-h-screen bg-[#FFF8F0] py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-orange-800 mb-4 border-b-4 border-orange-400 pb-2 font-serif">
          Atur Konten Promosi: Promosi Mingguan, Promosi Bulanan, Promosi Tahunan
        </h2>
        <p className="text-gray-600 mb-6">Admin dapat menjadwalkan dan menulis konten promosi.</p>

        {/* Filter */}
        <div className="mb-4 flex gap-4 text-sm font-medium text-orange-700">
          <button onClick={() => setFilter("all")} className={filter === "all" ? "underline font-semibold" : ""}>
            Semua
          </button>
          <button onClick={() => setFilter("scheduled")} className={filter === "scheduled" ? "underline font-semibold" : ""}>
            Terjadwal
          </button>
          <button onClick={() => setFilter("draft")} className={filter === "draft" ? "underline font-semibold" : ""}>
            Draft
          </button>
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

        {/* Marketing Optimization Section */}
        <div className="mt-16">
        <h3 className="text-2xl font-bold text-orange-700 mb-4 border-b border-orange-300 pb-1">
            Atur Konten Promosi: Promo Musiman 🎯
        </h3>

        <SeasonalPromo />
        </div>

        {/* List */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <p className="text-sm italic text-gray-500">Belum ada konten.</p>
          ) : (
            filteredPosts.map((p) => (
              <div key={p.id} className="border border-orange-200 p-4 rounded bg-orange-50 shadow-sm">
                <p className="font-semibold text-orange-900">
                  {new Date(p.schedule).toLocaleString()}{" "}
                  {p.isDraft && <span className="text-sm italic text-gray-500">(Draft)</span>}
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
