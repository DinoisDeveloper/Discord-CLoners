import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { LiveStatisticsPanel } from './components/LiveStatisticsPanel';
import { ProgressMonitorPanel } from './components/ProgressMonitorPanel';
import { SetupGuide } from './components/SetupGuide';
import type { CloningStatus, CloningProgress } from './types';
import { cloneServer } from './api';

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

  const handleClone = useCallback(async () => {
    if (status === 'cloning') return;

    if (!discordToken || !sourceServerId || !targetServerId) {
      setLogs(['Erro: Preencha todos os campos obrigatórios.']);
      setStatus('error');
      return;
    }

    resetState();
    setStatus('cloning');

    let totalSteps = 0;
    let completedSteps = 0;

    const onProgress = (update: any) => {
        if (update.log) {
            setLogs(prev => [...prev, update.log]);
        }
        if (update.type === 'totals') {
            setProgress(prev => ({
                ...prev,
                channels: { ...prev.channels, total: update.channels },
                roles: { ...prev.roles, total: update.roles },
            }));
            totalSteps = update.channels + update.roles;
        }
        if (update.type === 'channel') {
            completedSteps++;
            setProgress(prev => ({ ...prev, channels: { ...prev.channels, current: update.current }, overall: totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0 }));
        }
        if (update.type === 'role') {
            completedSteps++;
            setProgress(prev => ({ ...prev, roles: { ...prev.roles, current: update.current }, overall: totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0 }));
        }
    };
    
    try {
        await cloneServer({
            token: discordToken,
            sourceId: sourceServerId,
            targetId: targetServerId,
            onProgress,
        });
        setStatus('success');
        setLogs(prev => [...prev, '✅ Clonagem do servidor concluída com sucesso!']);
    } catch (error: any) {
        setStatus('error');
        setLogs(prev => [...prev, `❌ ERRO FATAL: ${error.message}`]);
        console.error(error);
    }

  }, [status, resetState, discordToken, sourceServerId, targetServerId]);

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