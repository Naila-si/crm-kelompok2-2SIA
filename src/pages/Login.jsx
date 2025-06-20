import React, { useState } from "react";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Login hanya jika cocok dengan email dan password ini
    if (form.email === "admin@selera.id" && form.password === "12345678") {
      alert("Login berhasil!");
      navigate("/");
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8DC] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-[#8B4513] mb-6 text-center">
          Login Catering
        </h2>
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
        <button
          type="submit"
          className="w-full bg-[#8B4513] text-white py-2 rounded hover:bg-[#A0522D] transition"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm">
          Belum punya akun?{" "}
          <span
            className="text-[#D2691E] hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Daftar di sini
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
