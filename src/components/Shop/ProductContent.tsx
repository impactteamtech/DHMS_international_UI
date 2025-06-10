import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { fetchProducts } from '../AuthFolder/AuthFiles';
import { Home, ShoppingBag, X } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import { toast } from 'react-hot-toast'
import axios from 'axios';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

interface ProductProps {
  selectedCategory: string[];
  selectedBrand: string[];
  selectRating: number;
  priceRange: number;
  availabilityFilter: string[];
  setIsDesktopOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDesktopOpen: boolean;
}

interface Product {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  brand?: any;
  inStore?: boolean;
  colors?: string[];
}

const ProductContent: React.FC<ProductProps> = ({
  selectedCategory,
  selectedBrand,
  selectRating,
  priceRange,
  availabilityFilter
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const itemsPerPage = 10;
  const [loadingAnimation, setLoadingAnimation] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [productsDb, setProductsDb] = useState<Product[]>();
  //fetching products 

  useEffect(() => {
    const fetchData = async () => {
      setError("");
      setLoadingAnimation(true);
      try {
        const response = await fetchProducts()
        if (response.status === 200) {
          setProductsDb(response.data)

        }
        else {
          setError("unable to retrieve products try again")
        }
      }
      catch (err: any) {
        console.log("uh oh! an error occured", err);
        setError(err.message || "cannot get products")
      }
      finally {
        setLoadingAnimation(false)
      }

    }
    fetchData()
  }, [])


  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, selectRating, priceRange, availabilityFilter]);

  const filteredProducts = (productsDb ?? []).filter((product) => {
    const isCategoryMatch = selectedCategory.length === 0 || selectedCategory.includes(product.category);
    const isBrandMatch = selectedBrand.length === 0 || selectedBrand.includes(product.brand);
    const isRatingMatch = selectRating === 0 || product.rating >= selectRating;
    const isPriceMatch = product.price <= priceRange;
    const isAvailabilityMatch = availabilityFilter.length === 0 || availabilityFilter.includes(product.inStore ? 'In Stock' : 'Online');
    return isCategoryMatch && isBrandMatch && isRatingMatch && isPriceMatch && isAvailabilityMatch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const userEmail = localStorage.getItem("email")
  const openModal = (product: any) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors?.[0] || '');
  };

  const closeModal = () => {
    setSelectedProduct([]);
  };

  const handleAddToCart = async () => {
    if (selectedProduct) {
      if (!userEmail) return
      try {
        await axios.post(
          'http://localhost:8080/cart/add',
          {
            productId: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            image: selectedProduct.imageUrl,
            category: selectedProduct.category,
            rating: selectedProduct.rating,
            color: selectedColor,
            quantity: 1,
            totalPrice: selectedProduct.price,
          },
          { withCredentials: true }
        );

        toast.success('Item added to cart');
        closeModal();
      } catch (error) {
        toast.error('Failed to add to cart');
        console.error(error);
        closeModal()
      }
    }
  };
  return (
    <div className="bg-black px-4 md:px-10 py-10 text-white">

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {loadingAnimation && <LoadingAnimation />}
      <h1 className="text-3xl font-semibold text-yellow-500 text-center mb-6">Shop Your Care</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="relative group rounded overflow-hidden shadow-lg bg-white text-black">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <button
                onClick={() => openModal(product)}
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500 hover:scale-105 cursor-pointer transition"
              >
                Quick View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 w-full flex justify-center">
          <Pagination>
            <PaginationContent className="text-yellow-500 flex items-center justify-center gap-2">
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

      {/* Modal */}
      <Dialog open={!!selectedProduct} onClose={closeModal} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center w-full h-screen px-4">
          <div className="fixed inset-0 bg-black bg-opacity-70" />
          <div className="bg-white rounded-lg shadow-xl max-w-8xl w-full h-screen z-50 p-6 relative text-black">
            <button onClick={closeModal} className="absolute top-3 right-3 text-black cursor-pointer hover:text-red-500">
              <X size={32} />
            </button>

            {selectedProduct && (
              <div className="flex flex-col md:flex-row p-3 gap-8">
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="w-full  h-64 xl:h-150 object-cover rounded"
                  />
                <div className="flex flex-row justify-between mt-5 p-8 gap-6">
                  <div className='bg-slate-700 p-5 mx-auto w-full'>1</div>
                  <div className='bg-slate-700 p-5 mx-auto w-full'>2</div>
                  <div className='bg-slate-700 p-5 mx-auto w-full'>3</div>
                  <div  className='bg-slate-700 p-5 mx-auto w-full'>4</div>
                  <div  className='bg-slate-700 p-5 mx-auto w-full'>4</div>
                  <div  className='bg-slate-700 p-5 mx-auto w-full'>4</div>
                  <div  className='bg-slate-700 p-5 mx-auto w-full'>4</div>
                </div>
                </div>
                <div className="flex flex-col justify-between space-y-4 md:w-1/2">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                    <p className="text-yellow-600">{"★".repeat(selectedProduct.rating)}</p>
                    <p className="text-gray-700">{selectedProduct.category}</p>
                    <p className="text-lg font-semibold mt-2">${selectedProduct.price.toFixed(2)}</p>
                    
                    <span className='p-3 rounded border border-yellow-600 mt-5'>
                      <Home className='w-10 h-10 inline mr-1'/> 
                      Instore Available 
                    </span>
                  </div>

                  {selectedProduct.colors && (
                    <div>
                      <label className="block mb-1 font-medium">Select Color:</label>
                      <div className="flex gap-2 flex-wrap">
                        {selectedProduct.colors.map((color: string) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-3 py-1 rounded border ${selectedColor === color ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleAddToCart}
                    className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500 transition flex items-center justify-center"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductContent;
