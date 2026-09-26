import { OpenAPIObject } from 'openapi3-ts/oas32';
import { createDocument } from 'zod-openapi';
import { authPaths } from './paths/auth.path';
import { categoryPaths } from './paths/category.path';
import { complaintPaths } from './paths/complaint.path';
import { complaintMessagePaths } from './paths/complaint-message.path';
import { followPaths } from './paths/follow.path';
import { inventoryPaths } from './paths/inventory.path';
import { listingPaths } from './paths/listing.path';
import { logisticsPaths } from './paths/logistics.path';
import { orderPaths } from './paths/order.path';
import { paymentAccountPaths } from './paths/payment-account.path';
import { productImagePaths } from './paths/product-image.path';
import { receiptPaths } from './paths/receipt.path';
import { referralPaths } from './paths/referral.path';
import { reviewPaths } from './paths/review.path';
import { sellerPaths } from './paths/seller.path';
import { settingsPaths } from './paths/settings.path';
import { userPaths } from './paths/user.path';
import { withdrawalPaths } from './paths/withdrawal.path';



const document: OpenAPIObject = createDocument({
  openapi: '3.2.0',
  info: { title: 'Zhantila API', version: '1.0.0' },
  paths: {
    ...authPaths,
    ...userPaths,
    ...categoryPaths,
    ...sellerPaths,
    ...inventoryPaths,
    ...productImagePaths,
    ...reviewPaths,
    ...orderPaths,
    ...receiptPaths,
    ...complaintPaths,
    ...complaintMessagePaths,
    ...logisticsPaths,
    ...paymentAccountPaths,
    ...settingsPaths,
    ...listingPaths,
    ...followPaths,
    ...referralPaths,
    ...withdrawalPaths
  },
});   

export default document;