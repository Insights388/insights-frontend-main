"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Activity, Zap } from "lucide-react"

const WelcomeCard = ({ isLoaded, userName = "Mark Johnson" }) => {
  return (
    <div
      className={`col-span-12 lg:col-span-6 transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    >
      <Card className="bg-gradient-to-r from-blue-600/30 via-blue-500/20 to-purple-600/30 border border-blue-500/30 h-full relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardContent className="p-6 h-full flex items-center justify-between relative z-10">
          <div>
            <p className="text-gray-300 text-sm mb-2">Welcome back,</p>
            <h2 className="text-white text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {userName}
            </h2>
            <p className="text-gray-400">Glad to see you again!</p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2 text-green-400">
                <Activity className="w-4 h-4 animate-pulse" />
                <span className="text-sm">Online</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <Zap className="w-4 h-4" />
                <span className="text-sm">High Performance</span>
              </div>
            </div>
          </div>
          <div className="w-40 h-32 relative">
            {/* Jellyfish/Brain illustration */}
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-80 animate-pulse">
                <div
                  className="absolute inset-2 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full opacity-90 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div
                    className="absolute inset-4 bg-gradient-to-br from-blue-200 to-purple-300 rounded-full opacity-80 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-white/60 rounded-full animate-pulse"></div>
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-white/40 rounded-full animate-pulse"
                      style={{ animationDelay: "0.3s" }}
                    ></div>
                  </div>
                </div>
              </div>
              {/* Floating particles around the brain */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-300 rounded-full animate-bounce"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${1.5 + Math.random()}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeCard;