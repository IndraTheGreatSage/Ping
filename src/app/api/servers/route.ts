import { NextResponse } from 'next/server'
import { Servers } from '@/data/isp-data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  if (type) {
    const filtered = Servers.filter(s => s.type === type)
    return NextResponse.json(filtered)
  }

  return NextResponse.json(Servers)
}
