
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-[#1A1C23]/80 border border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ icon, title, subtitle }) => (
    <div className="flex items-center gap-4 p-5 border-b border-gray-700/50">
        <div className="text-gray-400">{icon}</div>
        <div>
            <h2 className="font-bold text-white tracking-wider">{title}</h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest">{subtitle}</p>
        </div>
    </div>
);
