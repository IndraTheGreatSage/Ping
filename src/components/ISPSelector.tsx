'use client'

import { ISPs } from '@/data/isp-data'
import { cn } from '@/lib/utils'

interface ISPSelectorProps {
  selectedISP: string
  onISPChange: (isp: string) => void
}

export default function ISPSelector({ selectedISP, onISPChange }: ISPSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {ISPs.map((isp) => (
        <button
          key={isp.id}
          onClick={() => onISPChange(isp.name)}
          className={cn(
            'px-4 py-2 rounded-lg font-medium transition-all',
            'hover:scale-105 active:scale-95',
            selectedISP === isp.name
              ? 'ring-2 ring-offset-2 ring-primary'
              : 'opacity-70 hover:opacity-100'
          )}
          style={{
            backgroundColor: isp.color,
            color: '#fff',
            ...(selectedISP === isp.name && { ringColor: isp.color })
          }}
        >
          {isp.name}
        </button>
      ))}
    </div>
  )
}
