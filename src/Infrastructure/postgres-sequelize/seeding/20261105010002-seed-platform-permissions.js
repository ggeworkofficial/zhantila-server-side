'use strict';

const { PERMISSIONS } = require('./data/rbac');

module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const timestamp = new Date();

      await queryInterface.bulkInsert(
        'platform_permissions',
        PERMISSIONS.map((name) => ({
          name,
          created_at: timestamp,
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
        'platform_permissions',
        { name: PERMISSIONS },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
