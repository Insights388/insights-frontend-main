import React, { useState, useEffect } from 'react';
import { Info, TrendingUp, TrendingDown } from 'lucide-react';

const KeyMetricsCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showTooltip, setShowTooltip] = useState(false);

  // Sample data - replace with real data
  const [metricsData, setMetricsData] = useState({
    followUps: {
      current: 78,
      previous: 72,
      trend: 'up'
    },
    complianceBreach: {
      current: 12,
      previous: 18,
      trend: 'down'
    }
  });

  // Real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate real-time data updates (replace with actual API calls)
      setMetricsData(prev => {
        const newFollowUps = Math.max(0, prev.followUps.current + Math.floor((Math.random() - 0.7) * 3));
        const newCompliance = Math.max(0, prev.complianceBreach.current + Math.floor((Math.random() - 0.8) * 2));
        
        return {
          followUps: {
            current: newFollowUps,
            previous: prev.followUps.current,
            trend: newFollowUps > prev.followUps.current ? 'up' : newFollowUps < prev.followUps.current ? 'down' : prev.followUps.trend
          },
          complianceBreach: {
            current: newCompliance,
            previous: prev.complianceBreach.current,
            trend: newCompliance < prev.complianceBreach.current ? 'down' : newCompliance > prev.complianceBreach.current ? 'up' : prev.complianceBreach.trend
          }
        };
      });
    }, 4000); // Update every 4 seconds

    return () => clearInterval(timer);
  }, []);

  // Calculate percentage change
  const calculateChange = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const followUpChange = calculateChange(metricsData.followUps.current, metricsData.followUps.previous);
  const complianceChange = calculateChange(metricsData.complianceBreach.current, metricsData.complianceBreach.previous);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-500/20 rounded-lg">
            <svg className="w-6 h-6 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
            </svg>
          </div>
          <h3 className="text-white text-xl font-semibold">Key Metrics</h3>
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
                Key performance indicators: Follow-Ups track pending customer actions, Compliance Breach monitors policy violations. Lower compliance breaches indicate better adherence.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Metrics Rows */}
      <div className="space-y-8 relative z-10">
        {/* Follow-Ups Row */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-slate-400 text-lg mb-2">Follow-Ups</div>
            <div className="flex items-center space-x-4">
              <div className="text-white text-5xl font-bold">
                {metricsData.followUps.current}
              </div>
              <div className="flex items-center space-x-2">
                {metricsData.followUps.trend === 'up' ? (
                  <TrendingUp className="w-6 h-6 text-green-400" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-400" />
                )}
                <div className={`text-sm font-medium ${
                  metricsData.followUps.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {Math.abs(followUpChange)}%
                </div>
              </div>
            </div>
            <div className="text-slate-500 text-sm mt-1">
              {metricsData.followUps.trend === 'up' ? 'Increased' : 'Decreased'} from {metricsData.followUps.previous}
            </div>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/50"></div>

        {/* Compliance Breach Row */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-slate-400 text-lg mb-2">Compliance Breach</div>
            <div className="flex items-center space-x-4">
              <div className="text-white text-5xl font-bold">
                {metricsData.complianceBreach.current}
              </div>
              <div className="flex items-center space-x-2">
                {metricsData.complianceBreach.trend === 'down' ? (
                  <TrendingDown className="w-6 h-6 text-green-400" />
                ) : (
                  <TrendingUp className="w-6 h-6 text-red-400" />
                )}
                <div className={`text-sm font-medium ${
                  metricsData.complianceBreach.trend === 'down' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {Math.abs(complianceChange)}%
                </div>
              </div>
            </div>
            <div className="text-slate-500 text-sm mt-1">
              {metricsData.complianceBreach.trend === 'down' ? 'Decreased' : 'Increased'} from {metricsData.complianceBreach.previous}
            </div>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Stats
      <div className="mt-8 pt-6 border-t border-slate-700/50 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-slate-400 text-xs mb-1">Total Actions</div>
            <div className="text-white text-lg font-semibold">
              {metricsData.followUps.current + metricsData.complianceBreach.current}
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-slate-400 text-xs mb-1">Compliance Rate</div>
            <div className="text-white text-lg font-semibold">
              {((1 - metricsData.complianceBreach.current / (metricsData.followUps.current + metricsData.complianceBreach.current)) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div> */}

      {/* Floating decorative dots */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-teal-400/30 rounded-full animate-pulse" />
      <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default KeyMetricsCard;