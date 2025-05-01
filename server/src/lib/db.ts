import { PostgresDialect, Kysely, CamelCasePlugin } from "kysely";
import { Pool, type PoolConfig } from "pg";

import type { Database } from "../types/db.types.js";

const poolConfig: PoolConfig = {
  database: "linear-sync",
  user: "user",
  host: "localhost",
  password: "pass",
};

export const dialect = new PostgresDialect({
  pool: new Pool(poolConfig),
});

export const db = new Kysely<Database>({
  dialect,
  plugins: [new CamelCasePlugin()],
});
