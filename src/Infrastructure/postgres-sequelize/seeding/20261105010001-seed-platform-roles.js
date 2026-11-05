'use strict';

const { ROLES } = require('./data/rbac');

module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const timestamp = new Date();

      await queryInterface.bulkInsert(
        'platform_roles',
        ROLES.map((name) => ({
          name,
          created_at: timestamp,
          updated_at: timestamp,
        })),
        { ignoreDuplicates: true, transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete(
        'platform_roles',
        { name: ROLES },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
