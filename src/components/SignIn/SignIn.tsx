import React from 'react';
import signinpng from '../../../public/signin1.jpg';
import { Mail } from 'lucide-react';


const SignIn: React.FC = () => {
    return (
        <>
           

            <div className='relative w-full  text-white font-raleway px-6 py-30 mt-8 bg-black rounded-lg shadow-lg'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto'>
                    <div className='flex flex-col justify-center items-center space-y-6'>
                        <h1 className='text-4xl sm:text-5xl text-center font-[satisfy] text-[#f3cb50]'>
                            Welcome to DHMS
                        </h1>
                        <img
                            src={signinpng}
                            alt='Logo'
                            className='w-64 rounded-md mx-auto shadow-lg object-top mb-6'
                        />
                    </div>
                    <div className='flex flex-col justify-center items-center space-y-6'>
                        <h2 className='text-3xl sm:text-4xl font-extrabold text-[#f3cb50]'>Sign In</h2>
                        <p className='text-lg text-white'>
                            Welcome back! Please enter your credentials to access your account.
                        </p>
                        <form className='w-full max-w-sm text-center space-y-4'>
                            <div className='text-left flex flex-col space-y-8 text-lg font-semibold text-[#f3cb50] mb-2'>
                                <input
                                    type='email'
                                    placeholder='Email Address'
                                    className='w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                />
                                <input
                                    type='password'
                                    placeholder='Password'
                                    className='w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                />
                                <button
                                    type='submit'
                                    className='w-full py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition duration-200'
                                >
                                    Sign In
                                </button>
                                <div className='flex gap-4 justify-center text-sm text-gray-400'>
                                    <p className='hover:underline cursor-pointer'>
                                        Forgot password?
                                    </p>
                                    <p className='hover:underline cursor-pointer'>Create account</p>
                                </div>
                                <div className='flex items-center justify-center space-x-2 text-gray-400'>
                                    <Mail className='w-6 h-6 text-yellow-500' />
                                    <button className='p-2 bg-yellow-500 cursor-pointer text-black font-semibold rounded-lg hover:bg-yellow-600 transition duration-200'>
                                         Sign in with Google
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
