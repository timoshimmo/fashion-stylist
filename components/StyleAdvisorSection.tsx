import React, { useState } from 'react';
import { getStyleAdvice } from '../services/geminiService';
import Spinner from './ui/Spinner';
import SectionWrapper from './ui/SectionWrapper';
import SparklesIcon from './icons/SparklesIcon';

const StyleAdvisorSection: React.FC = () => {
  const [occasion, setOccasion] = useState('');
  const [preferences, setPreferences] = useState('');
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetAdvice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!occasion) {
      setError('Please describe the occasion.');
      return;
    }
    setIsLoading(true);
    setError('');
    setAdvice('');
    try {
      const result = await getStyleAdvice(occasion, preferences);
      setAdvice(result);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionWrapper
      title="AI Style Advisor"
      subtitle="Describe your event and get instant style recommendations from our AI expert."
    >
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <form onSubmit={handleGetAdvice}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="occasion" className="block text-sm font-semibold text-gray-700 mb-2">
                What's the Occasion?
              </label>
              <input
                type="text"
                id="occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                placeholder="e.g., A traditional wedding in Lagos"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-green focus:border-brand-green"
              />
            </div>
            <div>
              <label htmlFor="preferences" className="block text-sm font-semibold text-gray-700 mb-2">
                Any Style Preferences? (Optional)
              </label>
              <input
                type="text"
                id="preferences"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                placeholder="e.g., I love bold colors, modern styles"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-green focus:border-brand-green"
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-brand-navy text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
            >
              {isLoading ? <Spinner /> : <><SparklesIcon className="w-5 h-5 mr-2" /> Get Style Advice</>}
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {isLoading && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">Our AI stylist is thinking...</p>
          </div>
        )}

        {advice && (
          <div className="mt-8 prose max-w-none border-t pt-6">
            <h3 className="font-serif text-2xl text-brand-navy mb-4">Your Style Recommendations</h3>
            <p className="whitespace-pre-line">{advice}</p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

export default StyleAdvisorSection;