"use client"
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

interface PredictionOption {
  id: number;
  text: string;
  voters: number;
  chanceOfWinning: number;
}

interface TrendingPrediction {
  id: number;
  title: string;
  description: string;
  options: PredictionOption[];
  totalVoters: number;
}

const TrendingPredictionsPage: React.FC = () => {
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState<TrendingPrediction | null>(null);
  const [selectedOption, setSelectedOption] = useState<PredictionOption | null>(null);
  const [betAmount, setBetAmount] = useState('');
  const [showBetModal, setShowBetModal] = useState(false);
  
  // New states for daily claim and withdraw
  const [dailyClaimAmount, setDailyClaimAmount] = useState(5.25);
  const [withdrawAmount, setWithdrawAmount] = useState(250.75);

  // Sample trending predictions data
  const trendingPredictions: TrendingPrediction[] = [
    {
      id: 1,
      title: "Will Bitcoin Reach $100,000 in 2024?",
      description: "Predict the potential price surge of Bitcoin in the upcoming year",
      totalVoters: 5420,
      options: [
        { 
          id: 1, 
          text: "Yes, Bitcoin will exceed $100,000", 
          voters: 3240,
          chanceOfWinning: 59.7
        },
        { 
          id: 2, 
          text: "No, Bitcoin will stay below $100,000", 
          voters: 2180,
          chanceOfWinning: 40.3
        }
      ]
    },
    {
      id: 2,
      title: "Will AI Stocks Outperform Tech Giants in 2024?",
      description: "Predict the performance of AI companies compared to major tech corporations",
      totalVoters: 4230,
      options: [
        { 
          id: 1, 
          text: "AI Stocks Will Outperform", 
          voters: 2670,
          chanceOfWinning: 63.1
        },
        { 
          id: 2, 
          text: "Tech Giants Will Maintain Lead", 
          voters: 1560,
          chanceOfWinning: 36.9
        }
      ]
    }
  ];

  const connectMetamask = async () => {
    try {
      if ((window as any).ethereum) {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        setIsMetamaskConnected(true);
      } else {
        alert('Metamask not found. Please install Metamask.');
      }
    } catch (error) {
      console.error('Metamask connection failed', error);
    }
  };

  const openBetModal = (prediction: TrendingPrediction, option: PredictionOption) => {
    setSelectedPrediction(prediction);
    setSelectedOption(option);
    setShowBetModal(true);
  };

  const placeBet = () => {
    if (!selectedPrediction || !selectedOption) return;

    const parsedBetAmount = parseFloat(betAmount);
    
    if (isNaN(parsedBetAmount) || parsedBetAmount <= 0) {
      alert('Please enter a valid bet amount');
      return;
    }

    console.log('Bet Placed', {
      predictionTitle: selectedPrediction.title,
      selectedOption: selectedOption.text,
      betAmount: parsedBetAmount
    });

    // Reset modal state
    setShowBetModal(false);
    setBetAmount('');
    setSelectedPrediction(null);
    setSelectedOption(null);
  };

  const handleDailyClaim = () => {
    console.log('Daily claim of', dailyClaimAmount, 'CC Tokens');
    alert(`Claimed ${dailyClaimAmount} CC Tokens`);
  };

  const handleWithdraw = () => {
    console.log('Withdrawing', withdrawAmount, 'CC Tokens');
    alert(`Withdrawn ${withdrawAmount} CC Tokens`);
  };

  return (
    <div className="min-h-screen bg-[#0B2213] text-white overflow-hidden relative">
      {/* Navigation - SAME AS PREVIOUS PAGE */}
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
            {isMetamaskConnected ? 'CONNECTED' : 'CONNECT METAMASK'}
          </motion.button>
        </div>
      </nav>

      {/* Main Content with Sidebar */}
      <div className="flex max-w-7xl mx-auto px-8 py-16">
        {/* Trending Predictions Section */}
        <div className="flex-grow pr-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Trending <span className="text-[#44FF73]">Predictions</span>
          </motion.h1>

          <div className="space-y-8">
            {trendingPredictions.map((prediction) => (
              <motion.div
                key={prediction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1A3B25] rounded-lg p-8"
              >
                <h2 className="text-2xl font-bold mb-4">{prediction.title}</h2>
                <p className="text-white/70 mb-6">{prediction.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm text-white/60">
                    Total Voters: {prediction.totalVoters}
                  </p>
                </div>

                <div className="space-y-4">
                  {prediction.options.map((option) => (
                    <div 
                      key={option.id} 
                      className="flex items-center justify-between bg-[#2A563A] p-4 rounded-md"
                    >
                      <div className="flex-grow">
                        <div className="flex justify-between items-center">
                          <span>{option.text}</span>
                          <span className="text-[#44FF73] font-bold">
                            {option.chanceOfWinning.toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-[#0B2213] rounded-full h-2 mt-2">
                          <div 
                            className="bg-[#44FF73] h-2 rounded-full" 
                            style={{ width: `${option.chanceOfWinning}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-white/60 mt-1">
                          {option.voters} Voters
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => openBetModal(prediction, option)}
                        className="ml-4 px-4 py-2 bg-[#44FF73] text-black rounded-md"
                      >
                        Predict
                      </motion.button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar with Daily Claim and Withdraw */}
        <div className="w-80 bg-[#1A3B25] rounded-lg p-6 h-fit sticky top-16">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Daily Claim</h3>
              <span className="text-[#44FF73] font-medium">{dailyClaimAmount} CC</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleDailyClaim}
              className="w-full px-4 py-3 bg-[#44FF73] text-black rounded-md font-medium"
            >
              CLAIM TOKENS
            </motion.button>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Withdraw</h3>
              <span className="text-[#44FF73] font-medium">{withdrawAmount} CC</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleWithdraw}
              className="w-full px-4 py-3 border border-[#44FF73] text-[#44FF73] rounded-md font-medium"
            >
              WITHDRAW
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bet Modal - SAME AS PREVIOUS PAGE */}
      <AnimatePresence>
        {showBetModal && (
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
                Place Your Prediction
              </h2>
              
              <div className="mb-6">
                <p className="text-white/80 text-center mb-2">
                  {selectedPrediction?.title}
                </p>
                <p className="text-[#44FF73] text-center font-bold">
                  {selectedOption?.text}
                </p>
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-white/80">Bet Amount (CC Tokens)</label>
                <input 
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder="Enter bet amount"
                  className="w-full bg-[#2A563A] text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#44FF73]"
                />
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowBetModal(false)}
                  className="flex-1 px-4 py-2 border border-white/20 text-white/80 rounded-md"
                >
                  CANCEL
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={placeBet}
                  className="flex-1 px-4 py-2 bg-[#44FF73] text-black rounded-md font-medium"
                >
                  PLACE BET
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer - SAME AS PREVIOUS PAGE */}
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

export default TrendingPredictionsPage;