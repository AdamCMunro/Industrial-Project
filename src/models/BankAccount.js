const DateTypes = require('sequelize');
const sequelize = require('../config/db');

const BankAccount = sequelize.define('BankAccount', {
    accountNumber: {
        type: DateTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'accountNumber'
    },
    sortNumber: {
        type: DateTypes.INTEGER,
        allowNull: false,
        field: 'sortNumber'
    },
    cvv: {
        type: DateTypes.INTEGER,
        allowNull: false,
        field: 'cvv'
    },
    balance: {
        type: DateTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'balance'
    }
}, {
    tableName: 'bankaccounts',
    timestamps: false
});

module.exports = BankAccount;