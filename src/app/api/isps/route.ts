import { NextResponse } from 'next/server'
import { ISPs } from '@/data/isp-data'

export async function GET() {
  return NextResponse.json(ISPs)
}
