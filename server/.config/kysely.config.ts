import {
  DummyDriver,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from "kysely";
import { defineConfig, getKnexTimestampPrefix } from "kysely-ctl";

import { db } from "../src/lib/db";

export default defineConfig({
  kysely: db,
  migrations: {
    migrationFolder: "migrations",
    getMigrationPrefix: getKnexTimestampPrefix,
  },
  //   plugins: [],
  //   seeds: {
  //     seedFolder: "seeds",
  //   }
});
