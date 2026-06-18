'use client'

import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
}

export default function StatsCard({ title, value, icon: Icon, trend, trendUp }: StatsCardProps) {
  return (
    <div className="p-6 rounded-xl border bg-card">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      {trend && (
        <div className={cn(
          'text-sm font-medium',
          trendUp ? 'text-green-500' : 'text-red-500'
        )}>
          {trend}
        </div>
      )}
    </div>
  )
}
