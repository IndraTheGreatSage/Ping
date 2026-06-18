import { ISPPingData } from '@/types'
import { ISPs, Servers } from './isp-data'

// Generate realistic mock data for demonstration
export function generateMockData(): ISPPingData[] {
  const data: ISPPingData[] = []
  const now = Date.now()
  
  ISPs.forEach(isp => {
    Servers.forEach(server => {
      // Generate 24 hours of data (one data point every 5 minutes)
      for (let i = 0; i < 288; i++) {
        const timestamp = now - (288 - i) * 5 * 60 * 1000
        
        // Simulate realistic ping patterns based on ISP and server
        let basePing = 0
        let variance = 0
        
        if (server.type === 'game') {
          if (server.id.includes('sg')) {
            basePing = 30 + Math.random() * 20
            variance = 10
          } else {
            basePing = 15 + Math.random() * 10
            variance = 5
          }
        } else {
          if (server.id.includes('sg')) {
            basePing = 25 + Math.random() * 15
            variance = 8
          } else {
            basePing = 10 + Math.random() * 8
            variance = 4
          }
        }
        
        // ISP-specific adjustments
        if (isp.id === 'indihome') {
          basePing += 10
          variance += 5
        } else if (isp.id === 'biznet') {
          basePing -= 5
          variance -= 2
        } else if (isp.id === 'firstmedia') {
          basePing -= 3
          variance -= 1
        }
        
        // Simulate peak hours (higher ping during evening)
        const hour = new Date(timestamp).getHours()
        if (hour >= 18 && hour <= 23) {
          basePing += 15
          variance += 10
        }
        
        const ping = Math.max(5, Math.round(basePing + (Math.random() - 0.5) * variance * 2))
        const packetLoss = Math.random() < 0.05 ? Math.random() * 5 : 0
        
        data.push({
          isp: isp.name,
          server: server.name,
          serverType: server.type,
          ping,
          packetLoss: Math.round(packetLoss * 100) / 100,
          timestamp,
        })
      }
    })
  })
  
  return data
}

export const mockPingData = generateMockData()
