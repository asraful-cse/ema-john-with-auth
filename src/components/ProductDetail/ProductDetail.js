import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams()
    const [product, setProduct] =  useState({});
    useEffect(() => {
        fetch('https://floating-coast-56810.herokuapp.com/products/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data));
    }, [productKey])

    return (
        <div>
            <h2>Your Product Details:</h2>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;