"use client"
import React from 'react';

function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-400 rounded-full h-4 mt-3 relative overflow-hidden">
      <div
        className="bg-primary h-4 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center text-[13px]">
        <span className="text-white font-medium">{progress}%</span>
      </div>
    </div>
  );
}

export default ProgressBar;
