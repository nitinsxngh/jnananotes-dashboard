#!/usr/bin/env node

/**
 * Helper script to extract Firebase Admin credentials from JSON file
 * and show what to add to .env file
 */

const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'usha-notes-ai-firebase-adminsdk-fbsvc-d51e6cc271.json');

if (!fs.existsSync(jsonPath)) {
  console.error('Firebase credentials JSON file not found:', jsonPath);
  process.exit(1);
}

const credentials = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log('\n=== Add these to your .env file ===\n');
console.log('# Firebase Admin SDK Credentials');
console.log(`FIREBASE_PROJECT_ID=${credentials.project_id}`);
console.log(`FIREBASE_CLIENT_EMAIL=${credentials.client_email}`);
console.log(`FIREBASE_PRIVATE_KEY=${credentials.private_key.replace(/\n/g, '\\n')}`);
console.log('\n=== End of .env additions ===\n');
