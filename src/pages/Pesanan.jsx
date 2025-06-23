import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Pesanan() {
  const [orders, setOrders] = useState([]);
  // const [form, setForm] = useState({
  //     pelanggan_id: "",
  //     nama_pelanggan: "",
  //     tanggal_pemesanan: "",
  //     tanggal_acara: "",
  //     jenis_menu: "",
  //     daftar_menu: "",
  //     jumlah_porsi: "",
  //     lokasi_pengiriman: "",
  //     catatan: "",
  //     status: "Proses",
  //   });
  // const [editId, setEditId] = useState(null);

 useEffect(() => {
  fetch("https://api.npoint.io/9658db68dc5a6df45ed3")
    .then((res) => res.json())
    .then((data) => {
      const withLevel = data.map((o) => ({
        ...o,
        level_pelanggan: o.level_pelanggan || "Bronze", // default jika tidak ada
      }));
      setOrders(withLevel);
      localStorage.setItem("orders", JSON.stringify(withLevel)); // simpan di localStorage
    });
}, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Submit form, editId:", editId);

  //   if (editId) {
  //     const updated = orders.map((o) =>
  //       o.id === editId ? { ...form, id: editId } : o
  //     );
  //     setOrders(updated);
  //     localStorage.setItem("orders", JSON.stringify(updated));
  //     toast.success("Pesanan berhasil diperbarui!");
  //     setEditId(null);
  //   } else {
  //     const newId = orders.length ? Math.max(...orders.map((o) => o.id)) + 1 : 1;
  //     const newOrder = { ...form, id: newId };
  //     const newOrders = [...orders, newOrder];
  //     setOrders(newOrders);
  //     localStorage.setItem("orders", JSON.stringify(newOrders));
  //     toast.success("Pesanan baru berhasil ditambahkan!");
  //   }

  //   setForm({
  //     pelanggan_id: "",
  //     nama_pelanggan: "",
  //     tanggal_pemesanan: "",
  //     tanggal_acara: "",
  //     jenis_menu: "",
  //     daftar_menu: "",
  //     jumlah_porsi: "",
  //     lokasi_pengiriman: "",
  //     catatan: "",
  //     status: "Proses",
  //   });
  // };

  // const handleEdit = (order) => {
  //   console.log("Edit data:", order); // untuk cek
  //   setForm({
  //     pelanggan_id: order.pelanggan_id || "",
  //     nama_pelanggan: order.nama_pelanggan || "",
  //     tanggal_pemesanan: order.tanggal_pemesanan || "",
  //     tanggal_acara: order.tanggal_acara || "",
  //     jenis_menu: order.jenis_menu || "",
  //     daftar_menu: order.daftar_menu || "",
  //     jumlah_porsi: order.jumlah_porsi || "",
  //     lokasi_pengiriman: order.lokasi_pengiriman || "",
  //     catatan: order.catatan || "",
  //     status: order.status || "Proses",
  //   });
  //   setEditId(order.id);
  // };

  const handleDelete = (id) => {
    const order = orders.find((o) => o.id === id);
    const konfirmasi = window.confirm(`Yakin ingin menghapus pesanan dari ${order?.nama_pelanggan}?`);

    if (konfirmasi) {
      const filtered = orders.filter((o) => o.id !== id);
      setOrders(filtered);
      localStorage.setItem("orders", JSON.stringify(filtered));
      toast.success("Pesanan berhasil dihapus!");
      
      // if (editId === id) {
      //   setEditId(null);
      //   setForm({
      //     pelanggan_id: "",
      //     nama_pelanggan: "",
      //     tanggal_pemesanan: "",
      //     tanggal_acara: "",
      //     jenis_menu: "",
      //     daftar_menu: "",
      //     jumlah_porsi: "",
      //     lokasi_pengiriman: "",
      //     catatan: "",
      //     status: "Proses",
      //   });
      // }
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

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-start pt-10 px-4 pb-20"
      style={{ backgroundImage: 'url("/background.jpg")' }}
    >
      <div className="bg-white bg-opacity-95 rounded-xl shadow-xl w-full px-8 py-10 overflow-x-auto">
        {/* Header */}
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

        {/* Form Pemesanan */}
        {/* <section className="mb-14">
          <h2 className="text-2xl font-semibold text-[#D2691E] mb-4 border-b-4 border-[#CD853F] inline-block pb-1 font-serif">
            {editId ? "Edit" : "Tambah"} Pesanan Catering
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-7"
          >
            <input
              type="text"
              placeholder="ID Pelanggan"
              required
              value={form.pelanggan_id}
              onChange={(e) => setForm({ ...form, pelanggan_id: e.target.value })}
              className="border border-[#D2691E] rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#CD853F] shadow-sm transition"
            />
            <input
              type="text"
              placeholder="Nama Pelanggan"
              required
              value={form.nama_pelanggan}
              onChange={(e) => setForm({ ...form, nama_pelanggan: e.target.value })}
              className="border border-[#D2691E] rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#CD853F] shadow-sm transition"
            />
            <input
              type="date"
              required
              value={form.tanggal_pemesanan}
              onChange={(e) => setForm({ ...form, tanggal_pemesanan: e.target.value })}
              className="border border-[#D2691E] rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#CD853F] shadow-sm transition"
            />
            <input
              type="date"
              required
              value={form.tanggal_acara}
              onChange={(e) => setForm({ ...form, tanggal_acara: e.target.value })}
              className="border border-[#D2691E] rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#CD853F] shadow-sm transition"
            />
            <select
              required
              value={form.jenis_menu}
              onChange={(e) => setForm({ ...form, jenis_menu: e.target.value })}
              className="border border-[#D2691E] rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#CD853F] shadow-sm transition"
            >
              <option value="">Pilih Jenis Menu</option>
              <option value="Nasi Kotak">Nasi Kotak</option>
              <option value="Prasmanan">Prasmanan</option>
              <option value="Vegetarian">Vegetarian</option>
            </select>
            <input
              type="text"
              placeholder="Daftar Menu (opsional)"
              value={form.daftar_menu}
              onChange={(e) => setForm({ ...form, daftar_menu: e.target.value })}
              className="border border-[#D2691E] rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#CD853F] shadow-sm transition"
            />
            <input
              type="number"
              placeholder="Jumlah Porsi"
              required
              value={form.jumlah_porsi}
              onChange={(e) => setForm({ ...form, jumlah_porsi: e.target.value })}
              className="border border-[#D2691E] rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#CD853F] shadow-sm transition"
              min={1}
            />
            <input
              type="text"
              placeholder="Lokasi Pengiriman"
              required
              value={form.lokasi_pengiriman}
              onChange={(e) => setForm({ ...form, lokasi_pengiriman: e.target.value })}
              className="border border-[#D2691E] rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#CD853F] shadow-sm transition"
            />
            <input
              type="text"
              placeholder="Catatan Tambahan"
              value={form.catatan}
              onChange={(e) => setForm({ ...form, catatan: e.target.value })}
              className="border border-[#D2691E] rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#CD853F] shadow-sm transition"
            />
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="border border-[#D2691E] rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#CD853F] shadow-sm transition"
              required
            >
              <option value="Proses">Proses</option>
              <option value="Selesai">Selesai</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>

            <button
              type="submit"
              className="bg-[#D2691E] hover:bg-[#A0522D] text-white font-bold rounded-md py-4 col-span-1 md:col-span-2 shadow-lg transition"
            >
              {editId ? "Update" : "Tambah"} Pesanan
            </button>
          </form>
        </section> */}

          {/* Daftar Pesanan */}
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
                      "ID Pelanggan",
                      "Nama",
                      "Tgl Pesan",
                      "Tgl Acara",
                      "Jenis",
                      "Menu",
                      "Porsi",
                      "Lokasi",
                      "Catatan",
                      "Level",
                      "Status",
                      "Aksi",
                    ].map((col, i) => (
                      <th key={i} className="px-4 py-2 border border-[#DEB887] text-left">
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
                      <td className="px-4 py-2 border border-[#DEB887] w-[50px]">{o.id}</td>
                      <td className="px-4 py-2 border border-[#DEB887] w-[110px]">{o.pelanggan_id}</td>
                      <td className="px-4 py-2 border border-[#DEB887] w-[140px]">{o.nama_pelanggan}</td>
                      <td className="px-4 py-2 border border-[#DEB887] w-[120px]">{o.tanggal_pemesanan}</td>
                      <td className="px-4 py-2 border border-[#DEB887] w-[120px]">{o.tanggal_acara}</td>
                      <td className="px-4 py-2 border border-[#DEB887] w-[100px]">{o.jenis_menu}</td>
                      <td className="px-4 py-2 border border-[#DEB887] w-[160px]">{o.daftar_menu || "-"}</td>
                      <td className="px-4 py-2 border border-[#DEB887] w-[80px]">{o.jumlah_porsi}</td>
                      <td className="px-4 py-2 border border-[#DEB887] w-[160px]">{o.lokasi_pengiriman}</td>
                      <td className="px-4 py-2 border border-[#DEB887] w-[150px]">{o.catatan || "-"}</td>
                      <td
                        className={`px-4 py-2 border border-[#DEB887] font-semibold w-[80px] ${
                          o.level_pelanggan === "Gold"
                            ? "text-yellow-700"
                            : o.level_pelanggan === "Silver"
                            ? "text-gray-500"
                            : "text-[#CD853F]"
                        }`}
                      >
                        {o.level_pelanggan}
                      </td>
                      <td className="px-4 py-2 border border-[#DEB887] w-[120px]">
                        <select
                          value={o.status}
                          onChange={(e) => handleStatusChange(o.id, e.target.value)}
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
                      <td className="px-4 py-2 border border-[#DEB887] w-[80px] text-center">
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
                      <td colSpan={13} className="text-center py-6 italic text-[#8B4513]">
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