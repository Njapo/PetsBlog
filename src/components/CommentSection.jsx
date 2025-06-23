import React, { useState } from 'react';
import './CommentSection.css';

const CommentSection = ({ comments, user, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddComment(newComment.trim());
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section className="comment-section">
      <h3 className="comments-title">
        Comments ({comments.length})
      </h3>

      {user ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="comment-input-container">
            <div className="comment-avatar">
              <img src={user.avatar} alt={user.name} />
            </div>
            <div className="comment-input-wrapper">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this post..."
                className="comment-input"
                rows="3"
                disabled={isSubmitting}
              />
              <div className="comment-actions">
                <span className="character-count">
                  {newComment.length}/500
                </span>
                <button
                  type="submit"
                  className="submit-comment-btn"
                  disabled={!newComment.trim() || isSubmitting}
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="login-prompt">
          <p>Please log in to leave a comment.</p>
          <a href="/login" className="login-link">Log In</a>
        </div>
      )}

      <div className="comments-list">
        {comments.length > 0 ? (
          comments
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <div className="comment-author-info">
                    <div className="comment-author-avatar">
                      {comment.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="comment-meta">
                      <span className="comment-author">{comment.author}</span>
                      <span className="comment-date">
                        {formatDate(comment.date)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="comment-content">
                  <p>{comment.content}</p>
                </div>
              </div>
            ))
        ) : (
          <div className="no-comments">
            <div className="no-comments-icon">💬</div>
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommentSection;