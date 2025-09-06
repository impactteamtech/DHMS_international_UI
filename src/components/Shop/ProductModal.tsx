import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import { X } from 'lucide-react';

interface Product {
  id: string | number;
  name: string;
  price?: number;
  imageUrl: string;
  category: string;
  rating: number;
  brand?: string;
  inStore?: boolean;
  colors?: string[];
  description?: string;
  size?: string[];
}

interface ProductModalProps {
  onClose: () => void;
  product: Product;
  onAddToCart: (item: any) => void | Promise<void>;
  username?: string;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (product?.colors?.length) {
      setSelectedColor(product.colors[0]);
    } else {
      setSelectedColor('');
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (loading) return;
    if (product.size?.length && !size) {
      toast.error('Please select a size');
      return;
    }
    if (product.colors?.length && !selectedColor) {
      toast.error('Please select a color');
      return;
    }
    const price = Number(product.price);
    if (!Number.isFinite(price) || price <= 0) {
      toast.error('This product is not available yet.');
      return;
    }
    try {
      setLoading(true);
      const t = toast.loading('Adding to cart…');
      await Promise.resolve(
        onAddToCart({
          id: product.id,
          _id: (product as any)._id,
          name: product.name,
          price,
          brand: product.brand,
          imageUrl: product.imageUrl,
          category: product.category,
          rating: product.rating,
          color: selectedColor,
          quantity: 1,
          totalPrice: price,
          size,
        })
      );
      toast.dismiss(t);
     
      navigate('/cart');
    } catch {
      toast.error('Could not add to cart');
    } finally {
      setLoading(false);
    }
  };

  const stars = Math.max(0, Math.min(5, Math.round(product.rating || 0)));
  const priceDisplay = Number(product.price) || 0;

  return (
    <Dialog open={!!product} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      {loading && <LoadingAnimation />}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-40" />
        <div className="relative z-50 bg-[#fef5e5] rounded-xl overflow-hidden shadow-4xl w-full max-w-5xl">
          <div className="bg-[#D4AF37] py-3 text-center">
            <h2 className="text-4xl font-[satisfy] text-black tracking-wider">{product.name}</h2>
          </div>
          <div className="p-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2 flex-shrink-0">
              <img src={product.imageUrl} alt={product.name} className="rounded-lg object-cover w-full h-full" />
            </div>
            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <p className="uppercase text-xs text-gray-600 mb-1">{product.brand}</p>
                <h3 className="text-2xl font-serif font-extrabold text-[#2c0e3a]">{product.name}</h3>
                <p className="uppercase text-sm text-gray-700 mt-1">{product.brand ?? 'WOMEN TYPE'}</p>
                <p className="text-xl font-semibold text-yellow-600 mt-3">${priceDisplay.toFixed(2)}</p>
                <p className="text-sm text-gray-600">{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</p>
                <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                  {product.description ?? 'A lavish and enchanting women’s fragrance oil with a bouquet of floral notes. Embrace your femininity with this captivating scent.'}
                </p>
                <div className="flex flex-col gap-2 mt-2 flex-wrap">
                  <h4 className="text-xl font-serif font-extrabold text-[#2c0e3a]">Colors</h4>
                  {product.colors?.length ? (
                    <div className="flex gap-2 flex-wrap">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-all duration-200 ${
                            selectedColor === color ? 'ring-2 ring-offset-2 ring-yellow-500 border-black' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">No color variation for this item.</span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-yellow-600 mb-2">Sizes</p>
                <div className="flex gap-2 flex-wrap">
                  {product.size?.length ? (
                    product.size.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSize(sz.toLowerCase())}
                        className={`w-10 h-10 flex items-center justify-center rounded-full border text-sm font-semibold transition-all duration-200 ${
                          size === sz.toLowerCase() ? 'bg-[#2c0e3a] text-white border-[#2c0e3a] scale-105' : 'bg-white text-[#2c0e3a] border-gray-300'
                        }`}
                      >
                        {sz}
                      </button>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No size variation for this item.</span>
                  )}
                </div>
                <p className="text-sm mt-2 text-gray-500">
                  Selected Size: <span className="font-medium uppercase">{size}</span>
                </p>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={loading}
                className="mt-6 bg-[#c9372c] text-white cursor-pointer hover:scale-105 active:scale-105 font-bold py-2 rounded hover:bg-[#aa2f24] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding…' : 'ADD TO CART'}
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white bg-black/40 hover:bg-black/70 p-1 rounded-full"
            title="Close"
          >
            <X className="w-5 h-5 cursor-pointer" />
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductModal;
