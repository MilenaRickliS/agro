import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../assets/logoAgrariaN.png'

function Header() {
  return (
    <header>         
        <nav id="navbar">
        <ul className="navbar-items flexbox-col">
            <li className="navbar-logo flexbox-left">
            <Link to='/' className="link-header navbar-item-inner flexbox">
                <img src={logo} alt="logo do sistema" width={60} height={60}/>
            </Link>
            </li>
            <li className="navbar-item flexbox-left">
            <Link to='/' className="link-header navbar-item-inner flexbox-left">
                <div className="navbar-item-inner-icon-wrapper flexbox">
                <ion-icon name="home-outline"></ion-icon>
                </div>
                <span className="link-text">Início</span>
            </Link>
            </li>
            <li className="navbar-item flexbox-left">
            <Link to='/cadastro' className=" link-header navbar-item-inner flexbox-left">
                <div className="navbar-item-inner-icon-wrapper flexbox">
                <ion-icon name="people-outline"></ion-icon>
                </div>
                <span className="link-text">Clientes</span>
            </Link>
            </li>
            <li className="navbar-item flexbox-left">
            <Link to='/noticias' className="link-header navbar-item-inner flexbox-left">
                <div className="navbar-item-inner-icon-wrapper flexbox">
                <ion-icon name="newspaper-outline"></ion-icon>
                </div>
                <span className="link-text">Noticias</span>
            </Link>
            </li>
            <li className="navbar-item flexbox-left">
            <Link to='/ajuda' className="link-header navbar-item-inner flexbox-left">
                <div className="navbar-item-inner-icon-wrapper flexbox">
                <ion-icon name="chatbubbles-outline"></ion-icon>
                </div>
                <span className="link-text">Ajuda?</span>
            </Link>
            </li>
            <li className="navbar-item flexbox-left">
            <Link to ='/conta' className="link-header navbar-item-inner flexbox-left">
                <div className="navbar-item-inner-icon-wrapper flexbox">
                <ion-icon name="settings-outline"></ion-icon>
                </div>
                <span className="link-text">Conta</span>
            </Link>
            </li>
        </ul>
        </nav>
    </header>
  );
}

export default Header;