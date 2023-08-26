import React, { useState } from 'react';
import axios from 'axios';
import ProductInfo from '../ProductInfo/ProductInfo';
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
        stars: '',
    });

    const [msg, setMsg] = useState('');

    const[showInfo, setShowInfo] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.get(`http://localhost:8000/api/scrape/${code}`)
            .then(response => {
                
                if (response.data.rankings !== "Não encontrado") {
                    response.data.rankings = response.data.rankings.map((item, index) => (
                        <p key={index}>Nº {item} </p>
                    ));
                }

                response.data.stars = response.data.stars.map((item, index) => (
                    <p key={index}>{item}</p>
                ));
                    
                setProductData(response.data);

                setShowInfo(true);
                
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
    };

    return (
        <div>
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
            
            
            </div> 

            {showInfo &&
            <div id='product-container'>
                <ProductInfo title="Título" content={productData.title} />
                <ProductInfo title="Preço" content={productData.price} />
                <ProductInfo title="Review" content={productData.review} />
                <ProductInfo title="Número de reviews" content={productData.reviewNumber} />
                <ProductInfo title="Quem envia" content={productData.enviado} />
                <ProductInfo title="Quem vende" content={productData.vendido} />
                <ProductInfo title="Tipo de logistica" content={productData.logistica} />
                <ProductInfo title="Quantidade em estoque" content={productData.minEstoque} />
                <ProductInfo title="Marca" content={productData.marca} />
                <ProductInfo title="Data inicial de entrega" content={productData.dataEntrega} />
                <ProductInfo title="ASIN" content={productData.ASIN} />
                <ProductInfo title="Data de publicação do anúncio" content={productData.data} />
                <ProductInfo title="Tempo de existencia do anúncio" content={productData.diasOnline} />
                <ProductInfo title="Rankings do item" content={productData.rankings}/>
                <ProductInfo title="Média de vendas por dia" content={productData.mediaVendasDia} />
                <ProductInfo title="Quantidade das estrelas em %"  content={productData.stars} />
            </div>
            }
            
        </div>
        
    );
};

export default SearchProduct;
