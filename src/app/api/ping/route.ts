import { NextResponse } from 'next/server'
import { mockPingData } from '@/data/mock-data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const isp = searchParams.get('isp')
  const server = searchParams.get('server')
  const serverType = searchParams.get('serverType')

  let filteredData = mockPingData

  if (isp) {
    filteredData = filteredData.filter(d => d.isp === isp)
  }

  if (server) {
    filteredData = filteredData.filter(d => d.server === server)
  }

  if (serverType) {
    filteredData = filteredData.filter(d => d.serverType === serverType)
  }

  // Return last 100 data points
  const recentData = filteredData.slice(-100)

  return NextResponse.json(recentData)
}
