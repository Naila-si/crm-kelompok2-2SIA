import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const SocialMediaMarketing = () => {
  const [post, setPost] = useState({
    id: null,
    platform: "",
    schedule: "",
    content: "",
    status: "Draft",
  });

  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        platform: "Instagram",
        schedule: "2025-06-25T10:00",
        content: "Promo Nasi Liwet 20% hanya hari Jumat!",
        status: "Published",
      },
      {
        id: 2,
        platform: "Facebook",
        schedule: "2025-06-26T14:30",
        content: "Catering Selera Kampung hadir untuk acara keluarga Anda.",
        status: "Published",
      },
      {
        id: 3,
        platform: "TikTok",
        schedule: "2025-06-27T17:00",
        content: "Lihat behind the scene dapur kami hanya di TikTok!",
        status: "Draft",
      },
      {
        id: 4,
        platform: "WhatsApp",
        schedule: "2025-06-28T09:00",
        content: "Order hari ini, dapat bonus kerupuk!",
        status: "Published",
      },
      {
        id: 5,
        platform: "Instagram",
        schedule: "2025-06-29T19:00",
        content: "Buka puasa hemat bersama catering kami 🌛",
        status: "Draft",
      },
    ];
    setPosts(dummyData);
  }, []);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      const updated = posts.map((p) => (p.id === editId ? post : p));
      setPosts(updated);
      toast.success("Postingan berhasil diperbarui!");
      setEditId(null);
    } else {
      const newPost = { ...post, id: Date.now() };
      setPosts([...posts, newPost]);
      toast.success("Postingan berhasil dijadwalkan!");
    }
    setPost({ id: null, platform: "", schedule: "", content: "", status: "Draft" });
  };

  const handleEdit = (item) => {
    setPost(item);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus postingan ini?")) {
      const updated = posts.filter((p) => p.id !== id);
      setPosts(updated);
      toast.success("Postingan berhasil dihapus");
    }
  };

  return (
    <div className="bg-[url('/bg-batik-light.png')] bg-fixed bg-cover min-h-screen py-0 px-0">
      <div className="w-full max-w-5xl mx-auto p-10 bg-[#fef8f1] border border-orange-300 rounded-3xl shadow-xl">
        <div className="mb-8">
          <h2 className="text-5xl font-serif font-bold text-orange-900 mb-2 border-b-2 border-orange-500 inline-block pb-1">
            Promosi Ke Media Sosial
          </h2>
          <p className="text-md text-gray-700 font-medium">
            Jadwalkan dan kelola postingan promo usaha langsung dari dashboard CRM.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={post.status}
              onChange={handleChange}
              className="w-full border border-orange-300 bg-white rounded-xl px-4 py-2"
              required
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Konten Promosi</label>
            <textarea
              name="content"
              value={post.content}
              onChange={handleChange}
              className="w-full border border-orange-300 bg-white rounded-xl px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-orange-800 text-white py-3 rounded-xl hover:bg-orange-900 transition font-semibold tracking-wide"
            >
              {editId ? "Update Postingan" : "Jadwalkan Postingan 📣"}
            </button>
          </div>
        </form>

        {/* Daftar Postingan */}
        <div>
          <h3 className="text-2xl font-semibold text-orange-800 mb-4">Postingan Terjadwal</h3>
          {posts.length === 0 ? (
            <p className="text-gray-600 italic">Belum ada postingan terjadwal.</p>
          ) : (
            <ul className="space-y-3">
              {posts.map((p) => (
                <li
                  key={p.id}
                  className="bg-orange-50 border border-orange-300 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-orange-900">{p.platform}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(p.schedule).toLocaleString()} - <span className="italic">{p.status}</span>
                      </div>
                      <p className="text-gray-700 mt-2">{p.content}</p>
                    </div>
                    <div className="text-sm space-x-2">
                      <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">
                        Hapus
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaMarketing;