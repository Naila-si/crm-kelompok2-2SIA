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
    level: "",
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

    const storedUsers = JSON.parse(localStorage.getItem("dummyUsers")) || {};
    const mergedUsers = { ...dummyUsers, ...storedUsers };
    const userData = mergedUsers[email];

    if (!userData || userData.password !== password) {
      setErrorMsg("Email atau password salah.");
      return;
    }

    const { password: _, ...userWithoutPassword } = userData;
    userWithoutPassword.email = email;

    localStorage.setItem("user", JSON.stringify(userWithoutPassword));

    if (userWithoutPassword.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/beranda");
    }
  };

  return (
    <div className="w-screen h-screen flex bg-orange-50">
      {/* Kiri: Gambar & Selamat Datang */}
      <div className="w-1/2 bg-[#9C2D2D] text-white p-10 flex flex-col justify-center items-center">
        <img
          src="/logo.png"
          alt="Selera Kampung"
          className="w-62 h-32 mb-6 object-contain"
        />
        <h2 className="text-3xl font-bold mb-2 text-center">Selamat Datang!</h2>
        <p className="text-center text-sm text-white/80 max-w-sm">
          Ayo login untuk menikmati layanan dari{" "}
          <span className="font-semibold">Selera Kampung</span>.
        </p>
      </div>

      {/* Kanan: Form Login */}
      <div className="w-1/2 p-10 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-[#9C2D2D] text-center">
            Masuk
          </h1>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Masukkan email & password
          </p>

          <form onSubmit={handleSubmit}>
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

            {errorMsg && (
              <p className="text-red-600 text-sm mb-3 text-center">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="bg-[#9C2D2D] text-white py-2 w-full rounded hover:bg-[#7a2222]"
            >
              Masuk
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-600 text-center">
            Belum punya akun?{" "}
            <a
              href="/register"
              className="text-[#9C2D2D] font-semibold hover:underline"
            >
              Daftar di sini
            </a>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-2 text-center">
              Atau login dengan:
            </p>
            <button
              type="button"
              onClick={() =>
                alert("Fitur login dengan Google belum tersedia")
              }
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-sm">Login dengan Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
