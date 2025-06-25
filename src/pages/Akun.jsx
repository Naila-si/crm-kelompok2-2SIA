import React, { useState } from "react";

const Akun = () => {
  const [form, setForm] = useState({
    nama: "Admin",
    email: "admin@gmail.com",
    passwordLama: "",
    passwordBaru: "",
    konfirmasiPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.passwordBaru !== form.konfirmasiPassword) {
      alert("Password baru dan konfirmasi tidak cocok!");
      return;
    }

    alert("Pengaturan akun berhasil diperbarui!");
  };

  return (
    <div className="bg-[#FDF6E3] min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 max-w-xl w-full space-y-5 border-2 border-[#D7B85B]"
      >
        <h1 className="text-2xl font-bold text-[#5E3B1E] mb-1">Pengaturan Akun</h1>
        <p className="text-[#1F1F1F] mb-4">
          Perbarui informasi akun kamu dengan aman dan cepat.
        </p>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Nama Lengkap</label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full border-2 border-[#D7B85B] rounded px-3 py-2 focus:outline-none focus:ring-[#D7B85B] focus:border-[#D7B85B]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border-2 border-[#D7B85B] rounded px-3 py-2 focus:outline-none focus:ring-[#D7B85B] focus:border-[#D7B85B]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Password Lama</label>
          <input
            type="password"
            name="passwordLama"
            value={form.passwordLama}
            onChange={handleChange}
            className="w-full border-2 border-[#D7B85B] rounded px-3 py-2 focus:outline-none focus:ring-[#D7B85B] focus:border-[#D7B85B]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Password Baru</label>
          <input
            type="password"
            name="passwordBaru"
            value={form.passwordBaru}
            onChange={handleChange}
            className="w-full border-2 border-[#D7B85B] rounded px-3 py-2 focus:outline-none focus:ring-[#D7B85B] focus:border-[#D7B85B]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Konfirmasi Password Baru</label>
          <input
            type="password"
            name="konfirmasiPassword"
            value={form.konfirmasiPassword}
            onChange={handleChange}
            className="w-full border-2 border-[#D7B85B] rounded px-3 py-2 focus:outline-none focus:ring-[#D7B85B] focus:border-[#D7B85B]"
          />
        </div>

        <button
          type="submit"
          className="bg-[#5E3B1E] text-white px-4 py-2 rounded hover:bg-[#4a2f18] transition"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default Akun;
