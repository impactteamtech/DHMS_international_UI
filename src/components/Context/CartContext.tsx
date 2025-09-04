// src/components/Context/CartContext.tsx
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import api from '../setUpAxios';

type CartItem = {
  _id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  color?: string;
  quantity: number;
  rating?: number;
  category?: string;
  totalPrice: number;
};

type ProductInput = {
  id?: string | number;
  _id?: string;
  productId?: string;
  name?: string;
  price?: number | string;
  brand?: string;
  imageUrl?: string;
  image?: string;
  category?: string;
  rating?: number;
  color?: string;
  quantity?: number | string;
};

type CartContextShape = {
  cart: CartItem[];
  cartQuantity: number;
  fetchCart: () => Promise<void>;
  addToCart: (product: ProductInput) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQty: (itemId: string, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
};

const CartContext = createContext<CartContextShape | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const fetchCart = useCallback(async () => {
    try {
      const res = await api.get('/cart');
      setCart(res.data?.cart ?? []);
    } catch (err) {
      console.error('Fetch cart failed', err);
    }
  }, []);

  const addToCart = useCallback(async (p: ProductInput) => {
    try {
      const pid =
        (typeof p.productId === 'string' && p.productId) ||
        (typeof p._id === 'string' && p._id) ||
        (p.id != null ? String(p.id) : undefined);

      const name = (p.name ?? '').trim();
      const qty = Number(p.quantity ?? 1);
      const price = Number(p.price ?? 0);
      const image = p.imageUrl ?? p.image ?? '';

      if (!pid || !name || !Number.isFinite(qty) || qty < 1) {
        toast.error('Invalid item');
        return;
      }

      await api.post('/cart/add', {
        productId: pid,
        name,
        price: Number.isFinite(price) && price > 0 ? price : 0,
        image,
        color: p.color,
        quantity: qty,
        rating: p.rating,
        category: p.category,
        totalPrice: (Number.isFinite(price) ? price : 0) * qty,
      });

      await fetchCart();
      toast.success('Added to cart');
    } catch (err) {
      console.error('Add to cart failed', err);
      toast.error('Could not add to cart');
    }
  }, [fetchCart]);

  const removeFromCart = useCallback(async (itemId: string) => {
    try {
      await api.delete(`/cart/remove/${itemId}`);
      await fetchCart();
      toast.success('Item removed');
    } catch (err) {
      console.error('Remove failed', err);
      toast.error('Could not remove item');
    }
  }, [fetchCart]);

  const updateQty = useCallback(async (itemId: string, qty: number) => {
    try {
      await api.patch(`/cart/update/${itemId}`, { quantity: qty });
      await fetchCart();
    } catch (err) {
      console.error('Update qty failed', err);
      toast.error('Could not update quantity');
    }
  }, [fetchCart]);

  const clearCart = useCallback(async () => {
    try {
      await api.delete('/cart/clear');
      setCart([]);
    } catch (err) {
      console.error('Clear cart failed', err);
      toast.error('Could not clear cart');
    }
  }, []);

  useEffect(() => {
    void fetchCart();
  }, [fetchCart]);

  const cartQuantity = cart.reduce((sum, i) => sum + (i.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{ cart, cartQuantity, fetchCart, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};
