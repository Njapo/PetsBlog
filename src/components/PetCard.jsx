import React, { useState } from 'react';
import './PetCard.css';

const PetCard = ({ pet }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const getTypeIcon = (type) => {
    const icons = {
      dog: '🐕',
      cat: '🐱',
      bird: '🐦',
      rabbit: '🐰',
      reptile: '🦎',
      fish: '🐠'
    };
    return icons[type] || '🐾';
  };

  const getTypeColor = (type) => {
    const colors = {
      dog: '#ff6b6b',
      cat: '#4ecdc4',
      bird: '#45b7d1',
      rabbit: '#96ceb4',
      reptile: '#feca57',
      fish: '#3742fa'
    };
    return colors[type] || '#6c757d';
  };

  return (
    <div className="pet-card">
      <div className="pet-image-container">
        {!imageLoaded && !imageError && (
          <div className="image-placeholder">
            <div className="loading-spinner"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="image-error">
            <span className="error-icon">🖼️</span>
            <p>Image not available</p>
          </div>
        ) : (
          <img
            src={pet.image}
            alt={pet.name}
            className={`pet-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
        
        <div 
          className="pet-type-badge"
          style={{ backgroundColor: getTypeColor(pet.type) }}
        >
          <span className="type-icon">{getTypeIcon(pet.type)}</span>
          <span className="type-text">{pet.type}</span>
        </div>
      </div>
      
      <div className="pet-info">
        <h3 className="pet-name">{pet.name}</h3>
        <p className="pet-description">{pet.description}</p>
        
        <div className="pet-actions">
          <button className="pet-action-btn favorite">
            ❤️ Like
          </button>
          <button className="pet-action-btn share">
            📤 Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;