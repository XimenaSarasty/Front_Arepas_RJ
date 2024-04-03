import { CloseNav } from '../components/CloseNav'
import Footer from '../components/Footer'
import CartElements from '../components/CartElements'
import React, { useContext } from 'react';
import { cartContext } from '../context/cartContext';
import PriorOrder from '../components/PriorOrder';
import BannerWhatsapp from './../components/BannerWhatsapp';

const ShoppingCart = () => {

  const { cart } = useContext(cartContext);

  return cart.length > 0 ? (
    <>
      <CloseNav/>
        <div className="container-ss">
          
          <div className="left-side mt-5">
            <CartElements/>
          </div>
          
          <div className="right-side mt-5 mr-2">
            <PriorOrder/>
          </div>
                  
          <Footer/>
        </div>
      <BannerWhatsapp/>
    </>
  ): (
    <h2 className='cart-message-center'>Tu carrito esta vacío</h2>
  )
}

export default ShoppingCart
