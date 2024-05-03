import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import "../assets/Style.css";

const FeeShipment = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [selectedComuna, setSelectedComuna] = useState('');
  const [price, setPrice] = useState('');
  const [showCitySelect, setShowCitySelect] = useState(false);
  const [showMunicipalitySelect, setShowMunicipalitySelect] = useState(false);

 const departments = [
    { name: 'Amazonas', cities: ['Leticia', 'Puerto Nariño'] },
    { name: 'Antioquia', cities: ['Medellin', 'Bello', 'Itagüí', 'Envigado', 'Caldas', 'Sabaneta', 'La Estrella', 'Girardota', 'Barbosa', 'Copacabana'] },
    { name: 'Arauca', cities: ['Arauca', 'Arauquita', 'Cravo Norte', 'Fortul', 'Caldas', 'Puerto Rondón', 'Saravena', 'Tame'] },
    { name: 'Atlántico', cities: ['Baranoa', 'Barranquilla', 'Campo de la Cruz', 'Candelaria', 'Galapa', 'Juan de Acosta', 'La Luruaco', 'Malambo', 'Polonuevo', 'Piojó', 'Palmar de Varela', 'Manatí', 'Ponedera', 'Puerto Colombia', 'Repelón', 'Sabanagrande', 'Sabanalarga', 'Santa Lucía', 'Santo Tomás', 'Soledad', 'Suán', 'Tubará', 'Usiacurí'] },
    { name: 'Bogotá', cities: ['Chía', 'Cajicá', 'Cota', 'Cogua', 'Gachancipá', 'Nemocón', 'Sopó', 'Tocancipá', 'Tabio', 'Tenjo', 'Zipaquirá', 'Funza', 'Madrid', 'Mosquera', 'Facatativá', 'Subachoque', 'El Rosal', 'Bojacá', 'Zipacón', 'Soacha', 'Sibaté', 'Fusagasuga', 'Silvania', 'Granada', 'La Calera', 'Cáqueza'] },
    { name: 'Bolivar', cities: [ 'Cartagena de Indias', 'Magangué', 'Sincelejo', 'Turbaco', 'Arjona', 'El Carmen de Bolívar', 'San Juan Nepomuceno', 'Mompós', 'Córdoba', 'El Guamo', 'El Banco', 'María la Baja', 'San Jacinto', 'Montecristo', 'San Estanislao', 'Regidor', 'Arenal', 'Altos del Rosario', 'Cicuco', 'Barranco de Loba', 'Cantagallo', 'San Pablo', 'Santa Rosa del Sur', 'Tiquisio', 'Tiquizuela', 'Morales', 'Pinillos', 'Simití', 'Zambrano', 'Achí', 'Arenal del Sur', 'Hatillo de Loba', 'Talaigua Nuevo', 'Puerto Wilches', 'San Fernando', 'Calamar', 'Santa Catalina', 'Clemencia', 'Santa Rosa', 'Villanueva', 'San Cristóbal', 'Buenavista', 'Río Viejo', 'San Martín de Loba', 'Cantón del San Pablo', 'El Peñón', 'Mahates', 'San Juan de Nepomuceno', 'Turbana', 'San Juan de Betulia', 'Los Palmitos', 'Montecristo', 'Cantón de San Pablo', 'Soplaviento', 'Santa Cruz de Mompox', 'San Fernando', 'Santa Catalina', 'Regidor', 'Achí', 'Tiquisio', 'Altos del Rosario', 'El Guamo', 'El Peñón', 'San Jacinto del Cauca', 'San Martín de Loba', 'San Pablo', 'Santa Rosa del Sur', 'Simití', 'Talaigua Nuevo', 'Tiquizuela', 'Turbaco', 'Villanueva'] },
    { name: 'Boyacá', cities: ['Tunja', 'Duitama', 'Sogamoso', 'Chiquinquirá', 'Paipa', 'Puerto Boyacá', 'Villa de Leyva', 'Moniquirá', 'Belen', 'Guateque', 'Ramiriquí', 'Samacá', 'Toca', 'Santa Rosa de Viterbo', 'Tibasosa', 'Pesca', 'Firavitoba', 'Miraflores', 'Monguí', 'Tuta', 'Boavita', 'Soatá', 'Cuítiva', 'Nuevo Colón', 'Nobsa', 'Floresta', 'Gámbita', 'Tenza', 'Santana', 'Ciénega', 'San José de Pare', 'Siachoque', 'San Miguel de Sema', 'Chinavita', 'Sáchica', 'Tibaná', 'Socotá', 'San Luis de Gaceno', 'Sutamarchán', 'Mongua', 'Labranzagrande', 'Tutazá', 'Ráquira', 'La Uvita', 'Jericó', 'Motavita', 'Guacamayas', 'Buenavista', 'Paz de Río', 'Zetaquira', 'Pisba', 'Tópaga', 'Villa de San Diego de Ubaté', 'Sutatenza', 'Sativanorte', 'Covarachía', 'Úmbita', 'Viracachá', 'Turmequé', 'Garagoa', 'Santana', 'Guayatá', 'Arcabuco', 'La Victoria', 'Almeida', 'Santa Sofía', 'Saboyá', 'Pajarito', 'Coper', 'Macanal', 'San Pablo de Borbur', 'Chivor', 'Miraflores', 'Santa María', 'Otanche', 'La Capilla', 'Togüí', 'Santa María', 'San Pablo de Borbur', 'Santa Rosa de Viterbo', 'Zetaquira'] },
    { name: 'Caldas', cities: ['Aguadas', 'Anserma', 'Aranzazu', 'Belalcázar', 'Chinchiná', 'Filadelfia', 'La Dorada', 'La Merced', 'Manizales', 'Manzanares', 'Marmato', 'Marquetalia', 'Marulanda', 'Neira', 'Norcasia', 'Pácora', 'Palestina', 'Pensilvania', 'Riosucio', 'Risaralda', 'Salamina', 'Samana', 'San José', 'Supía', 'Victoria', 'Villamaría', 'Viterbo'] },
    { name: 'Caquetá', cities: ['Albania', 'Belén de los Andaquíes', 'Cartagena del Chairá', 'Curillo', 'El Doncello', 'El Paujil', 'Florencia', 'La Montañita', 'Milán', 'Morelia', 'Puerto Rico', 'San José del Fragua', 'San Vicente del Caguán', 'Solano', 'Solita', 'Valparaíso'] },
    { name: 'Casanare', cities: ['Aguazul', 'Chámeza', 'Hato Corozal', 'La Salina', 'Maní', 'Monterrey', 'Nunchía', 'Orocué', 'Paz de Ariporo', 'Pore', 'Recetor', 'Sabanalarga', 'Sácama', 'San Luis de Palenque', 'Támara', 'Tauramena', 'Trinidad', 'Villanueva', 'Yopal'] },
    { name: 'Cauca', cities: ['Almaguer', 'Argelia', 'Balboa', 'Bolívar', 'Buenos Aires', 'Cajibío', 'Caldono', 'Caloto', 'Corinto', 'El Tambo', 'Florencia', 'Guachené', 'Guapí', 'Inzá', 'Jambaló', 'La Sierra', 'La Vega', 'López de Micay', 'Mercaderes', 'Miranda', 'Morales', 'Padilla', 'Páez', 'Patía', 'Piamonte', 'Piendamó', 'Popayán', 'Puerto Tejada', 'Puracé', 'Rosas', 'San Sebastián', 'Santander de Quilichao', 'Santa Rosa', 'Silvia', 'Sotará', 'Suárez', 'Sucre', 'Timbío', 'Timbiquí', 'Toribío', 'Totoró', 'Villa Rica'] },
    { name: 'Cesar', cities: ['Aguachica', 'Agustín Codazzi', 'Astrea', 'Becerril', 'Bosconia', 'Chimichagua', 'Chiriguaná', 'Curumaní', 'El Copey', 'El Paso', 'Gamarra', 'González', 'La Gloria', 'La Jagua de Ibirico', 'La Paz', 'Manaure Balcón del Cesar', 'Pailitas', 'Pelaya', 'Pueblo Bello', 'Río de Oro', 'San Alberto', 'San Diego', 'San Martín', 'Tamalameque', 'Valledupar'] },
    { name: 'Chocó', cities: ['Acandí', 'Alto Baudó', 'Atrato', 'Bagadó', 'Bahía Solano', 'Bajo Baudó', 'Bojayá', 'Cantón de San Pablo', 'Cértegui', 'Condoto', 'El Carmen de Atrato', 'Istmina', 'Juradó', 'Lloró', 'Medio Atrato', 'Medio Baudó', 'Medio San Juan', 'Nóvita', 'Nuquí', 'Quibdó', 'Río Iró', 'Río Quito', 'Riosucio', 'San José del Palmar', 'Sipí', 'Tadó', 'Unguía', 'Unión Panamericana'] },
    { name: 'Cundinamarca', cities: ['Agua de Dios', 'Albán', 'Anapoima', 'Anolaima', 'Apulo', 'Arbeláez', 'Beltrán', 'Bituima', 'Bojacá', 'Cabrera', 'Cachipay', 'Cajicá', 'Caparrapí', 'Caqueza', 'Carmen de Carupa', 'Chaguaní', 'Chía', 'Chipaque', 'Choachí', 'Chocontá', 'Cogua', 'Cota', 'Cucunubá', 'El Colegio', 'El Peñón', 'El Rosal', 'Facatativá', 'Fomeque', 'Fosca', 'Funza', 'Fúquene', 'Fusagasugá', 'Gachalá', 'Gachancipá', 'Gachetá', 'Gama', 'Girardot', 'Granada', 'Guachetá', 'Guaduas', 'Guasca', 'Guataquí', 'Guatavita', 'Guayabal de Siquima', 'Guayabetal', 'Gutiérrez', 'Jerusalén', 'Junín', 'La Calera', 'La Mesa', 'La Palma', 'La Peña', 'La Vega', 'Lenguazaque', 'Machetá', 'Madrid', 'Manta', 'Medina', 'Mosquera', 'Nariño', 'Nemocón', 'Nilo', 'Nimaima', 'Nocaima', 'Pacho', 'Paime', 'Pandi', 'Paratebueno', 'Pasca', 'Puerto Salgar', 'Pulí', 'Quebradanegra', 'Quetame', 'Quipile', 'Ricaurte', 'San Antonio del Tequendama', 'San Bernardo', 'San Cayetano', 'San Francisco', 'San Juan de Rioseco', 'Sasaima', 'Sesquilé', 'Sibaté', 'Silvania', 'Simijaca', 'Soacha', 'Sopó', 'Subachoque', 'Suesca', 'Supatá', 'Susa', 'Sutatausa', 'Tabio', 'Tausa', 'Tena', 'Tenjo', 'Tibacuy', 'Tibirita', 'Tocaima', 'Tocancipá', 'Topaipi', 'Ubalá', 'Ubaque'] },
    { name: 'Guainía', cities: ['Barranco Minas', 'Cacahual', 'Inírida', 'La Guadalupe', 'Mapiripana', 'Morichal', 'Pana Pana', 'Puerto Colombia', 'San Felipe'] },
    { name: 'Guaviare', cities: ['Calamar', 'El Retorno', 'Miraflores', 'San José del Guaviare'] },
    { name: 'Huila', cities: ['Acevedo', 'Agrado', 'Aipe', 'Algeciras', 'Altamira', 'Baraya', 'Campoalegre', 'Colombia', 'Elías', 'Garzón', 'Gigante', 'Guadalupe', 'Hobo', 'Iquira', 'Isnos', 'La Argentina', 'La Plata', 'Nataga', 'Neiva', 'Oporapa', 'Paicol', 'Palermo', 'Palestina', 'Pital', 'Pitalito', 'Rivera', 'Saladoblanco', 'San Agustín', 'Santa María', 'Suaza', 'Tarqui', 'Tello', 'Teruel', 'Tesalia', 'Timaná', 'Villavieja', 'Yaguará'] },
    { name: 'La Guajira', cities: ['Albania', 'Barrancas', 'Dibulla', 'Distracción', 'El Molino', 'Fonseca', 'Hatonuevo', 'La Jagua del Pilar', 'Maicao', 'Manaure', 'Riohacha', 'San Juan del Cesar', 'Uribia', 'Urumita', 'Villanueva'] },
    { name: 'Magdalena', cities: ['Algarrobo', 'Aracataca', 'Ariguaní', 'Cerro de San Antonio', 'Chivolo', 'Ciénaga', 'Concordia', 'El Banco', 'El Piñón', 'El Retén', 'Fundación', 'Guamal', 'Nueva Granada', 'Pedraza', 'Pijiño del Carmen', 'Pivijay', 'Plato', 'Puebloviejo', 'Remolino', 'Sabanas de San Ángel', 'Salamina', 'San Sebastián de Buenavista', 'San Zenón', 'Santa Ana', 'Santa Bárbara de Pinto', 'Santa Marta', 'Sitionuevo', 'Tenerife', 'Zapayán', 'Zona Bananera'] },
    { name: 'Meta', cities: ['Acacías', 'Barranca de Upía', 'Cabuyaro', 'Castilla la Nueva', 'Cubarral', 'Cumaral', 'El Calvario', 'El Castillo', 'El Dorado', 'Fuente de Oro', 'Granada', 'Guamal', 'La Macarena', 'La Uribe', 'Lejanías', 'Mapiripán', 'Mesetas', 'Puerto Concordia', 'Puerto Gaitán', 'Puerto Lleras', 'Puerto López', 'Puerto Rico', 'Restrepo', 'San Carlos de Guaroa', 'San Juan de Arama', 'San Juanito', 'San Martín', 'Uribe', 'Villavicencio', 'Vista Hermosa'] },
    { name: 'Nariño', cities: ['Albán', 'Aldana', 'Ancuyá', 'Arboleda', 'Barbacoas', 'Belén', 'Buesaco', 'Chachagüí', 'Colón', 'Consacá', 'Contadero', 'Córdoba', 'Cuaspud', 'Cumbal', 'Cumbitara', 'El Charco', 'El Peñol', 'El Rosario', 'El Tablón de Gómez', 'El Tambo', 'Francisco Pizarro', 'Funes', 'Guachucal', 'Guaitarilla', 'Gualmatán', 'Iles', 'Imués', 'Ipiales', 'La Cruz', 'La Florida', 'La Llanada', 'La Tola', 'La Unión', 'Leiva', 'Linares', 'Los Andes', 'Magüí', 'Mallama', 'Mosquera', 'Nariño', 'Olaya Herrera', 'Ospina', 'Pasto', 'Policarpa', 'Potosí', 'Providencia', 'Puerres', 'Pupiales', 'Ricaurte', 'Roberto Payán', 'Samaniego', 'San Bernardo', 'San Lorenzo', 'San Pablo', 'San Pedro de Cartago', 'Sandoná', 'Santa Bárbara', 'Santacruz', 'Sapuyes', 'Taminango', 'Tangua', 'Tumaco'] },
    { name: 'Norte de Santander', cities: ['Ábrego', 'Arboledas', 'Bochalema', 'Bucarasica', 'Cáchira', 'Cácota', 'Chinácota', 'Chitagá', 'Convención', 'Cúcuta', 'Cucutilla', 'Durania', 'El Carmen', 'El Tarra', 'El Zulia', 'Gramalote', 'Hacarí', 'Herrán', 'La Esperanza', 'La Playa', 'Labateca', 'Los Patios', 'Lourdes', 'Mutiscua', 'Ocaña', 'Pamplona', 'Pamplonita', 'Puerto Santander', 'Ragonvalia', 'Salazar', 'San Calixto', 'San Cayetano', 'Santiago', 'Sardinata', 'Silos', 'Teorama', 'Tibú', 'Toledo', 'Villa Caro', 'Villa del Rosario'] },
    { name: 'Putumayo', cities: ['Colón', 'Mocoa', 'Orito', 'Puerto Asís', 'Puerto Caicedo', 'Puerto Guzmán', 'Puerto Leguízamo', 'San Francisco', 'San Miguel', 'Santiago', 'Sibundoy', 'Valle del Guamuez', 'Villagarzón'] },
    { name: 'Quindío', cities: ['Armenia', 'Buenavista', 'Calarcá', 'Circasia', 'Córdoba', 'Filandia', 'Génova', 'La Tebaida', 'Montenegro', 'Pijao', 'Quimbaya', 'Salento'] },
    { name: 'Risaralda', cities: ['Apía', 'Balboa', 'Belén de Umbría', 'Dosquebradas', 'Guática', 'La Celia', 'La Virginia', 'Marsella', 'Mistrató', 'Pereira', 'Pueblo Rico', 'Quinchía', 'Santa Rosa de Cabal', 'Santuario'] },
    { name: 'San Andres y Providencia', cities: ['Providencia', 'San Andres'] },
    { name: 'Santander', cities: ['Aguada', 'Albania', 'Aratoca', 'Barbosa', 'Barichara', 'Barrancabermeja', 'Betulia', 'Bolívar', 'Bucaramanga', 'Cabrera', 'California', 'Capitanejo', 'Carcasí', 'Cepitá', 'Cerrito', 'Charalá', 'Charta', 'Chima', 'Chipatá', 'Cimitarra', 'Concepción', 'Confines', 'Contratación', 'Coromoro', 'Curití', 'El Carmen de Chucurí', 'El Guacamayo', 'El Peñón', 'El Playón', 'Encino', 'Enciso', 'Florián', 'Floridablanca', 'Galán', 'Gámbita', 'Girón', 'Guaca', 'Guadalupe', 'Guapotá', 'Guavatá', 'Güepsa', 'Hato', 'Jesús María', 'Jordán', 'La Belleza', 'La Paz', 'Landázuri', 'Lebrija', 'Los Santos', 'Macaravita', 'Málaga', 'Matanza', 'Mogotes', 'Molagavita', 'Ocamonte', 'Oiba', 'Onzaga', 'Palmar', 'Palmas del Socorro', 'Páramo', 'Piedecuesta', 'Pinchote', 'Puente Nacional', 'Puerto Parra', 'Puerto Wilches', 'Rionegro', 'Sabana de Torres', 'San Andrés', 'San Benito', 'San Gil', 'San Joaquín', 'San José de Miranda', 'San Miguel', 'San Vicente de Chucurí', 'Santa Bárbara', 'Santa Helena del Opón', 'Simacota', 'Suaita', 'Sucre', 'Suratá', 'Tona', 'Valle de San José', 'Vélez', 'Vetas', 'Villanueva'] },
    { name: 'Sucre', cities: ['Buenavista', 'Caimito', 'Chalán', 'Colosó', 'Corozal', 'Coveñas', 'El Roble', 'Galeras', 'Guaranda', 'La Unión', 'Los Palmitos', 'Majagual', 'Morroa', 'Ovejas', 'Palmito', 'Sampués', 'San Benito Abad', 'San Juan de Betulia', 'San Marcos', 'San Onofre', 'San Pedro', 'Sincé', 'Sincelejo', 'Sucre', 'Tolú', 'Tolú Viejo'] },
    { name: 'Tolima', cities: ['Alpujarra', 'Alvarado', 'Ambalema', 'Anzoátegui', 'Armero', 'Ataco', 'Cajamarca', 'Carmen de Apicalá', 'Casabianca', 'Chaparral', 'Coello', 'Coyaima', 'Cunday', 'Dolores', 'Espinal', 'Falan', 'Flandes', 'Fresno', 'Guamo', 'Herveo', 'Honda', 'Ibagué', 'Icononzo', 'Lérida', 'Líbano', 'Mariquita', 'Melgar', 'Murillo', 'Natagaima', 'Ortega', 'Palocabildo', 'Piedras', 'Planadas', 'Prado', 'Purificación', 'Rioblanco', 'Roncesvalles', 'Rovira', 'Saldaña', 'San Antonio', 'San Luis', 'Santa Isabel', 'Suárez', 'Valle de San Juan', 'Venadillo', 'Villahermosa'] },
    { name: 'Valle del Cauca', cities: ['Alcalá', 'Andalucía', 'Ansermanuevo', 'Argelia', 'Bolívar', 'Buenaventura', 'Bugalagrande', 'Caicedonia', 'Cali', 'Calima', 'Candelaria', 'Cartago', 'Dagua', 'El Águila', 'El Cairo', 'El Cerrito', 'El Dovio', 'Florida', 'Ginebra', 'Guacarí', 'Jamundí', 'La Cumbre', 'La Unión', 'La Victoria', 'Obando', 'Palmira', 'Pradera', 'Restrepo', 'Riofrío', 'Roldanillo', 'San Pedro', 'Sevilla', 'Toro', 'Trujillo', 'Tuluá', 'Ulloa', 'Versalles', 'Vijes', 'Yotoco', 'Yumbo', 'Zarzal'] },
    { name: 'Vaupés', cities: ['Carurú', 'Mitú', 'Taraira', 'Pacoa'] },
    { name: 'Vichada', cities: ['Cumaribo', 'La Primavera', 'Puerto Carreño', 'Santa Rosalía'] },
  ];


  const handleDepartmentChange = (event) => {
    const selected = event.target.value;
    setSelectedDepartment(selected);
    setSelectedCity('');
    setSelectedMunicipality('');
    setShowCitySelect(true);
    setShowMunicipalitySelect(false);
  };

  const handleCityChange = (event) => {
    const selected = event.target.value;
    setSelectedCity(selected);
    setSelectedMunicipality('');
    setShowMunicipalitySelect(selected === 'Medellin');
  };

  const handleMunicipalityChange = (event) => {
    setSelectedMunicipality(event.target.value);
  };

  const handlePriceChange = (event) => {
    const inputValue = event.target.value;
    const regex = /^[0-9\b]+$/;
    if (inputValue === '' || regex.test(inputValue)) {
      setPrice(inputValue);
    }
  };
  
  const handleSave = async () => {
    try {
      var deliveryAddress;
      if (selectedMunicipality && selectedMunicipality !== '') {
        deliveryAddress = selectedMunicipality;
      } else {
        deliveryAddress = selectedCity;
      }

      const data = {
        department: selectedDepartment,
        city: selectedCity,
        municipality: selectedMunicipality,
        deliveryAddress: deliveryAddress, 
        deliveryPrice: price
      };

      const token = Cookies.get('token');

      if (!token) {
          console.error("Token no encontrado. No se puede actualizar el producto.");
          return;
      }

      const response = await axios.post('http://localhost:8080/api/admin/delivery/save', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(response.data.message); 
    alert('Precio de domicilio agregado correctamente!');
    window.location.reload();
} catch (error) {
    console.error('Error saving delivery price:', error);
}
};

  return (
    <div className='agregar-producto-container'>
      <div className="allin">
      <h2 className='nombenvio'>Agregar Costo de Envio</h2>
      <div className="other-departaments">
          <p className='padded-text'>Cuando los pedidos sean fuera del Valle de Aburrá y el cliente se comunique para acordar valor de envío, debes asignar el valor aquí.</p>
      </div>
      <div className="col-md-5 mb-4"> 
        <label htmlFor="departmentSelect" className="form-label htmlFor"></label>
        <select 
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          id="departmentSelect" 
          className="custom-select"
          required
        > 
          <option disabled value="">Seleccionar Departamento</option>
          {departments.map(department => (
            <option key={department.name}>{department.name}</option>
          ))}
        </select>
      </div>

      <div className={`col-md-5 mb-4 ${showCitySelect ? '' : 'hidden'}`}>
        <label htmlFor="citySelect" className="form-label htmlFor" ></label>
        <select 
          value={selectedCity}
          onChange={handleCityChange}
          id="citySelect" 
          className="custom-select"
          required
        >
          <option disabled value="">Seleccionar Ciudad</option>
          {selectedDepartment && departments.find(dep => dep.name === selectedDepartment).cities.map(city => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className={`col-md-5 mb-4 ${showMunicipalitySelect ? '' : 'hidden'}`}>
        <label htmlFor="municipalitySelect" className="form-label htmlFor"></label>
        <select 
          value={selectedMunicipality}
          onChange={handleMunicipalityChange}
          id="municipalitySelect" 
          className="custom-select"
        > 
          <option disabled value="">Seleccionar Comuna</option>
          <option>Nororiental (Popular, Santa Cruz, Manrique,Aranjuez)</option>
          <option>Noroccidental (Castilla, Doce Octubre, Robledo)</option>
          <option>Centro Oriental (Villa Hermosa, Buenos Aires, La Candelaria)</option>
          <option>Centro Occidental (Laureles-Estadio, La América, San Javier)</option>
          <option>Suroriental (Poblado)</option>
          <option>Suroccidental (Guayabal, Belén)</option>
          <option>Corregimientos (Palmitas, San Cristobal, Altavista, San Antonio, Santa Elena)</option>

        </select>
      </div>

      <div className="col-md-5 mb-4">
        <label htmlFor="priceInput" className="form-label"></label>
        <input 
          type="text"
          value={price}
          onChange={handlePriceChange}
          id="priceInput"
          className="custom-select form-control"
          placeholder="Ingrese el precio del domicilio"
          required
        />
      </div>
      <div className="domibt col-md-12 mb-4">
        <button onClick={handleSave} className="my-3 btn btn-primary" style={{ position: 'absolute', top: '100%', left: '40%', transform: 'translate(-50%, -50%)' }}>Guardar</button>
      <NavLink to={'/admin/shipmentView'}>
        <button className='btn btn-primary' style={{ position: 'absolute', top: '103%', left: '60%', transform: 'translate(-50%, -50%)' }}>Ver domicilios Registrados</button>
      </NavLink>  
      </div>
    </div>
    </div>
  );
};

export default FeeShipment;
