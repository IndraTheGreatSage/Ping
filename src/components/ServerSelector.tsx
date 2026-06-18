'use client'

import { Servers } from '@/data/isp-data'
import { cn } from '@/lib/utils'

interface ServerSelectorProps {
  selectedServer: string
  onServerChange: (server: string) => void
  serverType: 'game' | 'work'
}

export default function ServerSelector({ selectedServer, onServerChange, serverType }: ServerSelectorProps) {
  const filteredServers = Servers.filter(s => s.type === serverType)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
      {filteredServers.map((server) => (
        <button
          key={server.id}
          onClick={() => onServerChange(server.name)}
          className={cn(
            'p-3 rounded-lg border-2 transition-all',
            'hover:border-primary/50 hover:bg-primary/5',
            selectedServer === server.name
              ? 'border-primary bg-primary/10'
              : 'border-border'
          )}
        >
          <div className="text-sm font-medium text-center">{server.name}</div>
        </button>
      ))}
    </div>
  )
}
