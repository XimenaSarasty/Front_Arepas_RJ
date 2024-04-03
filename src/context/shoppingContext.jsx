import React, { createContext, useState } from 'react'

export const shoppingContext = createContext();

const ShoppingProvider = ({children}) => {

    const [shipment, setShipment] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedMunicipality, setSelectedMunicipality] = useState('');
    const [shippingPrice, setShippingPrice] = useState(0);

  return (
    <shoppingContext.Provider value={{
      shipment,
      setShipment,
      selectedDepartment,
      setSelectedDepartment,
      selectedCity,
      setSelectedCity,
      selectedMunicipality,
      setSelectedMunicipality,
      shippingPrice, 
      setShippingPrice 
    }}>
      {children}
    </shoppingContext.Provider>
  );
};

export default ShoppingProvider;
