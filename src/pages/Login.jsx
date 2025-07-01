import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyUsers = {
  "admin@gmail.com": {
    name: "Admin Selera Kampung",
    password: "admin123",
    role: "admin",
    level: "-",
    joined: "2024-01-01",
    totalTransaksi: 0,
    langgananAktif: false,
  },
  "guest@gmail.com": {
    name: "Tamu Baru",
    password: "guest123",
    role: "user",
    level: "", // kosong = pelanggan biasa
    joined: "2025-07-01",
    totalTransaksi: 0,
    langgananAktif: false,
  },
  "user1@gmail.com": {
    name: "Rina",
    password: "bronze123",
    role: "user",
    level: "bronze",
    joined: "2024-09-15",
    totalTransaksi: 2,
    langgananAktif: false,
  },
  "user2@gmail.com": {
    name: "Rizki",
    password: "silver123",
    role: "user",
    level: "silver",
    joined: "2024-10-01",
    totalTransaksi: 5,
    langgananAktif: true,
  },
  "user3@gmail.com": {
    name: "Salsa",
    password: "gold123",
    role: "user",
    level: "gold",
    joined: "2024-08-20",
    totalTransaksi: 12,
    langgananAktif: true,
  },
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = dummyUsers[email];

    if (!userData || userData.password !== password) {
      setErrorMsg("Email atau password salah.");
      return;
    }

    const { password: _, ...userWithoutPassword } = userData; // jangan simpan password
    userWithoutPassword.email = email;

    localStorage.setItem("user", JSON.stringify(userWithoutPassword));

    if (userWithoutPassword.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/beranda");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4 text-[#9C2D2D]">Masuk</h1>
        <p className="text-sm text-gray-600 mb-4">Gunakan email & password dummy</p>

        <input
          type="email"
          placeholder="Email kamu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password kamu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        {errorMsg && <p className="text-red-600 text-sm mb-3">{errorMsg}</p>}

        <button type="submit" className="bg-[#9C2D2D] text-white py-2 w-full rounded hover:bg-[#7a2222]">
          Masuk
        </button>
      </form>
    </div>
  );
};

export default Login;
