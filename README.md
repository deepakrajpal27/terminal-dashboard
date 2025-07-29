# Terminal Dashboard

An interactive terminal dashboard built with Node.js, Inquirer, and Chalk that provides system information and management tools.

[![npm version](https://badge.fury.io/js/%40deepakrajpal27%2Fterminal-dashboard.svg)](https://badge.fury.io/js/%40deepakrajpal27%2Fterminal-dashboard)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Features

- 📊 **System Information**: View detailed system specs, memory usage, and uptime
- 📁 **File Operations**: Browse directories, check disk usage, and find large files
- ⚙️  **Process Management**: Monitor running processes, CPU usage, and memory consumption
- 🌐 **Network Information**: View network interfaces and active connections
- 📈 **System Monitor**: Real-time system monitoring with detailed metrics

## Installation

### Global Installation (Recommended)

Install globally to use the CLI commands anywhere:

```bash
npm install -g @deepakrajpal27/terminal-dashboard
```

After global installation, you can run the dashboard using either command:

```bash
terminal-dashboard
# or
tdash
```

### Local Installation

For local development or project-specific usage:

```bash
# Clone the repository
git clone https://github.com/deepakrajpal27/terminal-dashboard.git
cd terminal-dashboard

# Install dependencies
npm install

# Run locally
npm start
```

### Using npx (No Installation Required)

Run directly without installing:

```bash
npx @deepakrajpal27/terminal-dashboard
```

## Usage

### Command Line Interface

After global installation:
```bash
terminal-dashboard  # Full command
tdash              # Short alias
```

### Local Development

```bash
npm start          # Run the dashboard
npm run dev        # Run with auto-restart on changes
```

## Navigation

The dashboard uses an interactive menu system:
- Use arrow keys to navigate through options
- Press Enter to select an option
- Press Enter to continue after viewing information
- Select "Exit" to quit the dashboard

## Publishing to npm

If you want to publish your own version:

1. **Update package.json** with your details:
   ```json
   {
     "name": "your-package-name",
     "author": "Your Name <your-email@example.com>",
     "repository": {
       "type": "git",
       "url": "git+https://github.com/yourusername/your-repo.git"
     }
   }
   ```

2. **Create an npm account** at [npmjs.com](https://npmjs.com)

3. **Login to npm**:
   ```bash
   npm login
   ```

4. **Publish the package**:
   ```bash
   npm publish --access public
   ```

   For scoped packages (recommended):
   ```bash
   npm publish --access public
   ```

## Dependencies

- **inquirer**: Interactive command-line user interfaces
- **chalk**: Terminal string styling with colors
- **Node.js built-in modules**: os, fs, child_process for system operations

## Compatibility

- **macOS**: Full functionality
- **Linux**: Full functionality  
- **Windows**: Limited functionality (some Unix-specific commands may not work)
- **Node.js**: Requires Node.js 16.0.0 or higher

## Features Overview

### System Information
- Platform and architecture details
- CPU core count and model
- Memory usage (total, free, used)
- System uptime
- Node.js version
- User information

### File Operations
- List directory contents with details
- Display disk usage across mounted filesystems
- Find large files (>100MB) in current directory

### Process Management
- View all running processes
- Sort processes by CPU usage
- Sort processes by memory usage
- Process details including PID, CPU%, and memory usage

### Network Information
- Display network interfaces and IP addresses
- Show active network connections
- Network statistics

### System Monitor
- Real-time memory usage percentage
- Detailed memory breakdown
- System load average (Unix-like systems)
- Formatted system uptime

## Development

### Project Structure

```
terminal-dashboard/
├── bin/
│   └── cli.js          # CLI entry point
├── lib/
│   └── dashboard.js    # Main dashboard class
├── index.js            # Local development entry
├── package.json        # Package configuration
└── README.md           # Documentation
```

### Scripts

- `npm start` - Run the dashboard locally
- `npm run dev` - Run with auto-restart
- `npm test` - Run tests (placeholder)
- `npm run prepublishOnly` - Pre-publish checks

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Changelog

### v1.0.0
- Initial release
- Interactive terminal dashboard
- System monitoring features
- File operations
- Process management
- Network information display
