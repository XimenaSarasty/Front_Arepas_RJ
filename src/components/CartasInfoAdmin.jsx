import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import Cookies from 'js-cookie';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de productos:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (idProduct) => {
    const token = Cookies.get('token');

    if (!token) {
      // Manejar la situación si no hay token
      console.error("Token no encontrado. No se puede eliminar el producto.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/admin/deleteProduct/${idProduct}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProducts(products.filter(product => product.idProduct !== idProduct));
      alert('Producto eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('Ocurrió un error al eliminar el producto');
    }
  };

    const columns = [ 
        {
            name:"idProduct",
            label:"id"
        },
        {
            name: "productName", 
            label: "Nombre"
        },
        {
            name: "productDescription",
            label: "Descripción"
        },
        {
            name: "unityPrice",
            label: "Precio"
        }, 
        {
            name: "Editar",
            options: {
              filter: false,
              sort: false,
              empty: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                const productId = tableMeta.rowData[0].idProduct;
                return (
                  <Link to={`/admin/${tableMeta.rowData[0]}/edit-prod`}>
                    <button className="btn btn-primary btn-editar">Editar</button>
                  </Link>
                );
              },
            },
          },
          {
            name: "Eliminar",
            options: {
              filter: false,
              sort: false,
              empty: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                const productId = tableMeta.rowData[0].idProduct;
                return (
                  <button
                    onClick={() => handleDelete(tableMeta.rowData[0])}
                    className='btn btn-danger'
                  >
                    Eliminar
                  </button>
                );
              },
            },
          },
    ]

  return (
    <div className='container'>
      <MUIDataTable
      title={'Productos Agregados'}
      data = {products}
      columns={columns}     
      />
    </div> 
   );
};

export default Products;
