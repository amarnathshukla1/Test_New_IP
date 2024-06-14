// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const Checklogout = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log({ token })
  if (token) {

    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default Checklogout;
