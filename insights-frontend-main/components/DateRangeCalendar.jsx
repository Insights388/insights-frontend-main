import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DateRangeCalendar = ({ 
  onRangeChange, 
  onApply, 
  initialRange = { start: null, end: null },
  className = ""
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState(initialRange);
  const [tempRange, setTempRange] = useState(initialRange);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const presets = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last week', value: 'last-week' },
    { label: 'Last month', value: 'last-month' },
    { label: 'Last quarter', value: 'last-quarter' }
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const getPresetRange = (preset) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    switch (preset) {
      case 'today':
        return { start: new Date(today), end: new Date(today) };
      case 'yesterday':
        return { start: new Date(yesterday), end: new Date(yesterday) };
      case 'last-week':
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(today.getDate() - 7);
        const lastWeekEnd = new Date(today);
        lastWeekEnd.setDate(today.getDate() - 1);
        return { start: lastWeekStart, end: lastWeekEnd };
      case 'last-month':
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        return { start: lastMonthStart, end: lastMonthEnd };
      case 'last-quarter':
        const currentQuarter = Math.floor(today.getMonth() / 3);
        const lastQuarterStart = new Date(today.getFullYear(), (currentQuarter - 1) * 3, 1);
        const lastQuarterEnd = new Date(today.getFullYear(), currentQuarter * 3, 0);
        return { start: lastQuarterStart, end: lastQuarterEnd };
      default:
        return { start: null, end: null };
    }
  };

  const handlePresetClick = (preset) => {
    const range = getPresetRange(preset);
    setTempRange(range);
    setSelectedPreset(preset);
    if (onRangeChange) {
      onRangeChange(range);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const days = [];
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevDate = new Date(year, month, 1 - (firstDayOfWeek - i));
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }
    
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({ date: new Date(year, month + 1, day), isCurrentMonth: false });
    }
    
    return days;
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const isInRange = (date, start, end) => {
    if (!start || !end) return false;
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const s = new Date(start);
    s.setHours(0, 0, 0, 0);
    const e = new Date(end);
    e.setHours(0, 0, 0, 0);
    return d >= s && d <= e;
  };

  const handleDateClick = (date) => {
    setSelectedPreset(null);
    
    if (!isSelecting) {
      const newRange = { start: date, end: null };
      setTempRange(newRange);
      setIsSelecting(true);
      if (onRangeChange) {
        onRangeChange(newRange);
      }
    } else {
      let newRange;
      if (date < tempRange.start) {
        newRange = { start: date, end: tempRange.start };
      } else {
        newRange = { start: tempRange.start, end: date };
      }
      setTempRange(newRange);
      setIsSelecting(false);
      if (onRangeChange) {
        onRangeChange(newRange);
      }
    }
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const handleReset = () => {
    const resetRange = { start: null, end: null };
    setSelectedRange(resetRange);
    setTempRange(resetRange);
    setSelectedPreset(null);
    setIsSelecting(false);
    if (onRangeChange) {
      onRangeChange(resetRange);
    }
  };

  const handleApply = () => {
    setSelectedRange(tempRange);
    if (onApply) {
      onApply(tempRange);
    }
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className={`bg-slate-800 text-white rounded-lg p-4 w-80 font-sans shadow-2xl border border-slate-700 ${className}`}>
      {(selectedRange.start || selectedRange.end) && (
        <div className="mb-4 p-2 bg-slate-700 rounded text-sm">
          <strong>Applied Range:</strong><br />
          {selectedRange.start && selectedRange.end 
            ? `${formatDate(selectedRange.start)} - ${formatDate(selectedRange.end)}`
            : formatDate(selectedRange.start) || formatDate(selectedRange.end)
          }
        </div>
      )}

      <div className="flex">
        <div className="w-24 pr-4 border-r border-slate-600">
          {presets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => handlePresetClick(preset.value)}
              className={`block w-full text-left py-2 px-2 text-sm rounded mb-1 transition-colors ${
                selectedPreset === preset.value
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-slate-700 text-slate-300'
              }`}
            >
              {preset.label}
            </button>
          ))}
          
          <button
            onClick={handleReset}
            className="block w-full text-left py-2 px-2 text-sm rounded mb-1 mt-4 bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="flex-1 pl-4">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => navigateMonth(-1)}
              className="p-1 hover:bg-slate-700 rounded"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-medium">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button 
              onClick={() => navigateMonth(1)}
              className="p-1 hover:bg-slate-700 rounded"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs text-slate-400 py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const isStartDate = isSameDay(day.date, tempRange.start);
              const isEndDate = isSameDay(day.date, tempRange.end);
              const isInDateRange = isInRange(day.date, tempRange.start, tempRange.end);
              const isToday = isSameDay(day.date, new Date());

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(day.date)}
                  className={`
                    w-8 h-8 text-sm rounded transition-colors relative
                    ${!day.isCurrentMonth 
                      ? 'text-slate-500 hover:bg-slate-700' 
                      : 'text-white hover:bg-slate-600'
                    }
                    ${isStartDate || isEndDate 
                      ? 'bg-blue-600 text-white' 
                      : isInDateRange 
                        ? 'bg-blue-800' 
                        : ''
                    }
                    ${isToday && !isStartDate && !isEndDate 
                      ? 'bg-slate-600 font-bold' 
                      : ''
                    }
                  `}
                >
                  {day.date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleApply}
              disabled={!tempRange.start}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                tempRange.start
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-slate-600 text-slate-400 cursor-not-allowed'
              }`}
            >
              Apply
            </button>
          </div>

          {(tempRange.start || tempRange.end) && (
            <div className="mt-2 text-xs text-slate-400">
              Current: {tempRange.start && tempRange.end 
                ? `${formatDate(tempRange.start)} - ${formatDate(tempRange.end)}`
                : formatDate(tempRange.start) || formatDate(tempRange.end)
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateRangeCalendar;