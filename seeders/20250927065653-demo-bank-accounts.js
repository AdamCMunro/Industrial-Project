'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('bankaccounts', [
      {
        accountnumber: 123456,
        sortnumber: 123456,
        cvv: 123,
        balance: 50000
      },
      {
        accountnumber: 234567,
        sortnumber: 654321,
        cvv: 456,
        balance: 25000
      },
      {
        accountnumber: 345678,
        sortnumber: 987654,
        cvv: 789,
        balance: 100000
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bankaccounts', null, {});
  }
};