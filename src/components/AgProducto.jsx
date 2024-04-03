import React, { useState } from 'react';
import axios from 'axios';
import "../assets/Style.css"
import { NavLink } from 'react-router-dom';

const AgregarProducto = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        image: null
    });

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        const newValue = type === 'file' ? event.target.files[0] : value;

        setProduct({ ...product, [name]: newValue });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('description', product.description);
            formData.append('price', product.price);
            formData.append('image', product.image);

            await axios.post('http://localhost:8080/api/regProduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Producto agregado exitosamente');
            window.location.reload();
        } catch (error) {
            console.error('Error al agregar el producto:', error);
            alert('Ocurrió un error al agregar el producto');
        }
    };

    return (
        <div className="allin">
            <div className='agregar-producto-container'>
                <h2>Agregar Nuevo Producto</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label className='image-label' htmlFor="image">Imagén del Producto:</label>
                        <input className='image-input' type="file" id="image" name="image" accept="image/*" onChange={handleChange} required />
                    </div>

                    <div className='form-group'>
                        <label className='name-label' htmlFor="name">Nombre del Producto:</label>
                        <input className='name-input' type="text" id="name" name="name" value={product.name} onChange={handleChange} required />
                    </div>

                    <div className='form-group'>
                        <label className='description-label' htmlFor="description">Descripción:</label>
                        <textarea id="description" name="description" rows="4" cols="50" value={product.description} onChange={handleChange} required></textarea>
                    </div>

                    <div className='form-group'>
                        <label className='price-label' htmlFor="price">Precio Unitario:</label>
                        <input className='price-input' type="number" id="price" name="price" min="0" step="0.01" value={product.price} onChange={handleChange} required />
                        <input type="submit" value="Agregar producto" className='btn btn-primary' />
                    </div>                    
               </form>
               
               <NavLink to={'/admin'}>
                    <button className='btn btn-primary'>Ver productos</button>
               </NavLink>               
            </div>
        </div>                 
    );
};

export default AgregarProducto;
