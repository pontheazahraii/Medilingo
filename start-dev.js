// Development starter script
// Run this with: node start-dev.js

console.log('Starting development server with mock data...');

// Environment setup for development
process.env.NODE_ENV = 'development';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3001';

// We're using the mock database in development, but you can uncomment 
// and set this if you want to test with a real database
// process.env.DATABASE_URL = 'postgresql://user:password@hostname/database';

// Run the custom server
require('./server.js'); 