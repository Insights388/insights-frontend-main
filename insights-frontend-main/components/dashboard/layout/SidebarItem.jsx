"use client"

const SidebarItem = ({ icon: Icon, label, active, color, index, onClick }) => {
  return (
    <button
      onClick={() => onClick(label)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
        active
          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25 scale-105"
          : "text-gray-400 hover:bg-gray-800/50 hover:text-white hover:scale-105"
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 animate-pulse" />
      )}
      <Icon
        className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${active ? "text-white" : color || "text-gray-400"}`}
      />
      <span className="text-sm font-medium relative z-10">{label}</span>
      {active && <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse" />}
    </button>
  );
};

export default SidebarItem;