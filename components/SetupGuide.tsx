
import React from 'react';
import { Card, CardHeader } from './Card';
import { ClockIcon, ConfigIcon } from './icons';

export const SetupGuide: React.FC = () => {
  return (
    <div className="mt-12">
      <div className="flex items-center gap-4 mb-6">
        <ClockIcon className="w-8 h-8 text-gray-500" />
        <div>
          <h2 className="text-2xl font-bold text-white">Quick Setup Guide</h2>
          <p className="text-sm text-gray-500">GET STARTED IN MINUTES</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader
            icon={<ConfigIcon className="w-6 h-6" />}
            title="GET YOUR DISCORD TOKEN"
            subtitle=""
          />
          <div className="p-6">
            <ol className="list-decimal list-inside space-y-3 text-gray-400 text-sm">
              <li>Open Discord in your browser and log in.</li>
              <li>Press <b className="text-gray-300">F12</b> or right-click and select "Inspect".</li>
              <li>Go to the "Network" tab and refresh the page.</li>
              <li>Type <b className="text-gray-300">"api"</b> in the filter box and click on any request.</li>
              <li>Look for <b className="text-gray-300">"Authorization"</b> in the Request Headers - that's your token.</li>
            </ol>
          </div>
        </Card>
        <Card>
          <CardHeader
            icon={<ConfigIcon className="w-6 h-6" />}
            title="GET SERVER IDS"
            subtitle=""
          />
          <div className="p-6">
            <ol className="list-decimal list-inside space-y-3 text-gray-400 text-sm">
              <li>Enable Developer Mode in Discord Settings &rarr; Advanced.</li>
              <li>Right-click on any server icon and select "Copy ID".</li>
              <li>For the source server, select the server you want to copy from.</li>
              <li>For the target server, create a new empty server or select an existing one.</li>
            </ol>
            <div className="mt-4 bg-red-900/50 border border-red-500/50 text-red-300 text-sm rounded-lg p-3">
              <b className="font-bold">IMPORTANT:</b> You must have admin permissions on the target server!
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
