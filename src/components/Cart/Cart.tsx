import React, { useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import api from '../setUpAxios';

type FormData = {
  name: string;
  homeAddress: string;
  city: string;
  state: string;
  zipCode: string; // string to preserve leading zeros
};

const Cart: React.FC = () => {
  const { cart, fetchCart, removeFromCart, updateQty } = useCart();
  const cartItems = cart || [];

  const subtotal = cartItems.reduce((acc: number, item: any) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return acc + price * quantity;
  }, 0);

  const deliveryFee = 4.99; // NOTE: if you charge this, include in Stripe (see onSubmit)
  const total = subtotal + deliveryFee;

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!cartItems.length) {
      toast.error('Your cart is empty.');
      return;
    }

    try {
      // Keep client-side line_items only if your backend expects them for now.
      // Long-term: build these on the server from cartId to avoid price tampering.
      const line_items = [
        ...cartItems.map((item: any) => ({
          price_data: {
            currency: 'usd',
            product_data: { name: item.name },
            unit_amount: Math.round(Number(item.price) * 100),
          },
          quantity: Number(item.quantity),
        })),
        // Include delivery fee so Stripe total matches your UI
        ...(deliveryFee > 0 ? [{
          price_data: {
            currency: 'usd',
            product_data: { name: 'Delivery Fee' },
            unit_amount: Math.round(deliveryFee * 100),
          },
          quantity: 1,
        }] : []),
      ];

      const res = await api.post('/checkout/create-checkout-session', {
        ...data,
        line_items,
      });

      if (res.data?.url) {
        window.location.href = res.data.url; // safe redirect
      } else {
        toast.error('Could not start checkout.');
      }
    } catch (error: any) {
      console.error('checkout error:', error);
      toast.error(error?.response?.data?.message ?? 'Checkout failed.');
    }
  };

  useEffect(() => {
    void fetchCart();
  }, [fetchCart]);

  return (
    <div className='bg-white min-h-screen max-w-8xl px-4 py-2 md:px-10 mt-28 pt-36 md:pt-28 lg:pt-24 text-white'>
      <h1 className='text-6xl md:text-8xl text-center font-[satisfy] text-[#2f2a28] mb-6'>Your Cart</h1>

      <div className='bg-white rounded-xl p-6 text-black max-w-6xl mx-auto flex flex-col gap-8 shadow-lg'>
        {/* Cart Items */}
        <div className='space-y-4'>
          <div className='hidden md:grid grid-cols-5 font-semibold border-b pb-2'>
            <span>Product</span>
            <span>Name</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Action</span>
          </div>

          {cartItems.length === 0 ? (
            <p className='text-center text-gray-500'>Your cart is empty.</p>
          ) : (
            cartItems.map((item: any, index: number) => (
              <div key={item._id || index} className='grid grid-cols-2 md:grid-cols-5 items-center text-left border-b py-3'>
                <img src={item.image} alt={item.name} className='w-16 h-16 object-cover mb-2 rounded mx-auto' />
                <span className='md:block'>{item.name}</span>

                <div className='flex justify-center gap-2'>
                  <button
                    onClick={() => {
                      const qty = Number(item.quantity);
                      if (qty > 1) {
                        void updateQty(item._id, qty - 1);
                      } else {
                        void removeFromCart(item._id);
                        toast.success('Removed item');
                      }
                    }}
                    className='px-2 py-1 bg-gray-200 cursor-pointer text-left hover:scale-105 active:scale-105 rounded'
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => {
                      const qty = Number(item.quantity);
                      if (qty < 50) {
                        void updateQty(item._id, qty + 1);
                        toast.success('Quantity increased');
                      }
                    }}
                    className='px-2 py-1 bg-gray-200 cursor-pointer hover:scale-105 active:scale-105 rounded'
                  >
                    +
                  </button>
                </div>

                <span className='hidden md:block'>${(Number(item.price) || 0).toFixed(2)}</span>
                <button
                  onClick={() => void removeFromCart(item._id)}
                  className='text-red-500 cursor-pointer hover:scale-105 hover:text-red-700 mx-auto'
                >
                  <Trash2 className='w-5 h-5' />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Delivery Info and Order Summary */}
        <form onSubmit={handleSubmit(onSubmit)} className='grid md:grid-cols-2 gap-6 mt-6'>
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold'>Delivery Info</h2>

            <input type='text' placeholder='Name' {...register('name', { required: true })} className='w-full p-3 rounded-lg bg-gray-100 border' />
            <input type='text' placeholder='Address' {...register('homeAddress', { required: true })} className='w-full p-3 rounded-lg bg-gray-100 border' />
            <div className='flex gap-4'>
              <input type='text' placeholder='City' {...register('city', { required: true })} className='w-1/2 p-3 rounded-lg bg-gray-100 border' />
              <input type='text' placeholder='State' {...register('state', { required: true })} className='w-1/2 p-3 rounded-lg bg-gray-100 border' />
            </div>
            <input type='text' placeholder='Zip Code' {...register('zipCode', { required: true })} className='w-full p-3 rounded-lg bg-gray-100 border' />
          </div>

          <div className='bg-gray-100 p-6 rounded-lg flex flex-col justify-between'>
            <div>
              <h2 className='text-lg font-semibold mb-4'>Order Summary</h2>
              <div className='flex justify-between mb-2'><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className='flex justify-between mb-2'><span>Discount</span><span>$0.00</span></div>
              <div className='flex justify-between mb-2'><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div>
              <div className='flex justify-between text-lg font-bold mt-4'><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <button
              type='submit'
              disabled={isSubmitting || cartItems.length === 0}
              className='w-full mt-6 cursor-pointer bg-[#f3cb50] text-black py-2 rounded-lg hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Processing…' : 'Checkout Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cart;
