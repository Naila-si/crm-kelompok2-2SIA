import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../../components/User/UserLayout';

const OrderManagement = () => {
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nama_pelanggan: "",
    tanggal_acara: "",
    jenis_menu: "",
    daftar_menu: "",
    jumlah_porsi: "",
    lokasi_pengiriman: "",
    catatan: "",
    metode_pembayaran: "",
  });

  const navigate = useNavigate();
  const [activePromo, setActivePromo] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
      setCart(storedCart);

      const syncCart = () => {
        const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        setCart(storedCart);
      };
  }, []);

  const originalTotal = cart.reduce((sum, item) => sum + (item.qty || 1) * item.price, 0);
  const discount = activePromo?.discount || 0;
  const total = originalTotal - (originalTotal * discount / 100);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const existing = JSON.parse(localStorage.getItem("orders")) || [];
    const newId = existing.length ? Math.max(...existing.map(o => o.id)) + 1 : 1;

    const newOrder = {
      ...form,
      id: newId,
      level_pelanggan: "Bronze",
      status: "Menunggu",
      pelanggan_id: `PLG-${newId}`,
    };

    const updated = [...existing, newOrder];
    localStorage.setItem("orders", JSON.stringify(updated));

    alert("Pesanan berhasil dikirim!");
    navigate("/riwayat");
  };

  return (
    <div className="font-sans bg-[#FFFDF7] text-[#3c2c22] min-h-screen">
      <section
        className="h-[50vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage:
            "url('https://s1-id.alongwalker.co/wp-content/uploads/2024/07/image-top-10-pilihan-catering-di-pekanbaru-riau-buat-acara-maupun-harian-manakah-yang-paling-enak-dan-murah-62258e4294ff1f402c284956a551228f.jpg')",
        }}
      >
        <div className="bg-black/60 p-10 rounded-2xl shadow-xl max-w-xl">
          <h1 className="text-4xl font-extrabold">
            {step === 1 ? 'Ringkasan Pesanan' : step === 2 ? 'Formulir Pemesanan' : 'Metode Pembayaran'}
          </h1>
          <p className="mt-2 text-lg font-medium">
            {step === 1
              ? 'Periksa kembali pesanan Anda sebelum lanjut.'
              : step === 2
              ? 'Lengkapi data dan konfirmasi pesanan Anda.'
              : 'Pilih metode pembayaran Anda.'}
          </p>
        </div>
      </section>

      {step === 1 && (
        <section className="px-6 py-20 max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-xl p-6 mb-10">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 italic">Tidak ada item dalam pesanan.</p>
            ) : (
              <>
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between border-b py-2">
                    <span>{item.name} x {item.qty || 1}</span>
                    <span>Rp {(item.price * (item.qty || 1)).toLocaleString()}</span>
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

                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total</span>
                  <span>Rp {total.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="mt-6 w-full bg-[#9C2D2D] text-white font-semibold py-3 rounded hover:bg-[#801c1c] transition"
                >
                  Lanjutkan ke Formulir Pemesanan
                </button>
                <button
                  onClick={() => navigate("/promo")}
                  className="mt-4 w-full border border-orange-500 text-orange-700 font-semibold py-2 rounded hover:bg-orange-50 transition"
                >
                  🎁 Gunakan Promo
                </button>
              </>
            )}
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="px-6 py-20 max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-xl p-8 space-y-6">
            <h3 className="text-2xl font-bold text-[#5D3A1A] mb-6">Formulir Pemesanan Catering</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1 text-sm">Nama Pelanggan</label>
                <input type="text" name="nama_pelanggan" placeholder="Contoh: Andi Wijaya" value={form.nama_pelanggan} onChange={handleChange} className="w-full border rounded px-4 py-2" required />
              </div>
              <div>
                <label className="block font-medium mb-1 text-sm">Tanggal Pengantaran</label>
                <input type="date" name="tanggal_acara" value={form.tanggal_acara} onChange={handleChange} className="w-full border rounded px-4 py-2" required />
              </div>
              <div>
                <label className="block font-medium mb-1 text-sm">Jenis Menu</label>
                <select name="jenis_menu" value={form.jenis_menu} onChange={handleChange} className="w-full border rounded px-4 py-2" required>
                  <option value="">Pilih Jenis Menu</option>
                  <option value="Nasi Kotak">Nasi Kotak</option>
                  <option value="Prasmanan">Prasmanan</option>
                  <option value="Vegetarian">Vegetarian</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1 text-sm">Daftar Menu (opsional)</label>
                <input type="text" name="daftar_menu" placeholder="Contoh: Ayam Goreng, Sambal, Lalapan" value={form.daftar_menu} onChange={handleChange} className="w-full border rounded px-4 py-2" />
              </div>
              <div>
                <label className="block font-medium mb-1 text-sm">Jumlah Porsi</label>
                <input type="number" name="jumlah_porsi" placeholder="Contoh: 50" value={form.jumlah_porsi} onChange={handleChange} className="w-full border rounded px-4 py-2" required min={1} />
              </div>
              <div>
                <label className="block font-medium mb-1 text-sm">Lokasi Pengiriman</label>
                <input type="text" name="lokasi_pengiriman" placeholder="Contoh: Jl. Mawar No. 123, Pekanbaru" value={form.lokasi_pengiriman} onChange={handleChange} className="w-full border rounded px-4 py-2" required />
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1 text-sm">Catatan Tambahan (opsional)</label>
                <input type="text" name="catatan" placeholder="Contoh: Tolong kirim jam 10 pagi" value={form.catatan} onChange={handleChange} className="w-full border rounded px-4 py-2" />
              </div>
            </div>
            <div className="flex justify-between items-center pt-6">
              <button onClick={() => setStep(1)} className="text-sm text-blue-600 hover:underline">← Kembali ke Ringkasan</button>
              <button onClick={() => setStep(3)} className="bg-[#9C2D2D] text-white font-semibold py-3 px-6 rounded hover:bg-[#801c1c] transition">Lanjutkan ke Pembayaran</button>
            </div>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="px-6 py-20 max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-xl p-8 space-y-6">
            <h3 className="text-2xl font-bold text-[#5D3A1A] mb-6">Pilih Metode Pembayaran</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="radio" name="metode_pembayaran" value="Transfer Bank" checked={form.metode_pembayaran === "Transfer Bank"} onChange={handleChange} />
                <span>Transfer Bank</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="metode_pembayaran" value="Bayar di Tempat" checked={form.metode_pembayaran === "Bayar di Tempat"} onChange={handleChange} />
                <span>Bayar di Tempat (COD)</span>
              </label>
            </div>
            <div className="flex justify-between items-center pt-6">
              <button onClick={() => setStep(2)} className="text-sm text-blue-600 hover:underline">← Kembali ke Formulir</button>
              <button onClick={handleSubmit} className="bg-[#9C2D2D] text-white font-semibold py-3 px-6 rounded hover:bg-[#801c1c] transition">Kirim Pesanan</button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default OrderManagement;
