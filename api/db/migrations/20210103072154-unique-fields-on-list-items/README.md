# Migration `20210103072154-unique-fields-on-list-items`

This migration has been generated by Greg Murray at 1/3/2021, 2:21:54 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "ListItem.listId_isbn_unique" ON "ListItem"("listId", "isbn")

CREATE UNIQUE INDEX "ListItem.listId_ordinal_unique" ON "ListItem"("listId", "ordinal")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210103072022-unique-fields-on-list-item..20210103072154-unique-fields-on-list-items
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
@@ -36,10 +36,10 @@
   ordinal       Int
   list          List           @relation(fields: [listId], references: [id])
   userListItems UserListItem[]
-  @@unique([id, isbn])
-  @@unique([id, ordinal])
+  @@unique([listId, isbn])
+  @@unique([listId, ordinal])
 }
 model UserListItem {
   id             Int           @id @default(autoincrement())
```
