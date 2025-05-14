import React from 'react'
import logo from '../../../public/logo.png'
import SearchBar from './SearchBar'
import { User, ShoppingCart } from 'lucide-react'
import NavigationMenuBeauty from './HeaderLinks'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Header = () => {
  const quantity = useSelector((state: any) => state.cart.totalQuantity)

  return (
    // w-full bg-black text-gray-200 p-4 flex justify-between items-center fixed top-0 left-0 right-0 shadow-md px-8 z-50
    <div className='w-full bg-black fixed top-0 left-0 right-0 shadow-md px-8 z-50'>
      <div className='p-4 flex justify-between items-center'>
        <div className='flex items-center space-x-2'>
          <img
            src={logo}
            alt='Logo'
            className='w-10 h-10 rounded-full p-1 mr-2'
          />
          <div className='flex flex-col items-start'>
            <span className='text-[#f3cb50] text-xl font-[satisfy]'>
              DHMS
            </span>
            <span className='text-[#e3c981] text-sm uppercase font-bold'>
              International Limit
            </span>
          </div>
        </div>

        {/* Search bar */}
        <div className='w-80 mx-8 flex-1 flex justify-center'>
          <SearchBar />
        </div>

        {/* Icons */}
        <div className='flex items-center space-x-4 text-white'>
          <button className='relative flex flex-col items-center cursor-pointer space-x-1 hover:scale-105'>
            <Link to='/cart' className='flex flex-col items-center'>
              <ShoppingCart />
              <span className='text-[#f3cb50]'>My Cart</span>
              {/* Quantity indicator */}
              {quantity >= 0 && (
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1'>
                {quantity}
              </span>
              )}
            </Link>
          </button>

          <button className='flex flex-col items-center cursor-pointer space-x-1 hover:scale-105'>
            <User />
            <span className='text-[#f3cb50]'>Sign In</span>
          </button>
        </div>
      </div>

      {/* Bottom navigation links */}
      <div className='pb-4 flex justify-center'>
        <NavigationMenuBeauty />
      </div>
    </div>
  )
}

export default Header
