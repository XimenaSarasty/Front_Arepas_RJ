import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";

export const userContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState([]); 

    useEffect(() => {
        const fetchUserData = async () => {
          const token = Cookies.get('token');
          if (token && token.length > 0) {
            try {
              const response = await axios.get('http://localhost:8080/getUser', {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}` 
                }
              });
              const userData = response.data; 
              setUser(userData); 
            } catch (error) {
              console.error('Error al obtener los datos del usuario:', error);
            }
          }
        };
        fetchUserData();
      }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
       {children}
    </userContext.Provider>
  );
};

export default UserProvider
