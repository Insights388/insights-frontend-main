"use client"

import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

const HelpCard = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 border-0 text-white relative overflow-hidden group hover:scale-105 transition-transform duration-300 cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardContent className="p-4 relative z-10">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <HelpCircle className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="font-medium text-sm mb-1">Need help?</div>
            <div className="text-xs text-blue-100">Please check our docs</div>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/5 rounded-full" />
      </CardContent>
    </Card>
  );
};

export default HelpCard;