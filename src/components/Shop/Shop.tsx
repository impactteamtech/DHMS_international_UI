import React, { useEffect, useState } from 'react';
import ProductContent from './ProductContent';
import { useLocation } from 'react-router-dom';

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [selectRating, setSelectRating] = useState<number>(0);
  const [order, setOrder] = useState<string>('Price: Low to High'); // default sort
  const [availabilityFilter, setAvailabilityFilter] = useState<string[]>([]);
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);

  const location = useLocation();
  const categoryFromHeader = location.state?.category;

  useEffect(() => {
    if (categoryFromHeader) {
      setSelectedCategory([categoryFromHeader]);
    }
  }, [categoryFromHeader]);

  return (
    <section
      id="shop"
      className="p-4 min-h-screen mt-12 overflow-hidden bg-[#fdf9f3] pt-36 md:pt-28 lg:pt-24"
    >
      <div className="flex-1 p-4">
        <ProductContent
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectRating={selectRating}
          setSelectRating={setSelectRating}
          order={order}
          setOrder={setOrder}
          availabilityFilter={availabilityFilter}
          setAvailabilityFilter={setAvailabilityFilter}
          isDesktopOpen={isDesktopOpen}
          setIsDesktopOpen={setIsDesktopOpen}
        />
      </div>
    </section>
  );
};

export default Shop;
