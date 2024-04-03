import React, { useState } from 'react';
import '../assets/Style.css';

const DetailReviewOrder = () => {
  const [selectedOrder, setSelectedOrder] = useState(null); // Estado para rastrear el pedido seleccionado

  // Función para manejar la selección de un pedido
  const handleOrderSelection = (order) => {
    setSelectedOrder(order);
  };
  

  // Lista de pedidos (se debe obtener de tu backend)
  const orders = [
    {
      id: 1,
      date: "07-03-2024",
      customerName: "Juan Perez",
      totalProducts: 3,
      totalPrice: 150000,
      products: ["Arepas de Choclo", "Arepas Rellenas", "Leche Condensada"],
      completed: false
    }
  ];

  // Agrupa los pedidos en grupos de cuatro
  const groupedOrders = [];
  for (let i = 0; i < orders.length; i += 4) {
    groupedOrders.push(orders.slice(i, i + 4));
  }

  return (
    <div className="order-container">
      <h2 className='titpedidos'>Pedidos Pendientes</h2>
      {groupedOrders.map((group, index) => (
        <div key={index} className="orders-row">
          {group.map((order, innerIndex) => (
            <div key={order.id + '-' + innerIndex} className="order-summary" onClick={() => handleOrderSelection(order)}>
              <div className="customer-name">{order.customerName}</div>
              <div className="total-products">Cantidad de productos: {order.totalProducts}</div>
              <div className="date">Fecha: {order.date}</div>
              <div className="total-price">Precio total: {order.totalPrice}</div>
              <button className="btn btn-primary">Marcar como completado</button>
            </div>
          ))}
        </div>
      ))}
      {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  );
};

export default DetailReviewOrder;