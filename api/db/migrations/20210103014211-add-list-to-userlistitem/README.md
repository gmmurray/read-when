# Migration `20210103014211-add-list-to-userlistitem`

This migration has been generated by Greg Murray at 1/2/2021, 8:42:11 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "UserListItem" ADD COLUMN     "listId" INTEGER NOT NULL

ALTER TABLE "UserListItem" ADD FOREIGN KEY("listId")REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210103011334-name-changes..20210103014211-add-list-to-userlistitem
--- datamodel.dml
+++ datamodel.dml
@@ -1,25 +1,26 @@
 datasource DS {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider      = "prisma-client-js"
   binaryTargets = "native"
 }
 model List {
-  id              Int        @id @default(autoincrement())
-  isPublic        Boolean    @default(false)
+  id              Int            @id @default(autoincrement())
+  isPublic        Boolean        @default(false)
   title           String
   description     String
   category        String
   ownerIdentifier String
-  createdAt       DateTime   @default(now())
-  updatedAt       DateTime   @default(now())
+  createdAt       DateTime       @default(now())
+  updatedAt       DateTime       @default(now())
   userLists       UserList[]
   listItems       ListItem[]
+  UserListItem    UserListItem[]
 }
 model UserList {
   id             Int    @id @default(autoincrement())
@@ -40,10 +41,12 @@
 model UserListItem {
   id             Int           @id @default(autoincrement())
   userIdentifier String
   listItemId     Int
+  listId         Int
   status         ReadingStatus @default(NOT_STARTED)
   listItem       ListItem      @relation(fields: [listItemId], references: [id])
+  list           List          @relation(fields: [listId], references: [id])
 }
 enum ReadingStatus {
   NOT_STARTED
```
