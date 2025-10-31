import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { id } = useParams();
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
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Navbar
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
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Features
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container my-4">
        <h1 className="mb-4">My Travel Journal</h1>

        {loading && <p>Loading trips...</p>}
        {error && <p>{error}</p>}

        <div className="row g-4">
          {trips.map((trip) => (
            <div className="col-12 col-sm-6 col-md-4" key={trip.id}>
              <Link
                to={`/details/${trip.id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 shadow-sm">
                  <img
                    src={
                      trip.image_path || "https://via.placeholder.com/300x200"
                    }
                    className="card-img-top"
                    alt={trip.destination}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{trip.destination}</h5>
                    <p className="card-text flex-grow-1">{trip.notes}</p>
                    <Link
                      to={`/details/${trip.id}`}
                      className="btn btn-primary mt-auto"
                    >
                      Vedi i dettagli
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default HomePage;
