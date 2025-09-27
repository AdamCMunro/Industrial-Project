const BankAccount = require('../models/BankAccount');
const sequelize = require('../config/db');

class BankAccountService {
    static async getByAccountNumber(accountnumber) {
        try {
            const account = await BankAccount.findOne({
                where: { accountnumber }
            });
            return account;
        } catch (error) {
            throw new Error(`Error fetching bank account: ${error.message}`);
        }
    }

    static async getAll() {
        try {
            const [accounts] = await sequelize.query('SELECT * FROM bankaccounts', {
                type: sequelize.QueryTypes.SELECT
            });
            return accounts;
        }
        catch (error) {
            throw new Error(`Error retrieving bank accounts: ${error.message}`);
        }
    }

    static async debitAccount(accountnumber, amount) {
        const tx = await sequelize.transaction();
        try {
            const acc = await BankAccount.findOne({
                where: { accountnumber },
                transaction: tx,
                lock: tx.LOCK.UPDATE
            })

            if (!acc) {
                await tx.rollback();
                throw new Error('Bank account could not be found');
            }

            if (acc.balance < amount) {
                await tx.rollback();
                throw new Error('Insufficient funds');
            }

            acc.balance -= amount;
            await acc.save({ transaction: tx });
            let res = await tx.commit();
            if (res instanceof Error) {
                throw res;
            }

            // TODO: record this in the transaction logs also

            return acc;
        }
        catch (error) {
            await tx.rollback();
            throw new Error(`Couldn't debit account ${accountnumber}: ${error.message}`);
        }
    }

    static async creditAccount(accountnumber, amount) {
        const tx = await sequelize.transaction();
        try {
            const acc = await BankAccount.findOne({
                where: { accountnumber },
                transaction: tx,
                lock: tx.LOCK.UPDATE
            })

            if (!acc) {
                await tx.rollback();
                return null;
            }

            acc.balance += amount;
            await acc.save({ transaction: tx });
            let res = await tx.commit();
            if (res instanceof Error) {
                throw res;
            }
            return acc;
        }
        catch (error) {
            await tx.rollback();
            throw new Error(`Couldn't credit account ${accountnumber}: ${error.message}`);
        }
    }
}

module.exports = BankAccountService;
