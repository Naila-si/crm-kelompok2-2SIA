import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import UserLayout from '../../components/User/UserLayout';

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
      <UserLayout>
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

export default TrackingDelivery;
