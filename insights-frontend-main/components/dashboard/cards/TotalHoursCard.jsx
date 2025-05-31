import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';

const TotalHoursCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Sample data - replace with real data
  const [talkTimeData, setTalkTimeData] = useState({
    customerSpeech: 45,
    agentSpeech: 35,
    silence: 20
  });

  const [totalHours, setTotalHours] = useState({ hours: 6, minutes: 32 });

  // Real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate real-time data updates (replace with actual API calls)
      setTalkTimeData(prev => ({
        customerSpeech: Math.max(20, Math.min(60, prev.customerSpeech + (Math.random() - 0.5) * 2)),
        agentSpeech: Math.max(20, Math.min(60, prev.agentSpeech + (Math.random() - 0.5) * 2)),
        silence: Math.max(10, Math.min(40, prev.silence + (Math.random() - 0.5) * 2))
      }));

      // Update total hours (simulate time passing)
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);
      const diffMs = now - startOfDay;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      setTotalHours({ 
        hours: Math.max(0, diffHours), 
        minutes: Math.max(0, diffMinutes) 
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate actual time for each segment
  const calculateSegmentTime = (percentage) => {
    const totalMinutes = totalHours.hours * 60 + totalHours.minutes;
    const segmentMinutes = Math.round((percentage / 100) * totalMinutes);
    const hours = Math.floor(segmentMinutes / 60);
    const minutes = segmentMinutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  // Normalize percentages to ensure they add up to 100%
  const total = talkTimeData.customerSpeech + talkTimeData.agentSpeech + talkTimeData.silence;
  const normalizedData = {
    customerSpeech: (talkTimeData.customerSpeech / total) * 100,
    agentSpeech: (talkTimeData.agentSpeech / total) * 100,
    silence: (talkTimeData.silence / total) * 100
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

  // Calculate angles for each segment - connected without gaps
  const customerAngle = (normalizedData.customerSpeech / 100) * 360;
  const agentAngle = (normalizedData.agentSpeech / 100) * 360;
  const silenceAngle = (normalizedData.silence / 100) * 360;

  const segments = [
    {
      name: 'Customer Speech',
      percentage: normalizedData.customerSpeech,
      time: calculateSegmentTime(normalizedData.customerSpeech),
      color: '#eab308', // Yellow to match other cards
      startAngle: 0,
      endAngle: customerAngle
    },
    {
      name: 'Agent Speech',
      percentage: normalizedData.agentSpeech,
      time: calculateSegmentTime(normalizedData.agentSpeech),
      color: '#22c55e', // Green to match other cards
      startAngle: customerAngle,
      endAngle: customerAngle + agentAngle
    },
    {
      name: 'Silence',
      percentage: normalizedData.silence,
      time: calculateSegmentTime(normalizedData.silence),
      color: '#f97316', // Orange to match other cards
      startAngle: customerAngle + agentAngle,
      endAngle: 360
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

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
          </div>
          <h3 className="text-white text-xl font-semibold">Total Hours + Talk-time Split</h3>
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
                Talk-time analysis shows conversation quality: Ideal ratio is 60% customer, 35% agent, 5% silence for effective communication.
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
              <filter id="glow-yellow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
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
              const filterId = segment.color === '#eab308' ? 'glow-yellow' : 
                              segment.color === '#22c55e' ? 'glow-green' : 'glow-orange';
              const hoverFilter = hoveredSegment === segment ? 'glow-hover' : filterId;
              
              return (
                <g key={index}>
                  {/* Main arc with straight ends and glow */}
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
            <div className="text-slate-400 text-sm mb-1">Total Hours Today</div>
            <div className="text-white text-3xl font-bold mb-1">
              {totalHours.hours}h {totalHours.minutes.toString().padStart(2, '0')}m
            </div>
            <div className="text-slate-500 text-sm">till now</div>
          </div>
        </div>
        
        {/* Floating decorative dots */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400/30 rounded-full animate-pulse" />
        <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-yellow-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Stats Grid - matching other cards */}
      <div className="grid grid-cols-3 gap-3 relative z-10">
        <div className="bg-slate-800/80 rounded-xl p-3 text-center backdrop-blur-sm border border-slate-700/50">
          <div className="text-yellow-400 text-lg font-bold">
            {Math.round(normalizedData.customerSpeech)}%
          </div>
          <div className="text-slate-400 text-xs">Customer</div>
          <div className="text-slate-500 text-xs mt-1">
            {calculateSegmentTime(normalizedData.customerSpeech)}
          </div>
        </div>
        <div className="bg-slate-800/80 rounded-xl p-3 text-center backdrop-blur-sm border border-slate-700/50">
          <div className="text-green-400 text-lg font-bold">
            {Math.round(normalizedData.agentSpeech)}%
          </div>
          <div className="text-slate-400 text-xs">Agent</div>
          <div className="text-slate-500 text-xs mt-1">
            {calculateSegmentTime(normalizedData.agentSpeech)}
          </div>
        </div>
        <div className="bg-slate-800/80 rounded-xl p-3 text-center backdrop-blur-sm border border-slate-700/50">
          <div className="text-orange-400 text-lg font-bold">
            {Math.round(normalizedData.silence)}%
          </div>
          <div className="text-slate-400 text-xs">Silence</div>
          <div className="text-slate-500 text-xs mt-1">
            {calculateSegmentTime(normalizedData.silence)}
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
          <div className="text-sm font-medium mb-1">{hoveredSegment.name}</div>
          <div className="text-xs space-y-1">
            <div className="font-medium text-yellow-400">{hoveredSegment.percentage.toFixed(1)}%</div>
            <div className="font-medium text-blue-400">{hoveredSegment.time}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalHoursCard;