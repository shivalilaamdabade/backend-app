const db = require('./config/db');

const testConnection = async () => {
  try {
    // Test basic connection
    const [rows] = await db.execute('SELECT 1 as test');
    console.log('Database connection successful:', rows);
    
    // Test if users table exists
    const [tables] = await db.execute("SHOW TABLES LIKE 'users'");
    if (tables.length > 0) {
      console.log('Users table exists');
      
      // Test inserting a sample user
      const [result] = await db.execute(
        "INSERT IGNORE INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)",
        ['testuser', 'test@example.com', '1234567890', 'hashed_password_here']
      );
      console.log('Test user insertion result:', result);
      
      // Test querying users
      const [users] = await db.execute('SELECT id, username, email FROM users LIMIT 5');
      console.log('Sample users:', users);
    } else {
      console.log('Users table does not exist');
    }
    
  } catch (error) {
    console.error('Database test failed:', error);
  } finally {
    // Close connection pool
    db.end();
  }
};

testConnection();