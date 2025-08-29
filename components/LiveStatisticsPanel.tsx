import React from 'react';
import type { CloningProgress, CloningStatus } from '../types';
import { Card, CardHeader } from './Card';
import { StatsIcon, ChannelsIcon, RolesIcon, EmojisIcon, StickersIcon } from './icons';

interface LiveStatisticsPanelProps {
  progress: CloningProgress;
  status: CloningStatus;
}

const StatBox: React.FC<{ icon: React.ReactNode; label: string; value: number; total: number }> = ({ icon, label, value, total }) => (
  <div className="bg-[#0D0F12]/50 border border-gray-700/50 rounded-lg p-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="text-gray-400">{icon}</div>
      <span className="text-sm font-semibold text-gray-300">{label}</span>
    </div>
    <div className="text-sm font-mono">
      <span className="text-white">{value}</span>
      <span className="text-gray-500">/{total}</span>
    </div>
  </div>
);


export const LiveStatisticsPanel: React.FC<LiveStatisticsPanelProps> = ({ progress, status }) => {
  return (
    <Card>
      <CardHeader
        icon={<StatsIcon className="w-6 h-6" />}
        title="ESTATÍSTICAS AO VIVO"
        subtitle="PROGRESSO DA CLONAGEM EM TEMPO REAL"
      />
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatBox icon={<ChannelsIcon className="w-5 h-5" />} label="CANAIS" value={progress.channels.current} total={progress.channels.total} />
          <StatBox icon={<RolesIcon className="w-5 h-5" />} label="CARGOS" value={progress.roles.current} total={progress.roles.total} />
          <StatBox icon={<EmojisIcon className="w-5 h-5" />} label="EMOJIS" value={progress.emojis.current} total={progress.emojis.total} />
          <StatBox icon={<StickersIcon className="w-5 h-5" />} label="FIGURINHAS" value={progress.stickers.current} total={progress.stickers.total} />
        </div>
        <div className="mt-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-gray-400">PROGRESSO GERAL</span>
            <span className="text-sm font-mono text-white">{progress.overall}%</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2.5">
            <div 
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${progress.overall}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Card>
  );
};
