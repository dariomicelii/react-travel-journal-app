import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailPage = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/trips/${id}`)
      .then((response) => {
        setTrip(response.data.data);
        setLoading(false);
        console.log("Trip ricevuto:", response.data.data);
      })
      .catch(() => {
        setError("Errore nel caricamento dei dettagli");
        setLoading(false);
      });
  }, [id]);

  // Trasforma il testo della valutazione in stelline
  const getStars = (value) => {
    if (!value) return "Nessuna valutazione";

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

  if (loading) return <div className="container py-4">Caricamento...</div>;
  if (error) return <div className="container py-4 text-danger">{error}</div>;
  if (!trip) return <div className="container py-4">Nessun dato trovato.</div>;

  return (
    <div className="container my-5">
      <h1 className="mb-4">Dettagli del viaggio</h1>
      <div className="card shadow-lg">
        <div className="row g-0">
          {/* Immagine */}
          <div className="col-md-6">
            <img
              src={trip.image_path || "https://via.placeholder.com/600x400"}
              className="img-fluid rounded-start"
              alt={trip.destination}
            />
          </div>

          {/* Contenuto */}
          <div className="col-md-6">
            <div className="card-body d-flex flex-column h-100">
              <h2 className="card-title mb-3">{trip.destination}</h2>

              {/* Date */}
              <p className="mb-2">
                <strong>Partenza:</strong> {trip.start_date || "N/A"}
              </p>
              <p className="mb-3">
                <strong>Ritorno:</strong> {trip.end_date || "N/A"}
              </p>

              {/* Note */}
              <p className="card-text flex-grow-1">{trip.notes}</p>

              {/* Rating */}
              <p>
                <strong>Valutazione:</strong> {getStars(trip.rating)}
              </p>

              {/* Tags */}
              <div className="mt-3">
                {trip.tags && trip.tags.length > 0 ? (
                  trip.tags.map((tag) => (
                    <span key={tag.id} className="badge bg-primary me-2">
                      {tag.name}
                    </span>
                  ))
                ) : (
                  <span className="text-muted">Nessun tag</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
