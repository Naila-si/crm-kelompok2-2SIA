import React from 'react';
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
  return (
    <div className="bg-[#fff8ef] font-sans min-h-screen pb-20">
      {/* MAP HEADER */}
      <div className="relative h-[45vh] w-full">
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

        {/* Floating Card */}
        <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2 w-[90%] md:w-[600px] bg-white shadow-xl rounded-2xl p-6 border border-[#ebd8c3]">
          <h2 className="text-xl font-bold text-[#5D3A1A] mb-2 text-center">Detail Pengiriman</h2>
          <div className="text-sm text-[#3c2c22] grid grid-cols-2 gap-2">
            <p><strong>ID:</strong> {trackingData.orderId}</p>
            <p><strong>Menu:</strong> {trackingData.menu}</p>
            <p><strong>Driver:</strong> {trackingData.driver}</p>
            <p><strong>Status:</strong> <span className="text-[#d64545]">{trackingData.status}</span></p>
            <p><strong>Tiba:</strong> {trackingData.estimatedTime}</p>
          </div>
        </div>
      </div>

      {/* SPACER */}
      <div className="h-28"></div>

      {/* PROGRESS TRACKER */}
      <section className="max-w-4xl mx-auto mt-8 px-6">
        <h3 className="text-2xl font-bold mb-6 text-[#5D3A1A] text-center">Status Pengiriman</h3>

        <div className="space-y-6">
          {trackingData.steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-lg border ${
                step.done ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
              }`}
            >
              <div>
                {step.done ? (
                  <CheckCircle className="text-green-600" size={28} />
                ) : (
                  <Clock className="text-yellow-500" size={28} />
                )}
              </div>
              <div>
                <p
                  className={`text-lg font-medium ${
                    step.done ? 'text-green-800' : 'text-yellow-800'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LAST UPDATE */}
      <div className="text-center text-xs mt-10 text-gray-500">
        Terakhir diperbarui: {trackingData.lastUpdate}
      </div>

      {/* FOOTER CTA */}
      <div className="mt-14 text-center">
        <h4 className="text-lg font-semibold mb-2">Butuh bantuan?</h4>
        <button className="bg-[#9C2D2D] text-white px-5 py-2 rounded-full hover:bg-[#7c1d1d] text-sm transition">
          Hubungi Customer Support
        </button>
      </div>
    </div>
  );
};

export default TrackingDelivery;
