import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../image/logo.png";
import axios from 'axios'; 
import "../assets/Style.css";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

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
      console.error(error); 
    }
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
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
              <NavLink to='/' className="nav-link bold-text">
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
              <NavLink to="/login/register" className="ingus nav-link btn">
                Ingresar
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
