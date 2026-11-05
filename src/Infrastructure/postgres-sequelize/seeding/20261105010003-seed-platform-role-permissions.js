'use strict';

const { ROLES, PERMISSIONS, ROLE_PERMISSIONS } = require('./data/rbac');

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const roleRows = await queryInterface.sequelize.query(
        'SELECT "id", "name" FROM "platform_roles" WHERE "name" IN (:names)',
        {
          replacements: { names: ROLES },
          type: Sequelize.QueryTypes.SELECT,
          transaction,
        }
      );

      const permissionRows = await queryInterface.sequelize.query(
        'SELECT "id", "name" FROM "platform_permissions" WHERE "name" IN (:names)',
        {
          replacements: { names: PERMISSIONS },
          type: Sequelize.QueryTypes.SELECT,
          transaction,
        }
      );

      const roleIds = new Map(roleRows.map((row) => [row.name, row.id]));
      const permissionIds = new Map(
        permissionRows.map((row) => [row.name, row.id])
      );

      for (const role of ROLES) {
        if (!roleIds.has(role)) {
          throw new Error(`Missing platform role: ${role}`);
        }
      }

      for (const permission of PERMISSIONS) {
        if (!permissionIds.has(permission)) {
          throw new Error(`Missing platform permission: ${permission}`);
        }
      }

      const seen = new Set();
      const links = [];

      for (const role of ROLES) {
        for (const permission of ROLE_PERMISSIONS[role]) {
          const key = `${roleIds.get(role)}:${permissionIds.get(permission)}`;

          if (seen.has(key)) {
            continue;
          }

          seen.add(key);
          links.push({
            role_id: roleIds.get(role),
            permission_id: permissionIds.get(permission),
          });
        }
      }

      await queryInterface.bulkInsert('platform_role_permissions', links, {
        ignoreDuplicates: true,
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
      const roleRows = await queryInterface.sequelize.query(
        'SELECT "id" FROM "platform_roles" WHERE "name" IN (:names)',
        {
          replacements: { names: ROLES },
          type: Sequelize.QueryTypes.SELECT,
          transaction,
        }
      );

      const roleIds = roleRows.map((row) => row.id);

      if (roleIds.length > 0) {
        await queryInterface.bulkDelete(
          'platform_role_permissions',
          { role_id: roleIds },
          { transaction }
        );
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
