import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import CoordinatorDashboard from './pages/dashboard/CoordinatorDashboard';
import MentorDashboard from './pages/dashboard/MentorDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/coordinator" element={<CoordinatorDashboard />} />
      <Route path="/dashboard/mentor" element={<MentorDashboard />} />
      <Route path="/dashboard/student" element={<StudentDashboard />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
