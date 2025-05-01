import type { Kysely } from "kysely";

import { v4 as uuid } from 'uuid'

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("issues")
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("status", "text", (col) => col.notNull())
    .addColumn("priority", "text", (col) => col.notNull())
    .addColumn("assignee_id", "text", (col) =>
      col.references("user.id").onDelete("set null"),
    )
    .execute();

  await db.schema
    .createTable('labels')
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull().unique())
    .execute();

  await db
    .insertInto('labels')
    .values([
      { id: uuid(), name: "bug" },
      { id: uuid(), name: "feature" },
      { id: uuid(), name: "improvement" },
    ])
    .execute();

  await db.schema
    .createTable('issue_labels')
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("issue_id", "text", (col) =>
      col.references("issues.id").onDelete("cascade")
    )
    .addColumn("label_id", "text", (col) =>
      col.references("labels.id").onDelete("cascade")
    )
    .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("issue_labels").execute();
  await db.schema.dropTable("labels").execute();
  await db.schema.dropTable("issues").execute();
}
