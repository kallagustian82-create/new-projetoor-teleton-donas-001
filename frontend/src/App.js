import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import DonationPage from "./components/DonationPage";
import DonationValuePage from "./components/DonationValuePage";
import PixPaymentPage from "./components/PixPaymentPage";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";

import BlogPostPage from "./components/BlogPostPage";
import CampanhaPernambuco from "./components/CampanhaPernambuco";

import DonorDataPage from "./components/DonorDataPage";

const API = '/api';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (event) => {
      const data = event.data || {};
      if (data.type === 'aacd-donate') {
        const value = parseFloat(data.value) || 55;
        navigate('/doacao/dados', { state: { value } });
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [navigate]);

  return (
    <iframe
      title="ParaQuemDoar"
      src="/aacd.html"
      data-testid="home-aacd-frame"
      style={{ border: 'none', width: '100%', height: '100vh', display: 'block' }}
    />
  );
};

function App() {
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    axios.post(`${API}/admin/visits/track`, { device: isMobile ? 'Mobile' : 'Desktop', origin: window.location.hostname }).catch(() => {});
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/campanha-pernambuco" element={<CampanhaPernambuco />} />
          <Route path="/instituicao/:slug" element={<DonationPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/doacao" element={<Navigate to="/instituicao/humus" replace />} />
          <Route path="/doacao/valor" element={<DonationValuePage />} />
          <Route path="/doacao/dados" element={<DonorDataPage />} />
          <Route path="/doacao/pix" element={<PixPaymentPage />} />
          <Route path="/donaspainel" element={<LoginPage />} />
          <Route path="/donaspainel/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;