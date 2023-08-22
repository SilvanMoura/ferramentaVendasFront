import "./Header.css";
const Header = () => {
    return(
        <header>

            <nav>
                <router-link class="nav-button" to="/">Pesquisa</router-link>
                <router-link class="nav-button" to="/about">DashBoard</router-link>
            </nav>

            <router-link to="/login" class="btn-auth nav-button">Entrar</router-link>
            {/* <router-link to="/" class="btn-auth">Sair</router-link> */}

        </header>
    )
};

export default Header;