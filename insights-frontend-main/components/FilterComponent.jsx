import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const FilterComponent = () => {
  const [selectedSort, setSelectedSort] = useState('latest');
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const sortOptions = [
    { label: 'Latest', value: 'latest' },
    { label: 'Oldest', value: 'oldest' }
  ];

  const statusOptions = [
    { label: 'Closed Calls', value: 'closed', color: 'gray' },
    { label: 'Cold Calls', value: 'cold', color: 'blue' },
    { label: 'Luke Warm Calls', value: 'lukewarm', color: 'green' },
    { label: 'Warm Calls', value: 'warm', color: 'orange' },
    { label: 'Hot Calls', value: 'hot', color: 'red' }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      gray: 'bg-gray-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  const handleSortChange = (sortValue) => {
    setSelectedSort(sortValue);
  };

  const handleStatusToggle = (statusValue) => {
    setSelectedStatuses(prev => {
      if (prev.includes(statusValue)) {
        return prev.filter(status => status !== statusValue);
      } else {
        return [...prev, statusValue];
      }
    });
  };

  const handleClearAll = () => {
    setSelectedSort('latest');
    setSelectedStatuses([]);
  };

  const handleApplyFilters = () => {
    // You can add your filter application logic here
    console.log('Applied Filters:', {
      sort: selectedSort,
      statuses: selectedStatuses
    });
  };

  return (
    <div className="bg-slate-800 text-white rounded-xl p-6 w-80 font-sans">
      {/* Sort by Time Section */}
      <div className="mb-8">
        <h3 className="text-slate-300 text-lg font-medium mb-4">Sort by Time</h3>
        <div className="flex gap-3">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedSort === option.value
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border border-slate-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter by Status Section */}
      <div className="mb-8">
        <h3 className="text-slate-300 text-lg font-medium mb-4">Filter by Status</h3>
        <div className="space-y-3">
          {statusOptions.map((status) => (
            <button
              key={status.value}
              onClick={() => handleStatusToggle(status.value)}
              className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200 border ${
                selectedStatuses.includes(status.value)
                  ? 'bg-slate-700 border-slate-500 shadow-md'
                  : 'bg-slate-800 border-slate-600 hover:bg-slate-700 hover:border-slate-500'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${getColorClasses(status.color)}`}></div>
              <span className="text-white font-medium">{status.label}</span>
              {selectedStatuses.includes(status.value) && (
                <div className="ml-auto">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleClearAll}
          className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all duration-200 shadow-lg"
        >
          <ArrowLeft size={20} />
          Clear All Filters
        </button>
        
        <button
          onClick={handleApplyFilters}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all duration-200 shadow-lg"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;