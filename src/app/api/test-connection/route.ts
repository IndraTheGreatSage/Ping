import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { target } = body

  // Simulate ping test
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Generate realistic test results
  const basePing = 15 + Math.random() * 35
  const jitter = Math.random() * 12
  const packetLoss = Math.random() < 0.08 ? Math.random() * 4 : 0

  const result = {
    ping: Math.round(basePing),
    jitter: Math.round(jitter * 10) / 10,
    packetLoss: Math.round(packetLoss * 100) / 100,
    timestamp: Date.now(),
    target: target || 'default'
  }

  return NextResponse.json(result)
}
