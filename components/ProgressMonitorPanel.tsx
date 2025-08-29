
import React, { useRef, useEffect } from 'react';
import type { CloningStatus } from '../types';
import { Card, CardHeader } from './Card';
import { MonitorIcon, RocketIcon } from './icons';

interface ProgressMonitorPanelProps {
  status: CloningStatus;
  logs: string[];
}

export const ProgressMonitorPanel: React.FC<ProgressMonitorPanelProps> = ({ status, logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const renderContent = () => {
    if (status === 'idle') {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <RocketIcon className="w-16 h-16 text-gray-600 mb-4" />
          <p className="font-semibold text-gray-400">READY TO CLONE YOUR SERVER...</p>
        </div>
      );
    }

    return (
      <div ref={scrollRef} className="h-full overflow-y-auto font-mono text-sm text-gray-400 space-y-2 pr-2">
        {logs.map((log, index) => (
          <p key={index} className="whitespace-pre-wrap animate-fade-in">
            <span className="text-gray-600 mr-2">{`[${index.toString().padStart(3, '0')}]>`}</span>
            {log}
          </p>
        ))}
         {status === 'cloning' && <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse ml-1"></div>}
      </div>
    );
  };

  return (
    <Card className="flex-grow flex flex-col min-h-[300px]">
      <CardHeader
        icon={<MonitorIcon className="w-6 h-6" />}
        title="PROGRESS MONITOR"
        subtitle="LIVE OPERATION TRACKING"
      />
      <div className="p-6 flex-grow min-h-0">
        {renderContent()}
      </div>
      <div className="flex justify-center items-center p-4 border-t border-gray-700/50">
          <div className="flex gap-2">
            <div className={`w-2 h-2 rounded-full ${status === 'idle' ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
            <div className={`w-2 h-2 rounded-full ${status === 'cloning' ? 'bg-blue-500 animate-pulse' : 'bg-gray-600'}`}></div>
            <div className={`w-2 h-2 rounded-full ${status === 'success' ? 'bg-green-500' : 'bg-gray-600'}`}></div>
          </div>
      </div>
    </Card>
  );
};
