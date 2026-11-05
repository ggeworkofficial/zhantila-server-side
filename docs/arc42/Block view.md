# 5.1. Building block - level 1

```text
+------------------------------------------------------------------------+
|                         External Clients                              |
|                                                                        |
|   +------------------+                    +------------------+         |
|   | Web Application  |                    | Mobile Application|        |
|   +--------+---------+                    +--------+---------+         |
|            |                                       |                   |
|            +-------------------+-------------------+                   |
|                                v                                       |
|                    +-----------------------+                           |
|                    |    HTTPS REST API     |                           |
|                    +-----------+-----------+                           |
|                                |                                       |
|                +---------------+---------------+                       |
|                |                               |                       |
|                v                               v                       |
|       +------------------+           +--------------------------+     |
|       | Authentication   |           |     Business Domains     |     |
|       | Middleware       |           |                          |     |
|       +------------------+           | +--------+  +----------+ |     |
|                |                      | | Users  |->|  Shops   | |     |
|                | Protected requests   | +--------+  +----------+ |     |
|                +--------------------->|                          |     |
|                                       | +----------+ +---------+ |     |
|                                       | | Listings | | Orders  | |     |
|                                       | +----+-----+ +----+----+ |     |
|                                       |      |            |      |     |
|                                       |      v            v      |     |
|                                       | +--------------+  +-----+ |     |
|                                       | |Recommendation|  |Receipts|    |
|                                       | +--------------+  +-----+ |     |
|                                       |                    |       |     |
|                                       |               +----v----+  |     |
|                                       |               |Logistics|  |     |
|                                       |               +---------+ |     |
|                                       |                          |       |
|                                       | +---------+ +----------+ |     |
|                                       | | Reports | |Feedbacks | |     |
|                                       | +----+----+ +----------+ |     |
|                                       |      |                   |     |
|                                       |      v                   |     |
|                                       | +-------------+          |     |
|                                       | |Notifications|          |     |
|                                       | +-------------+          |     |
|                                       |                          |     |
|                                       | +------------+           |     |
|                                       | | Help Center|           |     |
|                                       | +------------+           |     |
|                                       |                          |     |
|                                       | +-----------+            |     |
|                                       | | Resellers |            |     |
|                                       | +-----------+            |     |
|                                       +--------------------------+     |
|                                                                        |
|   +---------------------------+  +-----------------------------+       |
|   |    Shared Infrastructure |  |    Cross-Cutting Concerns   |       |
|   |                           |  |                             |       |
|   | +----------------------+  |  | +-------------------------+ |       |
|   | | Redis Client         |  |  | | Authentication Middleware| |      |
|   | +----------------------+  |  | +-------------------------+ |       |
|   |                           |  |                             |       |
|   | +----------------------+  |  | +-------------------------+ |       |
|   | | Sequelize Database   |  |  | | Authorization           | |       |
|   | | Infrastructure       |  |  | +-------------------------+ |       |
|   | +----------------------+  |  |                             |       |
|   |                           |  | +-------------------------+ |       |
|   | +----------------------+  |  | | Logging                 | |       |
|   | | Recombee             |  |  | +-------------------------+ |       |
|   | | Infrastructure       |  |  |                             |       |
|   | +----------------------+  |  | +-------------------------+ |       |
|   |                           |  | | Error Handling           | |       |
|   | +----------------------+  |  | +-------------------------+ |       |
|   | | OpenAPI              |  |  |                             |       |
|   | +----------------------+  |  | +-------------------------+ |       |
|   |                           |  | | Settings                 | |       |
|   +---------------------------+  | +-------------------------+ |       |
|                                  +-----------------------------+       |
+------------------------------------------------------------------------+

                         External Systems
                         ----------------

 +---------+    +------------+    +----------+
 |  Redis  |    | PostgreSQL |    | Keycloak |
 +----+----+    +------+-----+    +----+-----+
      ^                ^               ^
      |                |               |
      v                v               v
 Redis Client      Sequelize       Users Domain
                  Infrastructure

 +-----------------+    +----------+    +--------+
 | Cloudflare      |    | Recombee |    | Resend |
 | Images          |    +-----+----+    +---+----+
 +--------+--------+          ^             ^
          ^                   |             |
          |                   v             v
          |             Recombee        Notifications
          |             Infrastructure     Domain
          |
          +---- Listings / Receipts


 Domain Dependencies
 ------------------

 Users ----------- Shop creation ----------> Shops

 Users <---------- Identity provisioning
                   and account mapping ----> Keycloak

 Orders ---------- Quantity modification --> Listings

 Listings -------- Retrieve scoring -------> Recommendation

 Orders ---------- Status check ----------> Receipts

 Orders ---------- Status check ----------> Logistics

 Listings --------------------------------> Resellers

 Orders ---------- Reseller attribution ---> Resellers

 Listings <-------> Cloudflare Images
                    Upload and manage
                    listing images

 Receipts <-------> Cloudflare Images
                    Upload and manage
                    receipt images

 Users -----------------------------------> Notifications
 Orders ----------------------------------> Notifications
 Logistics -------------------------------> Notifications
 Shops -----------------------------------> Notifications
 Reports ---------------------------------> Notifications

 Recombee Infrastructure <---------------> Recommendation

 Resend <---------------------------------> Notifications


 Cross-Cutting Application
 -------------------------

 Authentication Middleware
          |
          +---- Applies to protected requests ----> Business Domains

 Business Domains
          |
          +---- Logging -------------------------> Logging
          |
          +---- Error handling ------------------> Error Handling
          |
          +---- Access and manage settings ------> Settings
```

# 6.2. Level 2: Listing domain

```text
+------------------------------------------------------------------------+
|                           Listing Domain                              |
|                                                                        |
|  +------------------------------------------------------------------+ |
|  |                            API Layer                              | |
|  |                                                                  | |
|  |  +---------+       +------------------+       +------------+     | |
|  |  | Routes  |------>| Request Schemas  |       | Controllers|     | |
|  |  +----+----+       +------------------+       +------+-----+     | |
|  |       |                                              |            | |
|  |       |                                              v            | |
|  |       |                                    +-------------------+  | |
|  |       |                                    | Response Schemas  |  | |
|  |       |                                    +-------------------+  | |
|  +-------+----------------------------------------------------------+ |
|          |                                                           |
|          | Authentication for protected routes                      |
|          v                                                           |
|  +--------------------------+                                        |
|  | Authentication Middleware|                                        |
|  +--------------------------+                                        |
|                                                                        |
|  +------------------------------------------------------------------+ |
|  |                     Business Logic Layer                         | |
|  |                                                                  | |
|  |                     +------------------+                         | |
|  |                     | Listing Service  |                         | |
|  |                     +--------+---------+                         | |
|  |                              |                                   | |
|  |                              | Database operations               | |
|  |                              v                                   | |
|  +------------------------------+-----------------------------------+ |
|                                 |                                    |
|  +------------------------------v-----------------------------------+ |
|  |                       Data Access Layer                          | |
|  |                                                                  | |
|  |  +-------------------+       +----------------+                  | |
|  |  | Listing Repository|------>| Listing Models|                  | |
|  |  +-------------------+       +-------+--------+                  | |
|  |                                        |                         | |
|  |  +-------------------+                 |                         | |
|  |  | Migrations        |                 |                         | |
|  |  +--------+----------+                 |                         | |
|  +-----------+----------------------------+-------------------------+ |
|              |                            |                           |
+--------------+----------------------------+---------------------------+
               |                            |
               v                            v
       Schema changes               Database access
               |                            |
               v                            v
       +-------------------------------+
       | Sequelize Database            |
       | Infrastructure                |
       +-------------------------------+


                         External Components
                         ------------------

 +-------------------+       Listing operations
 | Orders Domain     |------------------------+
 +-------------------+                        |
                                              v
                                     +------------------+
                                     | Listing Service  |
                                     +--------+---------+
                                              |
                       +----------------------+--------------------+
                       |                                           |
                       v                                           v
          +--------------------------+               +----------------+
          | Recommendation Domain    |               | Resellers Domain|
          +--------------------------+               +----------------+
                       ^
                       |
                       |
              Retrieve recommendation scoring


                         API Layer Relationships
                         ----------------------

 Routes ---------------- Request validation ------------> Request Schemas

 Routes ------------------------------------------------> Controllers

 Routes ---------------- Authentication for protected
                         routes -----------------------> Authentication Middleware

 Controllers ----------- Response type safety --------> Response Schemas


                      Business Logic Relationships
                      ----------------------------

 Controllers ----------------------------------------> Listing Service

 Listing Service -------- Database operations -------> Listing Repository

 Listing Service -------- Inferred request types
                         for compile-time safety ----> Request Schemas


                       Data Access Relationships
                       -------------------------

 Listing Repository ---- ORM operations and
                         type validation ------------> Listing Models

 Listing Models <-------> Sequelize Database Infrastructure
                          Database access

 Migrations ------------ Schema changes -------------> Sequelize Database
                                                       Infrastructure


                      Inter-Domain Communication
                      ---------------------------

 Orders Domain -------- Listing operations ----------> Listing Service

 Listing Service ------ Retrieve recommendation
                        scoring ---------------------> Recommendation Domain

 Listing Service -----------------------------------> Resellers Domain
```
