
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy text-brand-cream mt-16">
      <div className="container mx-auto px-6 py-8 text-center">
        <p className="font-serif text-2xl font-bold text-brand-gold mb-2">Aso-Ebi AI</p>
        <p>&copy; {new Date().getFullYear()} Aso-Ebi AI. All Rights Reserved.</p>
        <p className="text-sm text-gray-400 mt-2">
          Bringing the future of Nigerian fashion to your fingertips.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
