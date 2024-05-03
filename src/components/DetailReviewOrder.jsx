import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";
import '../assets/Style.css';

const DetailReviewOrder = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');
      if (token && token.length > 0) {
        try {
          const response = await axios.get('http://localhost:8080/api/admin/get-buy', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          });
          setOrders(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      }
    };
    fetchUserData();
  }, []);

  const groupedOrders = orders.length > 0 ? orders.reduce((acc, order, i) => {
    const groupIndex = Math.floor(i / 4);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(order);
    return acc;
  }, []) : [];

  const handleSave = async (idBuy) => {
    try {
      const token = Cookies.get('token');
      const orderStatus = event.target.value; // Obtiene el estado seleccionado del select
  
      const response = await fetch(`http://localhost:8080/api/admin/status-buy/modify/${idBuy}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Agrega el header Content-Type
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ orderStatus }) // Agrega el body con el parámetro orderStatus
      });
    } catch (error) {
      alert('Ocurrió un error al actualizar el estado de la orden');
      console.log(error)
    }
  };

  return (
    <div className="order-container-v">
      <h2 className='titpedidos'>Pedidos Pendientes</h2>
      {orders.length === 0 && <p>Cargando pedidos...</p>}
      {groupedOrders.map((group, index) => (
        <div key={index} className="orders-row">
          {group.map((order) => (
            <div key={order.idBuy} className="order-summary">
              <div className="customer-name">{order.name} {order.lastName}</div>
              <div className="address">Dirección: {order.address}, {order.commune}, {order.city}, {order.department}</div>
              <div className="total-payment">Total a pagar: {order.totalPayment}</div>
              <div className="products">
                <h6 className="customer-name">Productos:</h6>
                <ul>
                  {order.products.map((product, i) => (
                    <li key={i}>{product.productName} - Cantidad: {product.quantity} - Precio: {product.price}</li>
                  ))}
                </ul>
              </div>
              <h6 className="customer-name">Estado del pedido:</h6>
              <select>
                <option disabled value={order.orderStatus}></option>
                <option>En Gestión</option>
                <option>En proceso</option>
                <option>Entregado</option>
              </select>
              <div className='d-flex justify-content-between mt-3'>
                <button className="btn btn-primary" onClick={() => handleSave(order.idBuy)}>
                  Guardar estado
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DetailReviewOrder;



//CODIGO POR SI LA EMBARRO:
// import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import Cookies from "js-cookie";
// import '../assets/Style.css'; 

// const DetailReviewOrder = () => {
  
//   const [user, setUser] = useState([]); 

//   useEffect(() => {
//       const fetchUserData = async () => {
//         const token = Cookies.get('token');
//         if (token && token.length > 0) {
//           try {
//             const response = await axios.get('http://localhost:8080/api/get-buy', {
//               headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}` 
//               }
//             });
//             const userData = response.data; 
//             setUser(userData); 
//             console.log(userData);
//           } catch (error) {
//             console.error('Error al obtener los datos del usuario:', error);
//           }
//         }
//       };
//       fetchUserData();
//     }, []);
  
//   const [selectedOrder, setSelectedOrder] = useState(null); // Estado para rastrear el pedido seleccionado

//   // Función para manejar la selección de un pedido
//   const handleOrderSelection = (order) => {
//     setSelectedOrder(order);
//   };
  

//   // Lista de pedidos (se debe obtener de tu backend)
//   const orders = [
//     {
//       id: 1,
//       date: "07-03-2024",
//       customerName: "Juan Perez",
//       totalProducts: 3,
//       totalPrice: 150000,
//       products: ["Arepas de Choclo", "Arepas Rellenas", "Leche Condensada"],
//       completed: false
//     }
//   ];

//   // Agrupa los pedidos en grupos de cuatro
//   const groupedOrders = [];
//   for (let i = 0; i < orders.length; i += 4) {
//     groupedOrders.push(orders.slice(i, i + 4));
//   }

//   return (
//     <div className="order-container">
//       <h2 className='titpedidos'>Pedidos Pendientes</h2>
//       {groupedOrders.map((group, index) => (
//         <div key={index} className="orders-row">
//           {group.map((order, innerIndex) => (
//             <div key={order.id + '-' + innerIndex} className="order-summary" onClick={() => handleOrderSelection(order)}>
//               <div className="customer-name">{order.customerName}</div>
//               <div className="total-products">Cantidad de productos: {order.totalProducts}</div>
//               <div className="date">Fecha: {order.date}</div>
//               <div className="total-price">Precio total: {order.totalPrice}</div>
//               <button className="btn btn-primary">Marcar como completado</button>
//             </div>
//           ))}
//         </div>
//       ))}
//       {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
//     </div>
//   );
// };

// export default DetailReviewOrder;