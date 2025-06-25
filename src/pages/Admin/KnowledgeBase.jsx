import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const dummyFaqs = [
  {
    id: 1,
    question: "Bagaimana cara memesan makanan?",
    answer: "Kamu bisa memesan melalui menu utama dan pilih makanan yang diinginkan.",
    isDraft: false,
  },
  {
    id: 2,
    question: "Apakah bisa membatalkan pesanan?",
    answer: "Ya, pesanan bisa dibatalkan dalam 5 menit setelah pemesanan.",
    isDraft: false,
  },
  {
    id: 3,
    question: "Apakah tersedia layanan antar?",
    answer: "Kami menyediakan layanan antar untuk area kampus dan sekitarnya.",
    isDraft: false,
  },
  {
    id: 4,
    question: "Bagaimana metode pembayarannya?",
    answer: "Pembayaran bisa melalui cash, QRIS, atau transfer bank.",
    isDraft: false,
  },
  {
    id: 5,
    question: "Apakah bisa pre-order untuk acara?",
    answer: "Ya, silakan hubungi kami minimal H-2 sebelum acara.",
    isDraft: true, // contoh draft
  },
];

const KnowledgeBase = () => {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ id: null, question: "", answer: "", isDraft: false });
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("all"); // all, published, draft

  useEffect(() => {
    const storedFaqs = JSON.parse(localStorage.getItem("faqs")) || [];
    if (storedFaqs.length === 0) {
      localStorage.setItem("faqs", JSON.stringify(dummyFaqs));
      setFaqs(dummyFaqs);
    } else {
      setFaqs(storedFaqs);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.question || !form.answer) return;

    if (form.id !== null) {
      const updated = faqs.map((f) => (f.id === form.id ? form : f));
      setFaqs(updated);
      localStorage.setItem("faqs", JSON.stringify(updated));
      toast.success(form.isDraft ? "Draft diperbarui" : "FAQ diperbarui");
    } else {
      const newFaq = { ...form, id: Date.now() };
      const updated = [...faqs, newFaq];
      setFaqs(updated);
      localStorage.setItem("faqs", JSON.stringify(updated));
      toast.success(form.isDraft ? "Draft disimpan" : "FAQ ditambahkan");
    }

    setForm({ id: null, question: "", answer: "", isDraft: false });
  };

  const handleEdit = (faq) => {
    setForm(faq);
  };

  const handleDelete = (id) => {
    if (window.confirm("Hapus FAQ ini?")) {
      const updated = faqs.filter((f) => f.id !== id);
      setFaqs(updated);
      localStorage.setItem("faqs", JSON.stringify(updated));
      toast.success("FAQ dihapus");
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFaqs =
    filter === "all"
      ? faqs
      : faqs.filter((faq) => (filter === "published" ? !faq.isDraft : faq.isDraft));

  return (
    <div className="min-h-screen bg-[#FFF8F0] py-10 px-6">
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-semibold text-[#D2691E] mb-6 border-b-4 border-[#CD853F] inline-block pb-1 font-serif">
          Frequently Asked Questions
        </h2>

        {/* Filter */}
        <div className="mb-4 flex gap-4 text-sm">
          <button onClick={() => setFilter("all")} className={filter === "all" ? "font-bold underline" : ""}>
            Semua
          </button>
          <button onClick={() => setFilter("published")} className={filter === "published" ? "font-bold underline" : ""}>
            Dipublikasikan
          </button>
          <button onClick={() => setFilter("draft")} className={filter === "draft" ? "font-bold underline" : ""}>
            Draft
          </button>
        </div>

        {/* Form FAQ */}
        <form onSubmit={handleSubmit} className="grid gap-4 mb-10">
          <input
            type="text"
            placeholder="Pertanyaan"
            className="border border-orange-400 px-4 py-2 rounded"
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            required
          />
          <textarea
            placeholder="Jawaban"
            className="border border-orange-400 px-4 py-2 rounded"
            rows={3}
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            required
          ></textarea>

          <div className="flex gap-2">
            <button
              type="submit"
              onClick={() => setForm({ ...form, isDraft: false })}
              className="bg-[#D2691E] text-white py-2 px-4 rounded hover:bg-[#A0522D]"
            >
              {form.id ? "Update FAQ" : "Tambah FAQ"}
            </button>
            <button
              type="submit"
              onClick={() => setForm({ ...form, isDraft: true })}
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
            >
              {form.id ? "Simpan sebagai Draft" : "Tambah Draft"}
            </button>
          </div>
        </form>

        {/* Daftar FAQ */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <p className="italic text-gray-600">Tidak ada FAQ.</p>
          ) : (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-orange-50 border border-orange-300 rounded p-4 shadow-sm cursor-pointer"
              >
                <p
                  onClick={() => toggleExpand(faq.id)}
                  className="font-semibold text-[#8B4513] hover:underline"
                >
                  {faq.question} {faq.isDraft && <span className="text-sm italic text-gray-500">(Draft)</span>}
                </p>
                {expandedId === faq.id && (
                  <p className="mt-2 text-gray-700">{faq.answer}</p>
                )}
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleEdit(faq)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="text-red-600 hover:underline text-sm"
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

export default KnowledgeBase;
