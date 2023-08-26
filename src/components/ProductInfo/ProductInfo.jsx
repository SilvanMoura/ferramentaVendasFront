import React from 'react';
import "./ProductInfo.css";

const ProductInfo = ({ title, content }) => {
    return (
        <div className='product-container'>
            <div>
                <h5>{title}</h5>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default ProductInfo;
