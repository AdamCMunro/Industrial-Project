const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const BankAccount = sequelize.define('BankAccount', {
    accountnumber: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'accountnumber'
    },
    sortnumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'sortnumber'
    },
    cvv: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'cvv'
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'balance'
    }
}, {
    tableName: 'bankaccounts',
    timestamps: false
});

module.exports = BankAccount;