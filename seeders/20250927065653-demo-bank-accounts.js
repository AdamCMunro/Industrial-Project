'use strict';

const { faker } = require('@faker-js/faker');
const { crypto } = require('crypto');

module.exports = {
  async up(queryInterface, Sequelize) {
    const bankAccounts = Array.from({ length: 10 }).map(() => ({
      accountnumber: crypto.encrypt(faker.finance.accountNumber()), // encrypt account numbers
      // realistically you probably shouldn't encrypt them this way but for our purposes its fine hopefully
      sortnumber: faker.finance.routingNumber(), // sort numbers are in the public domain
      cvv: faker.number.int({ min: 100, max: 999 }), // should we be storing cvvs? 🤔
      balance: faker.number.int({ min: 0, max: 100000 })
    }));

    await queryInterface.bulkInsert('bankaccounts', bankAccounts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bankaccounts', null, {});
  }
};