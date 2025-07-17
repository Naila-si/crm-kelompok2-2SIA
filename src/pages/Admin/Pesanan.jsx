import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

function Pesanan() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/dataset_pemesanan_kotor.xlsx")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);

        const mappedData = json.map((item, i) => {
          // ✅ Fungsi konversi angka Excel ke tanggal normal
          const convertExcelDate = (val) => {
            if (!val) return "-";
            if (!isNaN(val)) {
              const date = new Date((val - 25569) * 86400 * 1000);
              const dd = String(date.getDate()).padStart(2, "0");
              const mm = String(date.getMonth() + 1).padStart(2, "0");
              const yyyy = date.getFullYear();
              return `${dd}/${mm}/${yyyy}`;
            }
            return val; // kalau sudah string, langsung pakai
          };

          return {
            id: item.id_pemesanan || i + 1,
            nama_pelanggan: item.nama_pelanggan || "-",
            tanggal_acara: convertExcelDate(item.tanggal_pengantaran), // ✅ sudah diperbaiki
            jenis_menu: item.jenis || "-",
            daftar_menu: item.menu || "-",
            jumlah_porsi: item.porsi || 0,
            lokasi_pengiriman: item.lokasi || "-",
            catatan: item.catatan || "-",
            status: item.status_pemesanan || "Menunggu",
            total_pembayaran: item.total_pembayaran || 0,
            metode_pembayaran: item.metode_pembayaran || "-",
            jumlah_pemesanan: item.jumlah_pemesanan || 1,
          };
        });

        setOrders(mappedData);
        localStorage.setItem("orders", JSON.stringify(mappedData));
      });
  }, []);

  const handleDelete = (id) => {
    const order = orders.find((o) => o.id === id);
    const konfirmasi = window.confirm(
      `Yakin ingin menghapus pesanan dari ${order?.nama_pelanggan}?`
    );
    if (konfirmasi) {
      const filtered = orders.filter((o) => o.id !== id);
      setOrders(filtered);
      localStorage.setItem("orders", JSON.stringify(filtered));
      toast.success("Pesanan berhasil dihapus!");
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((o) =>
      o.id === id ? { ...o, status: newStatus } : o
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.success("Status pesanan diperbarui!");
  };

  const handlePrediksi = (order) => {
    // ✅ Cari semua pesanan milik pelanggan ini
    const allOrdersByCustomer = orders.filter(
      (o) => o.nama_pelanggan === order.nama_pelanggan
    );

    // ✅ Hitung totalnya
    const totalPemesanan = allOrdersByCustomer.length;
    const totalPembayaran = allOrdersByCustomer.reduce(
      (sum, o) => sum + (parseInt(o.total_pembayaran) || 0),
      0
    );
    const totalPorsi = allOrdersByCustomer.reduce(
      (sum, o) => sum + (parseInt(o.jumlah_porsi) || 0),
      0
    );

    // ✅ Kirim ke localStorage
    const prediksiData = {
      jumlah_pemesanan: totalPemesanan,
      total_pembayaran: totalPembayaran,
      jumlah_porsi: totalPorsi,
    };

    localStorage.setItem("prediksiData", JSON.stringify(prediksiData));
    window.location.href = "/loyalty-prediksi";
  };


  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-start pt-0 px-4 pb-20"
      style={{ backgroundImage: 'url("/background.jpg")' }}
    >
      <div className="bg-white bg-opacity-95 rounded-xl shadow-xl w-full px-8 py-10 overflow-x-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#8B4513] font-serif drop-shadow">
            Selera Kampung Pekanbaru
          </h1>
          <h2 className="text-2xl font-semibold text-[#D2691E] italic font-serif mt-1">
            Catering Lezat & Elegan
          </h2>
          <p className="text-sm text-[#A0522D] mt-1">
            Solusi Pesan Makanan Catering Berkualitas untuk Acara Spesial Anda
          </p>
          <div className="mt-4 border-t-2 border-[#F4A460] w-1/2 mx-auto"></div>
        </header>

        <section>
          <h3 className="text-2xl font-semibold text-[#D2691E] mb-4 border-b-4 border-[#CD853F] inline-block pb-1 font-serif">
            Daftar Pesanan Catering
          </h3>
          <div className="overflow-x-auto rounded-lg shadow-md mt-4">
            <table className="min-w-[1300px] w-full table-fixed bg-white border border-[#DEB887] text-sm">
              <thead className="bg-[#FFF5E1] text-[#8B4513] font-semibold uppercase tracking-wide">
                <tr>
                  {[
                    "ID",
                    "Nama",
                    "Tgl Acara",
                    "Jenis",
                    "Menu",
                    "Porsi",
                    "Lokasi",
                    "Catatan",
                    "Status",
                    "Aksi",
                  ].map((col, i) => (
                    <th
                      key={i}
                      className="px-4 py-2 border border-[#DEB887] text-left"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr
                    key={o.id}
                    className="even:bg-[#FFFAF0] hover:bg-[#FAF0E6] transition duration-150"
                  >
                    <td className="px-4 py-2 border border-[#DEB887] w-[50px]">
                      {o.id}
                    </td>
                    <td className="px-4 py-2 border border-[#DEB887] w-[140px]">
                      {o.nama_pelanggan}
                    </td>
                    <td className="px-4 py-2 border border-[#DEB887] w-[120px]">
                      {o.tanggal_acara}
                    </td>
                    <td className="px-4 py-2 border border-[#DEB887] w-[100px]">
                      {o.jenis_menu}
                    </td>
                    <td className="px-4 py-2 border border-[#DEB887] w-[160px]">
                      {o.daftar_menu || "-"}
                    </td>
                    <td className="px-4 py-2 border border-[#DEB887] w-[80px]">
                      {o.jumlah_porsi}
                    </td>
                    <td className="px-4 py-2 border border-[#DEB887] w-[160px]">
                      {o.lokasi_pengiriman}
                    </td>
                    <td className="px-4 py-2 border border-[#DEB887] w-[150px]">
                      {o.catatan || "-"}
                    </td>
                    <td className="px-4 py-2 border border-[#DEB887] w-[120px]">
                      <select
                        value={o.status}
                        onChange={(e) =>
                          handleStatusChange(o.id, e.target.value)
                        }
                        className={`rounded-md px-2 py-1 text-sm font-semibold border w-full ${
                          o.status === "Selesai"
                            ? "text-green-700"
                            : o.status === "Dibatalkan"
                            ? "text-red-700"
                            : "text-orange-700"
                        }`}
                      >
                        <option value="Menunggu">Menunggu</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Dikirim">Dikirim</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 border border-[#DEB887] w-[100px] text-center space-y-1">
                      <button
                        onClick={() => handlePrediksi(o)}
                        className="bg-[#A0522D] hover:bg-[#8B4513] text-white px-2 py-1 rounded text-xs w-full transition duration-150 font-semibold"
                      >
                        Prediksi
                      </button>
                      <button
                        onClick={() => handleDelete(o.id)}
                        className="text-red-600 hover:underline font-semibold text-sm"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td
                      colSpan={13}
                      className="text-center py-6 italic text-[#8B4513]"
                    >
                      Belum ada pesanan catering.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Pesanan;