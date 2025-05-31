'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  // Add a custom style for the glow effect
  useEffect(() => {
    if (!isClient) return;
    
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
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [isClient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, rememberMe });
  };

  // Prevent hydration mismatch by not rendering until client is ready
  if (!isClient) {
    return (
      <div className="flex h-screen w-full bg-gradient-to-b from-[rgb(15,17,55)] to-[rgb(4,6,21)]">
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a0481]/20 to-[#8644ff]/20 z-10" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full px-8">
            <p className="text-white/70 uppercase tracking-widest text-sm mb-2">INSPIRED BY THE FUTURE:</p>
            <h1 className="text-white font-bold text-5xl tracking-wider">INSIGHTS388</h1>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#2a0481] via-[#5d4bff] to-[#8644ff]" />
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[rgb(4,6,21)]">
          <div className="w-full max-w-md">
            <div className="mb-10 text-white">
              <h1 className="text-3xl font-bold mb-2">Nice to see you!</h1>
              <p className="text-gray-400">Enter your email and password to sign in</p>
            </div>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-600 rounded mb-2"></div>
              <div className="h-12 bg-gray-700 rounded mb-6"></div>
              <div className="h-4 bg-gray-600 rounded mb-2"></div>
              <div className="h-12 bg-gray-700 rounded mb-8"></div>
              <div className="h-12 bg-blue-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[rgb(4,6,21)]">
        <div className="w-full max-w-md">
          <div className="mb-10 text-white">
            <h1 className="text-3xl font-bold mb-2">Nice to see you!</h1>
            <p className="text-gray-400">Enter your email and password to sign in</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-white mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
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
                placeholder="Your password"
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
              SIGN IN
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don&apos;t have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;