'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@gmail.com',
        password: '123456',
        firstName: 'John',
        lastName: 'Doe',
        address: 'Hanoi',
        gender: true,
        typeRole: 'ROLE',
        keyRole: 'R1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },  // dung để chạy bình thường thêm dữ liệu 

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  } // muốn cancel việc thêm dữ liệu
};
