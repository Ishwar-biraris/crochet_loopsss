import React, { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import BestSellersSlider from './components/BestSellersSlider.jsx';
import CrochettiShopPage from './components/Crochettishoppage.jsx';
import Instagramsection from './components/Instagramsection.jsx';
import CrochetlyFooter from './components/CrochetlyFooter.jsx';
import AdminPage from './pages/AdminPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
}

function MainApp() {
  const heroRef        = useRef(null);
  const bestSellersRef = useRef(null);
  const shopRef        = useRef(null);

  const [shopFilter, setShopFilter] = useState({ category: 'all', sort: 'default' });

  const handleNav = (item) => {
    if (item === 'Home')         heroRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (item === 'Best Sellers') bestSellersRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (item === 'Shop')         shopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFooterFilter = ({ category, sort }) => {
    setShopFilter({ category, sort });
    setTimeout(() => {
      shopRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div>
      <Navbar onNav={handleNav} />
      <div ref={heroRef}>
        <Hero />
      </div>
      <div ref={bestSellersRef}>
        <BestSellersSlider />
      </div>
      <div ref={shopRef}>
        <CrochettiShopPage
          externalCategory={shopFilter.category}
          externalSort={shopFilter.sort}
        />
      </div>
      <Instagramsection />
      <CrochetlyFooter onFilter={handleFooterFilter} activeFilter={shopFilter} />
    </div>
  );
}