import React from 'react';
import './ScreenCalculator.css';
import SearchProduct from '../SearchProduct/SearchProduct';

const ScreenCalculator = () => {



    /* const handleSubmit = (event) => {
        event.preventDefault();
        
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
                
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
    }; */


    return (
        <div>
            <SearchProduct />

            {/* {showInfo &&
                <div id='product-container'>

                </div>
            } */}
            
        </div>
        
    );
};

export default ScreenCalculator;
