"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
}

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: delay
      }}
    >
      {children}
    </motion.div>
  );
};

const LandingPage: React.FC = () => {
  const features: Feature[] = [
    {
      title: "Real-time Analysis",
      description: "Get instant insights from our advanced blockchain analytics engine",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      )
    },
    {
      title: "Secure Platform",
      description: "Enterprise-grade security with end-to-end encryption",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      )
    },
    {
      title: "Smart Predictions",
      description: "AI-powered predictions with up to 95% accuracy",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path d="M12 8v4l3 3" />
        </svg>
      )
    }
  ];

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
            HOW IT WORKS
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            className="text-white/80 hover:text-white"
            href="#"
          >
            PRICING
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            className="text-white/80 hover:text-white"
            href="#"
          >
            FAQS
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            className="text-white/80 hover:text-white"
            href="#"
          >
            BLOG
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 text-white/90 hover:text-white"
            type="button"
          >
            LOG IN
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-6 py-2 bg-[#44FF73] text-black rounded-md font-medium"
            type="button"
          >
            GET STARTED
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 pt-20 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-8xl font-bold mb-6">
            <span className="text-white">PREDICTIVE</span>
            <br />
            <span className="text-[#44FF73]">ANALYTICS</span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Make informed decisions with blockchain-powered predictions.
            Access real-time insights without complexity, so you can focus
            on growing your business.
          </p>

         <div className='p-4'>
         <Link href="/prediction">
         <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 bg-[#44FF73] text-black rounded-md font-medium text-lg"
            type="button"
          >
            CREATE PREDICTION
          </motion.button>
         </Link>
         </div>
        <Link href="/participate">
        <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 bg-[#44FF73] text-black rounded-md font-medium text-lg"
            type="button"
          >
            PARTICIPATE
          </motion.button>
        </Link>
        </motion.div>

        {/* Mountain Illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16"
        >
          <svg viewBox="0 0 1200 400" className="w-full">
            {/* Background Mountains */}
            <path 
              d="M0 400 L300 150 L600 350 L900 100 L1200 400 Z" 
              fill="#1A3B25"
            />
            {/* Snow-capped Mountains */}
            <path 
              d="M400 400 L600 200 L800 400 Z" 
              fill="#B4E1E7"
            />
            {/* Trees */}
            {[...Array(20)].map((_, i) => (
              <path
                key={i}
                d={`M${50 + i * 60} 400 L${65 + i * 60} 380 L${80 + i * 60} 400 Z`}
                fill="#2A563A"
              />
            ))}
            {/* Sun */}
            <circle cx="900" cy="150" r="30" fill="#FF6B4A" />
            {/* Clouds */}
            <path 
              d="M100 100 Q130 80 160 100 Q190 120 220 100" 
              stroke="#FFB4A1" 
              fill="none" 
              strokeWidth="2"
            />
            <path 
              d="M800 150 Q830 130 860 150 Q890 170 920 150" 
              stroke="#FFB4A1" 
              fill="none" 
              strokeWidth="2"
            />
          </svg>
        </motion.div>

        {/* Calculate Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 right-8"
        >
          <button 
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-md"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            CALCULATE YOUR PREDICTION
          </button>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="relative">
        <FloatingElement delay={0}>
          <div className="absolute top-40 left-20 w-8 h-8 rounded-full bg-[#44FF73]/20" />
        </FloatingElement>
        <FloatingElement delay={1}>
          <div className="absolute top-60 right-40 w-12 h-12 rounded-full bg-[#FF6B4A]/20" />
        </FloatingElement>
        <FloatingElement delay={2}>
          <div className="absolute top-80 left-1/3 w-6 h-6 rounded-full bg-[#B4E1E7]/20" />
        </FloatingElement>
      </div>

      {/* Why Us Section */}
      <section className="max-w-7xl mx-auto px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">Why Choose <span className="text-[#44FF73]">PREDICT</span></h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Our platform combines advanced blockchain technology with intuitive design to deliver
            unparalleled predictive analytics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#1A3B25] p-8 rounded-lg hover:bg-[#2A563A] transition-colors"
            >
              <div className="text-[#44FF73] mb-4">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
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

export default LandingPage;