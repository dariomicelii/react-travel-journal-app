import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/trips")
      .then((response) => {
        setTrips(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        console.error("Errore nel caricamento dei viaggi");
      });
  }, []);

  // Filtra i viaggi in base alla ricerca
  const filteredTrips = trips.filter(
    (trip) =>
      trip.destination.toLowerCase().includes(search.toLowerCase()) ||
      (trip.notes && trip.notes.toLowerCase().includes(search.toLowerCase()))
  );

  // 🔥 Mostra solo i primi 6 viaggi se non stai cercando
  const tripsToShow =
    search.trim() === "" ? filteredTrips.slice(0, 6) : filteredTrips;

  // Funzione per trasformare rating in stelline
  const getStars = (value) => {
    if (!value || typeof value !== "string") return "Nessuna valutazione";

    switch (value.toLowerCase()) {
      case "pessimo":
        return "⭐";
      case "scarso":
        return "⭐⭐";
      case "accettabile":
        return "⭐⭐⭐";
      case "buono":
        return "⭐⭐⭐⭐";
      case "ottimo":
        return "⭐⭐⭐⭐⭐";
      default:
        return "Nessuna valutazione";
    }
  };

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

      <div className="container my-5">
        {/* Hero section */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">I tuoi viaggi preferiti</h1>
          <p className="lead text-muted">
            Scopri e filtra i tuoi viaggi in un click
          </p>

          {/* Barra di ricerca */}
          <input
            type="text"
            className="form-control w-50 mx-auto"
            placeholder="Cerca viaggio o destinazione..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Griglia dei viaggi */}
        {loading ? (
          <div>Caricamento...</div>
        ) : (
          <div className="row g-4">
            {tripsToShow.length > 0 ? (
              tripsToShow.map((trip) => (
                <div key={trip.id} className="col-md-4">
                  <Link
                    to={`/details/${trip.id}`}
                    className="text-decoration-none"
                  >
                    <div className="card h-100 shadow-sm">
                      <img
                        src={
                          trip.image_path ||
                          "https://via.placeholder.com/400x250"
                        }
                        className="card-img-top"
                        alt={trip.destination}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{trip.destination}</h5>
                        <p className="card-text flex-grow-1">{trip.notes}</p>
                        <p>
                          <strong>Valutazione:</strong> {getStars(trip.rating)}
                        </p>

                        <Link
                          to={`/details/${trip.id}`}
                          className="btn btn-primary mt-auto"
                        >
                          Dettagli
                        </Link>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center">Nessun viaggio trovato.</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
