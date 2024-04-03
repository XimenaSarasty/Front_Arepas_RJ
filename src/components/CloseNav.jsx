import "../assets/Style.css"
import logo from "../image/logo.png";
import { NavLink } from "react-router-dom";
import { AddToCartIcon } from '../components/Icons.jsx';
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

export const CloseNav = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/searchProducts",
        { productName: searchTerm }
      );
      const filteredProducts = response.data;
      onSearch(filteredProducts); 
    } catch (error) {
      console.error(error); // Manejar posibles errores en la petición
    }
  };

  const handleLogout = () => {
    const confirmed = window.confirm('¿Estás seguro de que quieres cerrar la sesión?');
    if (confirmed) {
      Cookies.remove('token');
      navigate('/');
    }
  };
  
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink to="/home/login" className="navbar-brand">
          <img className="logo" src={logo} alt="Logo" />
        </NavLink>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-3 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/home/login" className="nav-link bold-text">
              Nuestros Productos
              </NavLink>
            </li>
          </ul>          
          <form className="d-flex" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Busca aquí nuestros productos"
              aria-label="Search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button className="btn btn-outline-success me-3" type="submit">
              Buscar
            </button>
          </form>
          <ul className="navbar-nav">
            <li className="nav-item">
            <div className="dropdown">
              <button className=" ingus btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Mi Perfil
              </button>
              <NavLink to="/shoppingcart">
                <button className="btn btn-primary btn-carrito">
                  <AddToCartIcon />
                </button>
              </NavLink>
                <ul className="dropdown-menu">
                <li><NavLink to="/user/profile" className="userp dropdown-item">Perfil</NavLink></li>
                <li><NavLink to="/user/user-history" className="userp dropdown-item">Mis Compras</NavLink></li>
                <li className="userp dropdown-item" onClick={handleLogout}>Cerrar sesión</li>            
              </ul>
            </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
