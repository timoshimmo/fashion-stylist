
import React from 'react';

interface SectionWrapperProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
    title, 
    subtitle, 
    children, 
    className = 'bg-brand-cream',
    titleClassName = 'text-brand-navy',
    subtitleClassName = 'text-gray-600'
}) => {
  return (
    <section className={`py-16 px-4 sm:px-6 lg:py-24 lg:px-8 ${className}`}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-serif font-bold ${titleClassName}`}>
            {title}
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto text-lg ${subtitleClassName}`}>
            {subtitle}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
