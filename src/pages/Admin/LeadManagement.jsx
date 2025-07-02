import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../supabase";

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase.from("leads").select("*");
    if (error) toast.error("Gagal memuat data");
    else setLeads(data);
  };

  const handleFollowUp = async (id) => {
    const { error } = await supabase
      .from("leads")
      .update({ status: "Di-follow-up" })
      .eq("id", id);
    if (!error) {
      toast.success("Lead di-follow-up!");
      fetchLeads();
    } else {
      toast.error("Gagal update status");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus lead ini?");
    if (!confirm) return;

    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (!error) {
      toast.success("Lead berhasil dihapus");
      fetchLeads();
    } else {
      toast.error("Gagal menghapus lead");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-[#FDF6E3] rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-[#5E3B1E] mb-6 font-serif">
        Follow Up Pelanggan
      </h2>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target;
          const newLead = {
            nama: form.nama.value,
            no_hp: form.no_hp.value,
            jenis: form.jenis.value,
            reminder: form.reminder.value,
            petugas: form.petugas.value,
            catatan: form.catatan.value,
            status: form.status.value,
            tanggal_input: new Date().toISOString().split("T")[0],
          };

          const { error } = await supabase.from("leads").insert([newLead]);
          if (!error) {
            toast.success("Lead ditambahkan!");
            form.reset();
            fetchLeads();
          } else {
            toast.error("Gagal menambah lead");
          }
        }}
        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block mb-1 text-sm font-medium">Nama</label>
          <input name="nama" required className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Nomor HP</label>
          <input name="no_hp" required className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Jenis Lead</label>
          <select name="jenis" required className="border p-2 w-full">
            <option value="">-- Pilih Jenis --</option>
            <option value="calon pelanggan">Calon Pelanggan</option>
            <option value="pelanggan pasif">Pelanggan Pasif</option>
            <option value="komplain">Komplain</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Tanggal Reminder</label>
          <input name="reminder" type="date" required className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Petugas</label>
          <input name="petugas" required className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Status</label>
          <select name="status" required className="border p-2 w-full">
            <option value="Baru">Baru</option>
            <option value="Pasif">Pasif</option>
            <option value="Komplain">Komplain</option>
            <option value="Di-follow-up">Di-follow-up</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium">Catatan</label>
          <input name="catatan" required className="border p-2 w-full" />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded col-span-full"
        >
          Tambah Lead
        </button>
      </form>
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-orange-100 text-left">
              <th className="py-2 px-4">Nama</th>
              <th className="py-2 px-4">No HP</th>
              <th className="py-2 px-4">Jenis</th>
              <th className="py-2 px-4">Reminder</th>
              <th className="py-2 px-4">Petugas</th>
              <th className="py-2 px-4">Catatan</th>
              <th className="py-2 px-4">Tanggal Input</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-t border-orange-200 hover:bg-orange-50"
              >
                <td className="py-2 px-4">{lead.nama}</td>
                <td className="py-2 px-4">{lead.no_hp}</td>
                <td className="py-2 px-4">{lead.jenis}</td>
                <td className="py-2 px-4">{lead.reminder}</td>
                <td className="py-2 px-4">{lead.petugas}</td>
                <td className="py-2 px-4 italic text-gray-600">{lead.catatan}</td>
                <td className="py-2 px-4">{lead.tanggal_input}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      lead.status === "Baru"
                        ? "bg-green-100 text-green-700"
                        : lead.status === "Pasif"
                        ? "bg-yellow-100 text-yellow-700"
                        : lead.status === "Komplain"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="py-2 px-4 flex gap-2">
                  {lead.status !== "Di-follow-up" ? (
                    <button
                      onClick={() => handleFollowUp(lead.id)}
                      className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1 rounded"
                    >
                      Follow Up
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold text-xs">Ditindak</span>
                  )}
                  <button
                    onClick={() => handleDelete(lead.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadManagement;
