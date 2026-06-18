import { ISP, Server } from '@/types'

export const ISPs: ISP[] = [
  { id: 'indihome', name: 'Indihome', color: '#FF6B35' },
  { id: 'biznet', name: 'Biznet', color: '#0066CC' },
  { id: 'firstmedia', name: 'First Media', color: '#E31C23' },
  { id: 'xlhome', name: 'XL Home', color: '#009933' },
  { id: 'myrepublic', name: 'MyRepublic', color: '#FF0066' },
  { id: 'bolt', name: 'BOLT!', color: '#FFD700' },
  { id: 'mncplay', name: 'MNC Play', color: '#0033CC' },
]

export const Servers: Server[] = [
  // Game Servers
  { id: 'valorant-sg', name: 'Valorant Singapore', type: 'game', host: 'sgp-valorant.cdn.riotgames.com' },
  { id: 'valorant-id', name: 'Valorant Indonesia', type: 'game', host: 'id-valorant.cdn.riotgames.com' },
  { id: 'mlbb-sg', name: 'Mobile Legends Singapore', type: 'game', host: 'sg.mlbb.com' },
  { id: 'mlbb-id', name: 'Mobile Legends Indonesia', type: 'game', host: 'id.mlbb.com' },
  { id: 'genshin-sg', name: 'Genshin Impact Singapore', type: 'game', host: 'sg-os-genshin.hoyoverse.com' },
  { id: 'genshin-id', name: 'Genshin Impact Indonesia', type: 'game', host: 'id-os-genshin.hoyoverse.com' },
  // Work Servers
  { id: 'aws-sg', name: 'AWS Singapore', type: 'work', host: 'ec2.ap-southeast-1.amazonaws.com' },
  { id: 'aws-id', name: 'AWS Indonesia', type: 'work', host: 'ec2.ap-southeast-3.amazonaws.com' },
  { id: 'cloudflare', name: 'Cloudflare', type: 'work', host: '1.1.1.1' },
  { id: 'google-dns', name: 'Google DNS', type: 'work', host: '8.8.8.8' },
]
