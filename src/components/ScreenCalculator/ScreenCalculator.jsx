import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './ScreenCalculator.css';

const ScreenCalculator = () => {
    const navigate = useNavigate();

    const [code, setCode] = useState('');

    const [price, setPrice] = useState(0);
    const [logistica, setLogistica] = useState('');
    const [valorComissao, setValorComissao] = useState(0);
    const [comissaoPercent, setComissaoPercent] = useState(0);
    const [valorTarifa, setValorTarifa] = useState(0);
    const [valorNovaTarifa, setValorNovaTarifa] = useState(0);

    const [costProductSold, setCostProductSold] = useState(0);
    const [othersCosts, setOthersCosts] = useState(0);
    const [miscellaneousCosts, setMiscellaneousCosts] = useState(0);

    const [unitCost, setUnitCost] = useState(0);
    const [salesEstimate, setSalesEstimate] = useState(1);
    const [netProfit, setNetProfit] = useState(0);
    const [netMargin, setNetMargin] = useState(0);

    const [sendAmazon, setSendAmazon] = useState(0);

    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (!cookie.get('_myapp_token')) {
            navigate('/login');
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get(`http://vps49161.publiccloud.com.br/api/calculatorMargin/${code}`)
            .then(response => {
                const infos = response.data;

                setPrice(infos.price);
                setLogistica(infos.logistica);
                setComissaoPercent(infos.comissaoPercent);

                const valorComissao = infos.price * (infos.comissaoPercent / 100);
                setValorComissao(valorComissao.toFixed(2));

                setValorTarifa(infos.valorTarifa);
                setValorNovaTarifa(infos.valorTarifa);

                // Calcular unitCost corretamente
                const calculatedUnitCost = (
                    parseFloat(infos.valorTarifa) +
                    parseFloat(valorComissao) +
                    parseFloat(othersCosts) +
                    parseFloat(sendAmazon)
                ).toFixed(2);
                setUnitCost(calculatedUnitCost);

                // Calcular netProfit e netMargin
                const calculatedNetProfit = (
                    parseFloat(infos.price) -
                    (parseFloat(calculatedUnitCost) * parseFloat(salesEstimate))
                ).toFixed(2);
                setNetProfit(calculatedNetProfit);

                const calculatedNetMargin = (
                    (parseFloat(calculatedNetProfit) / parseFloat(infos.price)) * 100
                ).toFixed(2);
                setNetMargin(calculatedNetMargin);
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
    };

    const handlePrice = (e) => {
        setPrice(e);
        const newValueComissao = (e * (comissaoPercent / 100)).toFixed(2);
        setValorComissao(newValueComissao);
        
        // Calcular o novo valor de unitCost corretamente
        const newUnitCost = (e * parseFloat( (comissaoPercent)/100 )) + parseFloat(valorNovaTarifa) + parseFloat(othersCosts);
        setUnitCost(newUnitCost.toFixed(2));
    
        // Calcular o novo valor de netProfit corretamente
        const newNetProfit = (e - newUnitCost).toFixed(2);
        setNetProfit(newNetProfit);
            
        // Calcular o novo valor de netMargin corretamente
        const newNetMargin = ((newNetProfit/e)*100).toFixed(2);
        setNetMargin(newNetMargin);
    };

    const handleTarifa = (e) => {
        setSendAmazon(e);
        const newValueTarifa = (parseFloat(valorTarifa) + parseFloat(e)).toFixed(2);
        setValorNovaTarifa(newValueTarifa);

        // Calcular o novo valor de unitCost corretamente
        const newUnitCost = ( parseFloat(price) * parseFloat( (comissaoPercent)/100 )) + parseFloat(valorTarifa) + parseFloat(e) + parseFloat(othersCosts);
        setUnitCost(newUnitCost.toFixed(2));
    
        // Calcular o novo valor de netProfit corretamente
        const newNetProfit = (parseFloat(price) - newUnitCost).toFixed(2);
        setNetProfit(newNetProfit);
            
        // Calcular o novo valor de netMargin corretamente
        const newNetMargin = ((newNetProfit/parseFloat(price))*100).toFixed(2);
        setNetMargin(newNetMargin);
    };

    const handleOthersCosts = (e, setState) => {
        setState(e);
        
        if( setState == setCostProductSold){
            const costProductSoldFloat = parseFloat(e);
            const miscellaneousCostsFloat = parseFloat(miscellaneousCosts); 

            const result = (costProductSoldFloat + miscellaneousCostsFloat).toFixed(2); // Limita o resultado a duas casas decimais
            setOthersCosts(result);
            
            // Calcular o novo valor de unitCost corretamente
            const newUnitCost = ( parseFloat(price) * parseFloat( (comissaoPercent)/100 )) + parseFloat(valorNovaTarifa) + parseFloat(result);
            setUnitCost(newUnitCost.toFixed(2));

            // Calcular o novo valor de netProfit corretamente
            const newNetProfit = (parseFloat(price) - newUnitCost).toFixed(2);
            setNetProfit(newNetProfit);
                
            // Calcular o novo valor de netMargin corretamente
            const newNetMargin = ((newNetProfit/parseFloat(price))*100).toFixed(2);
            setNetMargin(newNetMargin);
            
        }else{
            const costProductSoldFloat = parseFloat(costProductSold);
            const miscellaneousCostsFloat = parseFloat(e);

            const result = (costProductSoldFloat + miscellaneousCostsFloat).toFixed(2); // Limita o resultado a duas casas decimais
            setOthersCosts(result);
            
            // Calcular o novo valor de unitCost corretamente
            const newUnitCost = ( parseFloat(price) * parseFloat( (comissaoPercent)/100 )) + parseFloat(valorNovaTarifa) + parseFloat(result);
            setUnitCost(newUnitCost.toFixed(2));

            // Calcular o novo valor de netProfit corretamente
            const newNetProfit = (parseFloat(price) - newUnitCost).toFixed(2);
            setNetProfit(newNetProfit);
                
            // Calcular o novo valor de netMargin corretamente
            const newNetMargin = ((newNetProfit/parseFloat(price))*100).toFixed(2);
            setNetMargin(newNetMargin);
        }

        

    };

    const handleSalesEstimate = (e) => {
        setSalesEstimate(e);

        const calculatedNetProfit = ( (parseFloat(price)-parseFloat(unitCost)) * parseFloat(e) ).toFixed(2);
        setNetProfit(calculatedNetProfit);
    }

    return (
        <div>
            <div id="main-container">
                <main className="form-signin w-100 m-auto">
                    <form onSubmit={handleSubmit}>
                        <h1 className="h3 mb-3 fw-normal">Pesquisar produto para cálculo</h1>

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

            </div>

                <div id="logistics-container">
                    <div id="logistics-container" className="amazon-calculator">

                        <div className="logistics-title">
                            <label>
                                <span>
                                    FBA - Logística da Amazon
                                </span>
                            </label>
                        </div>

                        <div className="logistics-item">
                            <div>
                                <span className="logistics-text"> Preço do item </span>
                            </div>
                            <div>
                                <span>R$ </span>
                                <input
                                    className="logistics-input"
                                    value={price}
                                    onChange={(e) => handlePrice(e.target.value)}
                                    type="number"
                                />
                            </div>

                        </div>

                        <div className="logistics-item">
                            <div>
                                <span className="logistics-text">Tarifas da Amazon</span>
                            </div>
                            <div>
                                <span className="logistics-text">R$ {valorComissao}</span>
                            </div>
                        </div>

                        <div className="logistics-item">
                            <div>
                                <span className="logistics-text">Custo de Logística</span>
                            </div>
                            <div>
                                <span className="logistics-text">R$ {valorNovaTarifa}</span>
                            </div>
                        </div>

                        <div className="logistics-item">
                            <div>
                                <span className="logistics-text sub-text"> Enviar para a Amazon </span>
                            </div>
                            <div>
                                <span>R$ </span>
                                <input
                                    className="logistics-input"
                                    value={sendAmazon}
                                    onChange={(e) => { handleTarifa(e.target.value) }}
                                    type="number"
                                />
                            </div>

                        </div>

                        {/* <div class="logistics-item">
                            <div>
                                <span class="logistics-text">Custo de Armazenamento</span>
                            </div>
                            <div>
                                <span class="logistics-text">R$ 0.01</span>
                            </div>
                        </div>

                        <div class="logistics-item">
                            <div class="logistics-item-title">
                                <span class="logistics-text sub-text">Custo mensal de arm. por unidade</span>
                            </div>
                            <div class="logistics-item-value">
                                <span class="logistics-text">R$ 0.01</span>
                            </div>

                        </div>

                        <div class="logistics-item">
                            <div>
                                <span class="logistics-text sub-text"> Média de unidades de inventário armazenadas </span>
                            </div>
                            <div>

                                <input
                                    class="logistics-input"
                                    value="1"
                                    onChange="(e) => setPrice(e.target.value)"
                                    type="number"
                                />
                            </div>

                        </div>

                        <div class="logistics-item">
                            <div>
                                <span class="logistics-text sub-text"> Estimativa de unidades mensais vendidas </span>
                            </div>
                            <div>

                                <input
                                    class="logistics-input"
                                    value="1"
                                    onChange="(e) => setPrice(e.target.value)"
                                    type="number"
                                />
                            </div>

                        </div>

                        <div class="logistics-item">
                            <div>
                                <span class="logistics-text sub-text">Custo de arm. por unidade vendida</span>
                            </div>
                            <div>
                                <span class="logistics-text">R$ 0.01</span>
                            </div>
                        </div> */}

                        <div className="logistics-item">
                            <div>
                                <span className="logistics-text"> Outros custos</span>
                            </div>
                            <div>
                                <span className="logistics-text">R$ {othersCosts}</span>
                            </div>
                        </div>

                        <div className="logistics-item">
                            <div>
                                <span className="logistics-text sub-text"> Custo das mercadorias vendidas</span>
                            </div>
                            <span> R$ </span>
                            <div>

                                <input
                                    className="logistics-input"
                                    value={costProductSold}
                                    onChange={(e) => handleOthersCosts(e.target.value, setCostProductSold)}
                                    type="number"
                                />
                            </div>

                        </div>

                        <div className="logistics-item">
                            <div>
                                <span className="logistics-text sub-text"> Custo diversos </span>
                            </div>

                            <div>
                                <span> R$ </span>
                                <input
                                    className="logistics-input"
                                    value={miscellaneousCosts}
                                    onChange={(e) => handleOthersCosts(e.target.value, setMiscellaneousCosts)}
                                    type="number"
                                />
                            </div>
                        </div>

                        <div className="logistics-item">

                            <div className="logistics-sub-item">
                                <span className="logistics-sub-title">Custo por unidade</span>
                                <p className="logistics-sub-value">R$ {unitCost}</p>
                            </div>

                            <div className="logistics-sub-item">
                                <div>
                                    <span className="logistics-sub-title"> Estimativa de vendas </span>
                                </div>
                                <div>
                                    <input
                                        className="logistics-input logistics-input-alt"
                                        value={salesEstimate}
                                        onChange={(e) => handleSalesEstimate(e.target.value)}
                                        type="number"
                                    />
                                </div>
                            </div>
                            
                            <div className="logistics-sub-item">
                                <span className="logistics-sub-title"> Lucro líquido </span>
                                <p className="logistics-sub-value w-alt">R$ {netProfit}</p>
                            </div>

                            <div className="logistics-sub-item">
                                <span className="logistics-sub-title"> Margem líquida </span>
                                <p className="logistics-sub-value">{netMargin}%</p>
                            </div>
                        </div>

                    </div>

                </div>

        </div >

    );
};

export default ScreenCalculator;
