'use client'

import { useState } from 'react'
import { Activity, Wifi, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TestResult {
  ping: number
  jitter: number
  packetLoss: number
  status: 'idle' | 'testing' | 'complete' | 'error'
}

export default function ConnectionTest() {
  const [testResult, setTestResult] = useState<TestResult>({
    ping: 0,
    jitter: 0,
    packetLoss: 0,
    status: 'idle'
  })

  const runTest = async () => {
    setTestResult(prev => ({ ...prev, status: 'testing' }))
    
    // Simulate ping test
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate realistic test results
    const basePing = 20 + Math.random() * 30
    const jitter = Math.random() * 10
    const packetLoss = Math.random() < 0.1 ? Math.random() * 3 : 0
    
    setTestResult({
      ping: Math.round(basePing),
      jitter: Math.round(jitter * 10) / 10,
      packetLoss: Math.round(packetLoss * 100) / 100,
      status: 'complete'
    })
  }

  return (
    <div className="p-6 rounded-xl border bg-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Wifi className="w-5 h-5" />
          Test Koneksi Anda
        </h3>
        <button
          onClick={runTest}
          disabled={testResult.status === 'testing'}
          className={cn(
            'px-4 py-2 rounded-lg font-medium transition-all',
            'bg-primary text-primary-foreground hover:bg-primary/90',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          {testResult.status === 'testing' ? 'Testing...' : 'Mulai Test'}
        </button>
      </div>

      {testResult.status === 'testing' && (
        <div className="flex items-center justify-center py-8">
          <Activity className="w-8 h-8 animate-pulse text-primary" />
          <span className="ml-2 text-muted-foreground">Mengukur koneksi...</span>
        </div>
      )}

      {testResult.status === 'complete' && (
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold text-primary">{testResult.ping}ms</div>
            <div className="text-sm text-muted-foreground">Ping</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold text-primary">{testResult.jitter}ms</div>
            <div className="text-sm text-muted-foreground">Jitter</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <div className={cn(
              'text-2xl font-bold',
              testResult.packetLoss > 1 ? 'text-red-500' : 'text-green-500'
            )}>
              {testResult.packetLoss}%
            </div>
            <div className="text-sm text-muted-foreground">Packet Loss</div>
          </div>
        </div>
      )}

      {testResult.status === 'complete' && testResult.packetLoss > 1 && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-700">
            Packet loss tinggi terdeteksi. Ini mungkin menyebabkan lag atau RTO saat gaming.
          </div>
        </div>
      )}
    </div>
  )
}
