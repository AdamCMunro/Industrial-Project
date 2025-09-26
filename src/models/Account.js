const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Account = sequelize.define('Account', {
  accountid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'accountid'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  accountType: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'business'
    // No field mapping - let Sequelize use default naming
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  // Make these fields optional to avoid sync issues
  balanceCommitted: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    field: 'balanceCommitted'  // Explicitly map to database column
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
    // No field mapping - let Sequelize use default naming
  },
  accountNumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: false  // Remove uniqueness constraint temporarily
    // No field mapping - let Sequelize use default naming
  }
}, {
  tableName: 'accounts',
  timestamps: false
});

module.exports = Account;