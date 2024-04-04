import React, { useContext, useState } from 'react';
import { cartContext } from '../context/cartContext'; 
import { shoppingContext } from '../context/shoppingContext';
import { userContext } from './../context/userContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const OrderReview = () => {
  const navigate = useNavigate();

  const [preferenceId, setPreferenceId] = useState(null);
  const {
    selectedDepartment,
    selectedCity,
    selectedMunicipality,
  } = useContext(shoppingContext);

  const { cart } = useContext(cartContext);
  const { shippingPrice } = useContext(shoppingContext);
  const { user } = useContext(userContext); 

  const subtotal = cart.reduce((acc, el) => acc + el.unityPrice, 0);
  const total = subtotal + shippingPrice;

  const handleBuy = async () => {
    try {
      const infoBuy = {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        products: cart.map(product => {
          return {
            productName: product.productName,
            quantity: product.quantity,
            price: product.unityPrice
          };
        }),
        totalPayment: total,
        department: selectedDepartment,
        city: selectedCity,
        commune: selectedMunicipality ? selectedMunicipality : selectedCity,
        address: user.address,
        orderStatus: "En gestión"
      };
      console.log(infoBuy);
  
      const token = Cookies.get('token');
  
      if (!token) {
        console.error("Token no encontrado. No se puede realizar la compra.");
        return;
      }
  
      const apiUrl = 'http://localhost:8080/api/user/buy';
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(infoBuy),
      });
  
      if (response.ok) {
        console.log('La compra fue realizada con éxito');
        navigate('/user/payment/gateway');
      } else {
        console.error('Hubo un problema al realizar la compra');
      }
    } catch (error) {
      console.error('Error al realizar la compra:', error);
    }
  };

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
      <div className="col-12 mb-4">
          <button type="submit" className="editc btn btn-primary" onClick={handleBuy}>Ir a Pago</button>
          {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} />}
      </div>
    </div>
    
  );
};

export default OrderReview;
