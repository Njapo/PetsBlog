import React, { useState } from 'react';
import BlogCard from '../components/BlogCard';
import './Profile.css';

const Profile = ({ user, blogs }) => {
  const [activeTab, setActiveTab] = useState('blogs');
  const userBlogs = blogs.filter(blog => blog.authorId === user.id);
  const totalComments = userBlogs.reduce((total, blog) => total + blog.comments.length, 0);

  // Get user's comments across all blogs
  const userComments = blogs.reduce((acc, blog) => {
    const comments = blog.comments.filter(comment => comment.author === user.name);
    return [...acc, ...comments.map(comment => ({ ...comment, blogTitle: blog.title, blogId: blog.id }))];
  }, []);

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-info">
          <img src={user.avatar} alt={user.name} className="profile-avatar-large" />
          <div className="profile-details">
            <h1>{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            <p className="profile-joined">
              Member since {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
              })}
            </p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number">{userBlogs.length}</span>
            <span className="stat-label">Blog Posts</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{totalComments}</span>
            <span className="stat-label">Comments Received</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{userComments.length}</span>
            <span className="stat-label">Comments Made</span>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
          onClick={() => setActiveTab('blogs')}
        >
          My Blogs ({userBlogs.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'comments' ? 'active' : ''}`}
          onClick={() => setActiveTab('comments')}
        >
          My Comments ({userComments.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'blogs' && (
          <div className="blogs-section">
            {userBlogs.length > 0 ? (
              <div className="blogs-grid">
                {userBlogs.map(blog => (
                  <BlogCard key={blog.id} blog={blog} showAuthor={false} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>No blog posts yet</h3>
                <p>Start sharing your pet stories with the community!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="comments-section">
            {userComments.length > 0 ? (
              <div className="comments-list">
                {userComments
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map(comment => (
                    <div key={comment.id} className="comment-item">
                      <div className="comment-header">
                        <strong>On: {comment.blogTitle}</strong>
                        <span className="comment-date">
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="comment-content">{comment.content}</p>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">💬</div>
                <h3>No comments yet</h3>
                <p>Start engaging with the community by commenting on blog posts!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section">
            <div className="settings-card">
              <h3>Account Settings</h3>
              <div className="setting-item">
                <label>Display Name</label>
                <input type="text" value={user.name} readOnly />
                <small>Contact support to change your display name</small>
              </div>
              <div className="setting-item">
                <label>Email Address</label>
                <input type="email" value={user.email} readOnly />
                <small>Contact support to change your email address</small>
              </div>
            </div>

            <div className="settings-card">
              <h3>Preferences</h3>
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked />
                  Email notifications for new comments
                </label>
              </div>
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked />
                  Weekly digest of new blog posts
                </label>
              </div>
            </div>

            <div className="settings-card danger-zone">
              <h3>Danger Zone</h3>
              <p>Once you delete your account, there is no going back. Please be certain.</p>
              <button className="danger-btn">Delete Account</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;