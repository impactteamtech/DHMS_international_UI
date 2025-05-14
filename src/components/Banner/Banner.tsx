import { motion } from 'motion/react'
import React from 'react'
import Marquee from 'react-fast-marquee'

const Banner: React.FC = () => {
  return (
    <motion.section 
    id='banner' className="w-full h-50 bg-black text-white overflow-hidden"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    viewport={{ once: true }}>
      <Marquee
        className="text-white   h-full font-raleway text-7xl overflow-hidden whitespace-nowrap"
        gradient={false}
        speed={100}
      >
        DHMS International &nbsp; • &nbsp;
        Located at 137 Spotsylvania Mall Dr, Fredericksburg, VA, 22407 &nbsp; • &nbsp;
        DHMS International &nbsp; • &nbsp;
        Located at 137 Spotsylvania Mall Dr, Fredericksburg, VA, 22407
      </Marquee>
    </motion.section>
  )
}

export default Banner
