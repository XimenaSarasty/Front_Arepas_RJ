import React, { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(response.statusText || "Error en la solicitud");
      }


      const responseText = await response.text();
      
      if (typeof responseText === "string") {
        const welcomeMessage = responseText.split("tu token es: ")[0];
        const token = responseText.split("tu token es: ")[1];
        Cookies.set('token', token); 

        if (token && token.length > 0) {
          if (welcomeMessage.includes('Bienvenido, Administrador')) {
            navigate("/admin");
          } else {
            navigate("/home/login");
          }
        } else {
          console.log("No se recibió el token");
        }
      }
    } catch (error) {
       alert("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  }; 

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar correo electrónico
    if (name === "email") {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrorMessages({ ...errorMessages, email: "" });
      } else {
        setErrorMessages({
          ...errorMessages,
          email: "Por favor ingrese un correo válido.",
        });
      }
    }
    // Validar contraseña
    if (name === "password") {
      if (/(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
        setErrorMessages({ ...errorMessages, password: "" });
      } else {
        setErrorMessages({
          ...errorMessages,
          password:
            "La contraseña debe tener al menos una mayúscula y una minúscula.",
        });
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div style={{ marginTop: 0 }}>
      <form onSubmit={handleSubmit} className="login">
        <h2>Iniciar sesión</h2>

        <div className="form-group">
          <label htmlFor="email"></label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            placeholder="Correo Electrónico"
            onChange={handleChange}
          />
          {errorMessages.email && (
            <div className="error-message">{errorMessages.email}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            placeholder="Contraseña"
            onChange={handleChange}
          />
          {errorMessages.password && (
            <div className="error-message">{errorMessages.password}</div>
          )}
        </div>
            <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
