import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserProfileView = () => {

  const [user, setUser] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  const [errorMessages, setErrorMessages] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');
      if (token && token.length > 0) {
        try {
          const response = await axios.get('http://localhost:8080/getUser', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}` 
            }
          });
          const userData = response.data; 
          setUser(userData); 
          setUser({ ...userData, id: userData.idUsers }); 
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar nombre 
    if (name === 'name') {
      if (/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(value)) {
        setErrorMessages({ ...errorMessages, [name]: '' });
      } else {
        setErrorMessages({ ...errorMessages, [name]: 'El nombre contiene caracteres incorrectos.' });
      }
    }
   // Validar apellido
    if (name === 'lastName') {
      if (/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(value)) {
        setErrorMessages({ ...errorMessages, [name]: '' });
      } else {
        setErrorMessages({ ...errorMessages, [name]: 'El apellido contiene caracteres incorrectos.' });
      }
    }
    // Validar longitud y formato del número de teléfono
    if (name === 'phone') {
      if (/^3\d{9}$/.test(value)) {
        setErrorMessages({ ...errorMessages, phone: '' });
      } else {
        setErrorMessages({ ...errorMessages, phone: 'El número de teléfono debe empezar en 3 y contener 10 dígitos.' });
      }
    }
    setUser({ ...user, [e.target.name]: e.target.value });
};

const handleSave = async (e) => {
  e.preventDefault();

  if (Object.values(errorMessages).some(error => error)) {
    alert('Existen errores en el formulario. Por favor, revise los campos marcados.');
    return; 
  }

  try {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('No se ha encontrado un token de autenticación.');
    }

    await axios.put(`http://localhost:8080/api/update/${user.email}`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    alert('Perfil actualizado con éxito');
    // Aquí debes decidir qué hacer después de actualizar el perfil, como redirigir al usuario a otra página.
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    if (error.response && error.response.data && error.response.data.message) {
      alert(`Error al actualizar el perfil: ${error.response.data.message}`);
    } else {
      alert('Error al actualizar el perfil. Por favor, inténtalo de nuevo más tarde.');
    }
  }
};

  return (
    <form className={`update ${Object.values(errorMessages).some(error => error) ? 'was-validated' : ''}`} id="update" noValidate>
    <div className='profile-container-wrapper'>
      <div className='profile-container'>
        <h2 className='profile-title'>Mi Perfil</h2>

        <div className='profile-field'>
          <label className='editpf profile-label'>Nombre:</label>
          {editing ? (
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          ) : (
            <span className='profile-value'>{user.name}</span>
          )}
          {errorMessages.name && <div className='error-message'>{errorMessages.name}</div>}
        </div>

        <div className='profile-field'>
          <label className='editpf profile-label'>Apellido:</label>
          {editing ? (
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
          ) : (
            <span className='profile-value'>{ user.lastName }</span>
          )}
          {errorMessages.lastName && <div className='error-message'>{errorMessages.lastName}</div>}
        </div>
        <div className='profile-field'>
          <label className='editpf profile-label'>Correo Electrónico:</label>
          <span className='profile-value'>{user.email}</span>
        </div>
        <div className='profile-field'>
          <label className='editpf profile-label'>Celular:</label>
          {editing ? (
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
          ) : (
            <span className='profile-value'>{user.phone}</span>
          )}
          {errorMessages.phone && <div className='error-message'>{errorMessages.phone}</div>}
        </div>
        <div className='profile-field'>
          <label className='editpf profile-label'>Dirección:</label>
          {editing ? (
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
            />
          ) : (
            <span className='profile-value'>{user.address}</span>
            )}
        </div>
        {editing ? (
          <div className='profile-buttons'>
              <button type='submit' className='btn btn-primary' onClick={handleSave}>Guardar</button>
              <button className='editdl btn btn-danger' onClick={() => setEditing(false)}>Cancelar</button>
              </div>
            ) : (
              <button className='btn btn-primary' onClick={() => setEditing(true)}>Editar</button>
            )}
          </div>
        </div>
        </form>
      );
    };

export default UserProfileView;
