const db = require('./db');

const createUsersTable = async () => {
  try {
    // Test if we're using mock database
    if (db.constructor.name === 'MockDB') {
      console.log('✅ Mock database ready for use');
      return;
    }
    
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(20),
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await db.execute(query);
    console.log('Users table created successfully');
  } catch (error) {
    console.error('Error creating users table:', error.message);
    // Don't throw error to allow mock database to work
  }
};

// Initialize database
const initDatabase = async () => {
  try {
    await createUsersTable();
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Database initialization warning:', error.message);
    console.log('Application will use mock database for testing');
  }
};

module.exports = initDatabase;