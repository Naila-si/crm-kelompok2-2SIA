import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const trackingData = {
  orderId: 'ORD123456',
  menu: 'Nasi Box Spesial',
  status: 'Dalam Perjalanan',
  estimatedTime: '12:45 WIB',
  driver: 'Budi Setiawan',
  currentLocation: 'Jl. Sudirman No. 10',
  destination: 'Jl. Melati No. 20',
  lastUpdate: '10 menit lalu',
  steps: [
    { label: 'Pesanan Diterima', done: true },
    { label: 'Diproses', done: true },
    { label: 'Dalam Perjalanan', done: true },
    { label: 'Sampai Tujuan', done: false },
  ],
};

const driverLocation = { lat: -0.5100, lng: 101.4500 };
const destinationLocation = { lat: -0.5155, lng: 101.4555 };
const mapCenter = { lat: -0.5125, lng: 101.4525 };
const containerStyle = {
  width: '100%',
  height: '350px',
};

const TrackingDelivery = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans bg-[#FEFAF4] min-h-screen">
      {/* HEADER */}
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10"
            />
            <span className="font-bold text-[#9C2D2D] text-lg">Selera Kampung</span>
          </div>
          <nav className="flex gap-6 text-sm font-semibold text-[#5D3A1A]">
            {[
              { label: 'Beranda', path: '/' },
              { label: 'Menu', path: '/informasi-menu' },
              { label: 'Pesanan', path: '/order-management' },
              { label: 'Tracking', path: '/tracking' },
              { label: 'Kontak', path: '/tracking' },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => navigate(item.path)}
                className="hover:text-[#9C2D2D] transition"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Map Section */}
      <div className="relative">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={15}
          >
            <Marker position={driverLocation} label="Kurir" />
            <Marker position={destinationLocation} label="Tujuan" />
          </GoogleMap>
        </LoadScript>

        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-white shadow-2xl border border-orange-200 rounded-3xl p-6 w-[90%] md:w-[600px]">
          <h2 className="text-2xl font-extrabold text-[#9C2D2D] text-center mb-4">Detail Pengiriman</h2>
          <div className="grid grid-cols-2 gap-3 text-sm text-[#3c2c22]">
            <p><span className="font-semibold">ID:</span> {trackingData.orderId}</p>
            <p><span className="font-semibold">Menu:</span> {trackingData.menu}</p>
            <p><span className="font-semibold">Driver:</span> {trackingData.driver}</p>
            <p><span className="font-semibold">Status:</span> <span className="text-[#D64545]">{trackingData.status}</span></p>
            <p><span className="font-semibold">Estimasi Tiba:</span> {trackingData.estimatedTime}</p>
          </div>
        </div>
      </div>

      <div className="h-32"></div>

      {/* Progress Tracker */}
      <section className="max-w-4xl mx-auto px-6 mt-10">
        <h3 className="text-2xl font-extrabold text-center text-[#5D3A1A] mb-10">Status Pengiriman</h3>
        <div className="space-y-6">
          {trackingData.steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-5 rounded-2xl border shadow-md ${
                step.done
                  ? 'bg-green-50 border-green-300'
                  : 'bg-yellow-50 border-yellow-300'
              }`}
            >
              <div>
                {step.done ? (
                  <CheckCircle className="text-green-600" size={28} />
                ) : (
                  <Clock className="text-yellow-500" size={28} />
                )}
              </div>
              <p className={`text-base font-semibold ${step.done ? 'text-green-800' : 'text-yellow-800'}`}>{step.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Last Update */}
      <div className="text-center text-sm mt-10 text-gray-500">
        Terakhir diperbarui: {trackingData.lastUpdate}
      </div>

      {/* CTA */}
      <div className="mt-14 text-center">
        <h4 className="text-lg font-semibold mb-3 text-[#5D3A1A]">Butuh bantuan lebih lanjut?</h4>
        <button className="bg-[#9C2D2D] text-white px-6 py-3 rounded-full hover:bg-[#7c1d1d] text-sm transition">
          Hubungi Customer Support
        </button>
      </div>

      {/* Footer + Contact Us */}
      <footer id="footer" className="bg-[#2d2d2d] text-white py-12 px-6 mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">Selera Kampung</h4>
            <p className="text-sm text-gray-300">
              Layanan catering Pekanbaru yang siap menemani harimu, dari makanan harian hingga acara spesial.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><button onClick={() => navigate('/')}>Beranda</button></li>
              <li><button onClick={() => navigate('/informasi-menu')}>Menu</button></li>
              <li><button onClick={() => navigate('/order-management')}>Pesanan</button></li>
              <li><button onClick={() => navigate('/tracking')}>Tracking</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">FAQ / Contact</h4>
            <form className="flex flex-col space-y-3">
              <select className="p-2 rounded text-black">
                <option value="faq">Tanya FAQ</option>
                <option value="lapor">Laporkan Masalah</option>
              </select>
              <input type="text" placeholder="Pesan Anda" className="p-2 rounded text-black" />
              <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-sm">Kirim</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TrackingDelivery;
