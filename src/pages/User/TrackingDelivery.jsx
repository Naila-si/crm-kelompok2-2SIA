import React from 'react';
import { CheckCircle, Clock, MapPin } from 'lucide-react';
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

// Lokasi simulasi
const driverLocation = { lat: -0.5100, lng: 101.4500 }; // Pekanbaru (simulasi)
const destinationLocation = { lat: -0.5155, lng: 101.4555 };

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '12px',
  overflow: 'hidden',
};

const mapCenter = {
  lat: -0.5125,
  lng: 101.4525,
};

const TrackingDelivery = () => {
  return (
    <div className="min-h-screen bg-[#fffaf0] py-10 px-4 text-[#3c2c22] font-sans">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md border border-[#c4b49a] p-6">
        <h1 className="text-3xl font-bold text-center text-[#3c2c22] mb-6">
          Tracking Delivery
        </h1>

        <div className="text-sm text-[#5a4b3d] space-y-1 mb-4">
          <p><strong>ID Pesanan:</strong> {trackingData.orderId}</p>
          <p><strong>Menu:</strong> {trackingData.menu}</p>
          <p><strong>Driver:</strong> {trackingData.driver}</p>
          <p><strong>Status:</strong> {trackingData.status}</p>
          <p><strong>Estimasi Tiba:</strong> {trackingData.estimatedTime}</p>
        </div>

        {/* Langkah-langkah */}
        <div className="mt-6 space-y-5">
          {trackingData.steps.map((step, index) => (
            <div key={index} className="flex items-center space-x-4">
              {step.done ? (
                <CheckCircle className="text-[#8b0000]" size={24} />
              ) : (
                <Clock className="text-[#c4b49a]" size={24} />
              )}
              <p className={`text-base ${step.done ? 'text-[#3c2c22]' : 'text-[#a79b8a]'}`}>
                {step.label}
              </p>
            </div>
          ))}
        </div>

        {/* Google Maps */}
        <div className="mt-8 mb-4">
          <h3 className="text-lg font-semibold text-[#3c2c22] mb-2">Peta Pengiriman</h3>
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
        </div>

        <p className="text-right text-xs text-[#a79b8a]">
          Terakhir diperbarui: {trackingData.lastUpdate}
        </p>
      </div>
    </div>
  );
};

export default TrackingDelivery;
