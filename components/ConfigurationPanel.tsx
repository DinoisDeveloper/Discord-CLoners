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
        title="CONFIGURAÇÃO"
        subtitle="DEFINA SEUS PARÂMETROS DE CLONAGEM"
      />
      <div className="p-6 flex-grow flex flex-col">
        <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col">
          <div>
            <label className="text-xs font-bold text-gray-400" htmlFor="discord-token">TOKEN DO DISCORD (obrigatório)</label>
            <input 
              id="discord-token"
              type="password" 
              placeholder="Digite seu token do Discord"
              value={discordToken}
              onChange={(e) => setDiscordToken(e.target.value)}
              className="w-full mt-2 bg-[#0D0F12] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400" htmlFor="source-server-id">ID DO SERVIDOR DE ORIGEM (copiar daqui)</label>
            <input 
              id="source-server-id"
              type="text" 
              placeholder="Digite o ID do servidor de origem"
              value={sourceServerId}
              onChange={(e) => setSourceServerId(e.target.value)}
              className="w-full mt-2 bg-[#0D0F12] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400" htmlFor="target-server-id">ID DO SERVIDOR DE DESTINO (colar aqui)</label>
            <input 
              id="target-server-id"
              type="text" 
              placeholder="Digite o ID do servidor de destino"
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
            {status === 'cloning' ? 'CLONANDO...' : 'CLONAR SERVIDOR'}
          </button>
        </form>
        <ul className="mt-8 space-y-3 text-sm text-gray-400">
          <li className="flex items-start gap-3">
            <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <span>Insira um <b className="text-gray-300">Token do Discord</b> válido - ele é armazenado apenas localmente.</span>
          </li>
          <li className="flex items-start gap-3">
            <ExclamationIcon className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <span>Forneça os IDs dos servidores de <b className="text-gray-300">Origem</b> e <b className="text-gray-300">Destino</b>.</span>
          </li>
          <li className="flex items-start gap-3">
            <RocketIcon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <span>Clique em <b className="text-gray-300">Clonar Servidor</b> e veja a mágica acontecer.</span>
          </li>
          <li className="flex items-start gap-3">
            <InfoIcon className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
            <span>Seus dados nunca saem desta página - tudo é executado diretamente no seu navegador.</span>
          </li>
        </ul>
      </div>
    </Card>
  );
};
