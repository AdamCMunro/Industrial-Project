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
      console.log('Creating account with data:', accountData); // Debug log
      const account = await Account.create(accountData);
      return account;
    } catch (error) {
      console.error('AccountService create error:', error); // Debug log
      throw error; // Re-throw the original error instead of wrapping it
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

  // Update account data (email, accountType, etc.)
  static async updateAccount(accountid, accountData) {
    try {
      // Remove fields that shouldn't be updated through this method
      const { accountid: _, createdAt: __, balance: ___, balanceCommitted: ____, ...updateData } = accountData;
      
      const [updatedRowsCount] = await Account.update(updateData, {
        where: { accountid }
      });
      
      if (updatedRowsCount === 0) {
        return null;
      }
      
      return await Account.findByPk(accountid);
    } catch (error) {
      throw new Error(`Error updating account: ${error.message}`);
    }
  }

  // Delete an account
  static async deleteAccount(accountid) {
    try {
      const account = await Account.findByPk(accountid);
      if (!account) {
        return null;
      }
      
      await Account.destroy({
        where: { accountid }
      });
      
      return account;
    } catch (error) {
      throw new Error(`Error deleting account: ${error.message}`);
    }
  }
}

module.exports = AccountService;