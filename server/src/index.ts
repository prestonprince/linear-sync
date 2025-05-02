import { serve } from "@hono/node-server";
import { Hono } from "hono";

import { appRouter } from "./api/_app.js";
import { logger } from "hono/logger";

const app = new Hono().basePath("/api");
app.use(logger());
app.route("/", appRouter);

serve(
  {
    fetch: app.fetch,
    port: 3001,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
