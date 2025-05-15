import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import ProductContent from './ProductContent'

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string[]>([])
  const [selectedBrand, setSelectedBrand] = React.useState<string[]>([])
  const [selectRating, setSelectRating] = React.useState<number>(0)
  const [priceRange, setPriceRange] = React.useState<number>(30.00)
  const [availabilityFilter, setAvailabilityFilter] = React.useState<string[]>([])
   const [isDesktopOpen, setIsDesktopOpen] = React.useState(true);
  return (
    <section id='shop' className="flex flex-col md:flex-row gap-4 p-4 min-h-screen mt-5 bg-black pt-36 md:pt-28 lg:pt-24">
      {/* Sidebar */}
      <div className={`bg-black text-white p-4 w-full ${isDesktopOpen ? 'md:w-1/4' : 'hidden'} `}>
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectRating={selectRating}
          setSelectRating={setSelectRating}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          availabilityFilter={availabilityFilter}
          setAvailabilityFilter={setAvailabilityFilter}
          setIsDesktopOpen={setIsDesktopOpen}
          isDesktopOpen={isDesktopOpen}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        <ProductContent
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          selectRating={selectRating}
          priceRange={priceRange}
          availabilityFilter={availabilityFilter}
          setIsDesktopOpen={setIsDesktopOpen}
          isDesktopOpen={isDesktopOpen}
        />
      </div>
    </section>
  )
}

export default Shop
