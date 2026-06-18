'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ISPPingData } from '@/types'

interface PingChartProps {
  data: ISPPingData[]
  selectedISP: string
  selectedServer: string
}

export default function PingChart({ data, selectedISP, selectedServer }: PingChartProps) {
  const filteredData = data
    .filter(d => d.isp === selectedISP && d.server === selectedServer)
    .map(d => ({
      time: new Date(d.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      ping: d.ping,
      packetLoss: d.packetLoss,
    }))
    .slice(-48) // Show last 48 data points

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            yAxisId="ping"
            tick={{ fontSize: 12 }}
            label={{ value: 'Ping (ms)', angle: -90, position: 'insideLeft' }}
          />
          <YAxis 
            yAxisId="loss"
            orientation="right"
            tick={{ fontSize: 12 }}
            label={{ value: 'Packet Loss (%)', angle: 90, position: 'insideRight' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Line 
            yAxisId="ping"
            type="monotone" 
            dataKey="ping" 
            stroke="#3b82f6" 
            strokeWidth={2}
            name="Ping (ms)"
            dot={false}
          />
          <Line 
            yAxisId="loss"
            type="monotone" 
            dataKey="packetLoss" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="Packet Loss (%)"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
