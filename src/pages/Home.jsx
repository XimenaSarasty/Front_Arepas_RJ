import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Carrusel from "../components/Carrusel";
import CartasInfoSinLog from '../components/CartasInfoSinLog';
import BannerWhatsapp from "../components/BannerWhatsapp";
import Footer from "../components/Footer";


const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (products) => {
    setFilteredProducts(products); 
  };

  return (
    <>
    <Navbar onSearch={handleSearch} />
    <Carrusel/>
    <BannerWhatsapp/>
    <CartasInfoSinLog onSearch={handleSearch} filteredProducts={filteredProducts} />
    <Footer/>
  </>
  )
}

export default Home;
