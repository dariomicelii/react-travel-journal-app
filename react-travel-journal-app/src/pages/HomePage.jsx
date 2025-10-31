import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/trips")
      .then((response) => {
        setTrips(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching trips");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container my-4">
      <h1 className="mb-4 text-center">My Travel Journal</h1>

      {loading && <p>Loading trips...</p>}
      {error && <p>{error}</p>}

      <div className="row g-4">
        {trips.map((trip) => (
          <div className="col-12 col-sm-6 col-md-4" key={trip.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={trip.image_path || "https://via.placeholder.com/300x200"}
                className="card-img-top"
                alt={trip.destination}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{trip.destination}</h5>
                <p className="card-text flex-grow-1">{trip.notes}</p>
                <Link
                  to={`/trips/${trip.id}`}
                  className="btn btn-primary mt-auto"
                >
                  Go somewhere
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
