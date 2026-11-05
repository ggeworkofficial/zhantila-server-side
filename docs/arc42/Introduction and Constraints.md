# 1. Introduction

Zhantila is an E-commerce application that is used to facilitate communication between providers and consumers, online transactions for partner shops and a reseller program to amplify listings. Providers, in the form of shops, can post listings such as products, including wholesale/B2B, skills and services for consumers to discover. 

## 1.1. Requirement Goals

### 1.1.1. Basic Functional Requirements of Zhantila

| **Functional requirements** | **Description** |
|---|---|
| User Management  | User Registration, authentication, two factor authentication (2FA) and User Provisioning |
| Roll Based Access Control | Management and enforcement of roles and permissions at a platform level.  |
| Unverified shops for all users | Automatic creation of a default unverified shop for all users upon registration. |
| Shop verification process | Submission and verification of the proper government documentations to upgrade a shop’s status to verified. |
| Shop following  | <br> |
| | The ability of users to follow shops and view content from shops they follow. |
| Listing Management | The ability of shop owners to post and manage listings, including product, skills and services. |
| Listing discovery/Feed | The ability of users to discover and browse listings through the application's feed and discovery interfaces.  |
| User Engagement with listings | The ability of users to like, comment on, review, share, add to wishlist and report a listing. |
| Recommendation | Provides more relevant and personalized listings. |
| Reporting and Moderation | The ability to report inappropriate content or user behavior and for administrators to investigate reports and take appropriate action.  |
| Help center | The ability for users and moderators to communicate with each other in real time. |
| Complaint/Feedback | The ability of users to submit feedback and suggestions regarding the application. |
| Reseller Program | The ability of users to earn commissions by sharing eligible listings. |
| Purchase/Checkout process (Only for partner shops) | The ability of users to purchase eligible listings from Partner Shops through in-app checkout.  |
| Transaction History | The ability of users and shop owners to view their relevant transaction records and history.  |
| Delivery/Logistic tracking | The ability of buyers to track the delivery status and estimated arrival of purchased physical products.  |
| In-app/Email notification | Provides real time notifications for users. |
| Dynamic settings | The ability to manage configurable application settings and preferences. |
| Logging | The recording of relevant system events, errors, and activities to support debugging, monitoring, and auditing.  |

### 1.1.2. Architectural Driving Forces of Zhantila

1. **User authentication:** User verification across different authentication methods, user authentication requirements across appropriate routes and Secure Session Management.
2. **Role Based Access Control: ** Flexible and Scalable authorization across different user roles and permissions.
3. **Shop verification process and Verified shops: ** Secure submission and verification of appropriate government documents, such as business license and Tax Identification Number (TIN).
4. **User Engagement with listings: ** Behavioral data collection to improve the recommendation system.
5. **Reporting and Moderation: ** Providing a mechanism for users to report other users, shops and listings for inappropriate contents, exploitations, abuse,  scams, and other violations,allowing the moderation team to detect and take action against such contents.
6. **Reseller program: ** Supporting optional reseller programs for shops, including configurable commission rates, referral link, referral tracking, transaction attribution, and automatic commission calculation.
7. **Purchase/Checkout process for partner shops: ** The following capabilities apply only for partner shops: Add to cart option for a listing, checkout process, order verification, and receipt submission and verification.
8. **Multi-platform support: ** Because the server-side application should support both web and mobile applications, the system should follow a shared backend architecture. 
9. **In-app notification: ** Since Zhantila supports real-time in-app notifications, a real-time communication protocol is required to deliver notifications to connected clients.

## 2. Architecture Constraints of Zhatila

- **Multi-platform clients:** The backend must provide a common API that can be consumed by both web and mobile clients.
- **Keyclock authentication:** Authentication must be provided through Keyclock.
- **Recombee recommendation API:** Listing scoring and ranking must be handled by Recombee recommendation API.