# Migration `20210102061754-spelling`

This migration has been generated by Greg Murray at 1/2/2021, 1:17:54 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "UserQueues" DROP CONSTRAINT "UserQueues_queueId_fkey"

CREATE TABLE "UserQueue" (
    "queueId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("queueId","userId")
)

DROP TABLE "UserQueues"

ALTER TABLE "UserQueue" ADD FOREIGN KEY("queueId")REFERENCES "Queue"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210102060220-initial..20210102061754-spelling
--- datamodel.dml
+++ datamodel.dml
@@ -1,30 +1,30 @@
 datasource DS {
   // optionally set multiple providers
   // example: provider = ["sqlite", "postgresql"]
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider      = "prisma-client-js"
   binaryTargets = "native"
 }
 model Queue {
-  id          Int          @id @default(autoincrement())
-  isPublic    Boolean      @default(false)
+  id          Int         @id @default(autoincrement())
+  isPublic    Boolean     @default(false)
   title       String
   description String
   category    String
   ownerId     String
-  createdAt   DateTime     @default(now())
-  modifiedAt  DateTime     @default(now())
-  users       UserQueues[]
+  createdAt   DateTime    @default(now())
+  modifiedAt  DateTime    @default(now())
+  users       UserQueue[]
   queueItems  QueueItem[]
 }
-model UserQueues {
+model UserQueue {
   queueId Int
   userId  String
   queue   Queue  @relation(fields: [queueId], references: [id])
```