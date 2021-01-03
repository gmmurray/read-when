# Migration `20210103011334-name-changes`

This migration has been generated by Greg Murray at 1/2/2021, 8:13:34 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "QueueItem" DROP CONSTRAINT "QueueItem_queueId_fkey"

ALTER TABLE "UserQueue" DROP CONSTRAINT "UserQueue_queueId_fkey"

ALTER TABLE "UserQueueItem" DROP CONSTRAINT "UserQueueItem_queueItemId_fkey"

CREATE TABLE "List" (
"id" SERIAL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "ownerIdentifier" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
)

CREATE TABLE "UserList" (
"id" SERIAL,
    "listId" INTEGER NOT NULL,
    "userIdentifier" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "ListItem" (
"id" SERIAL,
    "listId" INTEGER NOT NULL,
    "isbn" TEXT NOT NULL,
    "ordinal" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "UserListItem" (
"id" SERIAL,
    "userIdentifier" TEXT NOT NULL,
    "listItemId" INTEGER NOT NULL,
    "status" "ReadingStatus" NOT NULL DEFAULT E'NOT_STARTED',

    PRIMARY KEY ("id")
)

DROP TABLE "Queue"

DROP TABLE "QueueItem"

DROP TABLE "UserQueue"

DROP TABLE "UserQueueItem"

ALTER TABLE "UserList" ADD FOREIGN KEY("listId")REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "ListItem" ADD FOREIGN KEY("listId")REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "UserListItem" ADD FOREIGN KEY("listItemId")REFERENCES "ListItem"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210103004015-update-userqueue-relation..20210103011334-name-changes
--- datamodel.dml
+++ datamodel.dml
@@ -1,49 +1,49 @@
 datasource DS {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider      = "prisma-client-js"
   binaryTargets = "native"
 }
-model Queue {
-  id          Int         @id @default(autoincrement())
-  isPublic    Boolean     @default(false)
-  title       String
-  description String
-  category    String
-  owner       String
-  createdAt   DateTime    @default(now())
-  updatedAt   DateTime    @default(now())
-  users       UserQueue[]
-  queueItems  QueueItem[]
+model List {
+  id              Int        @id @default(autoincrement())
+  isPublic        Boolean    @default(false)
+  title           String
+  description     String
+  category        String
+  ownerIdentifier String
+  createdAt       DateTime   @default(now())
+  updatedAt       DateTime   @default(now())
+  userLists       UserList[]
+  listItems       ListItem[]
 }
-model UserQueue {
-  id      Int    @id @default(autoincrement())
-  queueId Int
-  user    String
-  queue   Queue  @relation(fields: [queueId], references: [id])
+model UserList {
+  id             Int    @id @default(autoincrement())
+  listId         Int
+  userIdentifier String
+  list           List   @relation(fields: [listId], references: [id])
 }
-model QueueItem {
-  id      Int             @id @default(autoincrement())
-  queueId Int
-  isbn    String
-  ordinal Int
-  queue   Queue           @relation(fields: [queueId], references: [id])
-  users   UserQueueItem[]
+model ListItem {
+  id            Int            @id @default(autoincrement())
+  listId        Int
+  isbn          String
+  ordinal       Int
+  list          List           @relation(fields: [listId], references: [id])
+  userListItems UserListItem[]
 }
-model UserQueueItem {
-  id          Int           @id @default(autoincrement())
-  user        String
-  queueItemId Int
-  status      ReadingStatus @default(NOT_STARTED)
-  queueItem   QueueItem     @relation(fields: [queueItemId], references: [id])
+model UserListItem {
+  id             Int           @id @default(autoincrement())
+  userIdentifier String
+  listItemId     Int
+  status         ReadingStatus @default(NOT_STARTED)
+  listItem       ListItem      @relation(fields: [listItemId], references: [id])
 }
 enum ReadingStatus {
   NOT_STARTED
```