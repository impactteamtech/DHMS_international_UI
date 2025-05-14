import React from 'react'
import { motion } from 'framer-motion'
import WhyChooseDHMS from './Accordion'
import { Link } from 'react-router-dom'

interface CategoryItem {
    name: string
    image: string
    description: string
}

const categories: CategoryItem[] = [
    {
        name: 'Virgin Hair Bundles',
        image: '/hair.png',
        description: 'Luscious virgin hair bundles that bring out your inner queen — perfect for showstopping styles rooted in African beauty traditions.',
    },
    {
        name: 'Body Oil',
        image: '/body_oil.png',
        description: 'Rich, silky body oils inspired by African skincare secrets — for glowing, sun-kissed skin that turns heads everywhere you go.',
    },
    {
        name: 'Supplements',
        image: '/supplements.png',
        description: 'Nourish your beauty from within with premium supplements designed to support melanin-rich skin, strong hair, and vibrant energy.',
    },
    {
        name: 'Designer Bags',
        image: '/designer_bag.png',
        description: 'Bold, statement-making designer bags to elevate your style — carry your culture, confidence, and power on your shoulder.',
    },
    {
        name: 'Braiding Hair',
        image: '/braiding_hair.png',
        description: 'Vibrant braiding hair for the ultimate protective styles — celebrate African heritage with every twist, braid, and bead.',
    },
    {
        name: 'Jewelry',
        image: '/jewelry.png',
        description: 'Dazzling jewelry pieces inspired by African royalty — adorn yourself with earrings, rings, and necklaces fit for a goddess.',
    },
    {
        name: 'Dress',
        image: '/dress.jpg',
        description: 'Fierce and fabulous dresses that make you feel unstoppable — channeling African prints, bold colors, and effortless glam.',
    },
]

const sizeClasses = [
    'h-90',
    'h-90',
    'h-90',
    'h-90',
    'h-90 col-span-2',
    'h-90 ',
    'h-90 col-span-2',
]

const Category = () => {
    return (
        <motion.section 
         className='w-full bg-black px-8 py-16 relative'
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}>
            <h2 id="categories" className='text-center text-5xl font-extrabold text-[#f3cb50] mb-12 font-serif tracking-wide'>
                Explore Our Categories
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* Left column */}
                <div className='flex flex-col space-y-6 md:col-span-1'>
                    <div className='flex justify-center'>
                        <img
                            src='/logo.png'
                            alt='Logo'
                            className='w-18 h-18 rounded-full border-4 border-yellow-700 shadow-lg'
                        />

                    </div>

                    {/* <div className='bg-yellow-700 text-white rounded-lg p-6 text-center shadow-md'>
                        <span className='font-extrabold text-2xl uppercase font-serif'>Categories</span>
                    </div> */}

                    <div className='bg-yellow-700 text-white rounded-lg p-6 flex flex-col items-center justify-between shadow-md'>
                        <p className='text-xl leading-relaxed text-center font-semibold font-raleway'>
                            EVERYTHING YOU NEED <br /> TO FEEL BEAUTIFUL, EVERY DAY.
                        </p>
                        <Link  to='/shop' className='mt-6 bg-white text-black rounded-full p-4 w-14 h-14 flex items-center justify-center hover:scale-110 transition'>
                            →
                        </Link>
                    </div>
                    <div className='text-white rounded-lg p-6 text-center shadow-md'>
                        <span className=' text-2xl uppercase font-raleway'>Why Choose Us?</span>
                    <WhyChooseDHMS/>
                    </div>
                    <div className='bg-yellow-700 text-white rounded-lg p-6 text-center shadow-md'>
                        <span className='font-extrabold text-2xl uppercase font-raleway'>Our Mission</span>
                        <p className='text-lg leading-relaxed text-center font-semibold font-raleway'>
                            To empower individuals to embrace their beauty and culture through high-quality products that celebrate African heritage.
                        </p>
                    </div>
                    <div className='bg-yellow-700 text-white rounded-lg p-6 text-center shadow-md'>
                        <span className='font-extrabold text-2xl uppercase font-raleway'>Our Vision</span>
                        <p className='text-lg leading-relaxed text-center font-semibold font-raleway'>
                            To be the leading destination for beauty products that honor and uplift African culture, inspiring confidence and self-love in every individual.
                        </p>
                    </div>
                    <div className='bg-yellow-700 text-white rounded-lg p-6 text-center shadow-md'>
                        <span className='font-extrabold text-2xl uppercase font-raleway'>Our Values</span>
                        <p className='text-lg leading-relaxed text-center font-semibold font-raleway'>
                            We believe in the power of beauty to transform lives. Our values are rooted in respect for African culture, commitment to quality, and dedication to customer satisfaction.
                        </p>
                    </div>
                </div>

                {/* Right: category grid */}
                <div className='md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6'>
                    {categories.map((cat, index) => (
                        <motion.div
                            key={index}
                            className={` group relative flex flex-col items-center justify-center cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105 bg-white ${sizeClasses[index % sizeClasses.length]}`}
                            initial={{ opacity: 0, y: 50, rotate: -5, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                            transition={{
                                type: 'spring',
                                stiffness: 80,
                                damping: 12,
                                delay: index * 0.15,
                            }}
                        >
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className='w-full h-full object-cover transition duration-500 group-hover:opacity-0'
                            />
                            {/* Overlay description */}
                            <div className='absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center p-4'>
                                <p className='text-white text-center font-serif text-lg'>
                                    {cat.description}
                                </p>
                            </div>
                            <div className='absolute top-3 right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm z-10'>
                                +
                            </div>
                            <span className='absolute bottom-3 left-1/2 transform -translate-x-1/2 text-white font-serif text-xl font-bold shadow-md'>
                                {cat.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

        </motion.section>
    )
}

export default Category
