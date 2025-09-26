const sequelize = require('./db');
const Account = require('../models/Account');

async function initializeDatabase() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // SAFE: Only sync models WITHOUT altering existing tables
    // This will create tables if they don't exist, but won't drop columns
    await sequelize.sync({ force: false, alter: false });
    console.log('✅ Database models synchronized successfully.');

    return true;
  } catch (error) {
    return false;
  }
}

module.exports = initializeDatabase;