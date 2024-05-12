import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import AboutUs from './components/AboutUs';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import VerifyEmail from './components/VerifyEmail';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;