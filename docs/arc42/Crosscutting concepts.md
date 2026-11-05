## 7. Crosscutting Concepts

### 7.1. Authentication and Authorization

#### Authentication

Authentication establishes the identity of a user making a request to Zhantila. Authentication is performed by common middleware at the route layer. Requests that require authentication must be verified before being passed to the controller. Requests with missing or invalid authentication credentials are rejected with HTTP `401 Unauthorized`.

#### Authorization

Authorization determines whether an authenticated user is permitted to perform a requested action. Zhantila uses role-based access control (RBAC) at the platform scope. All authorization checks are performed within the service layer through a common authorization implementation.

**Platform-scope RBAC:** Platform-scope RBAC determines which platform-level actions a user may perform. Permissions are mapped to platform roles. The exact platform roles are yet to be defined.

**Resource ownership authorization:** Some operations require additional ownership checks to ensure that a user owns or is otherwise authorized to manage the resource being accessed. These checks are performed in the service layer when required by the operation.

If an authenticated user does not have the required permissions, the operation is rejected with HTTP `403 Forbidden`.

---

### 7.2. Error Handler and Response

#### Successful Responses

Successful API responses are returned by controllers using a standardized response structure. Response schemas are defined to maintain consistency and type safety across the API.

The standard success response has the following structure:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

The `success` field indicates that the operation completed successfully, `message` provides a human-readable description of the outcome, and `data` contains the response payload. The actual data structure depends on the endpoint and is defined by its corresponding response schema.

Controllers return the appropriate HTTP status code according to the operation's outcome.

#### Error Handling

Errors encountered during request processing are forwarded to centralized error-handling middleware. The middleware determines the appropriate HTTP status code and returns a standardized error response.

The standard error response has the following structure:

```json
{
  "success": false,
  "message": "The requested operation could not be completed",
  "detail": null
}
```

The `success` field indicates that the operation failed, `message` provides a client-facing explanation, and `detail` contains additional safe error information when appropriate. Internal exception details, stack traces, and sensitive implementation information must not be exposed to clients.

Expected application errors retain their appropriate HTTP status codes. Unexpected errors are logged internally and returned as generic server errors.

This centralized approach ensures that API responses remain consistent, simplifies error handling across controllers and services, and separates business logic from HTTP error formatting.

---

### 7.3 Validation

Zhantila applies validation at three levels: request validation, business-rule validation, and data integrity enforcement. Each level serves a different purpose within the layered architecture.

#### Request Validation

Request validation is performed in the route layer through a common validator middleware. The middleware accepts custom Zod schemas to validate incoming request data, including request bodies, query parameters, and route parameters, as applicable.

TypeScript types are inferred from the corresponding schemas to provide compile-time type safety. Requests that fail validation are rejected with HTTP `400 Bad Request` before reaching the controller.

#### Business-Rule Validation

Business-rule validation is performed in the service layer. It ensures that operations comply with Zhantila's business rules and current application state. The specific checks depend on the operation and business domain.

One example is verifying product stock availability.

#### Data Integrity Enforcement

Data integrity is enforced through Sequelize model validations and constraints, supported by PostgreSQL database constraints. These mechanisms help prevent invalid or inconsistent data from being persisted.

Database constraints are used where appropriate to enforce rules such as required values, uniqueness, foreign-key relationships, and permitted value ranges.

This layered approach separates incoming request validation, business-rule enforcement, and persistent data integrity while providing consistent protection throughout the application.

---

### 7.4. Logging

Zhantila uses a centralized logging utility to provide consistent application logging and audit logging across the system.

#### Application Logging

Application logging records relevant application events, errors, and diagnostic information to support troubleshooting and system maintenance. A shared logger is accessible to all modules, with logging performed where relevant events or failures occur. Centralized error-handling middleware records unhandled request errors before returning standardized error responses to clients.

Logs use a consistent format containing information such as timestamps, severity levels, messages, and request identifiers. Sensitive information, including passwords, authentication tokens, and session cookies, must not be logged. Initially, application logs are written to the application output streams and can be collected by external logging infrastructure in the future.

#### Audit Logging

Audit logging records significant security-sensitive and business-critical actions to provide traceability and support accountability. Events may include authentication attempts, permission changes, administrative actions, shop verification decisions, listing moderation, and other important operations.

Audit records should capture relevant information, such as the actor, action performed, affected resource, timestamp, and outcome. Where appropriate, records may also include the request identifier and relevant contextual information. Audit logs must not contain passwords, authentication tokens, session cookies, or other unnecessary sensitive data.

Audit records should be protected against unauthorized modification and deletion, with access restricted to authorized personnel. Their retention period and storage approach should be defined according to security, operational, and applicable legal requirements.

Together, application logging and audit logging support troubleshooting, security monitoring, and accountability across Zhantila.

---

### 7.5. Settings

Settings is a cross-cutting concern responsible for managing configurable behavior and preferences throughout the Zhantila platform.

It provides a centralized mechanism for managing platform-wide configuration and individual user preferences, allowing business domains to access settings without implementing their own configuration management logic.

Settings is divided into two categories:

- **Platform Settings:** Configuration that affects the overall behavior or availability of platform features.
- **User Settings:** Preferences that belong to individual users and influence their personal experience.

#### Platform Settings

Platform Settings define configurable behavior that applies across Zhantila.

These settings are managed at the platform level and may influence the availability of specific features or functionality.

**Initial scope:**

| **Setting** | **Description** |
| --- | --- |
| Reseller Availability | Determines whether the reseller functionality is enabled or disabled across the platform. |

#### User Settings

User Settings represent individual preferences that determine how users experience and interact with Zhantila.

Each user maintains their own preferences, which should not affect other users or global platform configuration.

**Initial scope:**

| **Setting** | **Description** |
| --- | --- |
| Notification Preference | Determines the user's preferences for receiving notifications. |
| Language Preference | Determines the preferred language for the user's experience within Zhantila. |