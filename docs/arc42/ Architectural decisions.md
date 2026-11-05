# 8. Architectural Decisions

## 8.1. ADR 1: Recombee as the Listing Recommendation Engine

### Context

Zhantila requires a recommendation system to rank and recommend listings based on factors such as user interests, location, and transaction history. Developing a custom recommendation engine would require additional development time and effort, potentially delaying other core marketplace features. The team therefore needs to decide whether to implement a simple in-house recommendation system or use an existing recommendation service.

### Decision

Use Recombee as the recommendation engine for listing scoring and ranking. Zhantila will provide the relevant listing and user data to Recombee and use the returned recommendation results within the application.

### Status

Accepted

### Consequences

**Positive consequences**

- Reduces development effort and time by avoiding the implementation and maintenance of a custom recommendation engine which allows the team to focus on core marketplace functionality.
- Provides a better and stable recommendation and ranking capabilities than a custom recommendation engine.

**Negative consequences**

- Introduces an external service dependency for listing recommendations.
- Increases operating costs, depending on usage and the applicable pricing plan.
- Limits direct control over the internal ranking logic; customization depends on the capabilities and configuration exposed by Recombee.

Because the quality of recommendation will depend partly on the relevance, completeness, and freshness of the data supplied, the team must define which user and listing attributes and interaction events are sent to Recombee.

---

## 8.2. ADR 2: Restrict In-App Reseller Commissions to Partner Shops

### Context

Zhantila's reseller program allows users to share listings and earn commissions from qualifying transactions attributed to their referrals. Reliable attribution requires a mechanism to identify the referring reseller and associate the referral with a qualifying transaction.

Partner shops support in-app transactions, allowing Zhantila to integrate referral attribution with the transaction flow. Non-partner shops do not support in-app transactions, so the current approach cannot reliably verify commissionable transactions for those shops.

The team must decide whether to restrict in-app reseller functionality to partner shops or extend the program to non-partner shops using an alternative attribution and transaction-verification mechanism.

### Decision

**Proposed:** Restrict in-app reseller commissions to listings belonging to partner shops that support in-app transactions.

### Status

Proposed — awaiting stakeholder agreement.

### Consequences

**Positive consequences**

- Reseller commissions can be linked to Zhantila's in-app transaction flow, providing a clearer basis for attribution and verification.
- Reduces the need to implement and maintain separate transaction-verification mechanisms for non-partner shops.
- Helps limit fraudulent or unverifiable commission claims.

**Negative consequences**

- Non-partner shops cannot benefit from the in-app reseller program or the additional listing exposure it could generate.
- Resellers have fewer eligible listings to promote, limiting their earning opportunities.
- Restricting reseller participation may reduce the additional traffic, engagement, and marketplace growth the reseller program could generate for Zhantila.

### Alternative to consider

Support reseller referrals for non-partner shops through a separate attribution and verification mechanism, such as shop-reported sales or receipt-based verification. This could expand reseller eligibility but would introduce additional verification work and potential disputes or fraudulent claims.
