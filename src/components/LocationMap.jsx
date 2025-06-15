import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function HotelPage() {
  const position = [21.43388, 91.97165];

  return (
    <div className="font-sans">
      {/* Hotel Info */}
      <section className="p-8 md:p-16">
        <h2 className="text-4xl font-bold mb-10 text-indigo-600 text-center">
          Our Location
        </h2>
        <p className="mb-6 text-gray-700 text-2xl text-center">
          Sea Pearl Beach Resort & Spa Hotel is located in the center of Cox's
          Bazar, near all major attractions and transport hubs.
        </p>

        {/* Map Section */}
        <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Sea Pearl Beach Resort & Spa
                <br />
                We’re here!
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </div>
  );
}
