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
    const { email, password, accountType, balance, balanceComitted, accountNumber } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    if (!accountNumber) {
      return res.status(400).json({
        success: false,
        error: 'Account number is required'
      });
    }

    const account = await AccountService.create({ 
      email, 
      password,
      accountType: accountType || 'business',
      balance: balance || 0,
      balanceComitted: balanceComitted || 0,
      accountNumber
    });
    
    const formattedAccount = formatAccount(account);
    
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: formattedAccount
    });
  } catch (err) {
    console.error('Error in createAccount:', err);
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
    const { balance, balanceComitted } = req.body;
    
    const account = await AccountService.updateBalance(accountid, { balance, balanceComitted });
    
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