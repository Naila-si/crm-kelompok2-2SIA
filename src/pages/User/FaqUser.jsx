import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import toast from "react-hot-toast";
import UserLayout from "../../components/User/UserLayout"; // pastikan path sesuai

const FaqUser = () => {
  const [faqs, setFaqs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newQuestion, setNewQuestion] = useState("");

  const fetchFaqs = async () => {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("is_draft", false)
      .order("id", { ascending: true });

    if (error) {
      console.error("Gagal memuat FAQ", error);
    } else {
      setFaqs(data);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitQuestion = async () => {
    if (!newQuestion.trim()) return toast.error("Pertanyaan tidak boleh kosong");

    const { error } = await supabase.from("faqs").insert([
      {
        question: newQuestion,
        answer: "",
        is_draft: true,
      },
    ]);

    if (error) {
      console.error(error);
      toast.error("Gagal mengirim pertanyaan");
    } else {
      toast.success("Pertanyaan kamu berhasil dikirim!");
      setNewQuestion("");
    }
  };

  return (
    <>
       <section
            className="h-[50vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
            style={{
                backgroundImage:
                "url('https://s1-id.alongwalker.co/wp-content/uploads/2024/07/image-top-10-pilihan-catering-di-pekanbaru-riau-buat-acara-maupun-harian-manakah-yang-paling-enak-dan-murah-62258e4294ff1f402c284956a551228f.jpg')",
            }}
            >
            <div className="bg-black/60 p-8 rounded-xl max-w-2xl">
                <h1 className="text-4xl font-extrabold mb-2">Butuh Bantuan? 🤔</h1>
                <p className="text-white text-sm sm:text-base">
                Temukan jawaban dari pertanyaan seputar cara memesan, metode pembayaran,
                membership, dan lainnya di halaman FAQ ini. Atau, kirim pertanyaanmu langsung!
                </p>
            </div>
            </section>

      <div className="min-h-screen bg-[#FFF8F0] py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-orange-200 p-6 md:p-8">
          <h1 className="text-3xl font-bold text-[#D2691E] mb-6 text-center font-serif">
            Pertanyaan yang Sering Diajukan
          </h1>

          {/* Pencarian */}
          <input
            type="text"
            placeholder="🔍 Cari pertanyaan..."
            className="w-full mb-6 px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* List FAQ */}
          {filteredFaqs.length === 0 ? (
            <p className="text-gray-600 italic text-center">Tidak ada pertanyaan ditemukan.</p>
          ) : (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                onClick={() => toggleExpand(faq.id)}
                className="mb-4 bg-orange-50 border border-orange-300 rounded-lg p-4 shadow-sm transition-all duration-300 hover:bg-orange-100 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium text-[#8B4513]">{faq.question}</p>
                  <span className="text-orange-500 font-bold text-lg">
                    {expandedId === faq.id ? "−" : "+"}
                  </span>
                </div>
                <div
                  className={`transition-all duration-300 overflow-hidden text-sm text-gray-700 ${
                    expandedId === faq.id ? "max-h-screen mt-2" : "max-h-0"
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))
          )}

          {/* Form Kirim Pertanyaan */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-[#A0522D] mb-1">Tidak menemukan jawabanmu?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Kirim pertanyaan, kami akan menjawabnya sesegera mungkin.
            </p>
            <textarea
              rows={3}
              className="w-full border border-orange-300 rounded px-4 py-2 mb-3"
              placeholder="Tulis pertanyaanmu di sini..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <button
              onClick={handleSubmitQuestion}
              className="bg-[#D2691E] text-white px-6 py-2 rounded-full hover:bg-[#A0522D] transition"
            >
              Kirim Pertanyaan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqUser;
