import React, { useState, useEffect } from 'react';
import PetCard from '../components/PetCard';
import './PetGallery.css';

const PetGallery = ({ pets, setPets }) => {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (pets.length === 0) {
      fetchPets();
    }
  }, [pets.length]);

  const fetchPets = async () => {
    setLoading(true);
    try {
      // Using a combination of different APIs and static data for variety
      const dogResponse = await fetch('https://dog.ceo/api/breeds/image/random/6');
      const dogData = await dogResponse.json();
      
      const catResponse = await fetch('https://api.thecatapi.com/v1/images/search?limit=6');
      const catData = await catResponse.json();

      const dogPets = dogData.message?.map((imageUrl, index) => ({
        id: `dog-${index}`,
        name: `Dog ${index + 1}`,
        type: 'dog',
        image: imageUrl,
        description: 'A wonderful dog looking for attention and love!'
      })) || [];

      const catPets = catData?.map((cat, index) => ({
        id: `cat-${index}`,
        name: `Cat ${index + 1}`,
        type: 'cat',
        image: cat.url,
        description: 'An adorable cat with a mysterious personality!'
      })) || [];

      // Add some static exotic pets for variety
      const exoticPets = [
        {
          id: 'exotic-1',
          name: 'Sunny the Parrot',
          type: 'bird',
          image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400',
          description: 'A colorful parrot who loves to talk and play!'
        },
        {
          id: 'exotic-2',
          name: 'Nibbles the Rabbit',
          type: 'rabbit',
          image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400',
          description: 'A fluffy rabbit who enjoys hopping around the garden!'
        },
        {
          id: 'exotic-3',
          name: 'Scales the Lizard',
          type: 'reptile',
          image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c25a?w=400',
          description: 'A friendly bearded dragon who loves basking in the sun!'
        },
        {
          id: 'exotic-4',
          name: 'Bubbles the Fish',
          type: 'fish',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
          description: 'A beautiful tropical fish swimming gracefully!'
        }
      ];

      const allPets = [...dogPets, ...catPets, ...exoticPets];
      setPets(allPets);
    } catch (error) {
      console.error('Error fetching pets:', error);
      // Fallback to static data if API fails
      const fallbackPets = [
        {
          id: 'fallback-1',
          name: 'Buddy',
          type: 'dog',
          image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
          description: 'A loyal golden retriever who loves fetch!'
        },
        {
          id: 'fallback-2',
          name: 'Whiskers',
          type: 'cat',
          image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
          description: 'A curious tabby cat with beautiful green eyes!'
        },
        {
          id: 'fallback-3',
          name: 'Tweety',
          type: 'bird',
          image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400',
          description: 'A cheerful canary who loves to sing!'
        }
      ];
      setPets(fallbackPets);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'all', label: 'All Pets' },
    { value: 'dog', label: 'Dogs' },
    { value: 'cat', label: 'Cats' },
    { value: 'bird', label: 'Birds' },
    { value: 'rabbit', label: 'Rabbits' },
    { value: 'reptile', label: 'Reptiles' },
    { value: 'fish', label: 'Fish' }
  ];

  const filteredPets = selectedCategory === 'all' 
    ? pets 
    : pets.filter(pet => pet.type === selectedCategory);

  return (
    <div className="pet-gallery">
      <div className="gallery-header">
        <h1>Pet Gallery</h1>
        <p>Discover amazing pets from around the world!</p>
      </div>

      <div className="gallery-controls">
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category.value}
              className={`filter-btn ${selectedCategory === category.value ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <button 
          className="refresh-btn"
          onClick={fetchPets}
          disabled={loading}
        >
          {loading ? '🔄 Loading...' : '🔄 Load New Pets'}
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading adorable pets...</p>
        </div>
      ) : (
        <div className="pets-grid">
          {filteredPets.map(pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}

      {!loading && filteredPets.length === 0 && (
        <div className="empty-state">
          <p>No pets found in this category. Try selecting a different filter!</p>
        </div>
      )}
    </div>
  );
};

export default PetGallery;