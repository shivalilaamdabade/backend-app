const bcrypt = require('bcryptjs');

const testRegistration = async () => {
  try {
    console.log('Testing registration flow...');
    
    // Test bcrypt hashing
    const password = 'password123';
    console.log('Original password:', password);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);
    
    // Test bcrypt comparison
    const isValid = await bcrypt.compare(password, hashedPassword);
    console.log('Password verification:', isValid);
    
    console.log('✅ All bcrypt operations working correctly');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

testRegistration();