const db = require('./config/db');

const testMockDatabase = async () => {
  try {
    console.log('Testing mock database operations...');
    
    // Test basic query
    const [testResult] = await db.execute('SELECT 1 as test');
    console.log('Basic query result:', testResult);
    
    // Test user creation
    const [insertResult] = await db.execute(
      "INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)",
      ['testuser', 'test@example.com', '1234567890', 'hashed_password']
    );
    console.log('Insert result:', insertResult);
    
    // Test user lookup by username
    const [userResult] = await db.execute(
      'SELECT * FROM users WHERE username = ?',
      ['testuser']
    );
    console.log('User lookup result:', userResult);
    
    console.log('✅ Mock database operations working correctly');
    
  } catch (error) {
    console.error('❌ Mock database test failed:', error);
  }
};

testMockDatabase();