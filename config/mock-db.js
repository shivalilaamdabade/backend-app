// Mock database for testing when MySQL connection fails
class MockDB {
  constructor() {
    // Use static users array to persist data
    if (!MockDB.users) {
      MockDB.users = [];
      MockDB.nextId = 1;
    }
    this.users = MockDB.users;
    this.nextId = MockDB.nextId;
  }

  async execute(query, params = []) {
    // Simulate database operations
    if (query.includes('CREATE TABLE')) {
      console.log('Mock: Table would be created');
      return [[]];
    }
    
    if (query.includes('SELECT') && query.includes('username = ?')) {
      // Find user by username
      const username = params[0];
      const user = this.users.find(u => u.username === username);
      return user ? [[user]] : [[]];
    }
    
    if (query.includes('SELECT') && query.includes('email = ?')) {
      // Find user by email
      const email = params[0];
      const user = this.users.find(u => u.email === email);
      return user ? [[user]] : [[]];
    }
    
    if (query.includes('INSERT INTO users')) {
      // Create new user
      const [username, email, phone, password] = params;
      const newUser = {
        id: this.nextId++,
        username,
        email,
        phone,
        password,
        created_at: new Date().toISOString()
      };
      this.users.push(newUser);
      MockDB.nextId = this.nextId; // Update static nextId
      return [{ insertId: newUser.id }];
    }
    
    if (query.includes('SELECT 1')) {
      // Test connection query
      return [[{ test: 1 }]];
    }
    
    if (query.includes('SHOW TABLES')) {
      // Show tables query
      return [['users']]; // Simulate table exists
    }
    
    return [[]];
  }

  end() {
    console.log('Mock database connection closed');
  }

  promise() {
    return this;
  }
}

// Export mock database when MySQL connection fails
const createMockPool = () => {
  console.log('⚠️  Using mock database - MySQL connection unavailable');
  return new MockDB();
};

module.exports = createMockPool;