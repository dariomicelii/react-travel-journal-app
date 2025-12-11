import React from "react";
import "./PhotoAlbum.css"; // CSS per lo stile polaroid

const PhotoAlbum = ({ photos }) => {
  return (
    <div className="album-container mt-5">
      <h3>Album Fotografico 📸</h3>
      <div className="polaroid-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="polaroid">
            <img src={photo.url} alt={photo.caption || ""} />
            {photo.caption && <p className="caption">{photo.caption}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoAlbum;
