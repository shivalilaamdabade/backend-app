// Simple database configuration - use mock database for immediate testing
const createMockPool = require('./mock-db');

console.log('⚠️  Using mock database for immediate testing');
const pool = createMockPool();

// Create promise-based pool
const promisePool = pool.promise();

module.exports = promisePool;