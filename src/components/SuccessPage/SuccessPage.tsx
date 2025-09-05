import React, {useEffect, useState} from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';
import { Home, ShoppingBag } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
// import { useAuth } from '../Context/AuthContext';
// import toast from 'react-hot-toast';

const SuccessPage: React.FC = () => {
  const [loadingAnimation, setLoadingAnimation] = useState<boolean>(false)
  const {clearCart} = useCart();
  const navigate = useNavigate();
  

  useEffect(()=>{

    const resetCart = async ()=>{
      try{
     
        await clearCart()
      }
      catch(error){
        console.error("failed to clear cart", error)
      }
    }
    resetCart()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      {loadingAnimation && <LoadingAnimation/>}
      <div className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg p-10 w-full max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-700 mb-4">
          DHMS Received Your Order
        </h1>
        <p className="mt-2 text-xl text-gray-600 mb-6">
          Your payment was successful.
        </p>

        <DotLottieReact
          className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mb-8"
          src="https://lottie.host/7ee472a0-c1c8-4871-962f-bcec400a2f54/ZybOcezonI.lottie"
          loop
          autoplay
        />

        <div className="flex gap-4">
          <button
            onClick={() => {
              setLoadingAnimation(true)
              navigate('/home')
              setTimeout(()=> setLoadingAnimation(false), 1800)
            
            }
            
            }
            className="flex items-center gap-2 cursor-pointer bg-slate-700 text-white px-5 py-3 rounded-md hover:bg-slate-800 transition"
          >
            <Home className="w-5 h-5" />
            Home
          </button>

          <button
            onClick={() => {
              setLoadingAnimation(true)
              navigate('/shop')
              setTimeout(()=> setLoadingAnimation(false), 1800)
            
            }}
            className="flex items-center gap-2 cursor-pointer bg-yellow-500 text-black px-5 py-3 rounded-md hover:bg-yellow-600 transition"
          >
            <ShoppingBag className="w-5 h-5" />
            Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
