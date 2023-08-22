import "./Header.css";
import { Link } from 'react-router-dom';

const Header = () => {
    return(
        <header>

            <nav>
                <Link class="nav-button" to="/">Pesquisa</Link>
                <Link class="nav-button" to="/dashboard">DashBoard</Link>
            </nav>

            <Link to="/login" class="btn-auth nav-button">Entrar</Link>
            {/* <Link to="/" class="btn-auth">Sair</Link> */}

        </header>
    )
};

export default Header;