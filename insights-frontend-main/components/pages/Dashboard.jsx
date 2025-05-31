'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';

const Dashboard = () => {
  // Sample data for the line chart
  const chartData = [
    { name: 'Ja', value: 100 },
    { name: 'Fe', value: 220 },
    { name: 'Ma', value: 320 },
    { name: 'Ap', value: 450 },
    { name: 'Ma', value: 350 },
    { name: 'Ju', value: 400 },
    { name: 'Ju', value: 500 },
    { name: 'Au', value: 450 },
    { name: 'Se', value: 380 },
    { name: 'Oc', value: 400 },
    { name: 'No', value: 300 },
    { name: 'De', value: 200 },
  ];

  // User data
  const userData = {
    name: 'Mark Johnson',
    profileImage: '/jellyfish.png',
  };

  // Metrics data
  const metricsData = {
    totalHours: {
      completed: '4h 30min',
      target: '8h 0min',
      percentage: 56,
    },
    sentiment: {
      percentage: 95,
    },
    engagement: {
      percentage: 95,
    },
    followers: {
      count: 847,
      trend: 'up',
    },
    completed: {
      count: 76,
      trend: 'down',
    },
    process: {
      count: 156,
      trend: 'down',
    },
  };

  // Function for circular progress
  const calculateStrokeDasharray = (percentage) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const dashArray = (percentage / 100) * circumference;
    return `${dashArray} ${circumference}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#040615] to-[#101e45] text-white">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-[#050A1F] border-r border-[#1A2352] flex flex-col flex-shrink-0">
          <div className="p-6">
            <h1 className="text-lg font-semibold tracking-wider text-white/80 mb-10">INSIGHTS388</h1>

            {/* Navigation Links */}
            <nav className="space-y-2 flex-1">
              <Link 
                href="#" 
                className="flex items-center space-x-3 p-3 rounded-lg bg-[#1A2352] text-white"
              >
                <div className="bg-blue-500 w-6 h-6 rounded flex items-center justify-center text-xs">D</div>
                <span>Dashboard</span>
              </Link>
              <Link 
                href="#" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-[#1A2352]/50 transition-colors"
              >
                <div className="bg-transparent border border-blue-500 w-6 h-6 rounded flex items-center justify-center text-xs">C</div>
                <span>Calls</span>
              </Link>
              <Link 
                href="#" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-[#1A2352]/50 transition-colors"
              >
                <div className="bg-transparent border border-blue-500 w-6 h-6 rounded flex items-center justify-center text-xs">T</div>
                <span>Ticket</span>
              </Link>
              <Link 
                href="#" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-[#1A2352]/50 transition-colors"
              >
                <div className="bg-transparent border border-blue-500 w-6 h-6 rounded flex items-center justify-center text-xs">R</div>
                <span>RTL</span>
              </Link>
            </nav>

            <div className="mt-6">
              <div className="text-xs uppercase text-gray-500 mb-3">ACCOUNT PAGES</div>
              <nav className="space-y-2">
                <Link 
                  href="#" 
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-[#1A2352]/50 transition-colors"
                >
                  <div className="bg-transparent border border-blue-500 w-6 h-6 rounded flex items-center justify-center text-xs">P</div>
                  <span>Profile</span>
                </Link>
                <Link 
                  href="/login" 
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-[#1A2352]/50 transition-colors"
                >
                  <div className="bg-transparent border border-blue-500 w-6 h-6 rounded flex items-center justify-center text-xs">S</div>
                  <span>Sign In</span>
                </Link>
                <Link 
                  href="/signup" 
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-[#1A2352]/50 transition-colors"
                >
                  <div className="bg-transparent border border-blue-500 w-6 h-6 rounded flex items-center justify-center text-xs">S</div>
                  <span>Sign Up</span>
                </Link>
              </nav>
            </div>

            {/* Help Box */}
            <div className="mt-8 bg-gradient-to-r from-blue-900 to-indigo-900 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="bg-white/10 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-400 text-xl">?</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Need help?</div>
                  <div className="text-xs text-blue-300">Please check our docs</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="h-16 bg-[#050A1F]/50 border-b border-[#1A2352] flex items-center justify-end px-8">
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="text-gray-400 text-sm">Sign In</span>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 overflow-y-auto bg-[#0B0F1C]">
            <div className="p-6 min-h-full">
              <div className="grid grid-cols-12 gap-4">
                {/* Welcome Card - Spans 4 columns */}
                <div className="col-span-12 lg:col-span-4">
                  <div className="bg-gradient-to-br from-[#1B2341] to-[#171E3C] rounded-2xl h-[200px] p-6 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="text-gray-400 text-sm mb-2">Welcome back,</div>
                      <h2 className="text-3xl font-bold text-white mb-2">{userData.name}</h2>
                      <p className="text-gray-400 text-sm mb-4">Glad to see you again!</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-300">Online</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-300">High Performance</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-8">
                      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-xl"></div>
                    </div>
                  </div>
                </div>

                {/* Total Calls Card - Spans 4 columns */}
                <div className="col-span-12 lg:col-span-4">
                  <div className="bg-[#171E3C] rounded-2xl h-[200px] p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white">Total Calls</h3>
                      </div>
                      <button className="text-gray-400 hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="relative">
                        <svg className="w-32 h-32 transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="16"
                            fill="none"
                            className="text-gray-700"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="16"
                            fill="none"
                            className="text-yellow-500"
                            strokeDasharray={351.86}
                            strokeDashoffset={351.86 * 0.35}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold text-white">65</span>
                          <span className="text-sm text-gray-400">till now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sentiment Analysis Card - Spans 4 columns */}
                <div className="col-span-12 lg:col-span-4">
                  <div className="bg-[#171E3C] rounded-2xl h-[200px] p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white">Sentiment Analysis</h3>
                      </div>
                      <button className="text-gray-400 hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-white mb-2">22</div>
                        <div className="text-sm text-gray-400">today</div>
                        <div className="mt-2 text-red-500 text-sm">Negative</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Hours Card - Spans 3 columns */}
                <div className="col-span-12 lg:col-span-3">
                  <div className="bg-[#171E3C] rounded-2xl h-[280px] p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                          <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white">Total Hours + Talk-time Split</h3>
                      </div>
                    </div>
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <svg className="w-32 h-32 transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="16"
                            fill="none"
                            className="text-gray-700"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="16"
                            fill="none"
                            className="text-gradient-ring"
                            strokeDasharray={351.86}
                            strokeDashoffset={351.86 * 0.42}
                            style={{
                              stroke: 'url(#gradient-ring)',
                              transition: 'stroke-dashoffset 1s ease-in-out'
                            }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-white">10h 11m</span>
                          <span className="text-sm text-gray-400">till now</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 rounded-lg bg-[#1B2341]">
                        <div className="text-yellow-500 text-lg font-semibold">42%</div>
                        <div className="text-xs text-gray-400">Customer</div>
                        <div className="text-xs text-gray-500">4h 14m</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-[#1B2341]">
                        <div className="text-green-500 text-lg font-semibold">42%</div>
                        <div className="text-xs text-gray-400">Agent</div>
                        <div className="text-xs text-gray-500">4h 17m</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-[#1B2341]">
                        <div className="text-blue-500 text-lg font-semibold">16%</div>
                        <div className="text-xs text-gray-400">Silence</div>
                        <div className="text-xs text-gray-500">1h 40m</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Engagement Score Card - Spans 3 columns */}
                <div className="col-span-12 lg:col-span-3">
                  <div className="bg-[#171E3C] rounded-2xl h-[280px] p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white">Customer Engagement Score</h3>
                      </div>
                    </div>
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <svg className="w-32 h-32 transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="16"
                            fill="none"
                            className="text-gray-700"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="16"
                            fill="none"
                            className="text-green-500"
                            strokeDasharray={351.86}
                            strokeDashoffset={351.86 * 0.356}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-white">64.4</span>
                          <span className="text-sm text-gray-400">Moderate</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 rounded-lg bg-[#1B2341]">
                        <div className="text-green-500 text-lg font-semibold">29%</div>
                        <div className="text-xs text-gray-400">High (H)</div>
                        <div className="text-xs text-gray-500">30 calls</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-[#1B2341]">
                        <div className="text-yellow-500 text-lg font-semibold">42%</div>
                        <div className="text-xs text-gray-400">Moderate (M)</div>
                        <div className="text-xs text-gray-500">42 calls</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-[#1B2341]">
                        <div className="text-red-500 text-lg font-semibold">29%</div>
                        <div className="text-xs text-gray-400">Low (L)</div>
                        <div className="text-xs text-gray-500">29 calls</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Script Adherence Score Card - Spans 3 columns */}
                <div className="col-span-12 lg:col-span-3">
                  <div className="bg-[#171E3C] rounded-2xl h-[280px] p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white">Script Adherence Score</h3>
                      </div>
                    </div>
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <svg className="w-32 h-32 transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="16"
                            fill="none"
                            className="text-gray-700"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="16"
                            fill="none"
                            className="text-green-500"
                            strokeDasharray={351.86}
                            strokeDashoffset={351.86 * 0.218}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-white">78.2%</span>
                          <span className="text-sm text-gray-400">Moderate</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 rounded-lg bg-[#1B2341]">
                        <div className="text-sm text-gray-400">Total Calls Today</div>
                        <div className="text-xl font-semibold text-white">167</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#1B2341]">
                        <div className="text-sm text-gray-400">Adherent Calls</div>
                        <div className="text-xl font-semibold text-white">134</div>
                        <div className="text-xs text-gray-500">(80.2%)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Metrics Card - Spans 3 columns */}
                <div className="col-span-12 lg:col-span-3">
                  <div className="bg-[#171E3C] rounded-2xl h-[280px] p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                          <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white">Key Metrics</h3>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="bg-[#1B2341] rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400">Follow-Ups</span>
                          <div className="flex items-center text-red-500 text-sm">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            1.9%
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-white">51</span>
                          <span className="text-sm text-gray-400">Decreased from 52</span>
                        </div>
                      </div>
                      <div className="bg-[#1B2341] rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400">Compliance Breach</span>
                          <div className="flex items-center text-green-500 text-sm">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            0%
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-white">0</span>
                          <span className="text-sm text-gray-400">Decreased from 0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;