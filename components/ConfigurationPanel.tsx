
import React from 'react';
import type { CloningStatus } from '../types';
import { Card, CardHeader } from './Card';
import { ConfigIcon, RocketIcon, CheckIcon, ExclamationIcon, InfoIcon } from './icons';

interface ConfigurationPanelProps {
  onClone: () => void;
  status: CloningStatus;
  discordToken: string;
  setDiscordToken: (value: string) => void;
  sourceServerId: string;
  setSourceServerId: (value: string) => void;
  targetServerId: string;
  setTargetServerId: (value: string) => void;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ 
  onClone, 
  status,
  discordToken,
  setDiscordToken,
  sourceServerId,
  setSourceServerId,
  targetServerId,
  setTargetServerId
 }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClone();
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader 
        icon={<ConfigIcon className="w-6 h-6"/>}
        title="CONFIGURATION"
        subtitle="SETUP YOUR CLONING PARAMETERS"
      />
      <div className="p-6 flex-grow flex flex-col">
        <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col">
          <div>
            <label className="text-xs font-bold text-gray-400" htmlFor="discord-token">DISCORD TOKEN (required)</label>
            <input 
              id="discord-token"
              type="password" 
              placeholder="Enter your Discord token"
              value={discordToken}
              onChange={(e) => setDiscordToken(e.target.value)}
              className="w-full mt-2 bg-[#0D0F12] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400" htmlFor="source-server-id">SOURCE SERVER ID (server to copy from)</label>
            <input 
              id="source-server-id"
              type="text" 
              placeholder="Enter source server ID"
              value={sourceServerId}
              onChange={(e) => setSourceServerId(e.target.value)}
              className="w-full mt-2 bg-[#0D0F12] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400" htmlFor="target-server-id">TARGET SERVER ID (server to paste to)</label>
            <input 
              id="target-server-id"
              type="text" 
              placeholder="Enter target server ID"
              value={targetServerId}
              onChange={(e) => setTargetServerId(e.target.value)}
              className="w-full mt-2 bg-[#0D0F12] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <button 
            type="submit"
            disabled={status === 'cloning'}
            className="w-full flex items-center justify-center gap-3 bg-slate-600 hover:bg-slate-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            <RocketIcon className="w-5 h-5"/>
            {status === 'cloning' ? 'CLONING...' : 'CLONE SERVER'}
          </button>
        </form>
        <ul className="mt-8 space-y-3 text-sm text-gray-400">
          <li className="flex items-start gap-3">
            <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <span>Enter a valid <b className="text-gray-300">Discord Token</b> - it's stored locally only.</span>
          </li>
          <li className="flex items-start gap-3">
            <ExclamationIcon className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <span>Provide the <b className="text-gray-300">Source</b> and <b className="text-gray-300">Target</b> Server IDs.</span>
          </li>
          <li className="flex items-start gap-3">
            <RocketIcon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <span>Click <b className="text-gray-300">Clone Server</b> and watch magic happen.</span>
          </li>
          <li className="flex items-start gap-3">
            <InfoIcon className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
            <span>Your data never leaves this page - everything runs right in your browser.</span>
          </li>
        </ul>
      </div>
    </Card>
  );
};
