import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.error('Product ID is undefined');
        return;
      }
      
      try {
        const res = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = (product) => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    if (!loggedIn) {
      alert('Please log in to add items to your cart.');
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    existingCart.push(product);
    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    
    alert(`Product ${product.name} added to cart!`);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <p>Price: ₹{product.price}</p>
      <p>{product.description}</p>
      <button className="add-to-cart-button" onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductPage;
