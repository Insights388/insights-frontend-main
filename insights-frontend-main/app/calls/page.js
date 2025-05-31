"use client"

import { useState } from "react";
import Sidebar from "@/components/dashboard/layout/Sidebar";
import { Search, Calendar, SlidersHorizontal, Phone, Clock, User, ChevronDown, ChevronRight } from "lucide-react";
import DropdownButton from "@/components/DropdownButton";
import DateRangeCalendar from "@/components/DateRangeCalendar";
import FilterComponent from "@/components/FilterComponent";
import Header from "@/components/dashboard/layout/Header";
import CallOverviewDashboard from "../callDetails/page";
import { X } from "lucide-react";

const CallsPage = () => {
    const [activeTab, setActiveTab] = useState("Calls");
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({ sort: 'latest', statuses: [] });
    const [currentTime, setCurrentTime] = useState(new Date());
    const [expandedContacts, setExpandedContacts] = useState(new Set());
    const [selectedCall, setSelectedCall] = useState(null);
    const [showDashboard, setShowDashboard] = useState(false);

    // Flatten the contacts data into individual call records for table display
    const callsData = [
      { id: 1, name: 'Alice Johnson', initial: 'A', time: '9:15 AM', date: '2024-01-15', duration: '12:45', status: 'Warm', email: 'alice@company.com' },
      { id: 2, name: 'Alice Johnson', initial: 'A', time: '11:30 AM', date: '2024-01-14', duration: '3:30', status: 'Hot', email: 'alice@company.com' },
      { id: 3, name: 'Alice Johnson', initial: 'A', time: '4:20 PM', date: '2024-01-13', duration: '6:15', status: 'Closed', email: 'alice@company.com' },
      { id: 4, name: 'Bob Smith', initial: 'B', time: '2:30 PM', date: '2024-01-15', duration: '8:20', status: 'Hot', email: 'bob@company.com' },
      { id: 5, name: 'Bob Smith', initial: 'B', time: '10:15 AM', date: '2024-01-14', duration: '15:45', status: 'Warm', email: 'bob@company.com' },
      { id: 6, name: 'Carol Williams', initial: 'C', time: '3:45 PM', date: '2024-01-15', duration: '5:30', status: 'Closed', email: 'carol@company.com' },
      { id: 7, name: 'David Brown', initial: 'D', time: '1:20 PM', date: '2024-01-15', duration: '22:10', status: 'Hot', email: 'david@company.com' },
      { id: 8, name: 'David Brown', initial: 'D', time: '9:00 AM', date: '2024-01-14', duration: '7:45', status: 'Warm', email: 'david@company.com' },
      { id: 9, name: 'Emma Davis', initial: 'E', time: '4:15 PM', date: '2024-01-15', duration: '11:20', status: 'Warm', email: 'emma@company.com' },
      { id: 10, name: 'Emma Davis', initial: 'E', time: '2:30 PM', date: '2024-01-13', duration: '9:15', status: 'Closed', email: 'emma@company.com' }
    ];

    // Group calls by contact name
    const groupedCallsData = callsData.reduce((acc, call) => {
      if (!acc[call.name]) {
        acc[call.name] = {
          name: call.name,
          initial: call.initial,
          email: call.email,
          calls: []
        };
      }
      acc[call.name].calls.push({
        id: call.id,
        time: call.time,
        date: call.date,
        duration: call.duration,
        status: call.status
      });
      return acc;
    }, {});

    const contactsArray = Object.values(groupedCallsData);

    const formatDateRange = (range) => {
      if (range.start && range.end) {
        return `${range.start.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: '2-digit' })} - ${range.end.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: '2-digit' })}`;
      }
      return '28 Dec 22 - 10 Jan 23';
    };

    const handleDetailsClick = (call, contactName) => {
      setSelectedCall({ ...call, contactName });
      setShowDashboard(true);
    };
    
    const closeDashboard = () => {
      setShowDashboard(false);
      setSelectedCall(null);
    };

    const handleApplyFilters = (newFilters) => {
      setFilters(newFilters);
      console.log('Applied Filters:', newFilters);
    };

    const handleClearFilters = () => {
      setFilters({ sort: 'latest', statuses: [] });
      console.log('Cleared all filters');
    };

    // Apply filters to contacts
    const applyFiltersToData = (contacts) => {
      let filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Filter by status if any statuses are selected
      if (filters.statuses.length > 0) {
        filtered = filtered.filter(contact =>
          contact.calls.some(call => {
            const callStatus = call.status.toLowerCase();
            return filters.statuses.some(status => {
              if (status === 'closed') return callStatus === 'closed';
              if (status === 'cold') return callStatus === 'cold';
              if (status === 'lukewarm') return callStatus === 'lukewarm';
              if (status === 'warm') return callStatus === 'warm';
              if (status === 'hot') return callStatus === 'hot';
              return false;
            });
          })
        );
      }

      // Sort contacts
      if (filters.sort === 'oldest') {
        filtered.sort((a, b) => {
          const aLatestDate = new Date(Math.max(...a.calls.map(call => new Date(call.date))));
          const bLatestDate = new Date(Math.max(...b.calls.map(call => new Date(call.date))));
          return aLatestDate - bLatestDate;
        });
      } else {
        filtered.sort((a, b) => {
          const aLatestDate = new Date(Math.max(...a.calls.map(call => new Date(call.date))));
          const bLatestDate = new Date(Math.max(...b.calls.map(call => new Date(call.date))));
          return bLatestDate - aLatestDate;
        });
      }

      return filtered;
    };

    const filteredContacts = applyFiltersToData(contactsArray);

    const toggleContact = (contactName) => {
      const newExpanded = new Set(expandedContacts);
      if (newExpanded.has(contactName)) {
        newExpanded.delete(contactName);
      } else {
        newExpanded.add(contactName);
      }
      setExpandedContacts(newExpanded);
    };

    const getStatusBadge = (status) => {
      const statusColors = {
        'Hot': 'bg-green-500/20 text-green-400 border border-green-500/30',
        'Warm': 'bg-green-500/20 text-green-400 border border-green-500/30',
        'Closed': 'bg-slate-700 text-slate-300 border border-slate-600',
        'Cold': 'bg-slate-700 text-slate-300 border border-slate-600',
        'Lukewarm': 'bg-green-500/20 text-green-400 border border-green-500/30'
      };

      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
          {status}
        </span>
      );
    };

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: '2-digit'
      });
    };

    // If dashboard is shown, render only the dashboard
    if (showDashboard) {
      return (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="h-full overflow-y-auto">
            <div className="container mx-auto px-6 py-8">
              {/* Header with Close Button */}
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-10 py-4">
                <div>
                  <h1 className="text-3xl font-bold text-white">Call Analytics Dashboard</h1>
                  {selectedCall && (
                    <p className="text-slate-400 mt-1">
                      {selectedCall.contactName} - {selectedCall.time} on {formatDate(selectedCall.date)}
                    </p>
                  )}
                </div>
                <button 
                  onClick={closeDashboard}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors group"
                >
                  <X className="w-6 h-6 text-slate-400 group-hover:text-white" />
                </button>
              </div>
              
              {/* Dashboard Content */}
              <CallOverviewDashboard selectedCall={selectedCall} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-750 to-indigo-900 flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isLoaded={true} />
        
        <div className="flex-1 bg-slate-950/30">
          {/* Header */}
          <Header/>

          {/* Main Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-white">Call Logs</h1>
              <div className="flex items-center space-x-4">
                {/* Date Range Picker */}
                <DropdownButton
                  buttonContent={
                    <div className="flex items-center space-x-2 bg-slate-800/60 border border-slate-600/40 rounded-lg px-4 py-2 text-white hover:bg-slate-700/60 transition-colors backdrop-blur-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDateRange(dateRange)}</span>
                    </div>
                  }
                  dropdownClassName="bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50"
                  position="bottom-right"
                >
                  <DateRangeCalendar 
                    onRangeChange={setDateRange}
                    onApply={setDateRange}
                    initialRange={dateRange}
                  />
                </DropdownButton>

                {/* Filter Dropdown */}
                <DropdownButton
                  buttonContent={
                    <div className="flex items-center space-x-2 bg-slate-800/60 border border-slate-600/40 rounded-lg px-4 py-2 text-white hover:bg-slate-700/60 transition-colors backdrop-blur-sm">
                      <SlidersHorizontal className="w-4 h-4" />
                      <span>Filter</span>
                      {(filters.statuses.length > 0) && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  }
                  dropdownClassName="shadow-2xl"
                  position="bottom-right"
                >
                  <FilterComponent 
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearFilters}
                    initialFilters={filters}
                  />
                </DropdownButton>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-600/40 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 transition-colors backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Filter Status Indicator */}
            {(filters.statuses.length > 0 || filters.sort !== 'latest') && (
              <div className="mb-6 flex items-center gap-2 text-sm">
                <span className="text-slate-400">Active filters:</span>
                {filters.sort !== 'latest' && (
                  <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                    Sort: {filters.sort}
                  </span>
                )}
                {filters.statuses.map(status => (
                  <span key={status} className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded capitalize">
                    {status === 'lukewarm' ? 'Luke Warm' : status}
                  </span>
                ))}
              </div>
            )}

            {/* Calls Table */}
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/40 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/70 border-b border-slate-700/50">
                    <tr>
                      <th className="text-left py-4 px-6 text-slate-300 font-medium text-sm uppercase tracking-wide">Contact</th>
                      <th className="text-left py-4 px-6 text-slate-300 font-medium text-sm uppercase tracking-wide">Date/Time</th>
                      <th className="text-left py-4 px-6 text-slate-300 font-medium text-sm uppercase tracking-wide">Duration</th>
                      <th className="text-center py-4 px-6 text-slate-300 font-medium text-sm uppercase tracking-wide">Status</th>
                      <th className="text-center py-4 px-6 text-slate-300 font-medium text-sm uppercase tracking-wide">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.length > 0 ? (
                      filteredContacts.map((contact) => (
                        <>
                          {/* Main Contact Row */}
                          <tr 
                            key={contact.name} 
                            className="border-b border-slate-700/30 hover:bg-slate-800/40 transition-colors cursor-pointer"
                            onClick={() => toggleContact(contact.name)}
                          >
                            {/* Contact */}
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                                  {contact.initial}
                                </div>
                                <div>
                                  <div className="text-white font-medium">{contact.name}</div>
                                  <div className="text-slate-400 text-sm">{contact.email}</div>
                                </div>
                              </div>
                            </td>
                            
                            {/* Call Count */}
                            <td className="py-4 px-6">
                              <div className="text-white font-medium">{contact.calls.length} calls</div>
                              <div className="text-slate-400 text-sm">Latest: {formatDate(contact.calls[0]?.date)}</div>
                            </td>
                            
                            {/* Total Duration */}
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-2 text-slate-300">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {contact.calls.reduce((total, call) => {
                                    const [min, sec] = call.duration.split(':').map(Number);
                                    return total + min + (sec/60);
                                  }, 0).toFixed(0)} min
                                </span>
                              </div>
                            </td>
                            
                            {/* Latest Status */}
                            <td className="py-4 px-6 text-center">
                              {getStatusBadge(contact.calls[0]?.status)}
                            </td>
                            
                            {/* Expand/Collapse */}
                            <td className="py-4 px-6 text-center">
                              <div className="flex items-center justify-center">
                                {expandedContacts.has(contact.name) ? (
                                  <ChevronDown className="w-5 h-5 text-slate-400" />
                                ) : (
                                  <ChevronRight className="w-5 h-5 text-slate-400" />
                                )}
                              </div>
                            </td>
                          </tr>

                          {/* Expanded Call Rows */}
                          {expandedContacts.has(contact.name) && contact.calls.map((call, index) => (
                            <tr 
                              key={`${contact.name}-${call.id}`}
                              className="bg-slate-800/20 border-b border-slate-700/20"
                            >
                              <td className="py-3 px-6 pl-16">
                                <div className="text-slate-400 text-sm">Call #{index + 1}</div>
                              </td>
                              <td className="py-3 px-6">
                                <div className="text-white font-medium">{call.time}</div>
                                <div className="text-slate-400 text-sm">{formatDate(call.date)}</div>
                              </td>
                              <td className="py-3 px-6">
                                <div className="flex items-center space-x-2 text-slate-300">
                                  <Clock className="w-4 h-4" />
                                  <span>{call.duration}</span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                {getStatusBadge(call.status)}
                              </td>
                              <td className="py-3 px-6 text-center">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDetailsClick(call, contact.name);
                                  }}
                                  className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-3 py-1 rounded text-sm transition-colors duration-200"
                                >
                                  Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-12">
                          <div className="text-slate-400 text-lg mb-2">No contacts found</div>
                          <div className="text-slate-500 text-sm">Try adjusting your search or filters</div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default CallsPage;