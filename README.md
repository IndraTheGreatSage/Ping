# Pantau Ping - ISP Indonesia Latency Tracker

Dashboard monitoring real-time ping dan packet loss dari berbagai ISP di Indonesia ke server game populer dan server kerja.

## Fitur

- **Real-time Monitoring**: Pantau ping dan packet loss secara live dari berbagai ISP Indonesia
- **Multi-ISP Support**: Indihome, Biznet, First Media, XL Home, MyRepublic, BOLT!, MNC Play
- **Game Servers**: Valorant, Mobile Legends, Genshin Impact (Singapore & Indonesia)
- **Work Servers**: AWS Singapore/Indonesia, Cloudflare, Google DNS
- **Connection Test**: Tes koneksi Anda sendiri dan dapatkan laporan performa
- **Historical Data**: Lihat data performa ISP dalam 24 jam terakhir
- **Responsive Design**: Tampilan modern yang bekerja di desktop dan mobile

## Tech Stack

- **Next.js 14** - React framework dengan App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Styling modern
- **Recharts** - Chart library untuk visualisasi data
- **Lucide React** - Icon library

## Prerequisites

Sebelum memulai, pastikan Anda telah menginstall:

- **Node.js** (v18 atau lebih tinggi) - [Download here](https://nodejs.org/)
- **npm** (biasanya terinstall bersama Node.js)

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### 3. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
pantau-ping/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   │   ├── ping/     # Ping data endpoint
│   │   │   ├── test-connection/  # Connection test endpoint
│   │   │   ├── isps/     # ISP list endpoint
│   │   │   └── servers/  # Server list endpoint
│   │   ├── globals.css  # Global styles
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   ├── components/       # React components
│   │   ├── PingChart.tsx    # Chart component
│   │   ├── ISPSelector.tsx  # ISP selection
│   │   ├── ServerSelector.tsx # Server selection
│   │   ├── StatsCard.tsx    # Statistics card
│   │   └── ConnectionTest.tsx # Connection test
│   ├── data/            # Data files
│   │   ├── isp-data.ts      # ISP & Server definitions
│   │   └── mock-data.ts     # Mock data generator
│   ├── lib/             # Utility functions
│   │   └── utils.ts        # Helper functions
│   └── types/           # TypeScript types
│       └── index.ts        # Type definitions
├── public/              # Static assets
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── tailwind.config.ts   # TailwindCSS config
└── next.config.js       # Next.js config
```

## API Endpoints

### GET /api/ping
Mendapatkan data ping berdasarkan filter

Query Parameters:
- `isp` (optional): Filter by ISP name
- `server` (optional): Filter by server name
- `serverType` (optional): Filter by server type ('game' or 'work')

### POST /api/test-connection
Test koneksi ke target tertentu

Body:
```json
{
  "target": "server-hostname"
}
```

### GET /api/isps
Mendapatkan daftar semua ISP

### GET /api/servers
Mendapatkan daftar semua server

Query Parameters:
- `type` (optional): Filter by server type ('game' or 'work')

## Data Sources

Saat ini menggunakan mock data untuk demonstrasi. Untuk production, Anda perlu:

1. **Implement actual ping testing**: Gunakan library seperti `ping` atau implement WebSocket untuk real-time measurement
2. **Database**: Setup database (PostgreSQL, MongoDB, dll) untuk menyimpan historical data
3. **Monitoring agents**: Deploy agents di berbagai lokasi untuk mengukur ping secara akurat
4. **Cron jobs**: Schedule regular ping tests untuk setiap ISP-server combination

## Customization

### Menambah ISP Baru

Edit `src/data/isp-data.ts`:

```typescript
export const ISPs: ISP[] = [
  // ... existing ISPs
  { id: 'new-isp', name: 'New ISP', color: '#HEXCODE' },
]
```

### Menambah Server Baru

Edit `src/data/isp-data.ts`:

```typescript
export const Servers: Server[] = [
  // ... existing servers
  { 
    id: 'new-server', 
    name: 'New Server', 
    type: 'game' | 'work', 
    host: 'server-hostname' 
  },
]
```

## Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Deploy

### Other Platforms

Build project dan deploy ke platform yang mendukung Node.js:

```bash
npm run build
```

## Contributing

Contributions are welcome! Silakan:

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push ke branch
5. Open Pull Request

## License

MIT License - feel free to use this project for any purpose.

## Disclaimer

Data yang ditampilkan adalah untuk demonstrasi. Untuk penggunaan production, implement actual ping measurement system.

## Support

Untuk pertanyaan atau issues, silakan buka issue di repository.
