## 3. Context & Scope

### 3.1. Business Context of Zhantila

| **Communication partner** | **Input** | **Output** |
|---|---|---|
| User | Authentication credentials, profile information, Listing engagement data, purchase/checkout information, and reports. | User information, Personalized feed, detailed listing information and engagement metrics, shop information, order and delivery status information. |
| Shop owner | Listing information, Contact information, payment account information, order and delivery information, and reseller program configuration. | Shop information, inventory data, detailed listing information and engagement metrics, order and reseller transaction history, and logistic history. |
| Reseller | Referral links | Referral attribution, commission information. |
| Administrators/Moderators | User information, Listing information, moderation actions, shop verification decisions, and configuration changes. | User information, shop information, listing information, order and delivery information, system information, reports and moderation information. |
| Web application | API requests | API responses |
| Mobile application | API requests | API responses |
| Keyclock | Authentication requests | Authentication/identity results |
| Recombee | Listing catalog data, user data and interaction history. | Ranked list of recommended listings. |

### 3.1.1. User business context

- A user can act as a Buyer, Shop Owner, or Reseller based on their activities within the platform. These business contexts are not represented by explicit attributes.
- Shops can have one of the three statuses:
  - **Unverified:** The default status assigned for shops. This shop can publish listings, contact information and payment accounts but it can not use In-app transactions.
  - **Verified:** The shop owner needs to submit the required government documentations to upgrade their status to verified. This status is primarily a perceptual and reputational indicator, intended to increase user trust.
  - **Partner:** The shop owner needs to sign the proper contractual agreements. This shop is the only shop that supports in-app transactions.

| **Communication partner** | **Input** | **Output** |
|---|---|---|
| Unverified and Verified shop | Listing information, contact information, payment account information, and for unverified shops, verification information. | Shop status, inventory data, listing information and engagement metrics. |
| Partner shop | Includes all input data flow identified in Unverified and Verified shops, in addition to the following: Order and delivery information. | Includes all output data flow identified in Unverified and Verified shop, in addition to the following: Order and transaction history and delivery history. |

**Note:** In app reseller program is only available for partner shops.