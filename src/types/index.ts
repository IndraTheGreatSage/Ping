export interface ISPPingData {
  isp: string
  server: string
  serverType: 'game' | 'work'
  ping: number
  packetLoss: number
  timestamp: number
}

export interface ISP {
  id: string
  name: string
  color: string
}

export interface Server {
  id: string
  name: string
  type: 'game' | 'work'
  host: string
}

export interface UserTestResult {
  isp: string
  server: string
  ping: number
  packetLoss: number
  jitter: number
  timestamp: number
}
