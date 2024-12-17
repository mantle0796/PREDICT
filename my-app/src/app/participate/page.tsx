"use client"
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { BrowserProvider, ethers } from 'ethers';
import pred from "@/app/contractInfo/abi.json"
import { contractAddress } from "@/app/contractInfo/address.json"
declare global {
  interface Window {
    ethereum?: any; // Declare the ethereum object
    address?: any;
  }
}


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

  // Sample trending predictions data with updated state management
  const [trendingPredictions, setTrendingPredictions] = useState<TrendingPrediction[]>([
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
  ]);

  const connectMetamask = async () => {
    try {
      if ((window as any).ethereum) {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner()
        window.address = await signer.address;
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

  const placeBet = async () => {
    if (!selectedPrediction || !selectedOption) return;

    const parsedBetAmount = parseFloat(betAmount);

    if (isNaN(parsedBetAmount) || parsedBetAmount <= 0) {
      alert('Please enter a valid bet amount');
      return;
    }
    await makeBet(parsedBetAmount);
    // Update the prediction data
    const updatedPredictions = trendingPredictions.map(prediction => {
      if (prediction.id === selectedPrediction.id) {
        return {
          ...prediction,
          totalVoters: prediction.totalVoters + 1,
          options: prediction.options.map(option => {
            if (option.id === selectedOption.id) {
              return {
                ...option,
                voters: option.voters + 1,
                chanceOfWinning: calculateNewChanceOfWinning(prediction, option)
              };
            }
            return {
              ...option,
              chanceOfWinning: calculateNewChanceOfWinning(prediction, option, selectedOption.id)
            };
          })
        };
      }
      return prediction;
    });

    setTrendingPredictions(updatedPredictions);

    // Reset modal state
    setShowBetModal(false);
    setBetAmount('');
    setSelectedPrediction(null);
    setSelectedOption(null);
  };

  const makeBet = async (amount: any) => {
    if (window.ethereum != undefined) {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner()
      const questContract = new ethers.Contract(contractAddress, pred.abi, signer)
      await (await questContract.transfer("0xFA0e1F9B7fCa4B2d0fAcd724f604c676B633424F", ethers.parseUnits(parseInt(amount).toString(), 18))).wait();
      alert('PLACED BET SUCCESSFULLY!!');
    }
  };

  // Calculate new chance of winning when a bet is placed
  const calculateNewChanceOfWinning = (
    prediction: TrendingPrediction,
    currentOption: PredictionOption,
    selectedOptionId?: number
  ) => {
    const totalVoters = prediction.totalVoters + 1;

    if (selectedOptionId) {
      // Adjust other option's chance when a bet is placed
      return (currentOption.voters / totalVoters) * 100;
    }

    // When initial percentage is calculated
    return (currentOption.voters / totalVoters) * 100;
  };

  const handleDailyClaim = () => {
    console.log('Daily claim of', dailyClaimAmount, 'CC Tokens');
    alert(`Claimed ${dailyClaimAmount} PRED Tokens`);
  };

  const handleWithdraw = async () => {
    console.log('Withdrawing', withdrawAmount, 'CC Tokens');
    if (window.ethereum != undefined) {
      const amount = withdrawAmount.toString();
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner()
      const address = window.address.toString();
      const questContract = new ethers.Contract(contractAddress, pred.abi, signer)
      await (await questContract.mint(address, ethers.parseUnits(parseInt(amount).toString(), 18))).wait();
    }
    alert(`Withdrawn ${withdrawAmount} PRED Tokens`);
  };

  function truncateAddress(address: String = window.address.toString(), startLength: number = 6, endLength: number = 4) {
    if (address.length <= startLength + endLength) {
      return address;

    }
    const start = address.substring(0, startLength);
    const end = address.substring(address.length - endLength); return `${start}...${end}`;
  }

return (
  <div className="min-h-screen bg-[#0B2213] text-white overflow-hidden relative">
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
          className={`px-6 py-2 rounded-md font-medium ${isMetamaskConnected
            ? 'bg-[#44FF73] text-black'
            : 'border border-[#44FF73] text-[#44FF73]'
            }`}
        >
          {isMetamaskConnected ? truncateAddress() : 'CONNECT METAMASK'}
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

              {/* Single Bar Visualization */}
              <div className="w-full bg-[#0B2213] rounded-full h-10 overflow-hidden relative mb-4">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-red-600"
                  style={{
                    width: `${prediction.options[1].chanceOfWinning}%`,
                    backgroundColor: 'rgb(220, 38, 38)'
                  }}
                />
                <div
                  className="absolute right-0 top-0 bottom-0 bg-green-600"
                  style={{
                    width: `${prediction.options[0].chanceOfWinning}%`,
                    backgroundColor: 'rgb(34, 197, 94)'
                  }}
                />
                <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/20 transform -translate-x-1/2 z-10" />
              </div>

              {/* Option Buttons */}
              <div className="flex justify-between">
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center">
                    <span>{prediction.options[1].text}</span>
                    <span className="text-red-400 font-bold">
                      {prediction.options[1].chanceOfWinning.toFixed(1)}%
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => openBetModal(prediction, prediction.options[1])}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md"
                  >
                    Predict No
                  </motion.button>
                </div>
                <div className="flex-1 text-right">
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 font-bold">
                      {prediction.options[0].chanceOfWinning.toFixed(1)}%
                    </span>
                    <span>{prediction.options[0].text}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => openBetModal(prediction, prediction.options[0])}
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md"
                  >
                    Predict Yes
                  </motion.button>
                </div>
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
            <span className="text-[#44FF73] font-medium">{dailyClaimAmount} PRED</span>
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
            <span className="text-[#44FF73] font-medium">{withdrawAmount} PRED</span>
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

    {/* Bet Modal */}
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
              <p className={`text-center font-bold ${selectedOption?.id === 1 ? 'text-green-400' : 'text-red-400'
                }`}>
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
                className={`flex-1 px-4 py-2 rounded-md font-medium ${selectedOption?.id === 1
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                  }`}
              >
                PLACE BET
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
};

export default TrendingPredictionsPage;