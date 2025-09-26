const Account = require('../models/Account');
const sequelize = require('../config/db');

class AccountService {
  // Get all accounts using raw SQL query
  static async getAll() {
    try {
      const [results] = await sequelize.query('SELECT * FROM accounts', {
      });
      return results;
    } catch (error) {
      throw new Error(`Error fetching accounts: ${error.message}`);
    }
  }
  // Get account by email
  static async getByEmail(email) {
    try {
      const account = await Account.findOne({
        where: { email }
      });
      return account;
    } catch (error) {
      throw new Error(`Error fetching account by email: ${error.message}`);
    }
  }

  // Create a new account
  static async create(accountData) {
    try {
      const account = await Account.create(accountData);
      return account;
    } catch (error) {
      throw new Error(`Error creating account: ${error.message}`);
    }
  }

  // Get account by ID
  static async getById(accountid) {
    try {
      const account = await Account.findByPk(accountid);
      return account;
    } catch (error) {
      throw new Error(`Error fetching account: ${error.message}`);
    }
  }


  // Update account balance
  static async updateBalance(accountid, balanceData) {
    try {
      const [updatedRowsCount] = await Account.update(balanceData, {
        where: { accountid }
      });
      
      if (updatedRowsCount === 0) {
        return null;
      }
      
      return await Account.findByPk(accountid);
    } catch (error) {
      throw new Error(`Error updating account balance: ${error.message}`);
    }
  }
}

module.exports = AccountService;