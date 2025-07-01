import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import toast from "react-hot-toast";

const KnowledgeBase = () => {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ id: null, question: "", answer: "", isDraft: false });
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [submitMode, setSubmitMode] = useState("publish");

  const fetchFaqs = async () => {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      toast.error("Gagal memuat FAQ");
      console.error("Fetch error:", error);
    } else {
      setFaqs(data);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSubmit = async (mode = "publish") => {
    if (!form.question || !form.answer) return;

    const payload = {
      question: form.question,
      answer: form.answer,
      is_draft: mode === "draft",
    };

    if (form.id !== null) {
      const { error } = await supabase.from("faqs").update(payload).eq("id", form.id);
      if (error) return toast.error("Gagal memperbarui FAQ");
      toast.success(payload.is_draft ? "Draft diperbarui" : "FAQ diperbarui");
    } else {
      const { error } = await supabase.from("faqs").insert([payload]);
      if (error) return toast.error("Gagal menambahkan FAQ");
      toast.success(payload.is_draft ? "Draft disimpan" : "FAQ ditambahkan");
    }

    setForm({ id: null, question: "", answer: "", isDraft: false });
    fetchFaqs();
  };

  const handleEdit = (faq) => {
    setForm({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      isDraft: faq.is_draft,
    });
    setSubmitMode(faq.is_draft ? "draft" : "publish");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus FAQ ini?")) {
      const { error } = await supabase.from("faqs").delete().eq("id", id);
      if (error) return toast.error("Gagal menghapus FAQ");
      toast.success("FAQ dihapus");
      fetchFaqs();
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFaqs =
    filter === "all"
      ? faqs
      : faqs.filter((faq) =>
          filter === "published" ? !faq.is_draft : faq.is_draft
        );

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
        <form className="grid gap-4 mb-10">
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
              type="button"
              onClick={() => handleSubmit("publish")}
              className="bg-[#D2691E] text-white py-2 px-4 rounded hover:bg-[#A0522D]"
            >
              {form.id ? "Update FAQ" : "Tambah FAQ"}
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("draft")}
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
                  {faq.question} {faq.is_draft && <span className="text-sm italic text-gray-500">(Draft)</span>}
                </p>
                {expandedId === faq.id && (
                  <p className="mt-2 text-gray-700">{faq.answer}</p>
                )}
                <div className="mt-2 space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(faq);
                    }}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(faq.id);
                    }}
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
