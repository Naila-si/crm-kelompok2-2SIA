import React, { useState } from "react";
import InputField from "../components/Admin/InputField";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    konfirmasi: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.konfirmasi) {
      alert("Password dan konfirmasi harus sama!");
      return;
    }

    const newUser = {
      name: form.nama,
      password: form.password,
      role: "user",
      level: "",
      joined: new Date().toISOString().split("T")[0],
      totalTransaksi: 0,
      langgananAktif: false,
    };

    const allUsers = JSON.parse(localStorage.getItem("dummyUsers")) || {};
    allUsers[form.email] = newUser;
    localStorage.setItem("dummyUsers", JSON.stringify(allUsers));

    alert("Pendaftaran berhasil! Silakan login.");
    navigate("/login");
  };

  return (
    <div className="w-screen h-screen flex bg-orange-50">
      {/* Kiri: Logo dan Ucapan */}
      <div className="w-1/2 bg-[#9C2D2D] text-white p-10 flex flex-col justify-center items-center">
      <img
        src="/logo.png"
        alt="Logo"
        className="w-62 h-32 mb-6 object-contain"
      />
        <h2 className="text-4xl font-bold mb-2 text-center">Selamat Datang!</h2>
        <p className="text-center text-white/80 text-base max-w-sm">
          Buat akun untuk menikmati layanan dari{" "}
          <span className="font-semibold">Selera Kampung</span>.
        </p>
      </div>

      {/* Kanan: Form */}
      <div className="w-1/2 p-10 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#9C2D2D] mb-6 text-center">
            Daftar Akun Baru
          </h2>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Nama"
              name="nama"
              value={form.nama}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
            <InputField
              label="Konfirmasi Password"
              name="konfirmasi"
              type="password"
              value={form.konfirmasi}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full bg-[#9C2D2D] text-white py-2 rounded hover:bg-[#7a2222] mt-4"
            >
              Daftar
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Sudah punya akun?{" "}
            <span
              className="text-[#9C2D2D] hover:underline cursor-pointer font-medium"
              onClick={() => navigate("/signin")}
            >
              Login di sini
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
