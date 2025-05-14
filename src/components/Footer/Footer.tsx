import React from 'react';
import { Phone,  Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white mt-12">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 py-12">
        
        {/* Company Info */}
        <div className="space-y-6">
          <h2 className="text-[#f3cb50] text-2xl font-[satisfy]">
            DHMS International Limited
          </h2>
          <p className="text-sm leading-relaxed">
            Your destination for authentic African hair, skin, and beauty essentials. From&nbsp;
            <span className="whitespace-nowrap">protective styles</span> to&nbsp;
            <span className="whitespace-nowrap">nourishing butters</span> and&nbsp;
            <span className="whitespace-nowrap">herbal treatments</span>, we celebrate African beauty and empower you to look and feel your best.
          </p>
          <div className="flex items-center gap-3 text-[#e3c981] text-sm">
            <Phone className="w-4 h-4" />
            <span>+1-234-567-8901</span>
          </div>
        </div>

        {/* Information Links */}
        <div className="space-y-4">
          <h3 className="text-[#e3c981] text-sm uppercase font-bold">Information</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#f3cb50]">About Us</a></li>
            <li><a href="#" className="hover:text-[#f3cb50]">Blog</a></li>
            <li><a href="#" className="hover:text-[#f3cb50]">Testimonials</a></li>
            <li><a href="#" className="hover:text-[#f3cb50]">Events</a></li>
          </ul>
        </div>

        {/* Customer Service Links */}
        <div className="space-y-4">
          <h3 className="text-[#e3c981] text-sm uppercase font-bold">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#f3cb50]">Contact Us</a></li>
            <li><a href="#" className="hover:text-[#f3cb50]">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-[#f3cb50]">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#f3cb50]">Terms of Service</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="space-y-4">
          <h3 className="text-[#e3c981] text-sm uppercase font-bold">Subscribe</h3>
          <p className="text-sm leading-relaxed">
            Glow Up with Us - Join the beauty club!
          </p>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#f3cb50]" />
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded bg-white text-black w-full"
            />
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#e3c981] px-6">
        <p className='mx-auto'>&copy; {new Date().getFullYear()} DHMS International. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
