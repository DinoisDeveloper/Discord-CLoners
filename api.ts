// api.ts

const API_BASE = 'https://discord.com/api/v9';
const RATE_LIMIT_DELAY = 1100; // ms delay between write operations to be safe

type ProgressCallback = (update: { type: string; log?: string; [key: string]: any }) => void;

interface CloneServerOptions {
  token: string;
  sourceId: string;
  targetId: string;
  onProgress: ProgressCallback;
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const discordFetch = async (token: string, endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: `Request failed with status ${response.status}` }));
    console.error('Discord API Error:', error);
    const errorMessage = error.message || 'Ocorreu um erro desconhecido.';
    const errorDetails = error.errors ? ` Detalhes: ${JSON.stringify(error.errors)}` : '';
    throw new Error(`${errorMessage}${errorDetails}`);
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
};

const getGuildData = (token: string, guildId: string) => discordFetch(token, `/guilds/${guildId}`);
const getGuildChannels = (token: string, guildId: string) => discordFetch(token, `/guilds/${guildId}/channels`);
const getGuildRoles = (token: string, guildId: string) => discordFetch(token, `/guilds/${guildId}/roles`);

export async function cloneServer({ token, sourceId, targetId, onProgress }: CloneServerOptions) {
  onProgress({ type: 'log', log: 'Iniciando processo de clonagem...' });
  
  onProgress({ type: 'log', log: 'Buscando dados do servidor de origem...' });
  const [sourceChannels, sourceRoles] = await Promise.all([
    getGuildChannels(token, sourceId),
    getGuildRoles(token, sourceId),
  ]);
  onProgress({ type: 'log', log: `Encontrados ${sourceChannels.length} canais e ${sourceRoles.length} cargos.` });

  // Exclude @everyone and managed roles
  const rolesToClone = sourceRoles
    .filter((r: any) => !r.managed && r.name !== '@everyone')
    .sort((a: any, b: any) => a.position - b.position);

  const channelsToClone = sourceChannels.sort((a: any, b: any) => a.position - b.position);

  onProgress({ type: 'totals', channels: channelsToClone.length, roles: rolesToClone.length });
  
  onProgress({ type: 'log', log: '⚠️ Emojis e figurinhas não podem ser clonados pelo navegador por limitações de segurança (CORS).' });

  // Clone Roles
  onProgress({ type: 'log', log: 'Iniciando clonagem de cargos...' });
  const roleMap = new Map<string, string>();
  roleMap.set(sourceId, targetId); // Map @everyone role
  let rolesClonedCount = 0;
  for (const role of rolesToClone) {
    const rolePayload = {
      name: role.name,
      permissions: role.permissions,
      color: role.color,
      hoist: role.hoist,
      mentionable: role.mentionable,
    };
    try {
      const newRole = await discordFetch(token, `/guilds/${targetId}/roles`, {
        method: 'POST',
        body: JSON.stringify(rolePayload),
      });
      roleMap.set(role.id, newRole.id);
      rolesClonedCount++;
      onProgress({ type: 'role', current: rolesClonedCount, log: `Cargo clonado: ${role.name}` });
    } catch (e: any) {
       onProgress({ type: 'log', log: `Falha ao clonar cargo "${role.name}": ${e.message}` });
    }
    await delay(RATE_LIMIT_DELAY);
  }
  onProgress({ type: 'log', log: '✅ Clonagem de cargos concluída.' });

  // Clone Channels
  onProgress({ type: 'log', log: 'Iniciando clonagem de canais...' });
  const channelMap = new Map<string, string>();
  const categories = channelsToClone.filter((c: any) => c.type === 4);
  const otherChannels = channelsToClone.filter((c: any) => c.type !== 4);

  let channelsClonedCount = 0;

  // Clone categories first
  for (const channel of categories) {
    const perms = channel.permission_overwrites.map((p: any) => ({
        id: roleMap.get(p.id),
        type: p.type,
        allow: p.allow,
        deny: p.deny,
    })).filter((p:any) => p.id); // Filter out any roles that couldn't be mapped
    
    const channelPayload = {
        name: channel.name,
        type: channel.type,
        permission_overwrites: perms,
    };
    try {
        const newChannel = await discordFetch(token, `/guilds/${targetId}/channels`, {
            method: 'POST',
            body: JSON.stringify(channelPayload),
        });
        channelMap.set(channel.id, newChannel.id);
        channelsClonedCount++;
        onProgress({ type: 'channel', current: channelsClonedCount, log: `Categoria clonada: ${channel.name}` });
    } catch(e: any) {
        onProgress({ type: 'log', log: `Falha ao clonar categoria "${channel.name}": ${e.message}` });
    }
    await delay(RATE_LIMIT_DELAY);
  }

  // Clone other channels
  for (const channel of otherChannels) {
    const perms = channel.permission_overwrites.map((p: any) => ({
        id: roleMap.get(p.id),
        type: p.type,
        allow: p.allow,
        deny: p.deny,
    })).filter((p:any) => p.id);
    
    const channelPayload: any = {
        name: channel.name,
        type: channel.type,
        topic: channel.topic,
        nsfw: channel.nsfw,
        rate_limit_per_user: channel.rate_limit_per_user,
        bitrate: channel.bitrate,
        user_limit: channel.user_limit,
        parent_id: channel.parent_id ? channelMap.get(channel.parent_id) : undefined,
        permission_overwrites: perms,
    };
    try {
        await discordFetch(token, `/guilds/${targetId}/channels`, {
            method: 'POST',
            body: JSON.stringify(channelPayload),
        });
        channelsClonedCount++;
        onProgress({ type: 'channel', current: channelsClonedCount, log: `Canal clonado: #${channel.name}` });
    } catch(e: any) {
        onProgress({ type: 'log', log: `Falha ao clonar canal "#${channel.name}": ${e.message}` });
    }
    await delay(RATE_LIMIT_DELAY);
  }
  onProgress({ type: 'log', log: '✅ Clonagem de canais concluída.' });
}
