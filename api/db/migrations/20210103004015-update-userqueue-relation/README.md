# Migration `20210103004015-update-userqueue-relation`

This migration has been generated by Greg Murray at 1/2/2021, 7:40:15 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "UserQueue" DROP COLUMN "userId",
ADD COLUMN     "user" TEXT NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210103003257-remove-id-names-for-non-foreign-key..20210103004015-update-userqueue-relation
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource DS {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider      = "prisma-client-js"
@@ -23,9 +23,9 @@
 model UserQueue {
   id      Int    @id @default(autoincrement())
   queueId Int
-  userId  String
+  user    String
   queue   Queue  @relation(fields: [queueId], references: [id])
 }
 model QueueItem {
```
