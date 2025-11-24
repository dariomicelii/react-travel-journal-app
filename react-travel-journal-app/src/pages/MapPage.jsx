import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

const TripsMap = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/trips/map")
      .then((res) => res.json())
      .then((data) => setTrips(data.data));
  }, []);

  // Icona personalizzata (necessario per Leaflet in React)
  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer
      center={[40, 10]}
      zoom={3}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {trips.map((trip) => (
        <Marker
          key={trip.id}
          position={[trip.latitude, trip.longitude]}
          icon={customIcon}
        >
          <Popup>
            <strong>{trip.title}</strong>
            <br />
            <a href={`/trips/${trip.id}`}>Vedi viaggio</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default TripsMap;
