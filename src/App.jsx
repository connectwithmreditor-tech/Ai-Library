
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToolsProvider } from './context/ToolsContext';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <ToolsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ToolsProvider>
  );
}

export default App;
