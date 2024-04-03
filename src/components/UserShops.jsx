import React from 'react';
import '../assets/Style.css'; 

const UserShops = () => {
  // Ejemplos de compras realizadas por el mismo cliente
  const compras = [
    {
      fecha: '12-03-2024',
      precioTotal: 10000,
      numProductos: 3,
      productos: [
        { nombre: 'Arepa rellena', precio: 5000, cantidad: 2 },
        { nombre: 'Natural ', precio: 5000, cantidad: 1 }
      ]
    }    
  ];

  return (
    <div className="user-shops-container">
      <h2 className='NomCompras'>Mis Compras</h2>
      <div className="compras-grid">
        {/* Mapea sobre las compras y muestra cada una */}
        {compras.map((compra, index) => (
          <div key={index} className="compra">
            <div className="detalle">
              <p><strong>Fecha de compra:</strong> {compra.fecha}</p>
              <p><strong>Precio total:</strong> ${compra.precioTotal.toFixed(2)}</p>
              <p><strong>Número de productos:</strong> {compra.numProductos}</p>
              {/* Otros detalles relevantes */}
            </div>
            <div className="productos">
              {/* Lista de productos comprados en esta compra */}
              {compra.productos.map((producto, idx) => (
                <div key={idx} className="producto">
                  <p><strong>Nombre del producto:</strong> {producto.nombre}</p>
                  <p><strong>Precio unitario:</strong> ${producto.precio.toFixed(2)}</p>
                  <p><strong>Cantidad:</strong> {producto.cantidad}</p>
                  {/* Otros detalles del producto */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserShops;
