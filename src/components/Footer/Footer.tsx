import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import { scrollWithOffset } from '@/scrollHelpers/ScrollOffset';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white mt-12">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 py-10">

        {/* Company Info */}
        <div className="space-y-4">
          <h2 className="text-[#f3cb50] text-2xl font-[satisfy]">
            DHMS International
          </h2>
          <p className="text-sm leading-relaxed">
            Celebrating African beauty with hair, skin, and self-care essentials rooted in heritage.
          </p>
          <div className="flex items-center gap-2 text-[#e3c981] text-sm">
            <Phone className="w-4 h-4" />
            <span>+1-234-567-8901</span>
          </div>
        </div>

        {/* Quick Links & Subscribe */}
        <div className="space-y-6">
          <div>
            <h3 className="text-[#e3c981] text-sm uppercase font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm mt-2">
              <li><HashLink to="/#hero" scroll={scrollWithOffset} className="hover:text-[#f3cb50]">Home</HashLink></li>
              <li><HashLink to="/shop#top" className="hover:text-[#f3cb50]">Shop</HashLink></li>
              <li><HashLink to="/#testimonials" scroll={scrollWithOffset} className="hover:text-[#f3cb50]">Testimonials</HashLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#e3c981] text-sm uppercase font-bold">Subscribe</h3>
            <div className="flex items-center gap-2 mt-2">
              <Mail className="w-5 h-5 text-[#f3cb50]" />
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded bg-white text-black w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-[#e3c981]">
        &copy; {new Date().getFullYear()} DHMS International. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
