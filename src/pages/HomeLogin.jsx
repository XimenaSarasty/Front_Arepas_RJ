import React, { useState } from 'react';
import Carrusel from "../components/Carrusel"
import CartasInfo from '../components/CartasInfo';
import Footer from '../components/Footer'
import BannerWhatsapp from "../components/BannerWhatsapp";
import { CloseNav } from "../components/CloseNav";


export const HomeLogin = () => {

  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (products) => {
    setFilteredProducts(products); 
  };

  return (
    <>
        <CloseNav onSearch={handleSearch}/>
        <Carrusel/>
        <CartasInfo onSearch={handleSearch} filteredProducts={filteredProducts}/>
        <BannerWhatsapp/>
	    <Footer/>
    </>
  )
}
