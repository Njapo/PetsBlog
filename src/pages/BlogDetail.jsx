import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import './BlogDetail.css';

const BlogDetail = ({ blogs, user, onAddComment }) => {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="blog-detail">
        <div className="not-found">
          <h2>Blog post not found</h2>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail">
      <article className="blog-article">
        <div className="blog-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          
          <div className="blog-meta">
            <div className="author-info">
              <div className="author-avatar">
                {blog.author.charAt(0).toUpperCase()}
              </div>
              <div className="author-details">
                <span className="author-name">{blog.author}</span>
                <span className="blog-date">
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          <h1 className="blog-title">{blog.title}</h1>
        </div>

        {blog.image && (
          <div className="blog-image">
            <img src={blog.image} alt={blog.title} />
          </div>
        )}

        <div className="blog-content">
          {blog.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="blog-footer">
          <div className="blog-stats">
            <span className="comment-count">
              💬 {blog.comments.length} comment{blog.comments.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </article>

      <CommentSection 
        comments={blog.comments}
        user={user}
        onAddComment={(comment) => onAddComment(blog.id, comment)}
      />
    </div>
  );
};

export default BlogDetail;