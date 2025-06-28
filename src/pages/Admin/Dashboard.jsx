import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      setIsReady(true);
    }
  }, [navigate]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex justify-center items-center text-[#8B4513] font-semibold">
        Memuat Dashboard...
      </div>
    );
  }

  const stats = [
    {
      label: "Pesanan Hari Ini",
      value: "128",
      percent: "+15%",
      color: "bg-[#D7B85B] text-[#1F1F1F]",
    },
    {
      label: "Pendapatan Hari Ini",
      value: "Rp 3.500.000",
      percent: "+12%",
      color: "bg-[#A02B2B] text-white",
    },
    {
      label: "Pelanggan Baru",
      value: "23",
      percent: "+5%",
      color: "bg-[#5E3B1E] text-white",
    },
    {
      label: "Menu Terjual",
      value: "412",
      percent: "+9%",
      color: "bg-[#EEE2C0] text-[#1F1F1F]",
    },
  ];

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    datasets: [
      {
        label: "Jumlah Pesanan",
        data: [240, 320, 400, 420, 500, 620, 710, 780, 860, 930, 1000, 1120],
        backgroundColor: "#A02B2B",
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Jumlah Pesanan per Bulan",
        font: { size: 16, weight: "bold" },
        color: "#1F1F1F",
      },
    },
    maintainAspectRatio: false,
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    datasets: [
      {
        label: "Jumlah Pelanggan",
        data: [120, 150, 180, 220, 250, 300, 360, 400, 430, 470, 520, 580],
        borderColor: "#5E3B1E",
        backgroundColor: "rgba(94, 59, 30, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#5E3B1E",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Pertumbuhan Pelanggan Tahun Ini",
        font: { size: 16, weight: "bold" },
        color: "#1F1F1F",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="p-6 bg-[#FDF6E3] min-h-screen">
      <div className="text-3xl font-bold text-center mb-6 text-[#1F1F1F]">
        Dashboard Selera Kampung
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`rounded-xl shadow p-5 ${stat.color}`}>
            <p className="text-sm font-semibold">{stat.label}</p>
            <div className="flex items-center justify-between mt-2">
              <h2 className="text-xl font-bold">{stat.value}</h2>
              <span className="text-xs bg-white/70 px-2 py-0.5 rounded font-semibold">
                {stat.percent}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Grafik sejajar kanan */}
      <div className="flex flex-col lg:flex-row justify-end gap-6">
        <div className="bg-white rounded-xl shadow p-4 h-[300px] w-full lg:w-1/2">
          <Bar options={barOptions} data={barData} />
        </div>
        <div className="bg-white rounded-xl shadow p-4 h-[300px] w-full lg:w-1/2">
          <Line options={lineOptions} data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
