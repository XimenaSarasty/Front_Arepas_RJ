import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const cartContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);  
  const [cart, setCart] = useState([]);  
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <cartContext.Provider value={{ data, cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
};

export default DataProvider;
