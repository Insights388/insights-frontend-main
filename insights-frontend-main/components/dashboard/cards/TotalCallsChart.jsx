"use client"

import { useState } from 'react';
import { Phone, Info } from 'lucide-react';

const CallsCard = ({ 
  title = "Total Calls",
  completed = 65,
  target = 100,
  subtitle = "till now",
  icon: CustomIcon = Phone,
  showInfo = true 
}) => {
  const [isDonutHovered, setIsDonutHovered] = useState(false);
  
  // Calculate percentage and remaining
  const percentage = Math.min((completed / target) * 100, 100);
  const remaining = Math.max(target - completed, 0);
  
  // Determine color based on percentage
  const getColor = (percent) => {
    if (percent <= 35) return '#ef4444'; // red-500
    if (percent <= 70) return '#eab308'; // yellow-500
    return '#22c55e'; // green-500
  };
  
  const color = getColor(percentage);
  
  // SVG circle calculations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
  
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <CustomIcon className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-white text-xl font-semibold">{title}</h3>
        </div>
        {showInfo && (
          <button className="p-2 bg-slate-700/50 rounded-full hover:bg-slate-600/50 transition-colors">
            <Info className="w-5 h-5 text-slate-400" />
          </button>
        )}
      </div>
      
      {/* Donut Chart */}
      <div className="flex justify-center mb-8 relative">
        <div 
          className="relative cursor-pointer"
          onMouseEnter={() => setIsDonutHovered(true)}
          onMouseLeave={() => setIsDonutHovered(false)}
        >
          <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#334155"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="12"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
              style={{
                filter: `drop-shadow(0 0 8px ${color}40)`
              }}
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-slate-400 text-sm mb-1">
              {`Total ${title.split(' ')[1] || 'Calls'} made`}
            </div>
            <div className="text-white text-4xl font-bold mb-1">
              {completed}
            </div>
            <div className="text-slate-500 text-sm">{subtitle}</div>
          </div>
          
          {/* Percentage indicator on hover */}
          {isDonutHovered && (
            <div 
              className="absolute top-2 right-2 bg-slate-700 px-2 py-1 rounded-full text-xs font-medium opacity-0 animate-pulse"
              style={{ color, opacity: 1, transition: 'opacity 0.2s' }}
            >
              Total calls : {Math.round(percentage)}%
            </div>
          )}
        </div>
        
        {/* Floating decorative dots */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" />
        <div className="absolute bottom-8 right-6 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-12 right-8 w-1 h-1 bg-pink-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 relative z-10">
        <div className="bg-slate-800/80 rounded-xl p-4 text-center backdrop-blur-sm border border-slate-700/50">
          <div className="text-slate-400 text-sm mb-1">Remaining</div>
          <div className="text-white text-2xl font-bold">{remaining}</div>
        </div>
        <div className="bg-slate-800/80 rounded-xl p-4 text-center backdrop-blur-sm border border-slate-700/50">
          <div className="text-slate-400 text-sm mb-1">Target</div>
          <div className="text-white text-2xl font-bold">{target}</div>
        </div>
      </div>
    </div>
  );
};

export default CallsCard;