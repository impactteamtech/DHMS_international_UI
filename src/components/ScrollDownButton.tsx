import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { scrollWithOffset } from '../scrollHelpers/ScrollOffset';

interface ScrollDownButtonProps {
  to?: string; 
  onClick?: (e: React.MouseEvent) => void;
}

const ScrollDownButton: React.FC<ScrollDownButtonProps> = ({ to, onClick }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (onClick) {
      onClick(e); 
      return;
    }

    if (to) {
      if (!to.startsWith('#')) {
        navigate(to); // Navigate to page route
        return;
      }

      const id = to.replace('#', '');
      const target = document.getElementById(id);

      if (target) {
        scrollWithOffset(target, 1000); // Smooth offset scroll
      } else {
        navigate(to); // Fallback navigation if element not found
      }
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className='fixed bottom-8 right-8 z-50 bg-white text-black p-4 border border-gray-300 rounded-full shadow-xl cursor-pointer hover:scale-110 hover:bg-[#f3cb50] transition'
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    >
      <ChevronDown size={32} />
    </motion.button>
  );
};

export default ScrollDownButton;
