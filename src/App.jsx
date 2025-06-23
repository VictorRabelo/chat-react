import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Navbar from './components/Navbar';
import { useAuth } from './hooks/useAuth';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Chat />
              </PrivateRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
