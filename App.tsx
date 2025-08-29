
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { LiveStatisticsPanel } from './components/LiveStatisticsPanel';
import { ProgressMonitorPanel } from './components/ProgressMonitorPanel';
import { SetupGuide } from './components/SetupGuide';
import type { CloningStatus, CloningProgress } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<CloningStatus>('idle');
  const [progress, setProgress] = useState<CloningProgress>({
    channels: { current: 0, total: 0 },
    roles: { current: 0, total: 0 },
    emojis: { current: 0, total: 0 },
    stickers: { current: 0, total: 0 },
    overall: 0,
  });
  const [logs, setLogs] = useState<string[]>([]);
  const [discordToken, setDiscordToken] = useState('');
  const [sourceServerId, setSourceServerId] = useState('');
  const [targetServerId, setTargetServerId] = useState('');

  const resetState = useCallback(() => {
    setStatus('idle');
    setProgress({
      channels: { current: 0, total: 0 },
      roles: { current: 0, total: 0 },
      emojis: { current: 0, total: 0 },
      stickers: { current: 0, total: 0 },
      overall: 0,
    });
    setLogs([]);
  }, []);

  const handleClone = useCallback(() => {
    if (status === 'cloning') return;

    resetState();
    setStatus('cloning');

    const totalChannels = Math.floor(Math.random() * 50) + 20;
    const totalRoles = Math.floor(Math.random() * 30) + 10;
    const totalEmojis = Math.floor(Math.random() * 100) + 10;
    const totalStickers = Math.floor(Math.random() * 20) + 5;
    const totalSteps = totalChannels + totalRoles + totalEmojis + totalStickers;
    let currentStep = 0;

    setProgress(prev => ({ ...prev, 
      channels: {...prev.channels, total: totalChannels},
      roles: {...prev.roles, total: totalRoles},
      emojis: {...prev.emojis, total: totalEmojis},
      stickers: {...prev.stickers, total: totalStickers},
    }));
    
    setLogs(prev => [...prev, 'Initiating server clone...']);
    setLogs(prev => [...prev, 'Source and Target servers identified.']);
    setLogs(prev => [...prev, `Preparing to clone ${totalChannels} channels, ${totalRoles} roles, ${totalEmojis} emojis, and ${totalStickers} stickers.`]);

    const interval = setInterval(() => {
      let taskCompleted = false;
      setProgress(prev => {
        const newProgress = { ...prev };
        if (newProgress.channels.current < totalChannels) {
          newProgress.channels.current += 1;
          if(newProgress.channels.current % 5 === 0) setLogs(l => [...l, `Cloned channel #${newProgress.channels.current}`]);
          taskCompleted = true;
        } else if (newProgress.roles.current < totalRoles) {
          newProgress.roles.current += 1;
          if(newProgress.roles.current % 5 === 0) setLogs(l => [...l, `Cloned role #${newProgress.roles.current}`]);
          taskCompleted = true;
        } else if (newProgress.emojis.current < totalEmojis) {
          newProgress.emojis.current += 1;
           if(newProgress.emojis.current % 10 === 0) setLogs(l => [...l, `Cloned emoji #${newProgress.emojis.current}`]);
          taskCompleted = true;
        } else if (newProgress.stickers.current < totalStickers) {
          newProgress.stickers.current += 1;
          if(newProgress.stickers.current % 5 === 0) setLogs(l => [...l, `Cloned sticker #${newProgress.stickers.current}`]);
          taskCompleted = true;
        }

        if (taskCompleted) {
          currentStep++;
          newProgress.overall = Math.round((currentStep / totalSteps) * 100);
        }
        
        if (currentStep >= totalSteps) {
          clearInterval(interval);
          setStatus('success');
          setLogs(l => [...l, 'Server cloning complete!']);
        }
        return newProgress;
      });
    }, 50);

  }, [status, resetState]);

  return (
    <div className="bg-[#0D0F12] text-gray-300 font-sans min-h-screen">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-no-repeat"
        style={{
          backgroundImage: 'radial-gradient(circle at top right, rgba(29, 78, 216, 0.15), transparent 40%), radial-gradient(circle at bottom left, rgba(29, 78, 216, 0.1), transparent 50%)'
        }}>
      </div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Header />
        <main>
          <Hero />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <ConfigurationPanel 
                onClone={handleClone} 
                status={status}
                discordToken={discordToken}
                setDiscordToken={setDiscordToken}
                sourceServerId={sourceServerId}
                setSourceServerId={setSourceServerId}
                targetServerId={targetServerId}
                setTargetServerId={setTargetServerId}
              />
            </div>
            <div className="lg:col-span-3 flex flex-col gap-6">
              <LiveStatisticsPanel progress={progress} status={status} />
              <ProgressMonitorPanel status={status} logs={logs} />
            </div>
          </div>
          <SetupGuide />
        </main>
      </div>
    </div>
  );
};

export default App;
