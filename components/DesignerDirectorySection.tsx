
import React from 'react';
import { DESIGNERS } from '../constants';
import SectionWrapper from './ui/SectionWrapper';
import Card from './ui/Card';

const DesignerDirectorySection: React.FC = () => {
  return (
    <SectionWrapper title="Designer Directory" subtitle="Connect with talented Nigerian fashion designers.">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {DESIGNERS.map((designer) => (
          <Card key={designer.id} className="text-center transform hover:-translate-y-2 transition-transform duration-300">
            <img 
              src={designer.image} 
              alt={designer.name} 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-brand-gold"
            />
            <h3 className="text-xl font-serif font-bold text-brand-navy">{designer.name}</h3>
            <p className="text-gray-600 font-semibold">{designer.specialty}</p>
            <p className="text-gray-500">{designer.location}</p>
            <a 
              href={`https://instagram.com/${designer.instagram.substring(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-brand-navy text-white text-sm font-bold py-2 px-4 rounded-full hover:bg-opacity-80 transition-colors"
            >
              {designer.instagram}
            </a>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default DesignerDirectorySection;
