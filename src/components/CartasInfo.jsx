import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AddToCartIcon } from '../components/Icons.jsx';
import { cartContext } from '../context/cartContext';

const Products = ({ filteredProducts }) => {
 
  const [products, setProducts] = useState([]);
  const {cart, setCart} = useContext(cartContext);


  const buyProducts = (product) => {
    const productWithQuantity = { ...product, productQuantity: 1 };
    setCart(prevCart => [...prevCart, productWithQuantity]);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
      }
    };
    fetchProducts();
  }, []); 

  return (
    <div className="cartas-container">
      {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            product.idProduct ? (
            <div key={product.idProduct} className="mb-4">
              <div className="card">
                <img src={`http://localhost:8080/api/imageProduct/${product.idProduct}`} className="card-img-top" alt="producto" />
                <div className="card-body">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text">{product.productDescription}</p>
                  <h2 className="card-price">${product.unityPrice}</h2>
                  <button onClick={()=>buyProducts(product)} className='btn btn-primary btn-carrito'>
                    <AddToCartIcon />
                  </button>
                </div> 
              </div>
            </div>
          ) : null
        ))
        ) : (
          products.map((product) => (
            product.idProduct ? (
              <div key={product.idProduct} className="mb-4">
                <div className="card">
                  <img src={`http://localhost:8080/api/imageProduct/${product.idProduct}`} className="card-img-top" alt="producto" />
                  <div className="card-body">
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="card-text">{product.productDescription}</p>
                    <h2 className="card-price">${product.unityPrice}</h2>
                    <button onClick={()=>buyProducts(product)} className='btn btn-primary btn-carrito'>
                      <AddToCartIcon />
                    </button>
                  </div>
                </div>
              </div>
            ) : null
          ))
        )}
      </div>
  );
};

export default Products;
