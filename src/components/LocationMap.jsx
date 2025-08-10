import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function HotelPage() {
  const position = [21.43388, 91.97165];

  return (
    <div className="font-sans min-h-screen bg-luxury text-luxury">
      {/* Location Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto bg-luxury text-luxury rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold mb-8 text-[var(--color-accent)] text-center tracking-wide">
          Our Location
        </h2>
        <p className="max-w-3xl mx-auto mb-12 text-center text-lg md:text-xl text-[var(--color-text)] leading-relaxed">
          DreamStay Beach Resort and Spa Hotel is located in the heart of Cox's
          Bazar, conveniently close to major attractions, beaches, and
          transportation hubs. Experience the beauty of the bay with easy access
          to everything you need for a memorable stay.
        </p>

        {/* Map */}
        <div
          className="h-96 md:h-[450px] w-full rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden ring-1 ring-[var(--color-secondary)] transition-shadow hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]"
          role="region"
          aria-label="Map showing DreamStay Beach Resort and Spa location"
          tabIndex={0}
        >
          <MapContainer
            center={position}
            zoom={14}
            scrollWheelZoom={false}
            zoomControl={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <strong className="text-[var(--color-accent)] font-semibold">
                  DreamStay Beach Resort and Spa
                </strong>
                <br />
                Located at the heart of Cox's Bazar, your perfect getaway.
              </Popup>
            </Marker>
            <ZoomControl position="bottomright" />
          </MapContainer>
          <noscript>
            <p className="text-center text-red-600 mt-4">
              Map cannot be displayed because JavaScript is disabled in your
              browser.
            </p>
          </noscript>
        </div>
      </section>
    </div>
  );
}
