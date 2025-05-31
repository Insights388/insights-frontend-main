import { ChevronLeft } from "lucide-react";

export const ContactCard = ({ contact, isExpanded, onToggle }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'Hot':
          return 'text-red-400 bg-red-500/20 border-red-500/30';
        case 'Warm':
          return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
        case 'Closed':
          return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
        default:
          return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
      }
    };
  
    const getInitialBg = (initial) => {
      const colors = [
        'bg-blue-500',
        'bg-purple-500', 
        'bg-green-500',
        'bg-orange-500',
        'bg-pink-500'
      ];
      return colors[initial.charCodeAt(0) % colors.length];
    };
  
    return (
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-slate-600/50 transition-all duration-200">
        <div 
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-700/20 transition-colors"
          onClick={onToggle}
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full ${getInitialBg(contact.initial)} flex items-center justify-center shadow-lg`}>
              <span className="text-white font-semibold">{contact.initial}</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">{contact.name}</h3>
              <p className="text-sm text-slate-400">{contact.callCount} calls</p>
            </div>
          </div>
          <ChevronLeft 
            className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
              isExpanded ? 'rotate-90' : ''
            }`} 
          />
        </div>
        
        {isExpanded && (
          <div className="border-t border-slate-700/50">
            <div className="grid grid-cols-4 gap-4 p-4 bg-slate-800/50 text-sm font-medium text-slate-300 border-b border-slate-700/30">
              <div>Date/Time</div>
              <div>Duration</div>
              <div>Status</div>
              <div>Action</div>
            </div>
            
            {contact.calls.map((call, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 p-4 hover:bg-slate-700/20 transition-colors border-b border-slate-700/20 last:border-b-0">
                <div>
                  <div className="text-white font-medium">{call.time}</div>
                  <div className="text-sm text-slate-400">{call.date}</div>
                </div>
                <div className="text-slate-300 font-medium">{call.duration}</div>
                <div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(call.status)}`}>
                    {call.status}
                  </span>
                </div>
                <div>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                    Expand
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };