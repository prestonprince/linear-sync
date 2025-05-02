import type { Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("team")
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("owner_id", "text", (col) =>
      col.notNull().references("user.id").onDelete("cascade"),
    )
    .execute();

  await db.schema
    .createTable("team_user")
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("user_id", "text", (col) =>
      col.notNull().references("user.id").onDelete("cascade"),
    )
    .addColumn("team_id", "text", (col) =>
      col.notNull().references("team.id").onDelete("cascade"),
    )
    .execute();

  await db.schema
    .createTable("issue")
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("status", "text", (col) => col.notNull())
    .addColumn("priority", "text", (col) => col.notNull())
    .addColumn("team_id", "text", (col) =>
      col.notNull().references("team.id").onDelete("cascade"),
    )
    .addColumn("assignee_id", "text", (col) =>
      col.references("user.id").onDelete("set null"),
    )
    .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("issue").execute();
  await db.schema.dropTable("team_user").execute();
  await db.schema.dropTable("team").execute();
}
