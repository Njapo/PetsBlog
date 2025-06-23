import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateBlog.css';

const CreateBlog = ({ onAddBlog }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in both title and content');
      setIsSubmitting(false);
      return;
    }

    try {
      const newBlog = onAddBlog(formData);
      navigate(`/blog/${newBlog.id}`);
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const suggestedImages = [
    'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500',
    'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=500',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500',
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500'
  ];

  return (
    <div className="create-blog">
      <div className="create-blog-container">
        <h1>Share Your Pet Story</h1>
        <p>Tell the community about your amazing pet experience!</p>

        <form onSubmit={handleSubmit} className="blog-form">
          <div className="form-group">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter an engaging title for your blog post"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Featured Image URL (Optional)</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            <div className="image-suggestions">
              <p>Or choose from these pet images:</p>
              <div className="image-grid">
                {suggestedImages.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Suggested pet ${index + 1}`}
                    className={`suggested-image ${formData.image === imageUrl ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, image: imageUrl })}
                  />
                ))}
              </div>
            </div>
          </div>

          {formData.image && (
            <div className="image-preview">
              <img src={formData.image} alt="Preview" />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="content">Blog Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your pet story here... Share your experiences, tips, or heartwarming moments with your furry, feathered, or scaled friends!"
              rows="15"
              required
            />
            <div className="character-count">
              {formData.content.length} characters
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Blog Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;