import React from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

interface ScrollDownButtonProps {
  onClick: () => void
}

const ScrollDownButton: React.FC<ScrollDownButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className='fixed bottom-8 right-8 z-50 bg-transparent text-white p-4 border rounded-full shadow-lg cursor-pointer hover:scale-110 hover:bg-white hover:text-black transition'
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 1.2,           
        repeat: Infinity,       
        repeatType: 'reverse',    
        ease: 'easeInOut',       
      }}
    >
      <ChevronDown size={32} />
    </motion.button>
  )
}

export default ScrollDownButton
