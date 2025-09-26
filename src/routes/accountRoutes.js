const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountControllers');

// GET /api/accounts/email/:email - Get account by email
router.get('/email/:email', accountController.getAccountByEmail);

// GET /api/accounts - Get all accounts (runs SELECT * FROM accounts)
router.get('/', accountController.getAllAccounts);

// POST /api/accounts - Create a new account
router.post('/', accountController.createAccount);

// GET /api/accounts/:accountid - Get account by ID
// router.get('/:accountid', accountController.getAccountById);

// PUT /api/accounts/:accountid/balance - Update account balance
router.put('/:accountid/balance', accountController.updateBalance);

// PUT /api/accounts/:accountid - Update account data (email, accountType, etc.)
router.put('/:accountid', accountController.updateAccount);

// DELETE /api/accounts/:accountid - Delete an account
router.delete('/:accountid', accountController.deleteAccount);

module.exports = router;