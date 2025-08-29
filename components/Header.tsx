
import React from 'react';
import { LogoIcon, DiscordIcon, HeartIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="py-6">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <LogoIcon />
          <div>
            <h1 className="text-2xl font-bold text-white">discord server cloner</h1>
            <p className="text-xs text-gray-400">
              <span className="text-yellow-400/80">&#9679;</span> Premium Edition
              <span className="text-gray-600 mx-2">&#x2022;</span>
              Developed by Awex
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
            <DiscordIcon className="w-5 h-5" />
            Join Discord
          </a>
          <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
            <HeartIcon className="w-5 h-5 text-green-400" />
            Support us
          </a>
        </div>
      </nav>
    </header>
  );
};
