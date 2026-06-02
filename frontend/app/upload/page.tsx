'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiLink, FiHardDrive, FiCloud, FiInstagram, FiChevronDown, FiX, FiYoutube } from 'react-icons/fi';
import { useState, useRef, ChangeEvent, useCallback } from 'react';

export default function UploadPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState<string>('');

  const uploadOptions = [
    { name: 'Device', icon: <FiHardDrive />, color: 'text-blue-400' },
    { name: 'Google Drive', icon: <FiCloud />, color: 'text-green-400' },
    { name: 'Instagram', icon: <FiInstagram />, color: 'text-pink-400' },
    { name: 'YouTube', icon: <FiYoutube />, color: 'text-red-600' }, 
    { name: 'OneDrive', icon: <FiCloud />, color: 'text-blue-500' },
    { name: 'URL', icon: <FiLink />, color: 'text-purple-400' }
  ];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateUpload();
    }
  };

  const simulateUpload = useCallback(async () => {
    setSelectedOption('Device');
    setUploadProgress(0);
    setResult(null);

    // Simulated API visual feedback loop
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          setResult('Real'); // Simulates a clean visual result
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateUpload();
    }
  }, [simulateUpload]);

  const handleUrlSubmit = () => {
    if (!urlInput) {
      alert('Please enter a URL');
      return;
    }
    alert(`URL entered: ${urlInput}`);
  };

  const handleOptionSelect = (optionName: string) => {
    setDropdownOpen(false);
    switch(optionName) {
      case 'Device':
        fileInputRef.current?.click();
        break;
      case 'Google Drive':
      case 'OneDrive':
        alert(`${optionName} picker interface template active.`);
        setSelectedOption(optionName);
        break;
      case 'URL':
      case 'YouTube':
      case 'Instagram':
        setSelectedOption(optionName);
        break;
      default:
        setSelectedOption(optionName);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Upload Media
        </h1>
        <p className="text-gray-400 text-center mb-10 max-w-lg mx-auto">
          Analyze videos to detect deepfake manipulation
        </p>

        <motion.div 
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${dragActive ? 'border-blue-500 bg-gray-800' : 'border-gray-700 bg-gray-900'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          whileHover={{ scale: 1.01 }}
        >
          {!selectedOption ? (
            <>
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg font-medium text-white"
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                  >
                    <FiUpload className="mr-2" />
                    Select Source
                    <FiChevronDown className={`ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 right-0 mt-2 bg-black rounded-lg shadow-xl z-10 overflow-hidden border border-gray-800"
                      >
                        {uploadOptions.map((option) => (
                          <button
                            key={option.name}
                            className={`flex items-center w-full px-4 py-3 text-left ${option.color} bg-black hover:bg-gray-900 transition-colors`}
                            onClick={() => handleOptionSelect(option.name)}
                          >
                            <span className="mr-3">{option.icon}</span>
                            {option.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <p className="text-gray-400 mb-4">or drag and drop video files here</p>
              <p className="text-sm text-gray-500">Supports: MP4, AVI, MOV (Max 100MB)</p>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center text-white">
                  {uploadOptions.find(o => o.name === selectedOption)?.icon}
                  <span className="ml-2">{selectedOption}</span>
                </div>
                <button 
                  onClick={() => {
                    setSelectedOption(null);
                    setUploadProgress(0);
                    setResult(null);
                    setUrlInput('');
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX />
                </button>
              </div>

              {(selectedOption === 'Device' || selectedOption === 'Google Drive' || selectedOption === 'OneDrive') && (
                <div className="space-y-4">
                  <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-sm text-gray-400">
                    {uploadProgress < 100 ? 'Processing file source...' : 'Analysis Complete.'}
                  </p>
                  {result && (
                    <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                      <p className="text-white font-semibold text-lg">
                        Prediction: <span className={result === 'Fake' ? 'text-red-500' : 'text-green-400'}>{result}</span>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {(selectedOption === 'YouTube' || selectedOption === 'Instagram' || selectedOption === 'URL') && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 mt-4">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={e => setUrlInput(e.target.value)}
                    placeholder={`Paste ${selectedOption} video URL here`}
                    className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium"
                    onClick={handleUrlSubmit}
                  >
                    Submit URL
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/mp4,video/x-m4v,video/*"
            className="hidden"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
