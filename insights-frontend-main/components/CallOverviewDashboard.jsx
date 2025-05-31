"use client"

import { useState, useEffect } from "react"
import { X, Check } from "lucide-react"

// CircularProgress Component
const CircularProgress = ({ value, maxValue, color, children, size = 120, strokeWidth = 8 }) => {
  const [animatedValue, setAnimatedValue] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, 500)
    return () => clearTimeout(timer)
  }, [value])

  const calculateStrokeDasharray = () => {
    const percentage = (animatedValue / maxValue) * 100
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    return `${(percentage / 100) * circumference} ${circumference}`
  }

  const radius = (size - strokeWidth) / 2
  const center = size / 2

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <circle 
          cx={center} 
          cy={center} 
          r={radius} 
          fill="none" 
          stroke="#374151" 
          strokeWidth={strokeWidth} 
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={calculateStrokeDasharray()}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          filter="url(#glow)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

// Agent Todos Component
const AgentTodos = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Send product brochure and pricing details by email.", completed: true },
    { id: 2, text: "Schedule a follow-up demo call for next week.", completed: false },
    { id: 3, text: "Discuss available EMI options in the next call.", completed: false }
  ])

  const toggleTodo = (id) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 max-w-2xl">
      <h3 className="text-xl font-semibold text-white mb-8">Agent Todos</h3>
      
      <div className="space-y-4">
        {todos.map((todo) => (
          <div 
            key={todo.id} 
            className="flex items-start space-x-4 p-4 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-all duration-200"
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className="flex-shrink-0 mt-0.5"
            >
              <div 
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  todo.completed 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-slate-500 hover:border-slate-400'
                }`}
              >
                {todo.completed && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
            
            <div className="flex-1">
              <p 
                className={`text-sm leading-relaxed transition-all duration-200 ${
                  todo.completed 
                    ? 'text-slate-400 line-through' 
                    : 'text-slate-300'
                }`}
              >
                {todo.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Progress indicator */}
      <div className="mt-8 pt-6 border-t border-slate-700/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">
            Progress: {todos.filter(t => t.completed).length} of {todos.length} completed
          </span>
          <span className="text-slate-400">
            {Math.round((todos.filter(t => t.completed).length / todos.length) * 100)}%
          </span>
        </div>
        
        <div className="mt-2 w-full bg-slate-700/50 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${(todos.filter(t => t.completed).length / todos.length) * 100}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

// Purpose of Call Component
const PurposeOfCall = () => {
  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">Purpose of the Call</h3>
      <p className="text-slate-300 text-sm leading-relaxed">
        The agent is calling to offer unsecured credit limits to the customer for purchasing raw 
        materials for their plastic products business, aiming to provide savings on their purchases.
      </p>
    </div>
  )
}

// Call Summary Component
const CallSummary = () => {
  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">Call Summary</h3>
      <p className="text-slate-300 text-sm leading-relaxed">
        The agent called to offer unsecured credit limits to the customer, who is in the plastic industry, 
        for purchasing raw materials. The agent inquired about the customers current purchasing methods 
        (credit or cash). The customer stated they use both. The agent quoted an interest rate of 1.5% for 
        30 days. The customer found the rate too high, stating they currently get a 12% rate and that their 
        existing credit lines are fully utilized due to ongoing expansion. The customer acknowledged that 
        rates may be higher elsewhere but stated they wont pay more than 12% per annum.
      </p>
    </div>
  )
}

// Talk Time Distribution Component
const TalkTimeDistribution = () => {
  const totalTime = 125.6
  const agentTime = 77.9
  const customerTime = 32.9
  const silenceTime = 14.8
  
  const agentPercentage = (agentTime / totalTime) * 100
  const customerPercentage = (customerTime / totalTime) * 100
  const silencePercentage = (silenceTime / totalTime) * 100

  const createSegmentedCircle = () => {
    const radius = 60
    const circumference = 2 * Math.PI * radius
    const center = 70
    
    // Calculate angles for each segment
    const agentAngle = (agentPercentage / 100) * 360
    const customerAngle = (customerPercentage / 100) * 360
    const silenceAngle = (silencePercentage / 100) * 360
    
    // Create arc paths
    const createArcPath = (startAngle, endAngle, radius) => {
      const start = polarToCartesian(center, center, radius, endAngle)
      const end = polarToCartesian(center, center, radius, startAngle)
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
      return `M ${start.x},${start.y} A ${radius},${radius} 0 ${largeArcFlag} 0 ${end.x},${end.y}`
    }
    
    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      }
    }
    
    return { createArcPath, polarToCartesian, agentAngle, customerAngle, silenceAngle, center, radius }
  }

  const { createArcPath, agentAngle, customerAngle, silenceAngle, center, radius } = createSegmentedCircle()

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-6">Talk Time Distribution</h3>
      
      <div className="mb-6">
        <div className="relative w-36 h-36 mx-auto">
          <svg width="140" height="140" viewBox="0 0 140 140" className="transform -rotate-90">
            <defs>
              <filter id="segment-glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Background circle */}
            <circle cx={center} cy={center} r={radius} fill="none" stroke="#374151" strokeWidth="8" opacity="0.2" />
            
            {/* Agent segment - Purple */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="8"
              strokeDasharray={`${(agentPercentage / 100) * (2 * Math.PI * radius)} ${2 * Math.PI * radius}`}
              strokeDashoffset="0"
              strokeLinecap="round"
              filter="url(#segment-glow)"
              className="transition-all duration-1000 ease-out"
            />
            
            {/* Customer segment - White */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#ffffff"
              strokeWidth="8"
              strokeDasharray={`${(customerPercentage / 100) * (2 * Math.PI * radius)} ${2 * Math.PI * radius}`}
              strokeDashoffset={`-${(agentPercentage / 100) * (2 * Math.PI * radius)}`}
              strokeLinecap="round"
              filter="url(#segment-glow)"
              className="transition-all duration-1000 ease-out"
              style={{ animationDelay: '0.3s' }}
            />
            
            {/* Silence segment - Gray */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#6b7280"
              strokeWidth="8"
              strokeDasharray={`${(silencePercentage / 100) * (2 * Math.PI * radius)} ${2 * Math.PI * radius}`}
              strokeDashoffset={`-${((agentPercentage + customerPercentage) / 100) * (2 * Math.PI * radius)}`}
              strokeLinecap="round"
              filter="url(#segment-glow)"
              className="transition-all duration-1000 ease-out"
              style={{ animationDelay: '0.6s' }}
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-white text-2xl font-bold">{totalTime}s</div>
            <div className="text-slate-400 text-xs">Total Time</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-slate-300 text-sm">Agent: {Math.round(agentPercentage)}%</span>
          </div>
          <span className="text-slate-400 text-sm">(≈{agentTime}s)</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <span className="text-slate-300 text-sm">Customer: {Math.round(customerPercentage)}%</span>
          </div>
          <span className="text-slate-400 text-sm">(≈{customerTime}s)</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span className="text-slate-300 text-sm">Silence: {Math.round(silencePercentage)}%</span>
          </div>
          <span className="text-slate-400 text-sm">(≈{silenceTime}s)</span>
        </div>
      </div>
    </div>
  )
}

// Call Sentiment Score Component
const CallSentimentScore = () => {
  const score = 0.76
  const percentage = score * 100

  const getScoreColor = () => {
    if (score < 0.3) return "#ef4444"
    if (score < 0.7) return "#f59e0b"
    return "#10b981"
  }

  const getScoreLabel = () => {
    if (score < 0.3) return "Poor"
    if (score < 0.7) return "Good"
    return "Excellent"
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-6">Call Sentiment Score</h3>
      
      <div className="mb-4">
        <CircularProgress value={percentage} maxValue={100} color={getScoreColor()} size={140}>
          <div className="text-center">
            <div className="text-white text-3xl font-bold">{score}</div>
            <div className="text-slate-400 text-xs">Score</div>
          </div>
        </CircularProgress>
      </div>

      <div className="text-center">
        <div 
          className="inline-block px-4 py-2 rounded-full text-sm font-medium"
          style={{ 
            backgroundColor: `${getScoreColor()}20`,
            color: getScoreColor(),
            border: `1px solid ${getScoreColor()}40`
          }}
        >
          {getScoreLabel()}
        </div>
      </div>
    </div>
  )
}

// Emotion Timeline Component
const EmotionTimeline = () => {
  // Simplified emotion data - single line showing emotional progression
  const emotionData = [
    { time: 0, emotion: 0.3, label: "Neutral" },
    { time: 20, emotion: 0.7, label: "Interested" },
    { time: 40, emotion: 0.9, label: "Very Interested" },
    { time: 60, emotion: 0.4, label: "Neutral" },
    { time: 80, emotion: 0.2, label: "Hesitant" },
    { time: 100, emotion: 0.6, label: "Interested" },
    { time: 125, emotion: 0.3, label: "Hesitant" },
  ]

  const width = 500
  const height = 200
  const padding = 50

  const createPath = () => {
    const points = emotionData.map((point, index) => {
      const x = padding + (point.time / 125) * (width - 2 * padding)
      const y = height - padding - (point.emotion) * (height - 2 * padding)
      return `${x},${y}`
    })
    return `M ${points.join(' L ')}`
  }

  const createArea = () => {
    const points = emotionData.map((point, index) => {
      const x = padding + (point.time / 125) * (width - 2 * padding)
      const y = height - padding - (point.emotion) * (height - 2 * padding)
      return `${x},${y}`
    })
    const bottomLine = `L ${padding + (125 / 125) * (width - 2 * padding)},${height - padding} L ${padding},${height - padding} Z`
    return `M ${points.join(' L ')} ${bottomLine}`
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-6">Emotion Timeline</h3>
      
      <div className="relative">
        <svg width="100%" height="280" viewBox={`0 0 ${width} ${height + 80}`} className="overflow-visible">
          <defs>
            <linearGradient id="emotionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
            </linearGradient>
            <filter id="glow-line">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((value) => (
            <line
              key={value}
              x1={padding}
              y1={height - padding - value * (height - 2 * padding)}
              x2={width - padding}
              y2={height - padding - value * (height - 2 * padding)}
              stroke="#374151"
              strokeWidth="1"
              opacity="0.3"
            />
          ))}

          {/* Time axis lines */}
          {[0, 25, 50, 75, 100, 125].map((time) => (
            <line
              key={time}
              x1={padding + (time / 125) * (width - 2 * padding)}
              y1={height - padding}
              x2={padding + (time / 125) * (width - 2 * padding)}
              y2={height - padding + 5}
              stroke="#6b7280"
              strokeWidth="1"
            />
          ))}

          {/* Area fill */}
          <path
            d={createArea()}
            fill="url(#emotionGradient)"
            opacity="0.6"
          />

          {/* Main emotion line */}
          <path
            d={createPath()}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="4"
            filter="url(#glow-line)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {emotionData.map((point, index) => (
            <circle
              key={index}
              cx={padding + (point.time / 125) * (width - 2 * padding)}
              cy={height - padding - point.emotion * (height - 2 * padding)}
              r="5"
              fill="#8b5cf6"
              stroke="#ffffff"
              strokeWidth="2"
              filter="url(#glow-line)"
              className="animate-pulse"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}

          {/* Y-axis labels */}
          <text x="15" y={height - padding - 0 * (height - 2 * padding) + 5} fill="#9ca3af" fontSize="12">Hesitant</text>
          <text x="15" y={height - padding - 0.5 * (height - 2 * padding) + 5} fill="#9ca3af" fontSize="12">Neutral</text>
          <text x="15" y={height - padding - 1 * (height - 2 * padding) + 5} fill="#9ca3af" fontSize="12">Interested</text>

          {/* X-axis labels */}
          {[0, 25, 50, 75, 100, 125].map((time) => (
            <text
              key={time}
              x={padding + (time / 125) * (width - 2 * padding)}
              y={height - padding + 20}
              fill="#9ca3af"
              fontSize="12"
              textAnchor="middle"
            >
              {time}s
            </text>
          ))}
        </svg>

        {/* Current emotion indicator */}
        <div className="flex justify-center items-center mt-6 space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-purple-500 animate-pulse"></div>
            <span className="text-slate-300 text-sm">Emotional Journey</span>
          </div>
          <div className="text-slate-400 text-sm">
            Peak: Very Interested (40s) • Current: Hesitant
          </div>
        </div>
      </div>
    </div>
  )
}

// Sales Intelligence Component
const SalesIntelligence = () => {
  const [checkedItems, setCheckedItems] = useState([true, false, false])

  const informalInsights = [
    { label: "Language:", value: "Hindi, English" },
    { label: "Profession:", value: "Plastic Industry" },
    { label: "Interest:", value: "Credit for raw material purchase" },
    { label: "Budget:", value: "Maximum 12% per annum" }
  ]

  const uspChecklist = [
    "Quick loan approval within 48 hours",
    "Flexible EMI and repayment options",
    "Loyalty-based benefits for returning borrowers"
  ]

  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems]
    newCheckedItems[index] = !newCheckedItems[index]
    setCheckedItems(newCheckedItems)
  }

  return (
    <div className="space-y-8">
      {/* Informal Insights Section */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
        <h2 className="text-xl font-semibold text-white mb-6">Informal Insights</h2>
        <div className="space-y-6">
          {informalInsights.map((insight, index) => (
            <div key={index} className="flex items-start">
              <span className="text-slate-400 min-w-[140px] font-medium text-sm">
                {insight.label}
              </span>
              <span className="text-slate-200 ml-4 text-sm">
                {insight.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* USP Checklist Section */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
        <h2 className="text-xl font-semibold text-white mb-6">USP Checklist</h2>
        <div className="space-y-4">
          {uspChecklist.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-all duration-200">
              <button
                onClick={() => handleCheckboxChange(index)}
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                  checkedItems[index]
                    ? "bg-green-500 border-green-500"
                    : "border-slate-500 hover:border-slate-400"
                }`}
              >
                {checkedItems[index] && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>
              <span className="text-slate-200 flex-1 text-sm">{item}</span>
            </div>
          ))}
        </div>
        
        {/* Progress indicator */}
        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">
              Completed: {checkedItems.filter(item => item).length} of {checkedItems.length} items
            </span>
            <span className="text-slate-400">
              {Math.round((checkedItems.filter(item => item).length / checkedItems.length) * 100)}%
            </span>
          </div>
          
          <div className="mt-2 w-full bg-slate-700/50 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${(checkedItems.filter(item => item).length / checkedItems.length) * 100}%` 
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Navigation Tabs Component
const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ['Call Overview', 'Actionables', 'Sales Intelligence']
  
  return (
    <div className="flex space-x-1 border-b border-slate-700/50 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
            activeTab === tab
              ? 'text-blue-400 border-blue-400'
              : 'text-slate-400 border-transparent hover:text-slate-300'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

// Main Dashboard Component
const CallOverviewDashboard = () => {
  const [activeTab, setActiveTab] = useState('Call Overview')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Navigation */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        {activeTab === 'Call Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <PurposeOfCall />
              <CallSummary />
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              <TalkTimeDistribution />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <CallSentimentScore />
            </div>

            {/* Full Width Bottom */}
            <div className="lg:col-span-3">
              <EmotionTimeline />
            </div>
          </div>
        )}

        {activeTab === 'Actionables' && (
          <div className="space-y-6">
            <AgentTodos />
          </div>
        )}

        {activeTab === 'Sales Intelligence' && (
          <SalesIntelligence />
        )}
      </div>
    </div>
  )
}

export default CallOverviewDashboard