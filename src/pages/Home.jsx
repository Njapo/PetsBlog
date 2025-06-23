import React from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import './Home.css';

const Home = ({ blogs }) => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to PetBlog</h1>
          <p>Share your pet stories, discover amazing animals, and connect with fellow pet lovers!</p>
          <div className="hero-actions">
            <Link to="/register" className="cta-button primary">
              Join Our Community
            </Link>
            <Link to="/pets" className="cta-button secondary">
              Explore Pets
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600" 
            alt="Happy pets" 
          />
        </div>
      </section>

      <section className="featured-blogs">
        <h2>Latest Pet Stories</h2>
        <div className="blogs-grid">
          {blogs.slice(0, 6).map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        {blogs.length === 0 && (
          <p className="no-blogs">No blogs yet. Be the first to share your pet story!</p>
        )}
      </section>

      <section className="features">
        <h2>Why Join PetBlog?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Share Stories</h3>
            <p>Write and share heartwarming stories about your beloved pets</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🐕</div>
            <h3>Discover Pets</h3>
            <p>Explore our pet gallery and learn about different animals</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Connect</h3>
            <p>Comment on stories and connect with fellow pet enthusiasts</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;