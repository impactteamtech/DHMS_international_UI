import React from 'react';
import OffsetLink from '../Handler/OffsetLink';
import heroPic from '../../assets/hero.png';

const RevampHero: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full mx-auto bg-[#d5a86b] p-8 max-w-8xl items-center">
      
      {/* Left Column - Text Content */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center px-4 ">
        <div className='space-y-4 flex pl-32 text-center text-nowrap flex-col items-center'>
        <h1 className="text-5xl md:text-7xl font-[satisfy] text-white">
          Where Culture Meets Beauty
        </h1>
        <p className="text-lg text-white max-w-md">
          Unearth timeless fashion, luminous beauty, and care inspired by heritage
        </p>
        <OffsetLink 
          to="/shop#top" 
          className="text-base mt-4 rounded-xl sm:text-lg px-6 sm:px-8 py-2 bg-white border border-white text-black font-raleway cursor-pointer hover:scale-105 transition-transform"
        >
          Shop Now
        </OffsetLink>

        </div>
      </div>

      {/* Right Column - Image */}
      <div className="flex justify-center items-center mt-10 md:mt-0 mask-b-from-50% mask-radial-[50%_90%] mask-radial-from-80%">
        <img 
          src={heroPic} 
          alt="hero" 
          className="w-80 h-130 md:w-[26rem] border-none object-contain"
        />
      </div>

    </div>
  );
};

export default RevampHero;
