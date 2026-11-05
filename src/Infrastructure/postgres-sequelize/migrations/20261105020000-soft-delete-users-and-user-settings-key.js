'use strict';

const USER_SETTINGS_KEY_UNIQUE = 'user_settings_key_unique';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn(
        'users',
        'deleted_at',
        {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
        { transaction }
      );

      await queryInterface.removeConstraint(
        'user_settings',
        USER_SETTINGS_KEY_UNIQUE,
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addConstraint('user_settings', {
        fields: ['key'],
        type: 'unique',
        name: USER_SETTINGS_KEY_UNIQUE,
        transaction,
      });

      await queryInterface.removeColumn('users', 'deleted_at', {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
