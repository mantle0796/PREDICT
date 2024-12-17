"use client"
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { BrowserProvider, ethers } from 'ethers';
import pred from "@/app/contractInfo/abi.json"
import {contractAddress} from "@/app/contractInfo/address.json"
import router from 'next/router';
import { isObject } from 'util';
declare global {
  interface Window {
    ethereum?: any; // Declare the ethereum object
    address?: any;
  }
}

interface PredictionOption {
  id: number;
  text: string;
}

const PredictionsPage: React.FC = () => {
  const [predictionTitle, setPredictionTitle] = useState('');
  const [predictionDescription, setPredictionDescription] = useState('');
  const [options, setOptions] = useState<PredictionOption[]>([]);
  const [newOption, setNewOption] = useState('');
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);

  const addOption = () => {
    if (newOption.trim()) {
      setOptions([
        ...options, 
        { id: Date.now(), text: newOption.trim() }
      ]);
      setNewOption('');
    }
  };

  const removeOption = (id: number) => {
    setOptions(options.filter(option => option.id !== id));
  };

  const connectMetamask = async () => {
    // Placeholder for Metamask connection logic
    try {
      if ((window as any).ethereum) {
        window.address = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        console.log((window.address));
        
        setIsMetamaskConnected(true);
      } else {
        alert('Metamask not found. Please install Metamask.');
      }
    } catch (error) {
      console.error('Metamask connection failed', error);
    }
  };

  const submitPrediction = () => {
    // Placeholder for prediction submission logic
    // if (predictionTitle && predictionDescription && options.length > 1) {
    //   console.log('Prediction Submitted', {
    //     title: predictionTitle,
    //     description: predictionDescription,
    //     options: options.map(opt => opt.text)
    //   });
      // Add actual submission logic here
    // Validate prediction before showing token modal
    if (predictionTitle && predictionDescription && options.length > 1) {
        // Show the token modal
        setShowTokenModal(true);
      } else {
        alert('Please fill in all required fields and add at least two options');
      }
  };

  const confirmPrediction = async () => {
    // Actual prediction creation logic
    console.log('Prediction Submitted', {
      title: predictionTitle,
      description: predictionDescription,
      options: options.map(opt => opt.text)
    });
    setShowTokenModal(false);
    if (window.ethereum != undefined) {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner()
      const questContract = new ethers.Contract(contractAddress, pred.abi, signer)
      await (await questContract.transfer("0xFA0e1F9B7fCa4B2d0fAcd724f604c676B633424F", ethers.parseUnits(parseInt("1").toString(), 18))).wait();
      alert('Prediction Topic Added 🎉🎉');
    }
    // router.push('/')
    // Reset form or navigate to another page
  };

  function truncateAddress(address: String = window.address.toString(), startLength: number = 6, endLength: number = 4) {
    if (address.length <= startLength + endLength) {
      return address;

    }
    const start = address.substring(0, startLength);
    const end = address.substring(address.length - endLength); return `${start}...${end}`;
  }


  return (
    <div className="min-h-screen bg-[#0B2213] text-white overflow-hidden">
      {/* Navigation */}
      <nav className="px-8 py-6 flex justify-between items-center">
      <Link href="/">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-2xl font-bold"
        >
          PREDICT
        </motion.div>
        </Link>
        
        <div className="flex items-center gap-6">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            className="text-white/80 hover:text-white"
            href="#"
          >
            MY PREDICTIONS
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            className="text-white/80 hover:text-white"
            href="#"
          >
            MARKETS
          </motion.a>
          <motion.button
            onClick={connectMetamask}
            whileHover={{ scale: 1.05 }}
            className={`px-6 py-2 rounded-md font-medium ${
              isMetamaskConnected 
                ? 'bg-[#44FF73] text-black' 
                : 'border border-[#44FF73] text-[#44FF73]'
            }`}
          >
            {isMetamaskConnected ? truncateAddress() : 'CONNECT METAMASK'}
          </motion.button>
        </div>
      </nav>

      {/* Create Prediction Section */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#1A3B25] rounded-lg p-12"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">
            Create a New <span className="text-[#44FF73]">Prediction</span>
          </h1>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-white/80">Prediction Title</label>
              <input 
                type="text"
                value={predictionTitle}
                onChange={(e) => setPredictionTitle(e.target.value)}
                placeholder="Enter a clear and concise prediction title"
                className="w-full bg-[#2A563A] text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#44FF73]"
              />
            </div>

            <div>
              <label className="block mb-2 text-white/80">Prediction Description</label>
              <textarea 
                value={predictionDescription}
                onChange={(e) => setPredictionDescription(e.target.value)}
                placeholder="Provide context and details about your prediction"
                rows={4}
                className="w-full bg-[#2A563A] text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#44FF73]"
              />
            </div>

            <div>
              <label className="block mb-2 text-white/80">Prediction Options</label>
              {options.map((option) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center mb-2"
                >
                  <input 
                    type="text"
                    value={option.text}
                    readOnly
                    className="flex-grow bg-[#2A563A] text-white px-4 py-2 rounded-md mr-2"
                  />
                  <button
                    onClick={() => removeOption(option.id)}
                    className="bg-red-600/20 text-red-400 px-3 py-2 rounded-md hover:bg-red-600/40"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
              
              <div className="flex">
                <input 
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Add a prediction option"
                  className="flex-grow bg-[#2A563A] text-white px-4 py-2 rounded-md mr-2"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={addOption}
                  className="px-4 py-2 bg-[#44FF73] text-black rounded-md"
                >
                  Add Option
                </motion.button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={submitPrediction}
              className="w-full px-6 py-3 bg-[#44FF73] text-black rounded-md font-medium text-lg mt-6"
            >
              CREATE PREDICTION
            </motion.button>
          </div>
        </motion.div>
      </div>


      <AnimatePresence>
        {showTokenModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-[#1A3B25] rounded-lg p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold mb-4 text-center">
                Prediction Creation Fee
              </h2>
              
              <div className="text-center mb-6">
                <p className="text-white/80 mb-4">
                  Creating a prediction requires <span className="text-[#44FF73] font-bold">1 PRED Token</span>
                </p>
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-16 h-16 text-[#44FF73]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white/60 text-sm">
                  Confirm prediction creation and spend 1 PRED Token
                </p>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowTokenModal(false)}
                  className="flex-1 px-4 py-2 border border-white/20 text-white/80 rounded-md"
                >
                  CANCEL
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={confirmPrediction}
                  className="flex-1 px-4 py-2 bg-[#44FF73] text-black rounded-md font-medium"
                >
                  CONFIRM
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Footer - Same as Landing Page */}
      <footer className="bg-[#0A1F10] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h4 className="text-2xl font-bold mb-4">PREDICT</h4>
              <p className="text-white/60">
                Making blockchain predictions accessible for everyone.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Product</h5>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-[#44FF73]">Features</a></li>
                <li><a href="#" className="hover:text-[#44FF73]">Pricing</a></li>
                <li><a href="#" className="hover:text-[#44FF73]">API</a></li>
                <li><a href="#" className="hover:text-[#44FF73]">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Company</h5>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-[#44FF73]">About</a></li>
                <li><a href="#" className="hover:text-[#44FF73]">Blog</a></li>
                <li><a href="#" className="hover:text-[#44FF73]">Careers</a></li>
                <li><a href="#" className="hover:text-[#44FF73]">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Legal</h5>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-[#44FF73]">Privacy</a></li>
                <li><a href="#" className="hover:text-[#44FF73]">Terms</a></li>
                <li><a href="#" className="hover:text-[#44FF73]">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40">
            <p>© {new Date().getFullYear()} PREDICT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PredictionsPage;