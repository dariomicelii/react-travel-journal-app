import React from "react";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import IndexPage from "./pages/IndexPage";
import "leaflet/dist/leaflet.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="/details/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
