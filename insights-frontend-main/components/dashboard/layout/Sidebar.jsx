"use client"

import {
  Home,
  BarChart3,
  Ticket,
  RotateCcw,
  User,
  LogIn,
  UserPlus,
} from "lucide-react"
import SidebarLogo from "./SidebarLogo"
import SidebarItem from "./SidebarItem"
import HelpCard from "./HelpCard"

const Sidebar = ({ activeTab, setActiveTab, isLoaded }) => {
  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: activeTab === "Dashboard", color: "text-blue-400" },
    { icon: BarChart3, label: "Calls", active: activeTab === "Calls", color: "text-purple-400" },
    { icon: Ticket, label: "Ticket", active: activeTab === "Ticket", color: "text-green-400" },
    { icon: RotateCcw, label: "RTL", active: activeTab === "RTL", color: "text-orange-400" },
  ]

  const accountItems = [
    { icon: User, label: "Profile", active: activeTab === "Profile" },
    { icon: LogIn, label: "Sign In", active: activeTab === "Sign In" },
    { icon: UserPlus, label: "Sign Up", active: activeTab === "Sign Up" },
  ]

  return (
    <div
      className={`w-64 min-h-screen bg-[#1a1f2e]/80 backdrop-blur-xl border-r border-gray-800/50 transition-all duration-500 ${isLoaded ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="p-6">
        {/* Animated Logo */}
        <SidebarLogo />

        {/* Enhanced Navigation */}
        <nav className="space-y-2 mb-8">
          {sidebarItems.map((item, index) => (
            <SidebarItem 
              key={index}
              index={index}
              icon={item.icon}
              label={item.label}
              active={item.active}
              color={item.color}
              onClick={setActiveTab}
            />
          ))}
        </nav>

        {/* Account Pages Section */}
        <div>
          <div className="text-gray-500 text-xs font-medium mb-4 uppercase tracking-wider flex items-center">
            <span>Account Pages</span>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent ml-3" />
          </div>
          <nav className="space-y-2">
            {accountItems.map((item, index) => (
              <SidebarItem 
                key={index}
                index={index}
                icon={item.icon}
                label={item.label}
                active={item.active}
                onClick={setActiveTab}
              />
            ))}
          </nav>
        </div>

        {/* Enhanced Help Card */}
        <div className="mt-8">
          <HelpCard />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;