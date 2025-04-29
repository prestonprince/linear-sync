import { PostgresDialect, Kysely } from "kysely";
import { Pool, type PoolConfig } from "pg";

import type { Database } from "../types/db.types.js";

const poolConfig: PoolConfig = {
  database: "linear-sync",
  user: "user",
  host: "localhost",
  password: "pass",
};

const dialect = new PostgresDialect({
  pool: new Pool(poolConfig),
});

export const db = new Kysely<Database>({ dialect });
