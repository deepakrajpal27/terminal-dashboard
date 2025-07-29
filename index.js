import { TerminalDashboard } from './lib/dashboard.js';

// Start the dashboard
const dashboard = new TerminalDashboard();
dashboard.run().catch(console.error);
