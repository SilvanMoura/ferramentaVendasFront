import React, { useState } from 'react';
import axios from 'axios';
import './SearchProduct.css';

const SearchProduct = () => {
    const [code, setCode] = useState('');
    const [productData, setProductData] = useState({
        title: '',
        price: '',
        review: '',
        reviewNumber: '',
        enviado: '',
        vendido: '',
        logistica: '',
        minEstoque: '',
        marca: '',
        dataEntrega: '',
        ASIN: '',
        data: '',
        diasOnline: '',
        rankings: [],
        mediaVendasDia: '',
        five: '',
        four: '',
        three: '',
        two: '',
        one: ''
    });
    const [msg, setMsg] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica de submissão aqui
        axios.get(`http://localhost:8000/api/scrape/${code}`)
            .then(response => {
                // Atualiza o estado productData com os dados da resposta
                setProductData(response.data);
            })
            .catch(error => {
                // Manipula erros aqui
                console.error('Erro na requisição:', error);
            });
    };

    return (
        <div id="main-container">
            <main className="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Pesquisar produto</h1>

                    {/* Mostrar a mensagem (msg) aqui */}
                    {/* {msg && <Message msg={msg} />} */}

                    <div className="form-floating">

                        <input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Insira o ASIN"
                        />
                        <label htmlFor="floatingInput">ASIN</label>

                    </div>

                    <button
                        className="w-100 btn btn-lg btn-send"
                        type="submit"
                    >
                        Pesquisar
                    </button>
                </form>
            </main>

            {/* Renderizar os campos do produto */}
            <div>
                <p>{productData.title}</p>
                <p>Preço: {productData.price}</p>
                <p>Avaliação: {productData.review}</p>
                {/* E assim por diante para os outros campos */}
            </div>
        </div>
    );
};

export default SearchProduct;
