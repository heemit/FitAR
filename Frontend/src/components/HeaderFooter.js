import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Home.css';
import FitAR_logo from '../FitAR Logo.png';

const HeaderFooter = ({ children, wishlist, products }) => {
  const navigate = useNavigate();
  const [showWishlistDropdown, setShowWishlistDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    setLoggedIn(isLoggedIn);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate('/ProductCatalog', { state: { searchTerm } });
  };

  const handleMenuClick = (category, subcategory = null) => {
    navigate('/ProductCatalog', { state: { category, subcategory } });
  };

  const handleProfileClick = () => {
    if (loggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const categories = [
    {
      name: 'Flexibility & Recovery',
      subcategories: ['Foam Rollers', 'Resistance Bands', 'Yoga Mats', 'Massage Guns']
    },
    {
      name: 'Bodyweight',
      subcategories: ['Pull-up Bars', 'Dip Stations', 'Push-up Bars', 'Ab Wheels']
    },
    {
      name: 'Cardio',
      subcategories: ['Treadmills', 'Stationary Bikes', 'Stair Climbers', 'Boxing Machines']
    },
    {
      name: 'Strength',
      subcategories: ['Dumbbells', 'Kettlebells', 'Barbells & Weight Plates', 'Power Racks']
    },
    {
      name: 'Functional Training',
      subcategories: ['Battle Ropes', 'Medicine Balls', 'Suspension Trainers (TRX)', 'Plyometric Boxes']
    },
    {
      name: 'Wearable Technology',
      subcategories: ['Fitness Trackers', 'Heart Rate Monitors', 'Smartwatches', 'GPS Devices']
    }
  ];

  return (
    <div className="homepage">
      {/* Header with Logo, Search, and Icons */}
      <header className="header">
        <Link to="/" className="logo"><img src={FitAR_logo} alt="FitAR" /></Link>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search For Items"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>
        <div className="icons">
          {/* Wishlist Icon */}
          <div
            className="wishlist-icon cursor-pointer"
            onMouseEnter={() => setShowWishlistDropdown(true)}
            onMouseLeave={() => setShowWishlistDropdown(false)}
          >
            <span role="img" aria-label="wishlist">🖤</span>
            {showWishlistDropdown && (
              <ul className="wishlist-dropdown">
                {wishlist.length > 0 ? (
                  wishlist.map((itemId) => {
                    const product = products.find(p => p.id === itemId);
                    return (
                      <li key={itemId}>
                        {product ? product.name : 'Product not found'}
                      </li>
                    );
                  })
                ) : (
                  <li>No items in wishlist</li>
                )}
              </ul>
            )}
          </div>

          {/* Cart Icon */}
          <div
            className="cart-icon cursor-pointer"
            onClick={() => navigate('/cart')}
            onMouseEnter={(e) => {
              const cartText = document.createElement('span');
              cartText.textContent = 'Cart';
              cartText.className = 'cart-text';
              e.currentTarget.appendChild(cartText);
            }}
            onMouseLeave={(e) => {
              const cartText = e.currentTarget.querySelector('.cart-text');
              if (cartText) e.currentTarget.removeChild(cartText);
            }}
          >
            <span role="img" aria-label="cart">🛒</span>
          </div>

          {/* Account Icon */}
          <div
            className="account-icon cursor-pointer"
            onMouseEnter={() => setShowAccountDropdown(true)}
            onMouseLeave={() => setShowAccountDropdown(false)}
          >
            <span role="img" aria-label="account">👤</span>
            {showAccountDropdown && (
              <ul className="account-dropdown" style={{ right: 0 }}>
                <li onClick={handleProfileClick}>My Profile</li>
                <li onClick={() => navigate('/orders')}>My Orders</li>
              </ul>
            )}
          </div>
        </div>
      </header>

      <nav className="navbar">
    <ul>
      {categories.map(category => (
        <li className="dropdown-parent" key={category.name}>
          <div onClick={() => handleMenuClick(category.name)}>{category.name}</div>
          <ul className="dropdown">
            {category.subcategories.map(subcategory => (
              <li key={subcategory} onClick={() => handleMenuClick(category.name, subcategory)}>
                {subcategory}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </nav>

      {/* Content Section */}
      <main>
        {children}
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
            &copy; 2024 FitAR. All rights reserved.
        </div>
        <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
};

export default HeaderFooter;