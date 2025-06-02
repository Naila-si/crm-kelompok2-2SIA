import React, { useState, useEffect } from 'react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    address: '',
    email: '',
    status: 'Aktif',
  });

  // 🔁 Ambil data pelanggan dari localStorage saat component dimount
  useEffect(() => {
    const savedData = localStorage.getItem('customers');
    if (savedData) {
      setCustomers(JSON.parse(savedData));
    }
  }, []);

  // 💾 Simpan data pelanggan ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    setCustomers([...customers, formData]);
    setFormData({
      id: '',
      name: '',
      phone: '',
      address: '',
      email: '',
      status: 'Aktif',
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Manajemen Pelanggan</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-10">
        <h2 className="text-xl font-medium mb-4 text-gray-700">Tambah Pelanggan</h2>
        <form onSubmit={handleAddCustomer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="ID Pelanggan"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nama Lengkap"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="No. Telepon / WhatsApp"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Alamat Lengkap"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email (Tidak Wajib)"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="Aktif">Aktif</option>
            <option value="Nonaktif">Nonaktif</option>
            <option value="Potensial">Potensial</option>
          </select>
          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-medium mb-4 text-gray-700">Daftar Pelanggan</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 text-left text-sm text-gray-600">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Nama</th>
                <th className="p-3">Telepon</th>
                <th className="p-3">Alamat</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {customers.map((cust, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-3">{cust.id}</td>
                  <td className="p-3">{cust.name}</td>
                  <td className="p-3">{cust.phone}</td>
                  <td className="p-3">{cust.address}</td>
                  <td className="p-3">{cust.email || '-'}</td>
                  <td className="p-3">{cust.status}</td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">Belum ada data pelanggan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Customers;