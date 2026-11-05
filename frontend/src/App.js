import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import HeroCarousel from "./components/HeroCarousel";
import InitiativesGrid from "./components/InitiativesGrid";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";
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
  return (
    <>
      <Header />
      <main>
        <HeroCarousel />
        <InitiativesGrid />
        <BlogSection />
      </main>
      <Footer />
    </>
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