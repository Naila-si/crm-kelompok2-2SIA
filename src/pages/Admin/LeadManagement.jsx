import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const dummyLeads = [
  {
    id: 1,
    nama: "Rina",
    status: "Baru",
    catatan: "Belum pernah pesan sebelumnya."
  },
  {
    id: 2,
    nama: "Andi",
    status: "Pasif",
    catatan: "Terakhir pesan 3 bulan lalu."
  },
  {
    id: 3,
    nama: "Dewi",
    status: "Komplain",
    catatan: "Komplain soal pengiriman lambat."
  }
];

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // Simulasi fetch data
    setLeads(dummyLeads);
  }, []);

  const handleFollowUp = (id) => {
    const updated = leads.map((lead) =>
      lead.id === id ? { ...lead, status: "Di-follow-up" } : lead
    );
    setLeads(updated);
    toast.success("Pelanggan telah difollow-up!");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-[#FDF6E3] rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-[#5E3B1E] border-orange-300 mb-6 font-serif">
        Follow Up
      </h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-orange-100 text-left">
            <th className="py-2 px-4">Nama</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Catatan</th>
            <th className="py-2 px-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-t border-orange-200 hover:bg-orange-50"
            >
              <td className="py-2 px-4 font-medium text-brown-900">{lead.nama}</td>
              <td className="py-2 px-4">
                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                  lead.status === "Baru"
                    ? "bg-green-100 text-green-700"
                    : lead.status === "Pasif"
                    ? "bg-yellow-100 text-yellow-700"
                    : lead.status === "Komplain"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}>{lead.status}</span>
              </td>
              <td className="py-2 px-4 italic text-gray-600">{lead.catatan}</td>
              <td className="py-2 px-4">
                {lead.status !== "Di-follow-up" && (
                  <button
                    onClick={() => handleFollowUp(lead.id)}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-4 py-2 rounded-md"
                  >
                    Follow Up
                  </button>
                )}
                {lead.status === "Di-follow-up" && (
                  <span className="text-green-600 font-semibold text-xs">Sudah ditindak</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadManagement;
