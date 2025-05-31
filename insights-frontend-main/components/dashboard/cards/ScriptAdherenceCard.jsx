import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';

const ScriptAdherenceCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Sample data - replace with real data
  const [adherenceData, setAdherenceData] = useState({
    currentScore: 0.78, // Current running script adherence score
    totalCalls: 147,
    adherentCalls: 115
  });

  // Band distribution data (percentage of calls in each adherence band)
  const [bandData, setBandData] = useState({
    high: 65,     // 65% of calls with high adherence (0.8-1.0)
    moderate: 25, // 25% of calls with moderate adherence (0.5-0.8)
    low: 10       // 10% of calls with low adherence (0.0-0.5)
  });

  // Real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate real-time data updates (replace with actual API calls)
      setAdherenceData(prev => ({
        currentScore: Math.max(0, Math.min(1, prev.currentScore + (Math.random() - 0.5) * 0.02)),
        totalCalls: prev.totalCalls + Math.floor(Math.random() * 2), // Occasionally add new calls
        adherentCalls: prev.adherentCalls + Math.floor(Math.random() * 2)
      }));

      // Simulate band distribution changes
      setBandData(prev => {
        const variation = 1.5;
        return {
          high: Math.max(50, Math.min(80, prev.high + (Math.random() - 0.5) * variation)),
          moderate: Math.max(15, Math.min(35, prev.moderate + (Math.random() - 0.5) * variation)),
          low: Math.max(5, Math.min(25, prev.low + (Math.random() - 0.5) * variation))
        };
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(timer);
  }, []);

  // Normalize band percentages to ensure they add up to 100%
  const total = bandData.high + bandData.moderate + bandData.low;
  const normalizedBands = {
    high: (bandData.high / total) * 100,
    moderate: (bandData.moderate / total) * 100,
    low: (bandData.low / total) * 100
  };

  // SVG donut chart parameters
  const size = 200;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // Calculate segment paths
  const createArc = (startAngle, endAngle) => {
    const start = polarToCartesian(size/2, size/2, radius, endAngle);
    const end = polarToCartesian(size/2, size/2, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  // Calculate angles for each segment
  const highAngle = (normalizedBands.high / 100) * 360;
  const moderateAngle = (normalizedBands.moderate / 100) * 360;
  const lowAngle = (normalizedBands.low / 100) * 360;

  const segments = [
    {
      name: 'High Adherence',
      band: 'H',
      percentage: normalizedBands.high,
      color: '#22c55e', // Green
      startAngle: 0,
      endAngle: highAngle,
      description: 'High Adherence (80-100%)',
      range: '0.8-1.0'
    },
    {
      name: 'Moderate Adherence',
      band: 'M', 
      percentage: normalizedBands.moderate,
      color: '#eab308', // Yellow
      startAngle: highAngle,
      endAngle: highAngle + moderateAngle,
      description: 'Moderate Adherence (50-80%)',
      range: '0.5-0.8'
    },
    {
      name: 'Low Adherence',
      band: 'L',
      percentage: normalizedBands.low,
      color: '#ef4444', // Red
      startAngle: highAngle + moderateAngle,
      endAngle: 360,
      description: 'Low Adherence (0-50%)',
      range: '0.0-0.5'
    }
  ];

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.pageX, y: e.pageY });
  };

  const handleSegmentHover = (segment, e) => {
    setHoveredSegment(segment);
    handleMouseMove(e);
  };

  const handleSegmentLeave = () => {
    setHoveredSegment(null);
  };

  // Get adherence level based on score
  const getAdherenceLevel = (score) => {
    if (score >= 0.8) return { level: 'High', color: 'text-green-400' };
    if (score >= 0.5) return { level: 'Moderate', color: 'text-yellow-400' };
    return { level: 'Low', color: 'text-red-400' };
  };

  const adherenceLevel = getAdherenceLevel(adherenceData.currentScore);

  // Calculate adherence percentage
  const adherencePercentage = adherenceData.totalCalls > 0 
    ? ((adherenceData.adherentCalls / adherenceData.totalCalls) * 100).toFixed(1)
    : 0;

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd"/>
            </svg>
          </div>
          <h3 className="text-white text-xl font-semibold">Script Adherence Score</h3>
        </div>
        <div 
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <button className="p-2 bg-slate-700/50 rounded-full hover:bg-slate-600/50 transition-colors">
            <Info className="w-5 h-5 text-slate-400" />
          </button>
          {showTooltip && (
            <div className="absolute top-12 right-0 bg-slate-800 border border-slate-600 rounded-lg p-3 w-72 z-50 animate-fade-in">
              <p className="text-xs text-slate-300">
                Script adherence measures how closely agents follow prescribed conversation flows. Ideal score is above 0.8 for consistent service quality.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Donut Chart */}
      <div className="flex justify-center mb-8 relative">
        <div className="relative" onMouseMove={handleMouseMove}>
          <svg width={size} height={size} className="transform -rotate-90">
            {/* SVG Filters for Glow Effects */}
            <defs>
              <filter id="glow-green-script" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="glow-yellow-script" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="glow-red-script" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="glow-hover-script" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {segments.map((segment, index) => {
              const filterId = segment.color === '#22c55e' ? 'glow-green-script' : 
                              segment.color === '#eab308' ? 'glow-yellow-script' : 'glow-red-script';
              const hoverFilter = hoveredSegment === segment ? 'glow-hover-script' : filterId;
              
              return (
                <g key={index}>
                  <path
                    d={createArc(segment.startAngle, segment.endAngle)}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth={hoveredSegment === segment ? strokeWidth + 3 : strokeWidth}
                    strokeLinecap="butt"
                    className="cursor-pointer transition-all duration-300"
                    filter={`url(#${hoverFilter})`}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      handleSegmentHover(segment, e);
                    }}
                    onMouseLeave={(e) => {
                      e.stopPropagation();
                      handleSegmentLeave();
                    }}
                    style={{ 
                      opacity: hoveredSegment === segment ? 1 : 0.9,
                      filter: hoveredSegment === segment ? `url(#${hoverFilter}) brightness(1.2)` : `url(#${filterId})`
                    }}
                  />
                </g>
              );
            })}
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-slate-400 text-sm mb-1">Current Score</div>
            <div className={`text-3xl font-bold mb-1 ${adherenceLevel.color}`}>
              {(adherenceData.currentScore * 100).toFixed(1)}%
            </div>
            <div className="text-slate-500 text-sm">{adherenceLevel.level}</div>
          </div>
        </div>
        
        {/* Floating decorative dots */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse" />
        <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-indigo-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Additional Metrics */}
      <div className="mt-4 pt-4 border-t border-slate-700/50 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-slate-400 text-xs mb-1">Total Calls Today</div>
            <div className="text-white text-lg font-semibold">{adherenceData.totalCalls}</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-slate-400 text-xs mb-1">Adherent Calls</div>
            <div className="text-white text-lg font-semibold">
              {adherenceData.adherentCalls} 
              <span className="text-xs text-slate-400 ml-1">({adherencePercentage}%)</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hover tooltip */}
      {hoveredSegment && (
        <div 
          className="fixed bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl z-50 pointer-events-none border border-gray-600 backdrop-blur-sm"
          style={{ 
            left: mousePosition.x + 15, 
            top: mousePosition.y - 60,
            transform: 'translateX(-50%)',
            background: 'rgba(17, 24, 39, 0.95)'
          }}
        >
          <div className="text-sm font-medium mb-1">{hoveredSegment.name} ({hoveredSegment.band})</div>
          <div className="text-xs space-y-1">
            <div className="font-medium text-purple-400">{hoveredSegment.percentage.toFixed(1)}% of calls</div>
            <div className="text-slate-300">Score Range: {hoveredSegment.range}</div>
            <div className="text-slate-400">{Math.round((hoveredSegment.percentage / 100) * adherenceData.totalCalls)} calls</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScriptAdherenceCard;