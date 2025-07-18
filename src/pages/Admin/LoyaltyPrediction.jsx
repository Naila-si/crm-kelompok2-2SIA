import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const LoyaltyPrediction = () => {
  const [form, setForm] = useState({
    jumlah_pemesanan: "",
    total_pembayaran: "",
    jumlah_porsi: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("prediksiData");

    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (
          parsed.jumlah_pemesanan !== undefined &&
          parsed.total_pembayaran !== undefined &&
          parsed.jumlah_porsi !== undefined
        ) {
          setForm({
            jumlah_pemesanan: parsed.jumlah_pemesanan.toString(),
            total_pembayaran: parsed.total_pembayaran.toString(),
            jumlah_porsi: parsed.jumlah_porsi.toString(),
          });

          setTimeout(() => {
            localStorage.removeItem("prediksiData");
          }, 100);
        }
      } catch (e) {
        console.error("Data prediksi tidak valid", e);
      }
    }
  }, []);

  const [hasil, setHasil] = useState(null);
  const [probabilitas, setProbabilitas] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Perhitungan manual untuk chart (tetap dipakai)
  const hitungProbabilitasPromo = ({
    jumlah_pemesanan,
    total_pembayaran,
    jumlah_porsi,
  }) => {
    let skor = 0;

    const jumlah = parseInt(jumlah_pemesanan);
    const total = parseInt(total_pembayaran);
    const porsi = parseInt(jumlah_porsi);

    if (jumlah > 10) skor += 2;
    else if (jumlah >= 6) skor += 1;

    if (total > 3000000) skor += 2;
    else if (total >= 1500000) skor += 1;

    if (porsi > 250) skor += 2;
    else if (porsi >= 100) skor += 1;

    let prob = 0;
    if (skor >= 5) prob = 90;
    else if (skor >= 3) prob = 60;
    else if (skor >= 1) prob = 30;
    else prob = 10;

    return {
      Menggunakan: prob,
      TidakMenggunakan: 100 - prob,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem("prediksiData");

    const res = await fetch("https://da73d5033893.ngrok-free.app/prediksi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jumlah_pemesanan: parseInt(form.jumlah_pemesanan),
        total_pembayaran: parseInt(form.total_pembayaran),
        jumlah_porsi: parseInt(form.jumlah_porsi),
      }),
    });

    const data = await res.json();
    setHasil(data);

    // ✅ Tetap pakai perhitungan manual khusus untuk chart
    const prob = hitungProbabilitasPromo(form);
    setProbabilitas(prob);
  };

  const chartData = {
    labels: ["Menggunakan Promo", "Tidak Menggunakan"],
    datasets: [
      {
        label: "Probabilitas Penggunaan Promo (%)",
        data: probabilitas
          ? [probabilitas.Menggunakan, probabilitas.TidakMenggunakan]
          : [0, 0],
        backgroundColor: ["#4ade80", "#f87171"],
        borderRadius: 5,
        barThickness: 30,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y",
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: (value) => `${value}%`,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.parsed.x}%`,
        },
      },
    },
  };

  return (
    <div className="bg-[url('/bg-batik-light.png')] bg-fixed bg-cover min-h-screen py-10">
      <div className="w-full max-w-4xl mx-auto p-8 bg-[#fef8f1] border border-orange-300 rounded-3xl shadow-xl">
        <h2 className="text-4xl font-serif font-bold text-center text-orange-900 mb-8 border-b-2 border-orange-500 inline-block pb-1">
          📊 Prediksi Loyalitas Pelanggan
        </h2>

        {/* Form Input */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8 border border-orange-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              name="jumlah_pemesanan"
              placeholder="Jumlah Pemesanan"
              value={form.jumlah_pemesanan}
              onChange={handleChange}
              className="w-full border border-orange-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
            <input
              type="number"
              name="total_pembayaran"
              placeholder="Total Pembayaran (Rp)"
              value={form.total_pembayaran}
              onChange={handleChange}
              className="w-full border border-orange-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
            <input
              type="number"
              name="jumlah_porsi"
              placeholder="Jumlah Porsi"
              value={form.jumlah_porsi}
              onChange={handleChange}
              className="w-full border border-orange-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-orange-700 text-white py-3 rounded-xl hover:bg-orange-800 font-semibold"
            >
              🔮 Prediksi Sekarang
            </button>
          </form>
        </div>

        {/* Hasil Prediksi */}
        {hasil && (
          <div className="mt-6 bg-orange-50 border border-orange-200 p-5 rounded-xl shadow-sm">
            <p className="text-lg font-semibold text-orange-900">
              ✅ Status: {hasil.status_pelanggan}
            </p>
            <p className="text-gray-700 mt-1">
              🎁 Rekomendasi Promo:{" "}
              <span className="font-medium">{hasil.rekomendasi_promo}</span>
            </p>
          </div>
        )}

        {/* Chart Probabilitas */}
        {probabilitas && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-orange-200">
            <h3 className="text-2xl font-bold text-orange-800 mb-4">
              📈 Probabilitas Penggunaan Promo
            </h3>
            <Bar data={chartData} options={chartOptions} />
            <div className="mt-4 bg-orange-50 p-4 rounded-xl">
              <p className="text-gray-800 font-medium mb-1">
                {probabilitas.Menggunakan >= 50
                  ? "✅ Peluang tinggi pelanggan menggunakan promo."
                  : "⚠️ Peluang rendah pelanggan menggunakan promo."}
              </p>
              <p className="text-sm text-gray-700">
                {probabilitas.Menggunakan >= 50
                  ? "Disarankan menawarkan promo eksklusif agar pelanggan semakin loyal."
                  : "Pertimbangkan strategi lain seperti sistem poin atau reminder agar pelanggan tertarik."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyPrediction;