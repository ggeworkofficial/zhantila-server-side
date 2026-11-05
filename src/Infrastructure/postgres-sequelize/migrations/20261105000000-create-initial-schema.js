'use strict';

const UUID_DEFAULT = 'gen_random_uuid()';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const uuidPk = () => ({
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal(UUID_DEFAULT),
      });

      const now = () => ({
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('now()'),
      });

      // 1. Locations (self-referencing parent hierarchy)
      await queryInterface.createTable(
        'locations',
        {
          id: uuidPk(),
          name: { type: Sequelize.STRING(255), allowNull: false },
          type: { type: Sequelize.STRING(30), allowNull: false },
          parent_location_id: {
            type: Sequelize.UUID,
            allowNull: true,
            references: { model: 'locations', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          country_code: { type: Sequelize.CHAR(2), allowNull: false },
          latitude: { type: Sequelize.DECIMAL(9, 6), allowNull: true },
          longitude: { type: Sequelize.DECIMAL(9, 6), allowNull: true },
        },
        { transaction }
      );

      // Root locations have parent_location_id = NULL. A plain UNIQUE constraint
      // would allow duplicate roots, so enforce NULLS NOT DISTINCT (PostgreSQL 15+).
      await queryInterface.sequelize.query(
        `ALTER TABLE "locations"
           ADD CONSTRAINT "locations_name_type_parent_location_id_key"
           UNIQUE NULLS NOT DISTINCT ("name", "type", "parent_location_id")`,
        { transaction }
      );

      await queryInterface.sequelize.query(
        `ALTER TABLE "locations"
           ADD CONSTRAINT "locations_type_check"
           CHECK ("type" IN ('country', 'city', 'district', 'neighborhood'))`,
        { transaction }
      );

      await queryInterface.addIndex('locations', ['parent_location_id'], {
        name: 'locations_parent_location_id',
        transaction,
      });

      // 2. Users
      await queryInterface.createTable(
        'users',
        {
          id: uuidPk(),
          keycloak_subject: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
          },
          email: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
          },
          display_name: { type: Sequelize.STRING(255), allowNull: false },
          ref_code: { type: Sequelize.STRING(10), allowNull: true, unique: true },
          location_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'locations', key: 'id' },
          },
          created_at: now(),
          updated_at: now(),
        },
        { transaction }
      );

      await queryInterface.addIndex('users', ['location_id'], {
        name: 'users_location_id',
        transaction,
      });

      // Case-insensitive lookup index (email uniqueness itself remains case-sensitive).
      await queryInterface.sequelize.query(
        'CREATE INDEX "users_email_lower" ON "users" (LOWER("email"))',
        { transaction }
      );

      // 3. Location Requests
      await queryInterface.createTable(
        'location_requests',
        {
          id: uuidPk(),
          requested_name: { type: Sequelize.STRING(255), allowNull: false },
          requested_type: { type: Sequelize.STRING(30), allowNull: false },
          parent_location_id: {
            type: Sequelize.UUID,
            allowNull: true,
            references: { model: 'locations', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          country_code: { type: Sequelize.CHAR(2), allowNull: false },
          latitude: { type: Sequelize.DECIMAL(9, 6), allowNull: true },
          longitude: { type: Sequelize.DECIMAL(9, 6), allowNull: true },
          status: { type: Sequelize.STRING(20), allowNull: false },
          requested_by_user_id: {
            type: Sequelize.UUID,
            allowNull: true,
            references: { model: 'users', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          created_at: now(),
          updated_at: now(),
        },
        { transaction }
      );

      await queryInterface.sequelize.query(
        `ALTER TABLE "location_requests"
           ADD CONSTRAINT "location_requests_requested_type_check"
           CHECK ("requested_type" IN ('country', 'city', 'district', 'neighborhood'))`,
        { transaction }
      );

      await queryInterface.sequelize.query(
        `ALTER TABLE "location_requests"
           ADD CONSTRAINT "location_requests_status_check"
           CHECK ("status" IN ('pending', 'confirmed', 'rejected'))`,
        { transaction }
      );

      await queryInterface.addIndex(
        'location_requests',
        ['status', { name: 'created_at', order: 'DESC' }],
        { name: 'location_requests_status_created_at', transaction }
      );

      await queryInterface.addIndex(
        'location_requests',
        ['requested_by_user_id', 'created_at'],
        {
          name: 'location_requests_requested_by_user_id_created_at',
          transaction,
        }
      );

      await queryInterface.addIndex('location_requests', ['parent_location_id'], {
        name: 'location_requests_parent_location_id',
        transaction,
      });

      // 4. Platform Roles
      await queryInterface.createTable(
        'platform_roles',
        {
          id: uuidPk(),
          name: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
          },
          created_at: now(),
          updated_at: now(),
        },
        { transaction }
      );

      // 5. Platform Permissions
      await queryInterface.createTable(
        'platform_permissions',
        {
          id: uuidPk(),
          name: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
          },
          created_at: now(),
        },
        { transaction }
      );

      // 6. Platform User Roles
      await queryInterface.createTable(
        'platform_user_roles',
        {
          id: uuidPk(),
          user_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'users', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          role_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'platform_roles', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        },
        { transaction }
      );

      await queryInterface.addConstraint('platform_user_roles', {
        fields: ['user_id', 'role_id'],
        type: 'unique',
        name: 'platform_user_roles_user_id_role_id_key',
        transaction,
      });

      await queryInterface.addIndex('platform_user_roles', ['role_id'], {
        name: 'platform_user_roles_role_id',
        transaction,
      });

      // 7. Platform Role Permissions
      await queryInterface.createTable(
        'platform_role_permissions',
        {
          id: uuidPk(),
          role_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'platform_roles', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          permission_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'platform_permissions', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        },
        { transaction }
      );

      await queryInterface.addConstraint('platform_role_permissions', {
        fields: ['role_id', 'permission_id'],
        type: 'unique',
        name: 'platform_role_permissions_role_id_permission_id_key',
        transaction,
      });

      // 8. Shops
      await queryInterface.createTable(
        'shops',
        {
          id: uuidPk(),
          display_name: { type: Sequelize.STRING(255), allowNull: false },
          description: { type: Sequelize.TEXT, allowNull: true },
          status: { type: Sequelize.STRING(100), allowNull: false },
          is_closed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          owner_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'users', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          deleted_at: { type: Sequelize.DATE, allowNull: true },
          created_at: now(),
          updated_at: now(),
        },
        { transaction }
      );

      await queryInterface.sequelize.query(
        `ALTER TABLE "shops"
           ADD CONSTRAINT "shops_status_check"
           CHECK ("status" IN ('unverified', 'verified', 'partner'))`,
        { transaction }
      );

      await queryInterface.addIndex('shops', ['owner_id'], {
        name: 'shops_owner_id',
        transaction,
      });

      // Partial index for active (non-deleted) shops filtered by status.
      await queryInterface.sequelize.query(
        `CREATE INDEX "shops_active_status_created_at"
           ON "shops" ("status", "created_at")
           WHERE "deleted_at" IS NULL`,
        { transaction }
      );

      // 9. Shop Follows
      await queryInterface.createTable(
        'shop_follows',
        {
          id: uuidPk(),
          user_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'users', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          shop_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'shops', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          followed_at: now(),
        },
        { transaction }
      );

      await queryInterface.addConstraint('shop_follows', {
        fields: ['user_id', 'shop_id'],
        type: 'unique',
        name: 'shop_follows_user_id_shop_id_key',
        transaction,
      });

      await queryInterface.addIndex('shop_follows', ['shop_id', 'followed_at'], {
        name: 'shop_follows_shop_id_followed_at',
        transaction,
      });

      // 10. Shop Locations
      await queryInterface.createTable(
        'shop_locations',
        {
          id: uuidPk(),
          shop_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'shops', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          location_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'locations', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        },
        { transaction }
      );

      await queryInterface.addConstraint('shop_locations', {
        fields: ['shop_id', 'location_id'],
        type: 'unique',
        name: 'shop_locations_shop_id_location_id_key',
        transaction,
      });

      await queryInterface.addIndex('shop_locations', ['location_id'], {
        name: 'shop_locations_location_id',
        transaction,
      });

      // 11. Platform Settings
      await queryInterface.createTable(
        'platform_settings',
        {
          id: uuidPk(),
          key: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
          },
          value: { type: Sequelize.JSONB, allowNull: false },
          description: { type: Sequelize.TEXT, allowNull: true },
          updated_by_user_id: {
            type: Sequelize.UUID,
            allowNull: true,
            references: { model: 'users', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          created_at: now(),
          updated_at: now(),
        },
        { transaction }
      );

      // 12. User Settings
      await queryInterface.createTable(
        'user_settings',
        {
          id: uuidPk(),
          user_id: {
            type: Sequelize.UUID,
            allowNull: true,
            references: { model: 'users', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          key: { type: Sequelize.STRING(100), allowNull: false },
          value: { type: Sequelize.JSONB, allowNull: false },
          created_at: now(),
          updated_at: now(),
        },
        { transaction }
      );

      await queryInterface.addConstraint('user_settings', {
        fields: ['key', 'user_id'],
        type: 'unique',
        name: 'user_settings_key_user_id_key',
        transaction,
      });

      // 13. Audit Logs
      await queryInterface.createTable(
        'audit_logs',
        {
          id: uuidPk(),
          timestamp: now(),
          actor_user_id: {
            type: Sequelize.UUID,
            allowNull: true,
            references: { model: 'users', key: 'id' },
          },
          action: { type: Sequelize.STRING(100), allowNull: false },
          target_type: { type: Sequelize.STRING(100), allowNull: false },
          target_id: { type: Sequelize.UUID, allowNull: true },
          request_id: { type: Sequelize.UUID, allowNull: true },
          changes: { type: Sequelize.JSONB, allowNull: true },
          metadata: { type: Sequelize.JSONB, allowNull: true },
        },
        { transaction }
      );

      await queryInterface.addIndex('audit_logs', ['actor_user_id', 'timestamp'], {
        name: 'audit_logs_actor_user_id_timestamp',
        transaction,
      });

      await queryInterface.addIndex(
        'audit_logs',
        ['target_type', 'target_id', 'timestamp'],
        { name: 'audit_logs_target_type_target_id_timestamp', transaction }
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
      const tables = [
        'audit_logs',
        'user_settings',
        'platform_settings',
        'shop_locations',
        'shop_follows',
        'shops',
        'platform_role_permissions',
        'platform_user_roles',
        'platform_permissions',
        'platform_roles',
        'location_requests',
        'users',
        'locations',
      ];

      for (const table of tables) {
        await queryInterface.dropTable(table, { transaction });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
