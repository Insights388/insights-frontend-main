import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const DropdownButton = ({ 
  children, 
  buttonContent, 
  className = "",
  buttonClassName = "",
  dropdownClassName = "",
  onToggle,
  closeOnOutsideClick = true,
  position = "bottom-left" // bottom-left, bottom-right, top-left, top-right
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (closeOnOutsideClick && 
          dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeOnOutsideClick]);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-right':
        return 'top-full right-0 mt-2';
      case 'top-left':
        return 'bottom-full left-0 mb-2';
      case 'top-right':
        return 'bottom-full right-0 mb-2';
      default: // bottom-left
        return 'top-full left-0 mt-2';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={`flex items-center justify-between transition-colors ${buttonClassName}`}
      >
        {buttonContent}
        <ChevronDown 
          size={16} 
          className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div 
          ref={dropdownRef}
          className={`absolute z-50 ${getPositionClasses()} ${dropdownClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;