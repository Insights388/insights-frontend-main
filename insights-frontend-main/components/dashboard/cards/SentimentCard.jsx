"use client"

import React, { useState } from 'react';
import { Brain, Info } from 'lucide-react';

const SimpleSentimentCard = ({ 
  title = "Sentiment Analysis",
  currentScore = 0.22,
  positiveCount = 45,
  neutralCount = 25, 
  negativeCount = 30,
  totalCalls = 100,
  icon: CustomIcon = Brain,
  showInfo = true 
}) => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Simple safe calculations
  const total = Math.max(1, totalCalls || 1);
  const positive = Math.max(0, positiveCount || 0);
  const neutral = Math.max(0, neutralCount || 0);
  const negative = Math.max(0, negativeCount || 0);
  const score = Math.min(1, Math.max(0, currentScore || 0));
  
  // Simple color logic
  const getScoreColor = () => {
    if (score >= 0.65) return '#22c55e';
    if (score >= 0.35) return '#eab308';
    return '#ef4444';
  };
  
  const getScoreLabel = () => {
    if (score >= 0.65) return 'Positive';
    if (score >= 0.35) return 'Neutral';
    return 'Negative';
  };
  
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <CustomIcon className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-white text-xl font-semibold">{title}</h3>
        </div>
        {showInfo && (
          <div className="relative">
            <button 
              className="p-2 bg-slate-700/50 rounded-full hover:bg-slate-600/50 transition-colors"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Info className="w-5 h-5 text-slate-400" />
            </button>
            {showTooltip && (
              <div className="absolute top-12 right-0 bg-slate-800 border border-slate-600 rounded-lg p-3 w-64 z-50">
                <p className="text-xs text-slate-300">
                  Sentiment score measures call quality: 0.65+ is ideal (positive), 0.35-0.65 is neutral, below 0.35 needs attention.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Simple Circle Display */}
      <div className="flex justify-center mb-8 relative">
        <div className="relative">
          <div className="w-48 h-48 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center">
            {/* Center content */}
            <div className="text-center">
              <div className="text-slate-400 text-sm mb-1">Current Sentiment</div>
              <div className="text-white text-4xl font-bold mb-1">
                {Math.round(score * 100)}
              </div>
              <div className="text-slate-500 text-sm">today</div>
              <div 
                className="text-xs font-medium mt-1 px-2 py-1 rounded-full"
                style={{ 
                  backgroundColor: `${getScoreColor()}20`,
                  color: getScoreColor()
                }}
              >
                {getScoreLabel()}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 relative z-10">
        <div className="bg-slate-800/80 rounded-xl p-3 text-center backdrop-blur-sm border border-slate-700/50">
          <div className="text-green-400 text-lg font-bold">{positive}</div>
          <div className="text-slate-400 text-xs">Positive</div>
        </div>
        <div className="bg-slate-800/80 rounded-xl p-3 text-center backdrop-blur-sm border border-slate-700/50">
          <div className="text-yellow-400 text-lg font-bold">{neutral}</div>
          <div className="text-slate-400 text-xs">Neutral</div>
        </div>
        <div className="bg-slate-800/80 rounded-xl p-3 text-center backdrop-blur-sm border border-slate-700/50">
          <div className="text-red-400 text-lg font-bold">{negative}</div>
          <div className="text-slate-400 text-xs">Negative</div>
        </div>
      </div>
    </div>
  );
};

export default SimpleSentimentCard;