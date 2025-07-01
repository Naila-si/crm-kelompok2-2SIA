import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../../components/User/UserLayout';

const cart = [
  { name: 'Nasi Box Spesial', qty: 2, price: 30000 },
  { name: 'Tumpeng Mini', qty: 1, price: 40000 },
];

const OrderManagement = () => {
  const [form, setForm] = useState({
    nama: '',
    phone: '',
    alamat: '',
    catatan: '',
    waktu: '',
  });

  const navigate = useNavigate();

  const promo = JSON.parse(localStorage.getItem("promo_aktif"));
  const [activePromo, setActivePromo] = useState(null);

  useEffect(() => {
    if (promo) {
      setActivePromo(promo);
    }
  }, []);

  const originalTotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const discount = activePromo?.discount || 0;
  const total = originalTotal - (originalTotal * discount / 100);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert('Pesanan berhasil dikirim!');
  };

  return (
    <div className="font-sans bg-[#FFFDF7] text-[#3c2c22] min-h-screen">
      <UserLayout>
        {/* Hero/Header */}
        <section
          className="h-[70vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/top-view-catering-dishes_23-2148484454.jpg')",
          }}
        >
          <div className="bg-black/60 p-10 rounded-2xl shadow-xl max-w-xl">
            <img src="/logo.png" alt="Logo" className="h-20 mx-auto mb-4" />
            <h1 className="text-4xl font-extrabold">Formulir Pemesanan</h1>
            <p className="mt-2 text-lg font-medium">Lengkapi data dan konfirmasi pesanan Anda.</p>
          </div>
        </section>

        {/* Order Summary */}
        <section className="px-6 py-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#9C2D2D]">Ringkasan Pesanan</h2>
          <div className="bg-white shadow rounded-xl p-6 mb-10">
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between border-b py-2">
                <span>{item.name} x {item.qty}</span>
                <span>Rp {(item.qty * item.price).toLocaleString()}</span>
              </div>
            ))}
            {activePromo && (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-4 rounded">
                <p className="font-semibold">Promo Aktif:</p>
                <p className="text-sm italic">{activePromo.content}</p>
                <button
                  onClick={() => {
                    localStorage.removeItem("promo_aktif");
                    setActivePromo(null);
                  }}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Batalkan Promo
                </button>
              </div>
            )}

            {activePromo?.discount && (
              <div className="flex justify-between text-sm text-green-700 font-medium mb-2">
                <span>Diskon ({activePromo.discount}%)</span>
                <span>- Rp {(originalTotal * activePromo.discount / 100).toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between font-bold text-lg mt-1">
              <span>Total</span>
              <span>Rp {total.toLocaleString()}</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white shadow rounded-xl p-6 space-y-6">
            <h3 className="text-xl font-bold mb-4 text-[#5D3A1A]">Data Pemesan</h3>
            <input
              type="text"
              name="nama"
              placeholder="Nama Lengkap"
              value={form.nama}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
            />
            <input
              type="tel"
              name="phone"
              placeholder="No. HP"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
            />
            <textarea
              name="alamat"
              placeholder="Alamat Pengantaran"
              rows={3}
              value={form.alamat}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
            />
            <textarea
              name="catatan"
              placeholder="Catatan Tambahan (opsional)"
              rows={2}
              value={form.catatan}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
            />
            <div>
              <label className="block mb-1 text-sm font-medium">Waktu Pengantaran</label>
              <input
                type="time"
                name="waktu"
                value={form.waktu}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="mt-6 w-full bg-[#9C2D2D] text-white font-semibold py-3 rounded hover:bg-[#801c1c] transition"
            >
              Pesan Sekarang
            </button>
          </div>
        </section>

        {/* Testimoni */}
        <section className="py-20 px-6 bg-orange-100">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Apa Kata Pelanggan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { nama: "Ani, Pelanggan Tetap", pesan: "Pemesanan mudah dan cepat, makanannya juga selalu hangat sampai rumah!" },
              { nama: "Riko, Mahasiswa", pesan: "Form pemesanan simpel, cocok buat yang buru-buru dan nggak mau ribet." },
            ].map((fb, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
                <p className="italic mb-4 text-gray-700">"{fb.pesan}"</p>
                <p className="font-bold text-right text-orange-600">- {fb.nama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#9C2D2D] text-white text-center mt-20">
          <h2 className="text-3xl font-bold mb-3">Butuh bantuan lebih lanjut?</h2>
          <p className="mb-6">Hubungi kami atau konsultasikan kebutuhan katering Anda.</p>
          <button className="bg-white text-[#9C2D2D] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Hubungi Customer Support
          </button>
        </section>
      </UserLayout>
    </div>
  );
};

export default OrderManagement;
