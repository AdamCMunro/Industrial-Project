'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const bankAccounts = Array.from({ length: 10 }).map(() => ({
      accountnumber: faker.finance.accountNumber(),
      sortnumber: faker.finance.routingNumber(),
      cvv: faker.number.int({ min: 100, max: 999 }), // should we be storing cvvs? 🤔
      balance: faker.number.int({ min: 0, max: 100000 })
    }));

    await queryInterface.bulkInsert('bankaccounts', bankAccounts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bankaccounts', null, {});
  }
};