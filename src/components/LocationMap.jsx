import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function HotelPage() {
  const position = [21.43388, 91.97165];

  return (
    <div className="font-sans bg-base-100 min-h-screen">
      {/* Location Section */}
      <section className="py-12">
        <h2 className="text-4xl font-extrabold mb-8 text-primary text-center">
          Our Location
        </h2>
        <p className="max-w-3xl mx-auto mb-12 text-center text-lg md:text-xl text-gray-700 leading-relaxed">
          DreamStay Beach Resort and Spa Hotel is located in the heart of Cox's
          Bazar, conveniently close to major attractions, beaches, and
          transportation hubs. Experience the beauty of the bay with easy access
          to everything you need for a memorable stay.
        </p>

        {/* Map */}
        <div className="h-96 md:h-[450px] w-full rounded-xl shadow-lg overflow-hidden ring-1 ring-gray-200">
          <MapContainer
            center={position}
            zoom={14}
            scrollWheelZoom={false}
            className="h-full w-full"
            aria-label="Map showing Sea Pearl Beach Resort & Spa location"
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <span className="font-semibold">
                  DreamStay Beach Resort and Spa
                </span>
                <br />
                You’re here!
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </div>
  );
}
