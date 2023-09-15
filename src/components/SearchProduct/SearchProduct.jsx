import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import ProductInfo from '../ProductInfo/ProductInfo';
import { useNavigate } from 'react-router-dom';
import './SearchProduct.css';

const SearchProduct = () => {

    const navigate = useNavigate();

    const [code, setCode] = useState('');
    const [disabledButton, setDisabledButton] = useState(false);
    const [actionButton, setActionButton] = useState("Pesquisar");
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
        offers: ''
    });

    const [msg, setMsg] = useState('');

    const[showInfo, setShowInfo] = useState(false);

    useEffect(()=>{
        if(!cookie.get('_myapp_token')){
          navigate('/login');
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        setShowInfo(false);
        setDisabledButton(true);
        setActionButton("Processando");
        
        axios.get(`http://vps49161.publiccloud.com.br/api/scrape/${code}`)
            .then(response => {
                console.log(response.data)
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
                setDisabledButton(false);
                setActionButton("Pesquisar");
                
            })
            .catch(error => {
                setShowInfo(false);
                setDisabledButton(false);
                setActionButton("Pesquisar");
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
                            disabled={disabledButton}
                        >
                            {actionButton}
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
                <ProductInfo title="Quantidade de vendedores para o produto"  content={productData.offers} />
                <ProductInfo title="Média de vendas por dia" content={productData.mediaVendasDia} />
                <ProductInfo title="Rankings do item" content={productData.rankings}/>
                <ProductInfo title="Quantidade das estrelas em %"  content={productData.stars} />
            </div>
            }
            
        </div>
        
    );
};

export default SearchProduct;
