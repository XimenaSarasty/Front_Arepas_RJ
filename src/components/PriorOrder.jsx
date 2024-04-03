import React, { useContext } from 'react';
import { cartContext } from '../context/cartContext'; 
import { NavLink } from 'react-router-dom';

const PriorOrder = () => {

    const { cart } = useContext(cartContext);

    const total = cart.reduce((acc,el)=> acc + el.unityPrice, 0);

  return (
        <div className="prior-order row g-3 pt-2 mt-5">
            <h4 className="pb-4">Resumen Compra</h4>
            
            <div className="review-item">
            <p>SUBTOTAL</p> 
            <h6 className="bold">${total}</h6>
            </div>
    
            <div className="review-item">
            <h5 className="bold">TOTAL</h5>
            <h5 className="bold">${total}</h5>
            </div>
            <div className="col-12 mb-4">
                <NavLink to="/shoppingsummary">   
                    <button type="submit" className="btn btn-primary">Continuar compra</button>
                </NavLink> 
            </div>
        </div>
  )
}

export default PriorOrder
