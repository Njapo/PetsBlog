import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog.jsx';
import PetGallery from './pages/PetGallery';
import Profile from './pages/Profile';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Check for stored user session
    const storedUser = JSON.parse(sessionStorage.getItem('user') || 'null');
    if (storedUser) {
      setUser(storedUser);
    }

    // Load initial blogs and pets
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    // Load sample blogs from memory
    const sampleBlogs = [
      {
        id: 1,
        title: "Why Dogs Make the Best Companions",
        content: "Dogs have been human companions for thousands of years. Their loyalty, intelligence, and unconditional love make them perfect pets for families and individuals alike.",
        author: "Pet Lover",
        authorId: 1,
        date: new Date().toISOString(),
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500",
        comments: [
          { id: 1, author: "Dog Mom", content: "Absolutely agree! My golden retriever is my best friend.", date: new Date().toISOString() }
        ]
      },
      {
        id: 2,
        title: "Cat Care 101: Essential Tips for New Cat Parents",
        content: "Bringing home a new cat is exciting! Here are essential tips to ensure your feline friend feels comfortable and happy in their new environment.",
        author: "Cat Expert",
        authorId: 2,
        date: new Date().toISOString(),
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500",
        comments: []
      }
    ];
    setBlogs(sampleBlogs);
  };

  const login = (email, password) => {
    // Simple authentication simulation
    const userData = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
    };
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  const register = (email, password, name) => {
    // Simple registration simulation
    const userData = {
      id: Date.now(),
      email,
      name,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
    };
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  const addBlog = (blogData) => {
    const newBlog = {
      id: Date.now(),
      ...blogData,
      author: user.name,
      authorId: user.id,
      date: new Date().toISOString(),
      comments: []
    };
    setBlogs(prev => [newBlog, ...prev]);
    return newBlog;
  };

  const addComment = (blogId, comment) => {
    setBlogs(prev => prev.map(blog => 
      blog.id === blogId 
        ? { 
            ...blog, 
            comments: [...blog.comments, {
              id: Date.now(),
              author: user.name,
              content: comment,
              date: new Date().toISOString()
            }]
          }
        : blog
    ));
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={logout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home blogs={blogs} />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" /> : <Login onLogin={login} />} 
            />
            <Route 
              path="/register" 
              element={user ? <Navigate to="/dashboard" /> : <Register onRegister={register} />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard blogs={blogs} user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/blog/:id" 
              element={<BlogDetail blogs={blogs} user={user} onAddComment={addComment} />} 
            />
            <Route 
              path="/create-blog" 
              element={user ? <CreateBlog onAddBlog={addBlog} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/pets" 
              element={<PetGallery pets={pets} setPets={setPets} />} 
            />
            <Route 
              path="/profile" 
              element={user ? <Profile user={user} blogs={blogs} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;