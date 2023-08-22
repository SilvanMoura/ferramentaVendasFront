import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Componentes
import Header from '../src/components/Header';
import ScreenLogin from '../src/components/ScreenLogin';
import ScreenRegister from '../src/components/ScreenRegister';
import SearchProduct from '../src/components/SearchProduct';
import ProductInfo from '../src/components/ProductInfo';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route path="/login" component={ScreenLogin} />
          <Route path="/register" component={ScreenRegister} />
          <Route path="/search" component={SearchProduct} />
          <Route path="/Info" component={ProductInfo} />
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
