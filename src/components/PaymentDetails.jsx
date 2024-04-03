import React from 'react'
import { useNavigate } from 'react-router-dom';

const PaymentDetails = () => {

  const navigate = useNavigate();

      const  handlePayment = () => {
        alert('Pago realizado exitosamente')
        navigate('/user/user-history');
      }

    return (
    <div>
      <div className="data_container">
        <form className="request-info row g-3 pt-2">
          <h4>Ingreso de tarjeta débito o crédito</h4>
          <div className="col-6">
            <label htmlFor="inputNumber4" className="form-label htmlFor">Número de tarjeta</label>
            <input
              type="number"
              className="form-control"
              id="inputNumber4"
              placeholder=""
            />
          </div>
          <div className="col-6">
            <label
              htmlFor="inputName4"
              className="form-label htmlFor"
            >Nombre y Apellido</label>
            <input
              type="name"
              className="form-control"
              id="inputName4"
              placeholder="Como figura en la tarjeta"
            />
          </div>
          <div className="col-6">
            <label htmlFor="inputDate" className="form-label htmlFor">Fecha de vencimiento</label>
            <input
              type="number"
              className="form-control"
              id="inputDate"
              placeholder="Mes/Año"
            />
          </div>
          <div className="col-6">
            <label
              htmlFor="inputCode2"
              className="form-label htmlFor"
            >Código de seguridad</label>
            <input
              type="number"
              className="form-control"
              id="inputCode2"
              placeholder="CVV"
            />
          </div>
          <div className="col-6">
            <label htmlFor="inputType" className="form-label htmlFor">Tipo</label>
            <select
              defaultValue="CC"
              id="inputType"
              className="form-select"
            >
              <option>CC</option>
              <option>CE</option>
              <option>NIT</option>
            </select>
          </div>
          <div className="col-6">
            <label
              htmlFor="inputcc2"
              className="form-label htmlFor"
            >Número de documento del titular</label>
            <input
              type="number"
              className="form-control"
              id="inputcc2"
              placeholder=""
            />
          </div>
          <div className="col-12 mb-4">
            <button type="button" className="btn btn-primary" onClick={handlePayment}>
              Pagar
            </button>          
          </div>
        </form>
      </div>
    </div>
  )
}

export default PaymentDetails

// CODIGO DE MUESTRA   
// import React from 'react'
// import { useNavigate } from 'react-router-dom';

// const PaymentDetails = () => {

//   const navigate = useNavigate();

//     const  handlePayment = () => {
//         alert('Pago realizado exitosamente')
//         navigate('/user/user-history');
//       }

//     return (
//     <div>
//       <div className="data_container">
//         <form className="request-info row g-3 pt-2">
//           <h4>Ingreso de tarjeta débito o crédito</h4>
//           <div className="col-6">
//             <label htmlFor="inputNumber4" className="form-label htmlFor">Número de tarjeta</label>
//             <input
//               type="number"
//               className="form-control"
//               id="inputNumber4"
//               placeholder=""
//             />
//           </div>
//           <div className="col-6">
//             <label
//               htmlFor="inputName4"
//               className="form-label htmlFor"
//             >Nombre y Apellido</label>
//             <input
//               type="name"
//               className="form-control"
//               id="inputName4"
//               placeholder="Como figura en la tarjeta"
//             />
//           </div>
//           <div className="col-6">
//             <label htmlFor="inputDate" className="form-label htmlFor">Fecha de vencimiento</label>
//             <input
//               type="number"
//               className="form-control"
//               id="inputDate"
//               placeholder="Mes/Año"
//             />
//           </div>
//           <div className="col-6">
//             <label
//               htmlFor="inputCode2"
//               className="form-label htmlFor"
//             >Código de seguridad</label>
//             <input
//               type="number"
//               className="form-control"
//               id="inputCode2"
//               placeholder="CVV"
//             />
//           </div>
//           <div className="col-6">
//             <label htmlFor="inputType" className="form-label htmlFor">Tipo</label>
//             <select
//               defaultValue="CC"
//               id="inputType"
//               className="form-select"
//             >
//               <option>CC</option>
//               <option>CE</option>
//               <option>NIT</option>
//             </select>
//           </div>
//           <div className="col-6">
//             <label
//               htmlFor="inputcc2"
//               className="form-label htmlFor"
//             >Número de documento del titular</label>
//             <input
//               type="number"
//               className="form-control"
//               id="inputcc2"
//               placeholder=""
//             />
//           </div>
//           <div className="col-12 mb-4">
//             <button type="button" className="btn btn-primary"  onClick={handlePayment}>
//               Pagar
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default PaymentDetails
