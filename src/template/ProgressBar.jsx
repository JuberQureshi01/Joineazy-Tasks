
import React from 'react';

export default function ProgressBar({ value }) {
  const percentage = Math.max(0, Math.min(100, value)); 

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-[#00A86B] h-2.5 rounded-full transition-all duration-500 ease-out" 
        style={{ width: `${percentage}%` }}
      >
      </div>
    </div>
  );
}