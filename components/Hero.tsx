
import React from 'react';

interface HeroProps {
    onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="bg-brand-green text-white py-20 px-4 h-[60vh] flex items-center justify-center">
      <div className="text-center container mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 leading-tight">
          Your Personal Nigerian Fashion Stylist
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-200">
          Discover breathtaking styles, get expert advice, and bring your dream outfit to life with the power of AI.
        </p>
        <button
          onClick={onGetStarted}
          className="bg-brand-gold text-brand-navy font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-400 transition-transform transform hover:scale-105 duration-300 shadow-xl"
        >
          Create with AI
        </button>
      </div>
    </section>
  );
};

export default Hero;
