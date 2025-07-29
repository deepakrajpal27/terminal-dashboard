import inquirer from 'inquirer';
import chalk from 'chalk';
import { exec } from 'child_process';
import { promisify } from 'util';
import os from 'os';

const execAsync = promisify(exec);

export class TerminalDashboard {
  constructor() {
    this.isRunning = true;
  }

  // Clear screen and show header
  clearScreen() {
    console.clear();
    this.showHeader();
  }

  // Display the dashboard header
  showHeader() {
    console.log(chalk.cyan.bold('═'.repeat(60)));
    console.log(chalk.cyan.bold('           🚀 TERMINAL DASHBOARD 🚀'));
    console.log(chalk.cyan.bold('═'.repeat(60)));
    console.log();
  }

  // Main menu options
  async showMainMenu() {
    const choices = [
      {
        name: chalk.green('📊 System Information'),
        value: 'system'
      },
      {
        name: chalk.blue('📁 File Operations'),
        value: 'files'
      },
      {
        name: chalk.yellow('⚙️  Process Management'),
        value: 'processes'
      },
      {
        name: chalk.magenta('🌐 Network Information'),
        value: 'network'
      },
      {
        name: chalk.cyan('📈 System Monitor'),
        value: 'monitor'
      },
      {
        name: chalk.red('🚪 Exit'),
        value: 'exit'
      }
    ];

    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: chalk.white.bold('What would you like to do?'),
        choices: choices,
        pageSize: 10
      }
    ]);

    return answer.action;
  }

  // System information display
  async showSystemInfo() {
    console.log(chalk.blue.bold('\n📊 System Information\n'));
    
    try {
      const systemInfo = {
        'Platform': os.platform(),
        'Architecture': os.arch(),
        'CPU Cores': os.cpus().length,
        'Total Memory': `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
        'Free Memory': `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
        'Uptime': `${Math.floor(os.uptime() / 3600)} hours`,
        'Node.js Version': process.version,
        'Home Directory': os.homedir(),
        'Username': os.userInfo().username
      };

      Object.entries(systemInfo).forEach(([key, value]) => {
        console.log(chalk.cyan(`${key.padEnd(20)}: `) + chalk.white(value));
      });

    } catch (error) {
      console.log(chalk.red('Error fetching system information:'), error.message);
    }

    await this.pressEnterToContinue();
  }

  // File operations menu
  async showFileOperations() {
    console.log(chalk.blue.bold('\n📁 File Operations\n'));
    
    const choices = [
      { name: 'List current directory', value: 'list' },
      { name: 'Show disk usage', value: 'disk' },
      { name: 'Find large files', value: 'large' },
      { name: 'Back to main menu', value: 'back' }
    ];

    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'fileAction',
        message: 'Select file operation:',
        choices: choices
      }
    ]);

    switch (answer.fileAction) {
      case 'list':
        await this.listDirectory();
        break;
      case 'disk':
        await this.showDiskUsage();
        break;
      case 'large':
        await this.findLargeFiles();
        break;
      case 'back':
        return;
    }
  }

  // List current directory
  async listDirectory() {
    try {
      console.log(chalk.green('\n📂 Current Directory Contents:\n'));
      const { stdout } = await execAsync('ls -la');
      console.log(stdout);
    } catch (error) {
      console.log(chalk.red('Error listing directory:'), error.message);
    }
    await this.pressEnterToContinue();
  }

  // Show disk usage
  async showDiskUsage() {
    try {
      console.log(chalk.green('\n💾 Disk Usage:\n'));
      const { stdout } = await execAsync('df -h');
      console.log(stdout);
    } catch (error) {
      console.log(chalk.red('Error getting disk usage:'), error.message);
    }
    await this.pressEnterToContinue();
  }

  // Find large files
  async findLargeFiles() {
    try {
      console.log(chalk.green('\n🔍 Finding large files (>100MB)...\n'));
      const { stdout } = await execAsync('find . -type f -size +100M -ls 2>/dev/null | head -10');
      if (stdout.trim()) {
        console.log(stdout);
      } else {
        console.log(chalk.yellow('No large files found in current directory.'));
      }
    } catch (error) {
      console.log(chalk.red('Error finding large files:'), error.message);
    }
    await this.pressEnterToContinue();
  }

  // Process management
  async showProcesses() {
    console.log(chalk.blue.bold('\n⚙️  Process Management\n'));
    
    const choices = [
      { name: 'Show running processes', value: 'list' },
      { name: 'Show top processes by CPU', value: 'top' },
      { name: 'Show memory usage', value: 'memory' },
      { name: 'Back to main menu', value: 'back' }
    ];

    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'processAction',
        message: 'Select process operation:',
        choices: choices
      }
    ]);

    switch (answer.processAction) {
      case 'list':
        await this.listProcesses();
        break;
      case 'top':
        await this.showTopProcesses();
        break;
      case 'memory':
        await this.showMemoryUsage();
        break;
      case 'back':
        return;
    }
  }

  // List processes
  async listProcesses() {
    try {
      console.log(chalk.green('\n🔄 Running Processes:\n'));
      const { stdout } = await execAsync('ps aux | head -20');
      console.log(stdout);
    } catch (error) {
      console.log(chalk.red('Error listing processes:'), error.message);
    }
    await this.pressEnterToContinue();
  }

  // Show top processes
  async showTopProcesses() {
    try {
      console.log(chalk.green('\n🔥 Top Processes by CPU:\n'));
      const { stdout } = await execAsync('ps aux --sort=-%cpu | head -15');
      console.log(stdout);
    } catch (error) {
      console.log(chalk.red('Error showing top processes:'), error.message);
    }
    await this.pressEnterToContinue();
  }

  // Show memory usage
  async showMemoryUsage() {
    try {
      console.log(chalk.green('\n🧠 Memory Usage:\n'));
      const { stdout } = await execAsync('ps aux --sort=-%mem | head -15');
      console.log(stdout);
    } catch (error) {
      console.log(chalk.red('Error showing memory usage:'), error.message);
    }
    await this.pressEnterToContinue();
  }

  // Network information
  async showNetworkInfo() {
    console.log(chalk.blue.bold('\n🌐 Network Information\n'));
    
    try {
      // Show network interfaces
      console.log(chalk.cyan('Network Interfaces:'));
      const interfaces = os.networkInterfaces();
      Object.entries(interfaces).forEach(([name, addrs]) => {
        console.log(chalk.yellow(`\n${name}:`));
        addrs.forEach(addr => {
          if (addr.family === 'IPv4' && !addr.internal) {
            console.log(chalk.white(`  IP: ${addr.address}`));
          }
        });
      });

      // Show active connections
      console.log(chalk.cyan('\nActive Network Connections:'));
      const { stdout } = await execAsync('netstat -an | head -20');
      console.log(stdout);

    } catch (error) {
      console.log(chalk.red('Error getting network information:'), error.message);
    }

    await this.pressEnterToContinue();
  }

  // System monitor
  async showSystemMonitor() {
    console.log(chalk.blue.bold('\n📈 System Monitor\n'));
    
    const startTime = Date.now();
    
    try {
      // CPU info
      const cpus = os.cpus();
      console.log(chalk.cyan(`CPU Model: `) + chalk.white(cpus[0].model));
      console.log(chalk.cyan(`CPU Cores: `) + chalk.white(cpus.length));
      
      // Memory info
      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const usedMem = totalMem - freeMem;
      const memUsagePercent = ((usedMem / totalMem) * 100).toFixed(2);
      
      console.log(chalk.cyan(`\nMemory Usage: `) + chalk.white(`${memUsagePercent}%`));
      console.log(chalk.cyan(`Total Memory: `) + chalk.white(`${(totalMem / 1024 / 1024 / 1024).toFixed(2)} GB`));
      console.log(chalk.cyan(`Used Memory: `) + chalk.white(`${(usedMem / 1024 / 1024 / 1024).toFixed(2)} GB`));
      console.log(chalk.cyan(`Free Memory: `) + chalk.white(`${(freeMem / 1024 / 1024 / 1024).toFixed(2)} GB`));
      
      // Load average (Unix-like systems)
      if (os.platform() !== 'win32') {
        const loadAvg = os.loadavg();
        console.log(chalk.cyan(`\nLoad Average: `) + chalk.white(`${loadAvg.map(l => l.toFixed(2)).join(', ')}`));
      }
      
      // Uptime
      const uptime = os.uptime();
      const days = Math.floor(uptime / 86400);
      const hours = Math.floor((uptime % 86400) / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      console.log(chalk.cyan(`System Uptime: `) + chalk.white(`${days}d ${hours}h ${minutes}m`));

    } catch (error) {
      console.log(chalk.red('Error in system monitor:'), error.message);
    }

    await this.pressEnterToContinue();
  }

  // Helper method to pause and wait for user input
  async pressEnterToContinue() {
    console.log();
    await inquirer.prompt([
      {
        type: 'input',
        name: 'continue',
        message: chalk.gray('Press Enter to continue...')
      }
    ]);
  }

  // Main application loop
  async run() {
    this.clearScreen();
    
    console.log(chalk.green('Welcome to Terminal Dashboard!'));
    console.log(chalk.gray('Navigate through various system information and tools.\n'));

    while (this.isRunning) {
      try {
        const action = await this.showMainMenu();
        
        this.clearScreen();
        
        switch (action) {
          case 'system':
            await this.showSystemInfo();
            break;
          case 'files':
            await this.showFileOperations();
            break;
          case 'processes':
            await this.showProcesses();
            break;
          case 'network':
            await this.showNetworkInfo();
            break;
          case 'monitor':
            await this.showSystemMonitor();
            break;
          case 'exit':
            this.isRunning = false;
            console.log(chalk.green('\n👋 Thank you for using Terminal Dashboard!'));
            console.log(chalk.gray('Goodbye!\n'));
            break;
        }
        
        if (this.isRunning) {
          this.clearScreen();
        }
        
      } catch (error) {
        console.log(chalk.red('\nAn error occurred:'), error.message);
        await this.pressEnterToContinue();
        this.clearScreen();
      }
    }
  }
}
