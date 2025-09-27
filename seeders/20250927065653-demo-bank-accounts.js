'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const bankAccounts = Array.from({ length: 10 }).map(() => ({
      accountnumber: faker.finance.accountNumber(),
      sortnumber: faker.finance.routingNumber(),
      cvv: faker.finance.creditCardCVV(),
      balance: parseFloat(faker.finance.amount()),
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('bankaccounts', bankAccounts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bankaccounts', null, {});
  }
};