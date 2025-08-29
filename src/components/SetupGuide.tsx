import React from 'react';
import { Card, CardHeader } from './Card';
import { ClockIcon, ConfigIcon } from './icons';

export const SetupGuide: React.FC = () => {
  return (
    <div className="mt-12">
      <div className="flex items-center gap-4 mb-6">
        <ClockIcon className="w-8 h-8 text-gray-500" />
        <div>
          <h2 className="text-2xl font-bold text-white">Guia de Configuração Rápida</h2>
          <p className="text-sm text-gray-500">COMECE EM MINUTOS</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader
            icon={<ConfigIcon className="w-6 h-6" />}
            title="PEGUE SEU TOKEN DO DISCORD"
            subtitle=""
          />
          <div className="p-6">
            <ol className="list-decimal list-inside space-y-3 text-gray-400 text-sm">
              <li>Abra o Discord no seu navegador e faça login.</li>
              <li>Pressione <b className="text-gray-300">F12</b> ou clique com o botão direito e selecione "Inspecionar".</li>
              <li>Vá para a aba "Rede" (Network) e atualize a página.</li>
              <li>Digite <b className="text-gray-300">"api"</b> na caixa de filtro e clique em qualquer requisição.</li>
              <li>Procure por <b className="text-gray-300">"Authorization"</b> nos Cabeçalhos da Requisição (Request Headers) - esse é o seu token.</li>
            </ol>
          </div>
        </Card>
        <Card>
          <CardHeader
            icon={<ConfigIcon className="w-6 h-6" />}
            title="PEGUE OS IDs DOS SERVIDORES"
            subtitle=""
          />
          <div className="p-6">
            <ol className="list-decimal list-inside space-y-3 text-gray-400 text-sm">
              <li>Ative o Modo Desenvolvedor nas Configurações do Discord &rarr; Avançado.</li>
              <li>Clique com o botão direito em qualquer ícone de servidor e selecione "Copiar ID".</li>
              <li>Para o servidor de origem, selecione o servidor que você quer copiar.</li>
              <li>Para o servidor de destino, crie um novo servidor vazio ou selecione um existente.</li>
            </ol>
            <div className="mt-4 bg-yellow-900/50 border border-yellow-500/50 text-yellow-300 text-sm rounded-lg p-3 space-y-2">
                <p><b className="font-bold">IMPORTANTE:</b> Você deve ter permissões de administrador no servidor de destino!</p>
                <p><b className="font-bold">AVISO:</b> USAR SEU TOKEN DE USUÁRIO É CONTRA OS TERMOS DE SERVIÇO DO DISCORD E PODE RESULTAR NO BANIMENTO DA SUA CONTA. USE POR SUA CONTA E RISCO.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};