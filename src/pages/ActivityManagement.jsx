import React, { useState } from "react";
import toast from 'react-hot-toast';

const ActivityManagement = () => {
  const [reminder, setReminder] = useState({
    customerName: "",
    eventDate: "",
    message: "",
  });

  const handleChange = (e) => {
    setReminder({ ...reminder, [e.target.name]: e.target.value });
  };

  const handleSend = (e) => {
    e.preventDefault();
    toast.success('Pengingat berhasil dikirim!');
    setReminder({ customerName: "", eventDate: "", message: "" });
  };

  return (
    <div className="bg-[url('/bg-batik-light.png')] bg-fixed bg-cover min-h-screen py-16 px-6">
      <div className="w-full max-w-5xl mx-auto p-10 bg-[#fef8f1] border border-orange-300 rounded-3xl shadow-xl">
        <div className="mb-8">
          <h2 className="text-5xl font-serif font-bold text-orange-900 mb-2 border-b-2 border-orange-500 inline-block pb-1">
            Manajemen Aktivitas
          </h2>
          <p className="text-md text-gray-700 font-medium">
            Kirim pengingat kepada pelanggan setia untuk acara atau pesanan rutin.
          </p>
        </div>

        <form onSubmit={handleSend} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Pelanggan</label>
            <input
              type="text"
              name="customerName"
              value={reminder.customerName}
              onChange={handleChange}
              className="w-full border border-orange-300 bg-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Contoh: Ibu Sari"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Acara</label>
            <input
              type="date"
              name="eventDate"
              value={reminder.eventDate}
              onChange={handleChange}
              className="w-full border border-orange-300 bg-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Pesan Pengingat</label>
            <textarea
              name="message"
              value={reminder.message}
              onChange={handleChange}
              className="w-full border border-orange-300 bg-white rounded-xl px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Contoh: Halo Ibu Sari, ini pengingat untuk acara catering pada tanggal 25 Juni 2025..."
              required
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-orange-800 text-white py-3 rounded-xl hover:bg-orange-900 transition font-semibold tracking-wide"
            >
              Kirim Pengingat 📩
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityManagement;
