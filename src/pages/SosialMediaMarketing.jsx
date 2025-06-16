import React, { useState } from "react";
import toast from "react-hot-toast";

const SocialMediaMarketing = () => {
  const [post, setPost] = useState({
    platform: "",
    schedule: "",
    content: "",
  });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Postingan berhasil dijadwalkan!");
    setPost({ platform: "", schedule: "", content: "" });
  };

  return (
    <div className="bg-[url('/bg-batik-light.png')] bg-fixed bg-cover min-h-screen py-16 px-6">
      <div className="w-full max-w-5xl mx-auto p-10 bg-[#fef8f1] border border-orange-300 rounded-3xl shadow-xl">
        <div className="mb-8">
          <h2 className="text-5xl font-serif font-bold text-orange-900 mb-2 border-b-2 border-orange-500 inline-block pb-1">
            Social Media Marketing
          </h2>
          <p className="text-md text-gray-700 font-medium">
            Jadwalkan dan kelola postingan promo usaha langsung dari dashboard CRM.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Platform Media Sosial</label>
            <select
              name="platform"
              value={post.platform}
              onChange={handleChange}
              className="w-full border border-orange-300 bg-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            >
              <option value="">Pilih platform</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="TikTok">TikTok</option>
              <option value="WhatsApp">WhatsApp</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Jadwal Postingan</label>
            <input
              type="datetime-local"
              name="schedule"
              value={post.schedule}
              onChange={handleChange}
              className="w-full border border-orange-300 bg-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Konten Promosi</label>
            <textarea
              name="content"
              value={post.content}
              onChange={handleChange}
              className="w-full border border-orange-300 bg-white rounded-xl px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Contoh: Dapatkan diskon 20% untuk pesanan Nasi Liwet hari Jumat ini!"
              required
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-orange-800 text-white py-3 rounded-xl hover:bg-orange-900 transition font-semibold tracking-wide"
            >
              Jadwalkan Postingan 📣
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SocialMediaMarketing;
