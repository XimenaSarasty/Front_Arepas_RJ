import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';

const RolesAdmin = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []); 

  const fetchUsers = async () => {
    try {
        const token = Cookies.get('token');
        if (!token) {
            console.error("Token no encontrado. No se pueden obtener los usuarios.");
            return;
        }

        if (email.trim() !== '') {
            const response = await fetch(`http://localhost:8080/api/admin/modify-role-button/getUser/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Error al obtener los usuarios');
            }
            const data = await response.json();
            setUsers(data);
        }
    } catch (error) {
        alert('No hay registro de usuarios con el correo proporcionado');
        window.location.reload();
    }
};

  const handleSearch = () => {
    fetchUsers();
  }

  const deleteFilters = () => {
    window.location.reload();
  }

  const handleChange = (event, id) => {
    const newValue = event.target.value;
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers];
      updatedUsers[id][2] = newValue;
      return updatedUsers;
    });
  };

  const handleSave = async () => {
    try {
        const token = Cookies.get('token');
        if (!token) {
            console.error("Token no encontrado. No se puede actualizar el rol del usuario.");
            return;
        }

        const modifiedUser = users.find(user => user[1] === email);
        if (!modifiedUser) {
            throw new Error('No se encontró el usuario');
        }

        const response = await fetch(`http://localhost:8080/api/admin/modify-role-button/newRole/${email}?newRole=${modifiedUser[2]}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el rol');
        }
        alert('Rol actualizado con éxito');
    } catch (error) {
        alert('Ocurrió un error al actualizar el rol');
    }
};
  

  return (
    <div className="allin d-flex flex-column align-items-center col-8 my-container">
      <h2>Cambio de Roles</h2>
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Busca aquí el correo del usuario"
          aria-label="Search"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button className="btn btn-outline-success me-3" type="button" onClick={handleSearch}>
          Buscar
        </button>
        <button className='btn btn-danger' onClick={deleteFilters}>
          Borrar filtros
        </button>
      </form>

      <div>
        <table className="table table-striped my-table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col">Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((data, id_users) => (
              <tr key={id_users}>
                <td>{data[0]}</td>
                <td>{data[1]}</td>
                <td>
                  <select value={data[2]} onChange={(event) => handleChange(event, id_users)}>
                    <option disabled value="">{data[2]}</option>
                    <option>USER</option>
                    <option>ADMIN</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='d-flex justify-content-between mt-3'>
        <button className="btn btn-primary" onClick={handleSave}>
          Guardar
        </button>
        <NavLink to={'/admin'}>
          <button className='btn btn-secondary'>Atrás</button>
        </NavLink>  
        </div>
      </div>
    </div>
  );
};

export default RolesAdmin;
