import { useState, useEffect, useContext } from "react";
import { shoppingContext } from '../context/shoppingContext';

const ShippingValue = ({ onUpdateShippingPrice }) => {

    const [ shipment, setShipment ] = useState([]);
    const [shippingPrice, setShippingPrice] = useState(0); 

    const {
      selectedDepartment,
      selectedCity,
      selectedMunicipality,
    } = useContext(shoppingContext);

    const { shippingCost } = useContext(shoppingContext);

    useEffect(() => {
      const fetchShipments = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/delivery/getAll');
          if (!response.ok) {
            throw new Error('Error al obtener domicilios');
          }
          const data = await response.json();
          setShipment(data);         
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      };  
      fetchShipments ();
    }, []);
    
    const calculation = () => {
      if (!selectedDepartment || !selectedCity) {
          console.log('Por favor seleccione al menos el departamento y la ciudad.');
          return;
      }
  
      if (selectedCity === 'Medellin' && !selectedMunicipality) {
          console.log('Por favor seleccione una municipalidad en Medellín.');
          return;
      }
  
      var selectedShipment;
  
      if (selectedMunicipality) {
          selectedShipment = shipment.find(domicilio =>
              domicilio.department === selectedDepartment &&
              domicilio.city === selectedCity &&
              domicilio.deliveryAddress === selectedMunicipality
          );
      } else {
          if (selectedCity !== 'Medellin') {
                  selectedShipment = shipment.find(domicilio =>
                  domicilio.department === selectedDepartment &&
                  domicilio.city === selectedCity
              );
          }
      }
  
      if (selectedShipment) {
          onUpdateShippingPrice(selectedShipment.deliveryPrice);
      } else {
          alert('No se encontró información de envío para los parámetros seleccionados.');
      }
  };
 

    return (
    <div className="shipping-value">
      <h4 className="p-2">Costo de envío</h4>
      <div className="col-md-12 p-2">
        <label
          htmlFor="inputDepartament"
          className="form-label htmlFor"
        ></label>
        <input
          type="text"
          className="form-control"
          id="inputDepartament"
          placeholder="Departamento"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        />
      </div>
      <div className="col-md-12 p-2">
        <label htmlFor="inputCity" className="form-label htmlFor"></label>
        <input
          type="text"
          className="form-control"
          id="inputCity"
          placeholder="Ciudad"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        />
      </div>
      <div className="col-md-12 mb-4 p-2">
        <label htmlFor="inputState" className="form-label htmlFor"></label>
        <input
          type="text"
          className="form-control"
          id="inputState"
          value={selectedMunicipality}
          onChange={(e) => setSelectedMunicipality(e.target.value)}
        >
        </input>
      </div>
      <div className="other-departaments p-2">
        <p>
          Si tu envio es fuera del Valle de Aburrá, consultar vía whatsapp el
          precio del envio.
        </p>
      </div>
      <div className="col-12 mb-4 p-2">
        <button type="button" className="editd btn btn-primary" onClick={() => { calculation();}}>
          Calcular envío
        </button>
      </div>
    </div>
  );
};

export default ShippingValue;
