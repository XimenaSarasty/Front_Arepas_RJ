import React, { useContext, useState } from 'react';
import { cartContext } from '../context/cartContext'; 
import { shoppingContext } from '../context/shoppingContext';

const OrderReviewPayment = () => {

  const { cart } = useContext(cartContext);
  const { shippingPrice } = useContext(shoppingContext);

  const subtotal = cart.reduce((acc, el) => acc + el.unityPrice, 0);
  const total = subtotal + shippingPrice;

  return (
    
    <div className="order-review row g-3 pt-2 mt-5">
      <h4 className="pb-4">Resumen Compra</h4>

      <div className="order-review-content">
      <div className="review-item">
        <p>SUBTOTAL</p> 
        <h6 className="bold">${subtotal}</h6>
      </div>

      <div className="review-item">
        <p>ENVÍO</p> 
        <h6 className="bold">${shippingPrice}</h6> 
      </div>

      <div className="review-item">
        <h5 className="bold">TOTAL</h5>
        <h5 className="bold">${total}</h5>
      </div>
      </div>
    </div>
    
  );
};
  
export default OrderReviewPayment;
