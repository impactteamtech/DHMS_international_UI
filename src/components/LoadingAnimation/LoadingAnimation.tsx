import React from 'react';
import '../../styles/styles.css';

const LoadingAnimation: React.FC = () => {
  return (
    <div className="loading-overlay">
      <div className="globe-container">
        <div className="globe"/>
        <div className="plane"/>
      </div>
      <p className="loading-text">Taking you to DHMS International</p>
    </div>
  );
};

export default LoadingAnimation;