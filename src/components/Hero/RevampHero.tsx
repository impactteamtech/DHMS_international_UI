import React from 'react';
import OffsetLink from '../Handler/OffsetLink';
import heroPic from '../../assets/hero.png';

const RevampHero: React.FC = () => {
  return (
    <section className="w-full bg-[#d5a86b] mt-12 px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 items-center max-w-8xl mx-auto font-raleway">
      
      {/* Left Column - Text */}
      <div className="flex flex-col items-center md:items-end justify-center text-center md:text-right px-4 space-y-6">
        <div className="max-w-md">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[satisfy] text-white leading-tight">
            Where Culture Meets Beauty
          </h1>
          <p className="text-md sm:text-lg text-white mt-4">
            Unearth timeless fashion, luminous beauty, and care inspired by heritage.
          </p>
          <OffsetLink 
            to="/shop#top"
            className="inline-block mt-6 px-6 py-2 rounded-xl bg-white text-black text-sm sm:text-base font-semibold border border-white hover:scale-105 transition-transform"
          >
            Shop Now
          </OffsetLink>
        </div>
      </div>

      {/* Right Column - Hero Image */}
      <div className="flex justify-center items-center mt-12 md:mt-0">
        <img 
          src={heroPic} 
          alt="hero" 
          className="w-64 sm:w-80 md:w-[26rem] object-contain"
        />
      </div>
      
    </section>
  );
};

export default RevampHero;
