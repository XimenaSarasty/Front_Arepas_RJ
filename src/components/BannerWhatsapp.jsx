import LogoWhatsapp from "../image/logo-whatsapp.svg";

const BannerWhatsapp = () => {

  return (
    <div className="logo-whatsapp" >
      <a href="https://wa.me/573017893658?text=Hola, necesito ayuda con mi solicitud en ArepasRJ" 
       target="_blank" rel="noopener noreferrer">
        <img src={LogoWhatsapp} alt="Logo WhatsApp"/>
      </a>
    </div>
  );
};

export default BannerWhatsapp;

