import React, { useContext, useState } from 'react';
import BannerWhatsapp from "../components/BannerWhatsapp";
import RequestInfo from "../components/RequestInfo";
import ShippingValue from "../components/ShippingValue";
import OrderReview from "../components/OrderReview";
import Footer from "../components/Footer";
import { CloseNav } from '../components/CloseNav';
import CartElements from "../components/CartElements";
import { shoppingContext } from "../context/shoppingContext";

const ShoppingSummary = () => {

  
  const { setShippingPrice } = useContext(shoppingContext);

    const [shippingInfo, setShippingInfo] = useState({
      selectedDepartment: '',
      selectedCity: '',
      selectedMunicipality: ''
    });
  
    const handleShippingInfoChange = (info) => {
      setShippingInfo(info);
    };

  return (
    <> 
        <div className="container-ss">
            <CloseNav />
                
            <div className="left-side mt-5">
              <CartElements/>
              <RequestInfo/>
            </div>
          
            <div className="right-side mt-5 mr-2">
              <ShippingValue onUpdateShippingPrice={setShippingPrice}/>
              <OrderReview />
            </div>
            
            <BannerWhatsapp/>  
          <Footer/>
          </div>   
    </>
  )
}

export default ShoppingSummary
