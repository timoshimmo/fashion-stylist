
import React, { useState, useCallback } from 'react';
import { generateOutfitPrompt, generateOutfitImage } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileUtils';
import Spinner from './ui/Spinner';
import SectionWrapper from './ui/SectionWrapper';
import SparklesIcon from './icons/SparklesIcon';
import Alert from './ui/Alert';

const OutfitGeneratorSection: React.FC = () => {
  const [fabricFile, setFabricFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [occasion, setOccasion] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState<'' | 'prompting' | 'drawing'>('');
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFabricFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setGeneratedImage(null);
      setError('');
    }
  };

  const generateOutfit = useCallback(async () => {
    if (!fabricFile || !occasion) {
      setError('Please upload a fabric image and describe the occasion.');
      return;
    }
    setError('');
    setGeneratedImage(null);

    try {
      setLoadingStep('prompting');
      const base64Image = await fileToBase64(fabricFile);
      const prompt = await generateOutfitPrompt(base64Image, fabricFile.type, occasion);

      setLoadingStep('drawing');
      const generatedImgBase64 = await generateOutfitImage(prompt);
      setGeneratedImage(`data:image/jpeg;base64,${generatedImgBase64}`);

    } catch (err: any) {
      setError(err.message || 'An error occurred while generating the outfit.');
    } finally {
      setLoadingStep('');
    }
  }, [fabricFile, occasion]);

  const isLoading = loadingStep !== '';

  return (
    <SectionWrapper
      title="Outfit Genie"
      subtitle="Turn your fabric into fashion. Upload a picture of your material and let AI design your outfit."
      className="bg-brand-navy"
      titleClassName="text-white"
      subtitleClassName="text-gray-300"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Input Section */}
        <div className="bg-white p-8 rounded-lg shadow-2xl">
          <h3 className="font-serif text-2xl text-brand-navy mb-6">1. Provide Your Materials</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Fabric Photo</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Fabric preview" className="mx-auto h-32 w-32 object-cover rounded-md" />
                  ) : (
                     <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-green hover:text-brand-green-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-green">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="occasion-gen" className="block text-sm font-semibold text-gray-700 mb-2">
                What's the Occasion?
              </label>
              <input
                type="text"
                id="occasion-gen"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                placeholder="e.g., My sister's traditional wedding"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-green focus:border-brand-green"
              />
            </div>
          </div>
          
          <div className="mt-8">
             <button
                onClick={generateOutfit}
                disabled={isLoading || !fabricFile || !occasion}
                className="w-full bg-brand-green text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? <Spinner/> : <><SparklesIcon className="w-5 h-5 mr-2" /> Generate My Outfit</>}
              </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl h-full flex flex-col justify-center items-center text-center min-h-[400px]">
          <h3 className="font-serif text-2xl text-white mb-4">2. Your AI-Generated Design</h3>
          {isLoading && (
            <div className="text-white">
              <Spinner />
              <p className="mt-4 text-lg">{loadingStep === 'prompting' ? 'Analyzing fabric & creating prompt...' : 'Bringing your design to life...'}</p>
              <p className="text-sm text-gray-400 mt-2">This may take a moment. Masterpieces need time!</p>
            </div>
          )}
          {error && <Alert message={error} type="error" />}
          {!isLoading && !generatedImage && (
            <div className="text-gray-400">
                <p>Your generated outfit will appear here.</p>
            </div>
          )}
          {generatedImage && (
            <div className="w-full">
              <img src={generatedImage} alt="AI generated outfit" className="rounded-lg shadow-lg w-full max-w-md mx-auto" />
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default OutfitGeneratorSection;
