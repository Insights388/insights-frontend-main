'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add a custom style for the glow effect
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes borderGlow {
        0% { box-shadow: 0 0 15px rgba(77, 93, 255, 0.3); border-color: rgba(77, 93, 255, 0.3); }
        50% { box-shadow: 0 0 20px rgba(77, 93, 255, 0.5); border-color: rgba(77, 93, 255, 0.6); }
        100% { box-shadow: 0 0 15px rgba(77, 93, 255, 0.3); border-color: rgba(77, 93, 255, 0.3); }
      }
      
      .input-field-glow {
        animation: borderGlow 3s infinite;
      }
      
      .social-icon-glow {
        transition: all 0.3s ease;
      }
      
      .social-icon-glow:hover {
        box-shadow: 0 0 25px rgba(77, 93, 255, 0.7);
        transform: translateY(-3px);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log({ name, email, password, rememberMe });
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-[rgb(15,17,55)] to-[rgb(4,6,21)]">
      {/* Left side - Background image with tunnel effect */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0481]/20 to-[#8644ff]/20 z-10" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full px-8">
          <p className="text-white/70 uppercase tracking-widest text-sm mb-2">INSPIRED BY THE FUTURE:</p>
          <h1 className="text-white font-bold text-5xl tracking-wider">INSIGHTS388</h1>
        </div>
        <Image 
          src="/purple-tunnel.png" 
          alt="Futuristic purple tunnel" 
          fill 
          className="object-cover"
          priority
        />
      </div>

      {/* Right side - Signup form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[rgb(4,6,21)] overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="mb-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Welcome!</h1>
            <p className="text-gray-400">Register to get access to your dashboard</p>
          </div>
          
          {/* Social Login Buttons */}
          <div className="mb-6">
            <p className="text-white font-medium text-center mb-4">Register with</p>
            <div className="flex justify-center space-x-4 mb-6">
              <button className="bg-[rgba(15,17,55,0.4)] backdrop-blur-md border border-[#4d5dff]/30 p-3 rounded-xl text-white social-icon-glow">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                </svg>
              </button>
              <button className="bg-[rgba(15,17,55,0.4)] backdrop-blur-md border border-[#4d5dff]/30 p-3 rounded-xl text-white social-icon-glow">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                </svg>
              </button>
              <button className="bg-[rgba(15,17,55,0.4)] backdrop-blur-md border border-[#4d5dff]/30 p-3 rounded-xl text-white social-icon-glow">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 488 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
              </button>
            </div>
            <div className="flex items-center mb-6">
              <div className="flex-grow h-px bg-gray-600/30"></div>
              <p className="px-4 text-gray-400 font-medium">or</p>
              <div className="flex-grow h-px bg-gray-600/30"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="block text-white mb-2">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name..."
                className="w-full bg-[rgba(15,17,55,0.4)] backdrop-blur-md border border-[#4d5dff]/30 rounded-xl p-3 text-white focus:border-[#4d5dff] focus:outline-none transition-all duration-300 input-field-glow"
                required
              />
            </div>
            
            <div className="mb-5">
              <label htmlFor="email" className="block text-white mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address..."
                className="w-full bg-[rgba(15,17,55,0.4)] backdrop-blur-md border border-[#4d5dff]/30 rounded-xl p-3 text-white focus:border-[#4d5dff] focus:outline-none transition-all duration-300 input-field-glow"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-white mb-2">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password..."
                className="w-full bg-[rgba(15,17,55,0.4)] backdrop-blur-md border border-[#4d5dff]/30 rounded-xl p-3 text-white focus:border-[#4d5dff] focus:outline-none transition-all duration-300 input-field-glow"
                required
              />
            </div>

            <div className="mb-8 flex items-center">
              <div className="flex items-center">
                <div 
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer transition-colors duration-200 ${rememberMe ? 'bg-blue-500 border-blue-500' : 'border-gray-500'}`}
                >
                  {rememberMe && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <label className="ml-2 text-sm text-gray-400 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition duration-300 shadow-[0_4px_15px_rgba(56,91,255,0.35)] hover:shadow-[0_8px_25px_rgba(56,91,255,0.5)]"
            >
              SIGN UP
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?               <Link href="/login" className="text-blue-500 hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;