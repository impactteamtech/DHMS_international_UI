import { motion } from 'motion/react'
import React, { useState } from 'react'


interface Testimonial {
  name: string
  role: string
  image: string
  testimonial: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Michael Gough',
    role: 'Customer at DHMS International',
    image: '/user1.jpg',
    testimonial:
      'It was a great experience! DHMS International’s products transformed my routine and made me feel confident.',
  },
  {
    name: 'Bonnie Green',
    role: 'Customer at DHMS International',
    image: '/user2.jpg',
    testimonial:
      'DHMS International brings together African heritage and top-quality products. Truly unmatched.',
  },
  {
    name: 'Lana Byrd',
    role: 'Customer at DHMS International',
    image: '/user3.jpg',
    testimonial:
      'I love the bold designs and the cultural pride embedded in everything they sell.',
  },
]

const Testimonials: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <motion.section  id='testimonials' className="w-full bg-black text-white py-10">
      <div className="max-w-8xl px-8 items-center text-center mx-auto px-4">
        <h1 className="text-6xl font-bold mb-4 text-yellow-500">Testimonials</h1>
        <div className="border-b-2 border-yellow-700  mx-auto w-1/4 mb-8"></div>
        <p className="text-lg mb-8">
          Hear what our customers have to say about their experiences with DHMS
          International.
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left customer list */}
          <div className="w-full md:w-1/3 space-y-4">
            {testimonials.map((person, index) => (
              <div
                key={index}
                className={`flex items-center p-3 rounded cursor-pointer transition ${
                  selectedIndex === index
                    ? 'bg-yellow-700'
                    : 'hover:bg-gray-800'
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-12 h-12 rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="font-bold">{person.name}</p>
                  <p className="text-sm text-gray-400">{person.role}</p>
                </div>
              </div>
            ))}

            <button className="text-blue-400 mt-4 text-sm hover:underline">
              View other testimonials →
            </button>
          </div>

          {/* Right testimonial display */}
          <div className="w-full md:w-2/3">
            <div className="text-6xl text-yellow-500 mb-4 item-start">“</div>
                <h3 className="text-2xl font-bold mb-4">
                {testimonials[selectedIndex].testimonial}
                </h3>
            <p className="text-gray-400">
              Shared by{' '}
              <span className="font-semibold">
                {testimonials[selectedIndex].name}
              </span>
            </p>
          </div>
        </div>
      </div>

    </motion.section>
  )
}

export default Testimonials
