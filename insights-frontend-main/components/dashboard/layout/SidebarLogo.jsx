"use client"

const SidebarLogo = () => {
  return (
    <div className="text-white font-bold text-lg mb-8 group cursor-pointer">
      <span className="inline-block transition-transform group-hover:scale-110 duration-300">INSIGHTS</span>
      <span className="text-blue-400 inline-block transition-all group-hover:text-blue-300 duration-300">
        388
      </span>
      <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500 mt-1" />
    </div>
  );
};

export default SidebarLogo;