'use strict';

const ROLES = ['customer', 'moderator', 'admin', 'superadmin'];

const USER_PERMISSIONS = [
  'user.create',
  'user.read_self',
  'user.read_one',
  'user.read_all',
  'user.update_self',
  'user.role_change',
  'user.role_change_admin',
  'user.role_change_superadmin',
  'user.delete_self',
  'user.delete',
];

const SHOP_PERMISSIONS = ['shop.update_self', 'shop.status_change'];

const CATEGORY_PERMISSIONS = [
  'category.create',
  'category.make_public',
  'category.read_one_public',
  'category.read_one_self_shop',
  'category.read_one',
  'category.read_all_public',
  'category.read_all_self_shop',
  'category.read_all',
  'category.update_self_shop',
  'category.update',
  'category.delete_self_shop',
  'category.delete',
];

const LISTING_PERMISSIONS = [
  'listing.create',
  'listing.read_one_self_shop',
  'listing.read_one',
  'listing.read_all_self_shop',
  'listing.read_all',
  'listing.update_self_shop',
  'listing.update',
  'listing.delete_self_shop',
  'listing.delete',
];

const LISTING_COMMENT_PERMISSIONS = [
  'listing_comment.create',
  'listing_comment.read',
  'listing_comment.update_self',
  'listing_comment.delete_self_shop',
  'listing_comment.delete_self',
  'listing_comment.delete',
];

const LISTING_REVIEW_PERMISSIONS = [
  'listing_review.create',
  'listing_review.read',
  'listing_review.update_self',
  'listing_review.delete_self_shop',
  'listing_review.delete_self',
  'listing_review.delete',
];

const RESELLER_PERMISSIONS = ['reseller.earn_commission'];

const ORDER_PERMISSIONS = [
  'order.create',
  'order.read_one_self_shop',
  'order.read_one_self',
  'order.read_one',
  'order.read_all_self_shop',
  'order.read_all_self',
  'order.read_all',
  'order.update_self_shop',
  'order.update_self',
  'order.update',
  'order.delete_self_shop',
  'order.delete_self',
  'order.delete',
];

const RECEIPT_PERMISSIONS = [
  'receipt.create',
  'receipt.read_one_self_shop',
  'receipt.read_one_self',
  'receipt.read_one',
  'receipt.read_all_self_shop',
  'receipt.read_all_self',
  'receipt.read_all',
  'receipt.update_self_shop',
  'receipt.update_self',
  'receipt.update',
  'receipt.delete_self_shop',
  'receipt.delete_self',
  'receipt.delete',
];

const LOGISTIC_PERMISSIONS = [
  'logistic.create',
  'logistic.read_one_self_shop',
  'logistic.read_one_self',
  'logistic.read_one',
  'logistic.read_all_self_shop',
  'logistic.read_all_self',
  'logistic.read_all',
  'logistic.update_self_shop',
  'logistic.update',
  'logistic.delete_self_shop',
  'logistic.delete',
];

const REPORT_PERMISSIONS = [
  'report.create',
  'report.read_one_self',
  'report.read_one',
  'report.read_all_self',
  'report.read_all',
  'report.update_self',
  'report.update',
  'report.delete_self',
  'report.delete',
];

const FEEDBACK_PERMISSIONS = [
  'feedback.create',
  'feedback.read_one',
  'feedback.read_all',
  'feedback.update_self',
  'feedback.update',
  'feedback.delete_self',
  'feedback.delete',
];

const SETTING_PERMISSIONS = [
  'setting.read_one',
  'setting.read_all',
  'setting.update',
  'setting.delete',
];

const AUDIT_TRAIL_PERMISSIONS = [
  'audit_trail.read_one',
  'audit_trail.read_all',
  'audit_trail.delete',
];

const uniq = (values) => [...new Set(values)];

const PERMISSIONS = uniq([
  ...USER_PERMISSIONS,
  ...SHOP_PERMISSIONS,
  ...CATEGORY_PERMISSIONS,
  ...LISTING_PERMISSIONS,
  ...LISTING_COMMENT_PERMISSIONS,
  ...LISTING_REVIEW_PERMISSIONS,
  ...RESELLER_PERMISSIONS,
  ...ORDER_PERMISSIONS,
  ...RECEIPT_PERMISSIONS,
  ...LOGISTIC_PERMISSIONS,
  ...REPORT_PERMISSIONS,
  ...FEEDBACK_PERMISSIONS,
  ...SETTING_PERMISSIONS,
  ...AUDIT_TRAIL_PERMISSIONS,
]);

const CUSTOMER_PERMISSIONS = [
  'user.read_self',
  'user.update_self',
  'user.delete_self',
  'shop.update_self',
  'category.create',
  'category.read_one_self_shop',
  'category.read_all_self_shop',
  'category.update_self_shop',
  'category.delete_self_shop',
  'category.read_one_public',
  'category.read_all_public',
  'listing.read_one',
  'listing.read_all',
  'listing.create',
  'listing.read_one_self_shop',
  'listing.read_all_self_shop',
  'listing.update_self_shop',
  'listing.delete_self_shop',
  'listing_comment.create',
  'listing_comment.read',
  'listing_comment.update_self',
  'listing_comment.delete_self',
  'listing_comment.delete_self_shop',
  'listing_review.create',
  'listing_review.read',
  'listing_review.update_self',
  'listing_review.delete_self',
  'reseller.earn_commission',
  'order.create',
  'order.read_one_self',
  'order.read_all_self',
  'order.update_self',
  'order.delete_self',
  'order.read_one_self_shop',
  'order.read_all_self_shop',
  'order.update_self_shop',
  'order.delete_self_shop',
  'receipt.create',
  'receipt.read_one_self',
  'receipt.read_all_self',
  'receipt.update_self',
  'receipt.delete_self',
  'receipt.read_one_self_shop',
  'receipt.read_all_self_shop',
  'receipt.update_self_shop',
  'receipt.delete_self_shop',
  'logistic.read_one_self',
  'logistic.read_all_self',
  'logistic.create',
  'logistic.read_one_self_shop',
  'logistic.read_all_self_shop',
  'logistic.update_self_shop',
  'logistic.delete_self_shop',
  'report.create',
  'report.read_one_self',
  'report.read_all_self',
  'report.update_self',
  'report.delete_self',
  'feedback.create',
  'feedback.read_one',
  'feedback.read_all',
  'feedback.update_self',
  'feedback.delete_self',
];

const MODERATOR_ONLY_PERMISSIONS = [
  'user.role_change',
  'shop.status_change',
  'listing.update',
  'listing.delete',
  'listing_comment.delete',
  'listing_review.delete',
  'order.read_one',
  'order.read_all',
  'receipt.read_one',
  'receipt.read_all',
  'logistic.read_one',
  'logistic.read_all',
  'report.read_one',
  'report.read_all',
  'report.update',
  'report.delete',
  'feedback.update',
  'feedback.delete',
];

const ADMIN_ONLY_PERMISSIONS = [
  'user.read_one',
  'user.read_all',
  'user.delete',
  'category.make_public',
  'category.read_one',
  'category.read_all',
  'category.update',
  'category.delete',
  'order.update',
  'order.delete',
  'receipt.update',
  'receipt.delete',
  'logistic.update',
  'logistic.delete',
];

const SUPERADMIN_ONLY_PERMISSIONS = [
  'user.role_change_admin',
  'user.role_change_superadmin',
  'setting.read_one',
  'setting.read_all',
  'setting.update',
  'setting.delete',
  'audit_trail.read_one',
  'audit_trail.read_all',
  'audit_trail.delete',
];

const ROLE_PERMISSIONS = {
  customer: uniq(CUSTOMER_PERMISSIONS),
  moderator: uniq([
    ...CUSTOMER_PERMISSIONS,
    ...MODERATOR_ONLY_PERMISSIONS,
  ]),
  admin: uniq([
    ...CUSTOMER_PERMISSIONS,
    ...MODERATOR_ONLY_PERMISSIONS,
    ...ADMIN_ONLY_PERMISSIONS,
  ]),
  superadmin: uniq([
    ...CUSTOMER_PERMISSIONS,
    ...MODERATOR_ONLY_PERMISSIONS,
    ...ADMIN_ONLY_PERMISSIONS,
    ...SUPERADMIN_ONLY_PERMISSIONS,
  ]),
};

const permissionSet = new Set(PERMISSIONS);
const assignedPermissions = new Set(Object.values(ROLE_PERMISSIONS).flat());

if (PERMISSIONS.length !== 106) {
  throw new Error(
    `Expected 106 unique platform permissions, found ${PERMISSIONS.length}`
  );
}

if (assignedPermissions.size === 0) {
  throw new Error('No role permissions defined');
}

for (const permission of assignedPermissions) {
  if (!permissionSet.has(permission)) {
    throw new Error(`Unknown permission assigned to a role: ${permission}`);
  }
}

const unassignedPermissions = PERMISSIONS.filter(
  (permission) => !assignedPermissions.has(permission)
);

const expectedUnassignedPermissions = new Set([
  'user.create',
  'listing_review.delete_self_shop',
]);

if (
  unassignedPermissions.length !== expectedUnassignedPermissions.size ||
  unassignedPermissions.some(
    (permission) => !expectedUnassignedPermissions.has(permission)
  )
) {
  throw new Error(
    `Unexpected unassigned permissions: ${unassignedPermissions.join(', ')}`
  );
}

module.exports = { ROLES, PERMISSIONS, ROLE_PERMISSIONS };
