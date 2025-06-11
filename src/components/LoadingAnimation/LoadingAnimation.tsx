import React from 'react';
import '../../styles/styles.css';
import {Plane} from 'lucide-react';

const LoadingAnimation: React.FC = () => {
  return (
    <div className="loading-overlay">
      <div className="globe-container">
        {/* 
         */}
         <Plane className='plane'/>
      </div>
      <p className="loading-text">Taking you to DHMS International</p>
    </div>
  );
};

export default LoadingAnimation;