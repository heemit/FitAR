import React from 'react';
import './HeaderFooter';
import '../Home.css';
import treadmill from '../treadmill.jpg';
import dumbbell from '../dumbbell.jpg';
import stretch from '../stretch.jpg';

const Home = () => {

  return (
    <div className="main-content">
      {/* Main Content */}
        <div className="product-layout">
          <div className="product-image">
            <img src={treadmill} alt="Treadmill" />
          </div>
          <div className="product-text background-one styled-text">  {/* Add styled-text */}
            <div className="text-centered left-aligned">
              <div>Elevate Your</div>
              <div>Fitness</div>
              <div>Elevate Your</div>
              <div>Style</div>
            </div>
          </div>
        </div>
        <div className="product-layout">
          <div className="product-textr background-two styled-text"> 
            <div className="text-centered right-aligned">
            <div>Build Power</div>
            <div>Build Confidence</div>
              </div>
          </div>
          <div className="product-image">
            <img src={dumbbell} alt="Dumbbell Set" />
          </div>
        </div>
        <div className="product-layout">
          <div className="product-image">
            <img src={stretch} alt="Stretch Tool" />
          </div>
          <div className="product-text background-one styled-text"> 
            <div className="text-centered left-aligned">
            <div>Stretch,</div>
              <div>Recover and</div>
              <div>Thrive</div>
              </div>
          </div>
        </div>
      </div>
  );
};

export default Home;
