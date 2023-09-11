import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Componentes
import Header from '../src/components/Header/Header';
import ScreenLogin from '../src/components/ScreenLogin/ScreenLogin';
import ScreenRegister from '../src/components/ScreenRegister/ScreenRegister';
import SearchProduct from '../src/components/SearchProduct/SearchProduct';
import ScreenCalculator from '../src/components/ScreenCalculator/ScreenCalculator';
/* import ProductInfo from '../src/components/ProductInfo/ProductInfo'; */
import Footer from '../src/components/Footer/Footer';

function App() {

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<SearchProduct />}/>
        <Route path="/calculatorMargin" element={<ScreenCalculator />} />
        {/* <Route path="/Info" element={<ProductInfo />} /> */}
        <Route path="/login" element={<ScreenLogin />} />
        <Route path="/register" element={<ScreenRegister />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
