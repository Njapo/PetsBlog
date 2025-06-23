import React from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import './Dashboard.css';

const Dashboard = ({ blogs, user }) => {
  const userBlogs = blogs.filter(blog => blog.authorId === user.id);
  const totalComments = userBlogs.reduce((total, blog) => total + blog.comments.length, 0);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <img src={user.avatar} alt={user.name} className="profile-avatar" />
          <div className="welcome-text">
            <h1>Welcome back, {user.name}!</h1>
            <p>Ready to share more amazing pet stories?</p>
          </div>
        </div>
        
        <Link to="/create-blog" className="create-blog-btn">
          ✏️ Write New Blog
        </Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{userBlogs.length}</div>
          <div className="stat-label">Blog Posts</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalComments}</div>
          <div className="stat-label">Total Comments</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{blogs.length}</div>
          <div className="stat-label">Community Posts</div>
        </div>
      </div>

      <div className="dashboard-content">
        <section className="my-blogs">
          <h2>Your Blog Posts</h2>
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
              <p>Share your first pet story with the community!</p>
              <Link to="/create-blog" className="cta-button">
                Write Your First Blog
              </Link>
            </div>
          )}
        </section>

        <section className="recent-activity">
          <h2>Recent Community Activity</h2>
          <div className="activity-list">
            {blogs.slice(0, 5).map(blog => (
              <div key={blog.id} className="activity-item">
                <img src={blog.image} alt={blog.title} className="activity-thumbnail" />
                <div className="activity-content">
                  <h4>
                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                  </h4>
                  <p>by {blog.author} • {blog.comments.length} comments</p>
                  <span className="activity-date">
                    {new Date(blog.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;