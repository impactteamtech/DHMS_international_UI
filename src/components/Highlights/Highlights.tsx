import React from 'react';

const Highlights: React.FC = () => {
  return (
    <div id="Highlights" className="bg-[#f3cb50] text-black px-6 py-12 flex flex-col items-center max-w-8xl font-play">
      {/* Hero Heading */}
      <div className="text-center mb-12 max-w-3xl">
        <h2 className="text-4xl sm:text-5xl font-extrabold font-play leading-tight tracking-tight">
          DHMS — Africa at Your Fingertips
        </h2>
        <p className="text-base sm:text-lg mt-4 font-medium text-black">
          Rooted in tradition. Elevated for today. Explore handpicked African beauty, wellness, and fashion — crafted to celebrate your glow, your roots, and your rhythm.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Feature 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-black font-raleway">🌿 Authentic African Heritage</h3>
          <p className="mt-3 text-gray-700 text-sm">
            From shea butter to kaftan craftsmanship — every product tells a story. We highlight beauty and tradition across the African diaspora.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-black font-raleway">👗 Stylish Afro-Fashion</h3>
          <p className="mt-3 text-gray-700 text-sm">
            Shop beautifully tailored kaftans, boubous, and cultural wear — designed for both men and women who love bold elegance and comfort.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-black font-raleway">💸 Fair Prices, Unmatched Value</h3>
          <p className="mt-3 text-gray-700 text-sm">
            Beauty and fashion should be accessible. Enjoy luxurious products and statement pieces without the high markups.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-black font-raleway">🚚 Lightning-Fast Delivery</h3>
          <p className="mt-3 text-gray-700 text-sm">
            From self-care kits to elegant garments — everything ships quickly and securely to your door, ready to wear or share.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-black font-raleway">🛍️ Curated With Care</h3>
          <p className="mt-3 text-gray-700 text-sm">
            Every item in our collection is hand-selected to meet our standard of excellence — blending quality, culture, and confidence.
          </p>
        </div>

        {/* Feature 6 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-black font-raleway">🌎 Afro-Diaspora Powered</h3>
          <p className="mt-3 text-gray-700 text-sm">
            We're a proud Black-owned brand uplifting African and Caribbean creators, artisans, and tailors through every sale.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
