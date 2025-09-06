// import React, {useState} from 'react';
// import axios from 'axios';

interface Product {
  id: string | number;
  name: string;
  price?: number;
  imageUrl: string;
  category: string;
  rating: number;
  brand?: any;
  inStore?: boolean;
  colors?: string[];
}

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

// const API_URL = import.meta.env.VITE_API_URL;

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 px-3 md:px-0">
      {products.map((product, index) => (
        <div
          key={`${product.id}-${index}`}
          className="group bg-white shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-gray-100 hover:shadow relative"
        >

          {/* Image */}
          <div className="relative w-full h-[440px] sm:h-[500px] rounded-t-2xl overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-top transition-transform duration-500 group-hover:scale-105"
            />

            {product.inStore && (
              <span className="absolute top-2 left-2 bg-[#f3cb50] text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                In Store
              </span>
            )}

            {/* Overlay Button */}
            <div className="
  absolute inset-0 
  opacity-100       
  flex items-center justify-center
  transition-opacity duration-300

  lg:bg-black/10  
  lg:backdrop-blur-md
  lg:opacity-0  
  lg:group-hover:opacity-100">
              <button
                type="button"
                onClick={() => onProductClick(product)}
                className="bg-white text-[#2f2a28] text-xs px-4 cursor-pointer py-1.5 rounded-full font-semibold shadow hover:bg-[#f3cb50] hover:text-black transition"
              >
                Quick View
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="p-3 space-y-2">
            <h3 className="text-sm font-semibold truncate text-[#2f2a28] leading-tight">
              {product.name}
            </h3>

            {typeof product.price === 'number' && (
              <p className="text-sm text-[#a67c52] font-bold tracking-wide">
                ${product.price.toFixed(2)}
              </p>
            )}


            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={`${product.id}-star-${i}`}
                  className={`text-xs ${i < product.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>

            {!!product.colors?.length && (
              <div className="flex gap-1 mt-1">
                {product.colors.map((color, i) => (
                  <span
                    key={`${product.id}-color-${color ?? 'x'}-${i}`}
                    className="w-3.5 h-3.5 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}

            <p className="text-[10px] text-gray-400 mt-1 truncate">{product.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
