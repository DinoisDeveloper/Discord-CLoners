
import React from 'react';
import { StatsIcon } from './icons';

export const Hero: React.FC = () => {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center gap-2 border border-gray-700/80 rounded-full px-4 py-1 text-xs text-gray-400 mb-6">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        ULTRA-FAST SERVER CLONING TECHNOLOGY
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
        CLONE DISCORD SERVERS IN
        <br />
        <span 
          className="text-blue-500"
          style={{ textShadow: '0 0 15px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.5)' }}
        >
          SECONDS
        </span>
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-gray-400">
        Professional-grade server cloning with advanced features, real-time progress tracking, and enterprise-level reliability.
      </p>
    </div>
  );
};
