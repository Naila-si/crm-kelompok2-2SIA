import React, { useState } from "react";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    konfirmasi: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.konfirmasi) {
      alert("Password dan konfirmasi harus sama!");
      return;
    }
    // Simulasi register: bisa disimpan ke localStorage atau ke backend
    alert("Pendaftaran berhasil! Silakan login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#FFF8DC] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-[#8B4513] mb-6 text-center">
          Daftar Akun Catering
        </h2>
        <InputField label="Nama" name="nama" value={form.nama} onChange={handleChange} />
        <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
        <InputField label="Konfirmasi Password" name="konfirmasi" type="password" value={form.konfirmasi} onChange={handleChange} />
        <button
          type="submit"
          className="w-full bg-[#8B4513] text-white py-2 rounded hover:bg-[#A0522D] transition"
        >
          Daftar
        </button>
        <p className="mt-4 text-center text-sm">
          Sudah punya akun?{" "}
          <span
            className="text-[#D2691E] hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login di sini
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
