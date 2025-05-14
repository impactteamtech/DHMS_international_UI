import React, { useState, useEffect } from 'react';
import { ProductsDb } from './ProductDb';
import { ShoppingBag } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
interface ProductProps {
  selectedCategory: string[];
  selectedBrand: string[];
  selectRating: number;
  priceRange: number;
  availabilityFilter: string[];
}

const ProductContent: React.FC<ProductProps> = ({
  selectedCategory,
  selectedBrand,
  selectRating,
  priceRange,
  availabilityFilter,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [selectedCategory, selectedBrand, selectRating, priceRange, availabilityFilter]);

  const filteredProducts = ProductsDb.filter((product) => {
    const isCategoryMatch =
      selectedCategory.length === 0 || selectedCategory.includes(product.category);

    const isBrandMatch =
      selectedBrand.length === 0 || selectedBrand.includes(product.brand);

    const isRatingMatch =
      selectRating === 0 || product.rating >= selectRating;

    const isPriceMatch = product.price <= priceRange;

    const isAvailabilityMatch =
      availabilityFilter.length === 0 ||
      availabilityFilter.includes(product.inStore ? 'In Stock' : 'Online');

    return (
      isCategoryMatch &&
      isBrandMatch &&
      isRatingMatch &&
      isPriceMatch &&
      isAvailabilityMatch
    );
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const pushToCart = (product: any) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      description: product.description, // add more if needed
      category: product.category,
      rating: product.rating,
      quantity: 1,
      totalPrice: product.price,
    }));
  };
  

  return (
    <div className="flex flex-col items-center justify-center bg-black px-2 md:px-6">
      <h1 className="text-3xl sm:text-4xl font-raleway text-yellow-500 py-4 text-center">Shop Your Care</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 w-full max-w-8xl">
        {paginatedProducts.length === 0 ? (
          <div className="col-span-full bg-white text-black p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold">No Products Found</h2>
            <p>Please adjust your filters.</p>
          </div>
        ) : (
          paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white text-black p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md flex flex-col items-center transition"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 sm:h-48 object-cover rounded-md mb-2 sm:mb-3"
              />
              <h2 className="text-base sm:text-lg font-semibold text-center">{product.name}</h2>
              <p className="text-xs sm:text-sm text-gray-600">{product.category}</p>
              <p className="text-yellow-500 text-sm mb-1">{"★".repeat(product.rating)}</p>
              <p className="text-black font-medium text-sm sm:text-base">${product.price.toFixed(2)}</p>
              <button onClick={() => pushToCart(product)} className="bg-[#ccb068] text-white cursor-pointer px-3 sm:px-4 py-2 rounded-lg mt-2 sm:mt-3 hover:scale-105 transition-transform flex items-center">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart
              </button>
              <p className="text-xs text-red-500 mt-1">In Store Pick Up</p>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 w-full flex justify-between">
          <Pagination>
            <PaginationContent className="text-[#ccb068] flex items-center justify-center gap-2">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                  }}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === index + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(index + 1);
                    }}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ProductContent;
