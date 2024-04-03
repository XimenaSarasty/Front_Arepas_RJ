import React from 'react';
import "../assets/Style.css";

const Footer = () => {
  return (
    <div className='footerdm'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
               
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">&copy; 2024 Arepas RJ</a>
              </li>
            </ul>
          </div>
          <div className="logs">
            <a href="https://www.facebook.com"target='_blank'><img className="logop" src="/src/image/logface.png" alt="logo-facebook" /></a>
            <a href="https://www.instagram.com" target='_blank'><img className="instagram-logo" src="/src/image/iglog.png" alt="logo-instagram" /></a>
            <a href="https://www.tiktok.com/es/" target='_blank'><img className="logop" src="/src/image/tiklog.png" alt="logo-tiktok" /></a>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Footer;

