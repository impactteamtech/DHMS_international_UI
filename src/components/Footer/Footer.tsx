import React, { useEffect, useRef, useState } from 'react';
import { Phone } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import { scrollWithOffset } from '@/scrollHelpers/ScrollOffset';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast'
const PUBLIC_KEY  = import.meta.env.VITE_EMAIL_JS as string;
const SERVICE_ID  = import.meta.env.VITE_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID as string;

const Footer: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'err'>('idle');

  useEffect(() => {
    if (PUBLIC_KEY) emailjs.init(PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
      console.error('EmailJS env vars missing');
      toast.error("error finding email server")
      setStatus('err');
      return;
    }
    setStatus('sending');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current);
      setStatus('ok');
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('err');
    } finally {
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <footer className="bg-[#2f2a28] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Company Info */}
        <div className="space-y-4">
          <h2 className="text-[#d5a86b] text-2xl font-[satisfy]">
            DHMS International LLC 
          </h2>
          <p className="text-sm text-[#e0d6c8] leading-relaxed">
            Celebrating African beauty with hair, skin, and self-care essentials rooted in heritage.
          </p>
          <div className="flex items-center gap-2 text-[#f3cb50] text-sm mt-3">
            <a
              href="tel:+15407574563"
              aria-label="Call +1 (540) 757-4563"
              className="inline-flex items-center gap-2 cursor-pointer hover:opacity-90"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>+1 (540) 757-4563</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[#d5a86b] text-sm uppercase font-bold tracking-wide mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-[#e0d6c8]">
            <li>
              <HashLink to="/home#top" scroll={scrollWithOffset} className="hover:text-[#f3cb50] transition">
                Home
              </HashLink>
            </li>
            <li>
              <HashLink to="/shop#top" scroll={scrollWithOffset} className="hover:text-[#f3cb50] transition">
                Shop
              </HashLink>
            </li>
            <li>
              <HashLink to="/#testimonials" scroll={scrollWithOffset} className="hover:text-[#f3cb50] transition">
                Testimonials
              </HashLink>
            </li>
          </ul>
        </div>

        {/* Updates */}
        <div>
          <h3 className="text-[#d5a86b] text-sm uppercase font-bold tracking-wide mb-4">
            Be First to Know
          </h3>
          <p className="text-sm text-[#e0d6c8] mb-3">
            Get alerts for new drops, restocks, and in-store events.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            {/* EmailJS will look for inputs that match your template fields.
               Common field names: user_email, user_name, message, etc. */}
            <input
              type="email"
              name="user_email"
              placeholder="Enter your best email"
              className="p-2 rounded-md bg-white text-black w-full sm:w-auto flex-1"
              aria-label="Email address"
              required
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-[#d5a86b] cursor-pointer text-black px-4 py-2 rounded-md hover:brightness-110 transition disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Get Updates'}
            </button>
          </form>

          <p className="text-xs text-[#a19990] mt-2">
            We’ll only email when it matters. Unsubscribe anytime.
          </p>

          {status === 'ok' && (
            <p className="text-xs mt-2 text-green-300">Thanks for subscribing!</p>
          )}
          {status === 'err' && (
            <p className="text-xs mt-2 text-red-300">Subscription failed. Please try again.</p>
          )}
        </div>

      </div>

      {/* Divider */}
      <div className="mt-12 border-t border-[#a19990]/30 pt-6 text-center text-sm text-[#a19990]">
        &copy; {new Date().getFullYear()} DHMS International. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
