'use strict';

const SHOPS_OWNER_FK = 'shops_owner_id_fkey';
const AUDIT_LOGS_ACTOR_FK = 'audit_logs_actor_user_id_fkey';
const USER_SETTINGS_KEY_UNIQUE = 'user_settings_key_unique';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeConstraint('shops', SHOPS_OWNER_FK, {
        transaction,
      });

      await queryInterface.addConstraint('shops', {
        fields: ['owner_id'],
        type: 'foreign key',
        name: SHOPS_OWNER_FK,
        references: { table: 'users', field: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        transaction,
      });

      await queryInterface.addConstraint('user_settings', {
        fields: ['key'],
        type: 'unique',
        name: USER_SETTINGS_KEY_UNIQUE,
        transaction,
      });

      await queryInterface.removeConstraint('audit_logs', AUDIT_LOGS_ACTOR_FK, {
        transaction,
      });

      await queryInterface.addConstraint('audit_logs', {
        fields: ['actor_user_id'],
        type: 'foreign key',
        name: AUDIT_LOGS_ACTOR_FK,
        references: { table: 'users', field: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeConstraint('audit_logs', AUDIT_LOGS_ACTOR_FK, {
        transaction,
      });

      await queryInterface.addConstraint('audit_logs', {
        fields: ['actor_user_id'],
        type: 'foreign key',
        name: AUDIT_LOGS_ACTOR_FK,
        references: { table: 'users', field: 'id' },
        transaction,
      });

      await queryInterface.removeConstraint(
        'user_settings',
        USER_SETTINGS_KEY_UNIQUE,
        { transaction }
      );

      await queryInterface.removeConstraint('shops', SHOPS_OWNER_FK, {
        transaction,
      });

      await queryInterface.addConstraint('shops', {
        fields: ['owner_id'],
        type: 'foreign key',
        name: SHOPS_OWNER_FK,
        references: { table: 'users', field: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
