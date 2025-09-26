const sequelize = require('./db');
const Account = require('../models/Account');

async function initializeDatabase() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Sync models with database (creates tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized successfully.');

    return true;
  } catch (error) {
    // console.error('❌ Unable to connect to the database:', error.message);
    // console.log('\n📝 To fix this issue:');
    // console.log('1. Get your Supabase database password from your project settings');
    // console.log('2. Update your .env file with the correct DATABASE_URL format:');
    // console.log('   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xeecyhvxyhzaturxxxoy.supabase.co:5432/postgres');
    // console.log('3. Or use a local PostgreSQL database for testing\n');
    
    return false;
  }
}

module.exports = initializeDatabase;