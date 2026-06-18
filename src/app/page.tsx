'use client'

import { useState, useEffect } from 'react'
import { Activity, TrendingUp, Clock, Shield } from 'lucide-react'
import PingChart from '@/components/PingChart'
import ISPSelector from '@/components/ISPSelector'
import ServerSelector from '@/components/ServerSelector'
import StatsCard from '@/components/StatsCard'
import ConnectionTest from '@/components/ConnectionTest'
import { ISPs, Servers } from '@/data/isp-data'
import { mockPingData } from '@/data/mock-data'
import { ISPPingData } from '@/types'

export default function Home() {
  const [selectedISP, setSelectedISP] = useState(ISPs[0].name)
  const [selectedServer, setSelectedServer] = useState(Servers[0].name)
  const [serverType, setServerType] = useState<'game' | 'work'>('game')
  const [pingData, setPingData] = useState<ISPPingData[]>(mockPingData)
  const [currentStats, setCurrentStats] = useState({
    avgPing: 0,
    maxPing: 0,
    packetLoss: 0
  })

  useEffect(() => {
    // Update current stats when selection changes
    const filtered = pingData.filter(
      d => d.isp === selectedISP && d.server === selectedServer
    ).slice(-48)
    
    if (filtered.length > 0) {
      const avgPing = Math.round(filtered.reduce((sum, d) => sum + d.ping, 0) / filtered.length)
      const maxPing = Math.max(...filtered.map(d => d.ping))
      const avgPacketLoss = Math.round(filtered.reduce((sum, d) => sum + d.packetLoss, 0) / filtered.length * 100) / 100
      
      setCurrentStats({
        avgPing,
        maxPing,
        packetLoss: avgPacketLoss
      })
    }
  }, [selectedISP, selectedServer, pingData])

  const handleServerTypeChange = (type: 'game' | 'work') => {
    setServerType(type)
    const firstServer = Servers.find(s => s.type === type)
    if (firstServer) setSelectedServer(firstServer.name)
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPingData(prev => {
        const newData = [...prev]
        const lastEntry = newData[newData.length - 1]
        
        // Add new data point for each ISP-server combination
        ISPs.forEach(isp => {
          Servers.forEach(server => {
            const basePing = lastEntry?.ping || 30
            const newPing = Math.max(5, Math.round(basePing + (Math.random() - 0.5) * 10))
            const newPacketLoss = Math.random() < 0.05 ? Math.random() * 5 : 0
            
            newData.push({
              isp: isp.name,
              server: server.name,
              serverType: server.type,
              ping: newPing,
              packetLoss: Math.round(newPacketLoss * 100) / 100,
              timestamp: Date.now()
            })
          })
        })
        
        // Keep only last 1000 entries per combination
        return newData.slice(-1000)
      })
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Pantau Ping</h1>
                <p className="text-sm text-muted-foreground">ISP Indonesia Latency Tracker</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Real-time Monitoring</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* ISP Selection */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Pilih ISP</h2>
          <ISPSelector selectedISP={selectedISP} onISPChange={setSelectedISP} />
        </section>

        {/* Server Type Toggle */}
        <section className="mb-6">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => handleServerTypeChange('game')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                serverType === 'game'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              🎮 Game Servers
            </button>
            <button
              onClick={() => handleServerTypeChange('work')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                serverType === 'work'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              💼 Work Servers
            </button>
          </div>
          <ServerSelector
            selectedServer={selectedServer}
            onServerChange={setSelectedServer}
            serverType={serverType}
          />
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatsCard
            title="Rata-rata Ping"
            value={`${currentStats.avgPing}ms`}
            icon={Activity}
            trend="Last 4 hours"
          />
          <StatsCard
            title="Ping Tertinggi"
            value={`${currentStats.maxPing}ms`}
            icon={TrendingUp}
            trendUp={false}
          />
          <StatsCard
            title="Packet Loss"
            value={`${currentStats.packetLoss}%`}
            icon={Clock}
            trendUp={currentStats.packetLoss > 1}
          />
        </section>

        {/* Chart */}
        <section className="mb-8">
          <div className="p-6 rounded-xl border bg-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {selectedISP} → {selectedServer}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Live</span>
              </div>
            </div>
            <PingChart
              data={pingData}
              selectedISP={selectedISP}
              selectedServer={selectedServer}
            />
          </div>
        </section>

        {/* Connection Test */}
        <section className="mb-8">
          <ConnectionTest />
        </section>

        {/* Info Section */}
        <section className="p-6 rounded-xl border bg-card">
          <h3 className="text-lg font-semibold mb-4">Tentang Pantau Ping</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Pantau Ping adalah dashboard monitoring real-time untuk latency dan packet loss 
              dari berbagai ISP di Indonesia ke server game populer dan server kerja.
            </p>
            <p>
              Data ditampilkan secara transparan untuk membantu Anda memilih ISP terbaik 
              sebelum berlangganan internet di rumah.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">
                Valorant
              </span>
              <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">
                Mobile Legends
              </span>
              <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">
                Genshin Impact
              </span>
              <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">
                AWS
              </span>
              <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">
                Cloudflare
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Pantau Ping. Data disajikan untuk referensi.</p>
        </div>
      </footer>
    </div>
  )
}
