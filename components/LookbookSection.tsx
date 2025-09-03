
import React from 'react';
import { LOOKBOOK_IMAGES } from '../constants';
import SectionWrapper from './ui/SectionWrapper';

const LookbookSection: React.FC = () => {
  return (
    <SectionWrapper title="Fashion Lookbook" subtitle="A gallery of inspiration for your next masterpiece.">
      <div className="columns-2 md:columns-3 gap-4">
        {LOOKBOOK_IMAGES.map((src, index) => (
          <div key={index} className="mb-4 break-inside-avoid">
            <img 
              src={src} 
              alt={`Nigerian fashion style ${index + 1}`}
              className="w-full h-auto rounded-lg shadow-lg object-cover hover:shadow-2xl transition-shadow duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default LookbookSection;
