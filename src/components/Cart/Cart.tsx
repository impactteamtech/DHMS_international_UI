import React, { useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCart,
  removeFromCartServer,
  updateQty,
} from '@/store/cartSlice';
import type { AppDispatch } from '@/store/store';

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: any) => state.cart.itemsList);
  const subtotal = cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  const deliveryFee = 4.99;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className='bg-black flex flex-col items-center justify-center px-2 md:px-6 py-10 mt-28 pt-36 md:pt-28 lg:pt-24'>
      <h1 className='text-[#f3cb50] text-3xl font-bold mb-8'>YOUR CART</h1>

      <div className='bg-white max-w-6xl rounded-xl p-6 w-full flex flex-col md:flex-row gap-6'>
        {/* Cart Items */}
        <div className='w-full md:w-2/3'>
          <div className='border rounded-lg'>
            <div className='grid grid-cols-4 p-4 border-b text-center font-semibold'>
              <span>Product</span>
              <span>Quantity</span>
              <span>Price</span>
              <span>Action</span>
            </div>
            {cartItems.length === 0 ? (
              <div className='text-center p-4'>
                <p className='text-gray-500'>Your cart is empty.</p>
              </div>
            ) : (
              cartItems.map((item: any, index: number) => (
                <div key={index} className='grid grid-cols-4 items-center text-center p-4 border-b'>
                  <img src={item.image} alt='Product' className='w-16 h-16 mx-auto rounded' />
                  <div className='flex items-center justify-center gap-2'>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQty({
                            id: item.productId,
                            quantity: Math.max(item.quantity - 1, 1),
                          })
                        )
                      }
                      className='px-2 py-1 cursor-pointer bg-gray-200 rounded'
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQty({
                            id: item.productId,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                      className='px-2 py-1 cursor-pointer bg-gray-200 rounded'
                    >
                      +
                    </button>
                  </div>
                  <span>${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => dispatch(removeFromCartServer(item.productId))}
                    className='text-red-500 cursor-pointer hover:text-red-700'
                  >
                    <Trash2 className='w-5 h-5 mx-auto' />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className='w-full md:w-1/3'>
          <div className='border rounded-lg p-4'>
            <h2 className='text-lg font-semibold mb-4'>Order Summary</h2>
            <div className='flex justify-between mb-2'>
              <span>SubTotal</span>
              <span>{subtotal.toFixed(2)} USD</span>
            </div>
            <div className='flex justify-between mb-2'>
              <span>Discount</span>
              <span>$0.00 USD</span>
            </div>
            <div className='flex justify-between mb-4'>
              <span>Delivery Fee</span>
              <span>$4.99 USD</span>
            </div>
            <div className='flex justify-between text-lg font-bold mb-6'>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className='w-full bg-[#f3cb50] cursor-pointer text-black py-2 rounded-lg shadow hover:opacity-90 hover:scale-105 transition-transform'>
              Checkout Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
