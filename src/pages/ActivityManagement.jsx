import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';

const dummyReminders = [
  { id: 1, customerName: "Ibu Sari", eventDate: "2025-06-25", message: "Halo Ibu Sari, ini pengingat untuk acara catering pada tanggal 25 Juni 2025.", isDraft: false },
  { id: 2, customerName: "Bapak Ahmad", eventDate: "2025-07-01", message: "Jangan lupa pesanan tumpeng untuk acara keluarga Anda.", isDraft: false },
  { id: 3, customerName: "Bu Lina", eventDate: "2025-07-10", message: "Pesanan snack box Anda akan diantar pada tanggal 10 Juli.", isDraft: false },
  { id: 4, customerName: "Pak Rudi", eventDate: "2025-07-12", message: "Reminder untuk pemesanan nasi kotak di hari Sabtu.", isDraft: true },
  { id: 5, customerName: "Mbak Tika", eventDate: "2025-07-15", message: "Pengingat pemesanan untuk acara arisan minggu depan.", isDraft: true },
];

const ActivityManagement = () => {
  const [reminder, setReminder] = useState({
    id: null,
    customerName: "",
    eventDate: "",
    message: "",
    isDraft: false
  });

  const [reminders, setReminders] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reminders")) || [];
    if (stored.length === 0) {
      localStorage.setItem("reminders", JSON.stringify(dummyReminders));
      setReminders(dummyReminders);
    } else {
      setReminders(stored);
    }
  }, []);

  const handleChange = (e) => {
    setReminder({ ...reminder, [e.target.name]: e.target.value });
  };

  const saveToStorage = (updated) => {
    setReminders(updated);
    localStorage.setItem("reminders", JSON.stringify(updated));
  };

  const handleSend = (e) => {
    e.preventDefault();
    const updated = editMode
      ? reminders.map((r) => (r.id === reminder.id ? { ...reminder, isDraft: false } : r))
      : [...reminders, { ...reminder, id: Date.now(), isDraft: false }];
    saveToStorage(updated);
    toast.success(editMode ? "Pengingat diperbarui dan dikirim!" : "Pengingat berhasil dikirim!");
    resetForm();
  };

  const handleSaveDraft = () => {
    const updated = editMode
      ? reminders.map((r) => (r.id === reminder.id ? { ...reminder, isDraft: true } : r))
      : [...reminders, { ...reminder, id: Date.now(), isDraft: true }];
    saveToStorage(updated);
    toast.success("Disimpan sebagai draf.");
    resetForm();
  };

  const handleEdit = (r) => {
    setReminder(r);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    const updated = reminders.filter((r) => r.id !== id);
    saveToStorage(updated);
    toast.success("Pengingat dihapus.");
  };

  const resetForm = () => {
    setReminder({ id: null, customerName: "", eventDate: "", message: "", isDraft: false });
    setEditMode(false);
  };

  const filteredReminders = filterDate
    ? reminders.filter((r) => r.eventDate === filterDate && !r.isDraft)
    : reminders.filter((r) => !r.isDraft);

  const drafts = reminders.filter((r) => r.isDraft);

  return (
    <div className="bg-[url('/bg-batik-light.png')] bg-fixed bg-cover min-h-screen py-0 px-0">
      <div className="w-full max-w-5xl mx-auto p-10 bg-[#fef8f1] border border-orange-300 rounded-3xl shadow-xl">
        <div className="mb-8">
          <h2 className="text-5xl font-serif font-bold text-orange-900 mb-2 border-b-2 border-orange-500 inline-block pb-1">
            Notifikasi Ke Pelanggan
          </h2>
          <p className="text-md text-gray-700 font-medium">
            Kirim atau simpan pengingat untuk pelanggan setia Anda.
          </p>
        </div>

        <form onSubmit={handleSend} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Pelanggan</label>
            <input
              type="text"
              name="customerName"
              value={reminder.customerName}
              onChange={handleChange}
              className="w-full border border-orange-300 rounded-xl px-4 py-2"
              placeholder="Contoh: Ibu Sari"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Kirim</label>
            <input
              type="date"
              name="eventDate"
              value={reminder.eventDate}
              onChange={handleChange}
              className="w-full border border-orange-300 rounded-xl px-4 py-2"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Pesan Pengingat</label>
            <textarea
              name="message"
              value={reminder.message}
              onChange={handleChange}
              className="w-full border border-orange-300 rounded-xl px-4 py-2 h-32 resize-none"
              placeholder="Tulis pesan pengingat..."
              required
            />
          </div>

          <div className="col-span-2 flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-orange-800 text-white py-3 rounded-xl hover:bg-orange-900 font-semibold"
            >
              {editMode ? "Update & Kirim" : "Kirim Pengingat 📩"}
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex-1 bg-orange-400 text-white py-3 rounded-xl hover:bg-orange-500 font-semibold"
            >
              Simpan sebagai Draf 📝
            </button>
          </div>
        </form>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Filter berdasarkan tanggal</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border border-orange-300 rounded-xl px-4 py-2 bg-white"
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-orange-800 mb-4">Daftar Pengingat</h3>
          {filteredReminders.length === 0 ? (
            <p className="text-gray-500 italic">Tidak ada pengingat untuk tanggal tersebut.</p>
          ) : (
            <div className="grid gap-4">
              {filteredReminders.map((r) => (
                <div key={r.id} className="bg-white border border-orange-200 rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-lg font-semibold text-orange-900">{r.customerName}</p>
                      <p className="text-sm text-gray-600 mb-1">Tanggal: {r.eventDate}</p>
                      <p className="text-gray-700">{r.message}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <button onClick={() => handleEdit(r)} className="text-blue-600 hover:underline text-sm">Edit</button>
                      <button onClick={() => handleDelete(r.id)} className="text-red-600 hover:underline text-sm">Hapus</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-orange-800 mb-4">Draf Pengingat</h3>
          {drafts.length === 0 ? (
            <p className="text-gray-500 italic">Tidak ada draf.</p>
          ) : (
            <div className="grid gap-4">
              {drafts.map((r) => (
                <div key={r.id} className="bg-orange-50 border border-orange-200 rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-lg font-semibold text-orange-800">{r.customerName}</p>
                      <p className="text-sm text-gray-600 mb-1">Tanggal: {r.eventDate}</p>
                      <p className="text-gray-700">{r.message}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <button onClick={() => handleEdit(r)} className="text-blue-600 hover:underline text-sm">Edit</button>
                      <button onClick={() => handleDelete(r.id)} className="text-red-600 hover:underline text-sm">Hapus</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityManagement;