import React, { useState, useEffect } from 'react';
import "./Header.css";
import cookie from "js-cookie";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const [show, setShow] = useState(true);

    useEffect(() => {
        cookie.get('_myapp_token') ? setShow(true) : setShow(false);
    }, []);

    const destroyToken = () => {
        cookie.remove('_myapp_token');
        window.location.href = "/";
    };

    return (
        <header>

            {show ? (
                <>
                    <nav>
                        <Link className="nav-button" to="/">Pesquisa</Link>
                        <Link className="nav-button" to="/calculatorMargin">Calcular margem</Link>
                        {/* <Link className="nav-button" to="/dashboard">DashBoard</Link> */}
                    </nav>

                    <Link to="/" className="btn-auth nav-button" onClick={destroyToken} >Sair</Link>
                </>
            ) : (
                
                <Link to="/login" className="btn-auth nav-button">Entrar</Link>
            )}
        </header>
    );
};

export default Header;
