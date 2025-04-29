import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { appRouter } from "./routes/_app.js";
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
  }
);
