import React from 'react'
import Hero from '../Hero/Hero'
import Categories from '../Categories/Categories'
import Testimonials from '../Testimonials/Testimonials'
import Banner from '../Banner/Banner'


const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen pt-36 md:pt-28 lg:pt-24">
      <main className="flex-grow">
        <Hero />
        <Categories />
        <Banner/>
        <Testimonials/>
      
     
      </main>
    </div>
  );
}

export default Home;