"use client"

import { useState, useEffect } from "react"
import BackgroundParticles from "./layout/BackgroundParticles"
import Sidebar from "./layout/Sidebar"
import Header from "./layout/Header"
import WelcomeCard from "./cards/WelcomeCard"
import CallsCard from "./cards/TotalCallsChart"
import TotalHoursCard from "./cards/TotalHoursCard"
import SentimentCard from "./cards/SentimentCard"
import EngagementCard from "./cards/EngagementCard"
import MetricsCard from "./cards/MetricsCard"
import ScriptAdherenceCard from "./cards/ScriptAdherenceCard"

const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard")
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [animatedValues, setAnimatedValues] = useState({
    totalHours: 0,
    sentiment: 0,
    engagement: 0,
    followUps: 0,
    compliance: 0,
  })

  useEffect(() => {
    setIsLoaded(true)
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)

    const finalValues = {
      totalHours: 4.5,
      sentiment: 95,
      engagement: 95,
      followUps: 847,
      compliance: 76,
    }

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    let step = 0

    const interval = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setAnimatedValues({
        totalHours: Math.floor(easeOut * finalValues.totalHours * 10) / 10,
        sentiment: Math.floor(easeOut * finalValues.sentiment),
        engagement: Math.floor(easeOut * finalValues.engagement),
        followUps: Math.floor(easeOut * finalValues.followUps),
        compliance: Math.floor(easeOut * finalValues.compliance),
      })

      if (step >= steps) clearInterval(interval)
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1419] to-[#1a1f2e] text-white relative overflow-hidden">
      {/* Background effects */}
      <BackgroundParticles />

      <div className="flex relative z-10">
        {/* Sidebar */}
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isLoaded={isLoaded}
        />

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Header */}
          <Header currentPage={"dashboard"} showSearch={false} />

          {/* Dashboard Content */}
          <div className="p-6">
            {/* Top Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 min-h-[320px]">
              <div className="lg:col-span-6 flex">
                <div className="w-full">
                  <WelcomeCard isLoaded={isLoaded} />
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex">
                  <div className="w-full">
                    <CallsCard 
                      title="Total Calls"
                      completed={65}
                      target={100}
                    />
                  </div>
                </div>

                <div className="flex">
                  <div className="w-full">
                    <SentimentCard
                      isLoaded={isLoaded}
                      animatedValue={animatedValues.sentiment}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[320px]">
              <div className="flex">
                <div className="w-full">
                  <TotalHoursCard
                    isLoaded={isLoaded}
                    animatedValue={animatedValues.totalHours}
                  />
                </div>
              </div>

              <div className="flex">
                <div className="w-full">
                  <EngagementCard
                    isLoaded={isLoaded}
                    animatedValue={animatedValues.engagement}
                  />
                </div>
              </div>

              <div className="flex">
                <div className="w-full">
                  <ScriptAdherenceCard
                    isLoaded={isLoaded}
                    animatedValue={animatedValues.compliance}
                  />
                </div>
              </div>

              <div className="flex">
                <div className="w-full">
                  <MetricsCard
                    isLoaded={isLoaded}
                    title="Follow-Ups"
                    value={animatedValues.followUps}
                    trend="up"
                    icon="trend-up"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentDashboard;