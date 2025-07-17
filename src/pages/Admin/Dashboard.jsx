import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

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
  const [barData, setBarData] = useState({ labels: [], datasets: [] });
  const [pendapatanData, setPendapatanData] = useState({ labels: [], datasets: [] });
  const [totalPesananBulanIni, setTotalPesananBulanIni] = useState(0);
  const [totalPendapatanBulanIni, setTotalPendapatanBulanIni] = useState(0);

  function parseTanggal(tanggal) {
    if (!tanggal) return null;
    if (!isNaN(tanggal)) {
      return new Date((tanggal - 25569) * 86400 * 1000);
    }
    if (typeof tanggal === "string") {
      const parts = tanggal.split(/[\/\-]/);
      if (parts.length === 3) {
        const [dd, mm, yyyy] = parts;
        return new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd));
      }
    }
    return null;
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    fetch("/dataset_pemesanan_kotor.xlsx")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);

        const bulanMap = Array(12).fill(0);
        const pendapatanMap = Array(12).fill(0);
        const bulanSekarang = new Date().getMonth();
        let pendapatanBulanIni = 0;
        let pesananBulanIni = 0;

        json.forEach((item) => {
          const tgl = parseTanggal(item.tanggal_pengantaran);
          if (tgl) {
            const bulan = tgl.getMonth();
            bulanMap[bulan]++;
            pendapatanMap[bulan] += parseInt(item.total_pembayaran || 0);

            if (bulan === bulanSekarang) {
              pesananBulanIni++;
              pendapatanBulanIni += parseInt(item.total_pembayaran || 0);
            }
          }
        });

        setBarData({
          labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
          datasets: [
            {
              label: "Jumlah Pesanan",
              data: bulanMap,
              backgroundColor: "#A02B2B",
              borderRadius: 6,
            },
          ],
        });

        setPendapatanData({
          labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
          datasets: [
            {
              label: "Pendapatan (Rp)",
              data: pendapatanMap,
              borderColor: "#5E3B1E",
              backgroundColor: "rgba(94,59,30,0.2)",
              tension: 0.4,
              fill: true,
              pointRadius: 4,
              pointBackgroundColor: "#5E3B1E",
            },
          ],
        });

        setTotalPesananBulanIni(pesananBulanIni);
        setTotalPendapatanBulanIni(pendapatanBulanIni);
      });
  }, []);

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Jumlah Pesanan per Bulan (2025)",
        font: { size: 16, weight: "bold" },
        color: "#1F1F1F",
      },
    },
    maintainAspectRatio: false,
  };

  const pendapatanOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Pendapatan per Bulan (2025)",
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

      {/* Card baru */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-xl shadow p-5 bg-[#D7B85B] text-[#1F1F1F]">
          <p className="text-sm font-semibold">Total Pesanan Bulan Ini</p>
          <h2 className="text-2xl font-bold mt-2">{totalPesananBulanIni}</h2>
        </div>
        <div className="rounded-xl shadow p-5 bg-[#A02B2B] text-white">
          <p className="text-sm font-semibold">Total Pendapatan Bulan Ini</p>
          <h2 className="text-2xl font-bold mt-2">
            Rp {totalPendapatanBulanIni.toLocaleString("id-ID")}
          </h2>
        </div>
      </div>

      {/* 2 Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4 h-[300px]">
          <Bar options={barOptions} data={barData} />
        </div>
        <div className="bg-white rounded-xl shadow p-4 h-[300px]">
          <Line options={pendapatanOptions} data={pendapatanData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
