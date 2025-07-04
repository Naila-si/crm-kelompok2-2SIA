import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultAvatar =
  "https://ui-avatars.com/api/?background=random&color=fff&name=User";

const Profil = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "", avatar: "" });
  const [password, setPassword] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) setUser(stored);
  }, []);

  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name,
        email: user.email,
        avatar: user.avatar || defaultAvatar,
      });
    }
  }, [user]);

  if (!user) return <div className="text-center py-20">Memuat data profil...</div>;

  const badgeColor = {
    bronze: "bg-orange-100 text-[#CD7F32] border-orange-300",
    silver: "bg-purple-100 text-gray-600 border-purple-300",
    gold: "bg-yellow-100 text-yellow-600 border-yellow-300",
  }[user.level] || "bg-gray-100 text-gray-400 border-gray-300";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditData((prev) => ({ ...prev, avatar: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...editData,
      password: password ? password : user.password,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    setPassword("");
    alert("Profil berhasil diperbarui!");
  };

  const handleDeleteAccount = () => {
    const konfirmasi = window.confirm("Yakin ingin menghapus akun?");
    if (konfirmasi) {
      localStorage.removeItem("user");
      alert("Akun kamu telah dihapus.");
      navigate("/");
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-[#fff8f0] min-h-screen">
      {/* Header */}
      <section
        className="h-[40vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage:
            "url('https://s1-id.alongwalker.co/wp-content/uploads/2024/07/image-top-10-pilihan-catering-di-pekanbaru-riau-buat-acara-maupun-harian-manakah-yang-paling-enak-dan-murah-62258e4294ff1f402c284956a551228f.jpg')",
        }}
      >
        <div className="bg-black/60 p-6 rounded-xl">
          <h1 className="text-3xl font-bold mb-2">Hai, {user.name} 👋</h1>
          <p className="text-sm">
            Ini adalah halaman profil kamu sebagai pelanggan setia Selera Kampung.
          </p>
        </div>
      </section>

      {/* Profil Card */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-orange-200">
          {/* Foto + Nama */}
          <div className="flex flex-col items-center text-center mb-8">
            <img
              src={user.avatar || defaultAvatar}
              alt="Avatar"
              className="w-28 h-28 rounded-full border-4 border-orange-300 shadow-md object-cover mb-4"
            />
            <h2 className="text-2xl font-bold text-[#9C2D2D]">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          {/* Detail Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">🎖 Level Member</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${badgeColor}`}
              >
                {user.level || "Belum Ada"}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">📆 Bergabung Sejak</p>
              <p className="text-base font-medium">{user.joined}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">🛍 Total Transaksi</p>
              <p className="text-base font-semibold">{user.totalTransaksi} kali</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">🔐 Role</p>
              <p className="text-base capitalize font-semibold">{user.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">📦 Status Langganan</p>
              <p
                className={`text-base font-semibold ${
                  user.langgananAktif ? "text-green-600" : "text-red-500"
                }`}
              >
                {user.langgananAktif ? "Aktif" : "Tidak Aktif"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">⭐ Status Pengguna</p>
              <p className="text-base">
                {user.level === "gold"
                  ? "Pelanggan Prioritas"
                  : user.level === "silver"
                  ? "Pelanggan Loyal"
                  : user.level === "bronze"
                  ? "Pelanggan Baru"
                  : "Belum Terklasifikasi"}
              </p>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="mt-10 flex flex-col md:flex-row justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate("/beranda")}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full transition"
            >
              ⬅ Kembali ke Beranda
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="border border-orange-600 text-orange-600 hover:bg-orange-50 px-6 py-2 rounded-full transition"
            >
              ✏️ Edit Profil
            </button>

            <button
              onClick={handleDeleteAccount}
              className="border border-red-500 text-red-600 hover:bg-red-50 px-6 py-2 rounded-full transition"
            >
              🗑 Hapus Akun
            </button>
          </div>

          {/* Modal Edit */}
          {isEditing && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
                <h2 className="text-xl font-bold mb-4 text-center text-[#9C2D2D]">
                  Edit Profil
                </h2>

                <label className="block mb-3">
                  <span className="text-sm text-gray-600">Nama</span>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded mt-1"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                </label>

                <label className="block mb-3">
                  <span className="text-sm text-gray-600">Email</span>
                  <input
                    type="email"
                    className="w-full border px-3 py-2 rounded mt-1"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                  />
                </label>

                <label className="block mb-3">
                  <span className="text-sm text-gray-600">Avatar (opsional)</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="block mt-1"
                    onChange={handleFileChange}
                  />
                  <img
                    src={editData.avatar}
                    alt="Preview Avatar"
                    className="w-16 h-16 rounded-full mt-3 border"
                  />
                </label>

                <label className="block mb-4">
                  <span className="text-sm text-gray-600">Ubah Password</span>
                  <input
                    type="password"
                    className="w-full border px-3 py-2 rounded mt-1"
                    placeholder="Biarkan kosong jika tidak ingin mengubah"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setPassword("");
                    }}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Profil;
