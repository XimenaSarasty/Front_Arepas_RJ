import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavAdm from './NavAdm';
import Cookies from 'js-cookie';
import "../assets/Style.css";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState({
        productName: "", 
        productDescription: "", 
        unityPrice: "", 
        imageFile: null 
    });    

    useEffect(() => {
        if (id) {
            const fetchProducts = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/products/${id}`);
                    setProducts(response.data);
                } catch (error) {
                    console.error('Server Error', error);
                }
            };
            fetchProducts();
        }
    }, [id]);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setProducts({ ...products, imageFile: e.target.files[0] });
        } else {
            setProducts({ ...products, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formData = new FormData(); 
            formData.append('productName', products.productName);
            formData.append('productDescription', products.productDescription);
            formData.append('unityPrice', products.unityPrice);
            if (products.imageFile) {
                formData.append('imageFile', products.imageFile);
            }
            
            const token = Cookies.get('token');
            if (!token) {
                console.error("Token no encontrado. No se puede actualizar el producto.");
                return;
            }

            const url = `http://localhost:8080/api/admin/updateProduct/${id}`;
            await axios.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Producto actualizado con éxito');
            navigate('/admin');
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    return (
        <div className="">
            <NavAdm />
            <div className='esc'>
            <div className='agregar-producto-container'>
                <h2>{id ? 'Editar Producto' : ''}</h2>
                <div className='card-img-top mb-4'>
                    <img
                        src={`http://localhost:8080/api/imageProduct/${products.idProduct}`}
                        className="card-img-top"
                        alt="producto" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label className='ident image-label' htmlFor="image">Imagén del Producto:</label>
                        <input className='identt' type="file" id="image" name="image" accept="image/*" onChange={handleChange} />
                    </div>

                    <div className='form-group'>
                        <label className='ident name-label' htmlFor="name">Nombre del Producto:</label>
                        <input className='identt' type="text" id="name" name="productName" value={products.productName} onChange={handleChange} />
                    </div>

                    <div className='form-group'>
                        <label className='ident description-label' htmlFor="description">Descripción:</label>
                        <textarea className='identt' id="description" name="productDescription" rows="4" cols="50" value={products.productDescription} onChange={handleChange}></textarea>
                    </div>

                    <div className='form-group'>
                        <label className='ident price-label' htmlFor="price">Precio Unitario:</label>
                        <input className='identt' type="number" id="price" name="unityPrice" min="0" step="0.01" value={products.unityPrice} onChange={handleChange} />
                    </div>
                    <button className='btn btn-primary' type="submit">{id ? 'Editar' : 'Guardar'}</button>
                </form>
                <NavLink to={'/admin'}>
                    <button className='cancedit btn btn-danger'>Cancelar edición</button>
                </NavLink>
            </div>
        </div>
        </div>
    );
};

export default EditProduct;
