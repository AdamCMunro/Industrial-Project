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
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  balanceComitted: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    field: 'balanceComitted'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'createdAt'
  },
  accountNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    field: 'accountNumber'
  }
}, {
  tableName: 'accounts',
  timestamps: false // Since we're manually handling createdAt
});

module.exports = Account;