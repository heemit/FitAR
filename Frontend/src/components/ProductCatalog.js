import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './HeaderFooter.js';
import '../Home.css';

const ProductCatalog = ({ wishlist, setWishlist }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products');
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const searchTerm = location.state?.searchTerm || '';
    const category = location.state?.category || '';
    const subcategory = location.state?.subcategory || '';

    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase().split(' ').join(''));
      const matchesCategory = category ? product.category === category : true;
      const matchesSubcategory = subcategory ? product.subcategory === subcategory : true; // Assuming products have a 'subcategory' field
      return matchesSearch && matchesCategory && matchesSubcategory;
    });

    setFilteredProducts(filtered);
  }, [location.state, products]);

  const addToCart = async (product) => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    if (!loggedIn) {
      alert('Please log in to add items to your cart.');
      return;
    }
  
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      alert('User email not found');
      return;
    }
  
    try {
      await axios.post('http://localhost:5000/cart/add', {
        userId: userEmail,
        productId: product._id,
        quantity: 1, // or the desired quantity
        price: product.price,
        name: product.name,
        imageUrl: product.imageUrl,
      });
      alert(`Product ${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleProductClick = (product) => {
    if (product && product._id) {
      navigate(`/product/${product._id}`);
    } else {
      console.error('Product ID is undefined:', product);
    }
  };

  const handleARView = (e, product) => {
    e.stopPropagation();
    navigate(`/ar-equipment`, { state: { selectedModel: product.name } });
  };

  return (
    <div>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-item" onClick={() => handleProductClick(product)}>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="product-image" 
                style={{ width: '200px', height: '200px' }} 
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>Price: ₹{product.price}</p>
                <button className="add-to-cart-button" onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}>
                  Add to Cart
                </button>
              </div>
              <div className="product-icons">
                <span 
                  className="wishlist-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setWishlist((prev) => {
                      if (prev.includes(product._id)) {
                        return prev.filter(id => id !== product._id);
                      } else {
                        return [...prev, product._id];
                      }
                    });
                  }}
                  onMouseEnter={(e) => e.currentTarget.textContent = '👍'}
                  onMouseLeave={(e) => e.currentTarget.textContent = wishlist.includes(product._id) ? '❤️' : '🖤'}
                >
                  <span role="img" aria-label="wishlist">{wishlist.includes(product._id) ? '❤️' : '🖤'}</span>
                </span>
                <span className="camera-icon" onClick={(e) => handleARView(e, product)}>
                  <span role="img" aria-label="camera">📷</span>
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
