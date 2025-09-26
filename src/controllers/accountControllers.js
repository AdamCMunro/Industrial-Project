const AccountService = require('../services/accountService');

// Helper function to format account data
const formatAccount = (account) => {
  if (!account) return null;
  
  return {
    accountId: account.accountid || account.accountId,
    email: account.email,
    accountType: account.accountType || account.accounttype,
    balance: account.balance,
    balanceCommitted: account.balanceComitted || account.balancecommitted,
    createdAt: account.createdAt || account.createdat,
    accountNumber: account.accountNumber || account.accountnumber
  };
};

// Helper function to format multiple accounts
const formatAccounts = (accounts) => {
  return accounts.map(account => formatAccount(account));
};

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await AccountService.getAll();
    const formattedAccounts = formatAccounts(accounts);
    
    res.json({
      success: true,
      message: 'Accounts retrieved successfully',
      count: formattedAccounts.length,
      data: formattedAccounts
    });
  } catch (err) {
    console.error('Error in getAllAccounts:', err);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: err.message 
    });
  }
};

exports.createAccount = async (req, res) => {
  try {
    const { email, password, accountType, balance, balanceCommitted, accountNumber } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    const account = await AccountService.create({ 
      email, 
      password,
      accountType: accountType || 'business',
      balance: balance || 0,
      balanceCommitted: balanceCommitted || 0,
      accountNumber: accountNumber || null
    });
    
    const formattedAccount = formatAccount(account);
    
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: formattedAccount
    });
  } catch (err) {
    console.error('Error in createAccount:', err);
    
    // Handle specific Sequelize validation errors
    if (err.name === 'SequelizeValidationError') {
      const validationErrors = err.errors.map(error => ({
        field: error.path,
        message: error.message
      }));
      
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: validationErrors
      });
    }
    
    // Handle unique constraint errors
    if (err.name === 'SequelizeUniqueConstraintError') {
      const field = err.errors[0].path;
      return res.status(409).json({
        success: false,
        error: `${field} already exists`,
        message: `An account with this ${field} already exists`
      });
    }
    
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: err.message 
    });
  }
};

exports.getAccountById = async (req, res) => {
  try {
    const { accountid } = req.params;
    const account = await AccountService.getById(accountid);
    
    if (!account) {
      return res.status(404).json({
        success: false,
        error: 'Account not found'
      });
    }

    const formattedAccount = formatAccount(account);

    res.json({
      success: true,
      message: 'Account retrieved successfully',
      data: formattedAccount
    });
  } catch (err) {
    console.error('Error in getAccountById:', err);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: err.message 
    });
  }
};

// Update account balance
exports.updateBalance = async (req, res) => {
  try {
    const { accountid } = req.params;
    const { balance, balanceCommitted } = req.body;
    
    console.log('Updating balance for account:', accountid);
    console.log('Balance data received:', { balance, balanceCommitted });
    
    const account = await AccountService.updateBalance(accountid, { balance, balanceCommitted });
    
    if (!account) {
      return res.status(404).json({
        success: false,
        error: 'Account not found'
      });
    }

    const formattedAccount = formatAccount(account);

    res.json({
      success: true,
      message: 'Account balance updated successfully',
      data: formattedAccount
    });
  } catch (err) {
    console.error('Error in updateBalance:', err);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: err.message 
    });
  }
};


// Get account by email
exports.getAccountByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const account = await AccountService.getByEmail(email);
    
    if (!account) {
      return res.status(404).json({
        success: false,
        error: 'Account not found'
      });
    }

    const formattedAccount = formatAccount(account);

    res.json({
      success: true,
      message: 'Account retrieved successfully',
      data: formattedAccount
    });
  } catch (err) {
    console.error('Error in getAccountByEmail:', err);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: err.message 
    });
  }
};

// Update account data (email, accountType, etc.)
exports.updateAccount = async (req, res) => {
  try {
    const { accountid } = req.params;
    const updateData = req.body;
    
    // Validate that we're not trying to update protected fields through this endpoint
    if (updateData.balance !== undefined || updateData.balanceCommitted !== undefined) {
      return res.status(400).json({
        success: false,
        error: 'Use the /balance endpoint to update balance fields'
      });
    }
    
    const account = await AccountService.updateAccount(accountid, updateData);
    
    if (!account) {
      return res.status(404).json({
        success: false,
        error: 'Account not found'
      });
    }

    const formattedAccount = formatAccount(account);

    res.json({
      success: true,
      message: 'Account updated successfully',
      data: formattedAccount
    });
  } catch (err) {
    console.error('Error in updateAccount:', err);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: err.message 
    });
  }
};

// Delete an account
exports.deleteAccount = async (req, res) => {
  try {
    const { accountid } = req.params;
    const account = await AccountService.deleteAccount(accountid);
    
    if (!account) {
      return res.status(404).json({
        success: false,
        error: 'Account not found'
      });
    }

    res.json({
      success: true,
      message: 'Account deleted successfully',
      data: {
        accountId: account.accountid,
        email: account.email
      }
    });
  } catch (err) {
    console.error('Error in deleteAccount:', err);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: err.message 
    });
  }
};