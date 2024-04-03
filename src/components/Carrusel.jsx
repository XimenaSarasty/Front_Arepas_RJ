import "../assets/Style.css";
import Products from './../pages/Products';

const Carrusel = () => {
  return (
    <div id="carouselslidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
      <div className="carousel-inner">
        <div className="carousel-item active">
        <a href="/">  
          <img src="/src/image/arepaa.png" className="d-block w-50" alt="Arepa-1" />
          <div className="carousel-caption">
            <p className="description">¡Preparate para saborear</p>

            <p className="description">nuestros exquisitos productos!</p>
          </div>
          </a>
        
        </div>
        <div className="carousel-item">
        <a href="/">
          <img src="/src/image/arepp.jpg" className="d-block w-50" alt="arepa-2" />
          <div className="carousel-caption">
            <p className="description">¡Preparate para saborear</p>
            <p className="description">Nuestros exquisitos productos!</p>
          </div>
          </a>
        </div>
        <div className="carousel-item">
        <a href="/">
          <img src="/src/image/arepap.jpg" className="d-block w-50" alt="arepa-3" />
          <div className="carousel-caption">
            <p className="description">¡Preparate para saborear</p>
            <p className="description">nuestros exquisitos productos!</p>
          </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Carrusel;

