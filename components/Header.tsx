import React from 'react';
import { AppSection } from '../types';

interface HeaderProps {
  onNavigate: (section: AppSection) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const navItems = [
    { label: 'Lookbook', section: AppSection.LOOKBOOK },
    { label: 'AI Advisor', section: AppSection.ADVISOR },
    { label: 'Outfit Genie', section: AppSection.GENERATOR },
    { label: 'Designers', section: AppSection.DESIGNERS },
  ];

  return (
    <header className="bg-brand-navy sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-brand-gold font-serif text-2xl font-bold">
          Aso-Ebi AI
        </div>
        <ul className="flex items-center space-x-8">
          {navItems.map((item) => (
            <li key={item.section}>
              <button
                onClick={() => onNavigate(item.section)}
                className="text-brand-cream hover:text-brand-gold transition-colors duration-300 font-semibold"
                aria-label={`Scroll to ${item.label}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;