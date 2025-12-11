import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Card } from "react-bootstrap";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const TripsMap = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/trips/map")
      .then((res) => res.json())
      .then((data) => setTrips(data.data));
  }, []);

  // Icona personalizzata
  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            TravelJournal
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/index">
                  I tuoi viaggi
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/map">
                  Mappa
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Card>
          <Card.Body>
            <Card.Title className="mb-3">Mappa dei viaggi</Card.Title>
            <div style={{ height: "80vh", width: "100%" }}>
              <MapContainer
                center={[40, 10]}
                zoom={3}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <MarkerClusterGroup>
                  {trips.map((trip) => (
                    <Marker
                      key={trip.id}
                      position={[trip.latitude, trip.longitude]}
                      icon={customIcon}
                    >
                      <Popup>
                        <h6>{trip.destination}</h6>
                        {trip.notes && <p>{trip.notes.slice(0, 50)}...</p>}
                        <a href={`/trips/${trip.id}`}>Vedi viaggio</a>
                      </Popup>
                    </Marker>
                  ))}
                </MarkerClusterGroup>
              </MapContainer>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default TripsMap;
