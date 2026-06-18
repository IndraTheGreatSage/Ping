# Installation Guide - Pantau Ping

## Important: Node.js and npm Required

This project requires **Node.js** and **npm** to run. Since npm/npx is not currently available on your system, you need to install them first.

## Step 1: Install Node.js

### For Windows

1. Download Node.js from the official website: https://nodejs.org/
2. Download the **LTS (Long Term Support)** version (recommended)
3. Run the installer
4. Follow the installation wizard (accept default settings)
5. After installation, restart your command prompt/terminal

### Verify Installation

Open a new command prompt/terminal and run:

```bash
node --version
npm --version
```

You should see version numbers displayed (e.g., v18.x.x or higher).

## Step 2: Install Project Dependencies

Once Node.js and npm are installed, navigate to the project directory:

```bash
cd "c:/Users/CHIIO/Downloads/New folder (2)"
```

Then install the dependencies:

```bash
npm install
```

This will download and install all required packages (Next.js, React, TypeScript, TailwindCSS, Recharts, etc.).

## Step 3: Run the Development Server

After dependencies are installed, start the development server:

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

## Alternative: Using Yarn (Optional)

If you prefer using Yarn instead of npm:

1. Install Yarn after installing Node.js:
   ```bash
   npm install -g yarn
   ```

2. Then use Yarn commands:
   ```bash
   yarn install
   yarn dev
   ```

## Troubleshooting

### "npm is not recognized" Error

This means Node.js is not installed or not in your PATH. Make sure:
1. Node.js is installed
2. You've restarted your terminal/command prompt after installation
3. Node.js is added to your system PATH (usually done automatically by the installer)

### Permission Errors (Windows)

If you get permission errors, try running your terminal as Administrator:
1. Right-click on Command Prompt or PowerShell
2. Select "Run as Administrator"
3. Navigate to the project directory and run npm install again

### Port Already in Use

If port 3000 is already in use, you can use a different port:

```bash
npm run dev -- -p 3001
```

Then access the app at http://localhost:3001

## Project Structure After Installation

After running `npm install`, you'll see a `node_modules` folder created. This contains all the dependencies.

```
pantau-ping/
├── node_modules/       # Installed dependencies (created after npm install)
├── src/                # Source code
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.ts # TailwindCSS configuration
└── README.md          # Project documentation
```

## Next Steps

Once the development server is running:

1. Open http://localhost:3000 in your browser
2. Select an ISP from the colorful buttons
3. Choose between Game Servers or Work Servers
4. View real-time ping charts and statistics
5. Test your own connection using the "Test Koneksi Anda" feature

## Building for Production

To build the project for production:

```bash
npm run build
npm start
```

This creates an optimized production build in the `.next` folder.

## Need Help?

If you encounter any issues:
1. Make sure Node.js version is 18 or higher
2. Delete `node_modules` folder and `package-lock.json`, then run `npm install` again
3. Check that you're in the correct project directory
4. Ensure your terminal has proper permissions

## TypeScript Errors in IDE

You may see TypeScript errors in your IDE before running `npm install`. This is normal because:
- The dependencies aren't installed yet
- TypeScript can't find the type definitions
- These errors will disappear after running `npm install`

The errors don't affect the actual code - they're just IDE warnings until dependencies are installed.
