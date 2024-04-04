import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";

const UserShops = ({ email }) => {
  const [userBuys, setUserBuys] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/get-buy`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` 
          }
        });
        setUserBuys(response.data);
        console.log(response.data)
      } catch (error) {
        setError('Error al obtener los datos del usuario');
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    if (token && token.length > 0) {
      fetchData();
    }
  }, [email]); // Se vuelve a cargar cuando cambia el email

  return (
    <div className="user-shops-container">
      <h2>Mis Compras</h2>
      {error && <p>{error}</p>}
      <div className="compras-grid">
        {userBuys.map((buy, index) => (
          <div key={index} className="compra">
            <h3>Compra #{buy.idBuy}</h3>
            <p>Nombre: {buy.name}</p>
            <p>Apellido: {buy.lastName}</p>
            <p>Total de pago: {buy.totalPayment}</p>
            {/* Mostrar otros detalles de la compra según sea necesario */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserShops;


//  CODIGO POR SI LA EMBARRO
// import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import Cookies from "js-cookie";
// import '../assets/Style.css'; 

// const UserShops = ({ email }) => {

//     const [userBuys, setUserBuys] = useState([]); // Estado para almacenar las compras del usuario

//   useEffect(() => {
//     const token = Cookies.get('token');
//     if (token && token.length > 0) {
//       const fetchUserData = async () => {
//         try {
//           const response = await axios.get(`http://localhost:8080/api/user/get-buy/${email}`, {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}` 
//             }
//           });
//           const userData = response.data; 
//           console.log(response.data)
//           setUserBuys(userData); 
//         } catch (error) {
//           console.error('Error al obtener los datos del usuario:', error);
//         }
//       };
//       fetchUserData();
//     }
//   }, []); 

//   // Renderiza las compras del usuario
//   return (
//     <div className="user-shops-container">
//       <h2 className='NomCompras'>Mis Compras</h2>
//       <div className="compras-grid">
        
//       </div>
//     </div>
//   );
// };

// export default UserShops;