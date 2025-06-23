import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ blog, showAuthor = true }) => {
  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="blog-card">
      {blog.image && (
        <div className="blog-card-image">
          <img src={blog.image} alt={blog.title} />
        </div>
      )}
      
      <div className="blog-card-content">
        <h3 className="blog-card-title">
          <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
        </h3>
        
        <p className="blog-card-excerpt">
          {truncateContent(blog.content)}
        </p>
        
        <div className="blog-card-footer">
          {showAuthor && (
            <div className="blog-card-author">
              <div className="author-avatar">
                {blog.author.charAt(0).toUpperCase()}
              </div>
              <span className="author-name">{blog.author}</span>
            </div>
          )}
          
          <div className="blog-card-meta">
            <span className="blog-date">
              {new Date(blog.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
            <span className="comment-count">
              💬 {blog.comments.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;