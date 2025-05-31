import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';

const CustomerEngagementCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Sample data - replace with real data
  const [engagementData, setEngagementData] = useState({
    sentiment_auc: 0.72,
    sentimental_volatility: 0.45,
    emotion_consistency: 0.68,
    talk_time_score: 0.55,
    question_score: 0.81,
    final_score: 0.64
  });

  // Band distribution data (percentage of calls in each band)
  const [bandData, setBandData] = useState({
    high: 25,    // 25% of calls in high engagement
    moderate: 45, // 45% of calls in moderate engagement  
    low: 30      // 30% of calls in low engagement
  });

  // Calculate current engagement score (average of all parameters)
  const currentEngagementScore = React.useMemo(() => {
    const scores = Object.values(engagementData);
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return average;
  }, [engagementData]);

  // Real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate real-time data updates (replace with actual API calls)
      setEngagementData(prev => ({
        sentiment_auc: Math.max(0, Math.min(1, prev.sentiment_auc + (Math.random() - 0.5) * 0.02)),
        sentimental_volatility: Math.max(0, Math.min(1, prev.sentimental_volatility + (Math.random() - 0.5) * 0.02)),
        emotion_consistency: Math.max(0, Math.min(1, prev.emotion_consistency + (Math.random() - 0.5) * 0.02)),
        talk_time_score: Math.max(0, Math.min(1, prev.talk_time_score + (Math.random() - 0.5) * 0.02)),
        question_score: Math.max(0, Math.min(1, prev.question_score + (Math.random() - 0.5) * 0.02)),
        final_score: Math.max(0, Math.min(1, prev.final_score + (Math.random() - 0.5) * 0.02))
      }));

      // Simulate band distribution changes
      setBandData(prev => {
        const total = 100;
        const variation = 2;
        return {
          high: Math.max(15, Math.min(40, prev.high + (Math.random() - 0.5) * variation)),
          moderate: Math.max(30, Math.min(60, prev.moderate + (Math.random() - 0.5) * variation)),
          low: Math.max(15, Math.min(40, prev.low + (Math.random() - 0.5) * variation))
        };
      });
    }, 2000); // Update every 2 seconds

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
      name: 'High',
      band: 'H',
      percentage: normalizedBands.high,
      color: '#22c55e', // Green
      startAngle: 0,
      endAngle: highAngle,
      description: 'High Engagement (0-35%)'
    },
    {
      name: 'Moderate',
      band: 'M', 
      percentage: normalizedBands.moderate,
      color: '#eab308', // Yellow
      startAngle: highAngle,
      endAngle: highAngle + moderateAngle,
      description: 'Moderate Engagement (35-65%)'
    },
    {
      name: 'Low',
      band: 'L',
      percentage: normalizedBands.low,
      color: '#ef4444', // Red
      startAngle: highAngle + moderateAngle,
      endAngle: 360,
      description: 'Low Engagement (65-100%)'
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

  // Get engagement level based on score
  const getEngagementLevel = (score) => {
    if (score < 0.35) return { level: 'High', color: 'text-green-400' };
    if (score < 0.65) return { level: 'Moderate', color: 'text-yellow-400' };
    return { level: 'Low', color: 'text-red-400' };
  };

  const engagementLevel = getEngagementLevel(currentEngagementScore);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 className="text-white text-xl font-semibold">Customer Engagement Score</h3>
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
                Engagement score measures customer interaction quality across sentiment, emotion, and participation. Ideal score is below 0.35 for high engagement.
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
              <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="glow-yellow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="glow-hover" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {segments.map((segment, index) => {
              const filterId = segment.color === '#22c55e' ? 'glow-green' : 
                              segment.color === '#eab308' ? 'glow-yellow' : 'glow-red';
              const hoverFilter = hoveredSegment === segment ? 'glow-hover' : filterId;
              
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
            <div className={`text-3xl font-bold mb-1 ${engagementLevel.color}`}>
              {(currentEngagementScore * 100).toFixed(1)}
            </div>
            <div className="text-slate-500 text-sm">{engagementLevel.level}</div>
          </div>
        </div>
        
        {/* Floating decorative dots */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" />
        <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 relative z-10">
        <div className="bg-slate-800/80 rounded-xl p-3 text-center backdrop-blur-sm border border-slate-700/50">
          <div className="text-green-400 text-lg font-bold">
            {Math.round(normalizedBands.high)}%
          </div>
          <div className="text-slate-400 text-xs">High (H)</div>
          <div className="text-slate-500 text-xs mt-1">
            {Math.round(bandData.high)} calls
          </div>
        </div>
        <div className="bg-slate-800/80 rounded-xl p-3 text-center backdrop-blur-sm border border-slate-700/50">
          <div className="text-yellow-400 text-lg font-bold">
            {Math.round(normalizedBands.moderate)}%
          </div>
          <div className="text-slate-400 text-xs">Moderate (M)</div>
          <div className="text-slate-500 text-xs mt-1">
            {Math.round(bandData.moderate)} calls
          </div>
        </div>
        <div className="bg-slate-800/80 rounded-xl p-3 text-center backdrop-blur-sm border border-slate-700/50">
          <div className="text-red-400 text-lg font-bold">
            {Math.round(normalizedBands.low)}%
          </div>
          <div className="text-slate-400 text-xs">Low (L)</div>
          <div className="text-slate-500 text-xs mt-1">
            {Math.round(bandData.low)} calls
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
            <div className="font-medium text-blue-400">{hoveredSegment.percentage.toFixed(1)}% of calls</div>
            <div className="text-slate-300">{hoveredSegment.description}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerEngagementCard;