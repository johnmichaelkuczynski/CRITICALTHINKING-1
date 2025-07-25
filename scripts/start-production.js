#!/usr/bin/env node

/**
 * Production startup script for Cloud Run deployments
 * Ensures proper environment setup and graceful error handling
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting production deployment...');

// Environment validation
const requiredEnvVars = ['DATABASE_URL'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars);
  process.exit(1);
}

// Verify build exists
const buildPath = path.resolve(process.cwd(), 'dist');
if (!fs.existsSync(buildPath)) {
  console.error('❌ Build directory not found. Run "npm run build" first.');
  process.exit(1);
}

// Verify main build file exists
const mainFile = path.join(buildPath, 'index.js');
if (!fs.existsSync(mainFile)) {
  console.error('❌ Built server file not found:', mainFile);
  process.exit(1);
}

console.log('✅ Environment validation passed');
console.log('✅ Build files verified');

// Start the application
console.log('🎯 Starting application server...');

const server = spawn('node', [mainFile], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production'
  }
});

server.on('error', (error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

server.on('exit', (code) => {
  console.log(`Server exited with code: ${code}`);
  process.exit(code || 0);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📡 Received SIGTERM, shutting down gracefully...');
  server.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('📡 Received SIGINT, shutting down gracefully...');
  server.kill('SIGINT');
});