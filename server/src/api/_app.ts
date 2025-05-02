import { Hono } from "hono";
import { cors } from "hono/cors";

import { auth } from "../lib/auth.js";
import { codegenRouter } from "./codegenRouter.js";
import { issueRouter } from "./issueRouter.js";
import { HttpStatusError } from "../lib/error.js";
import { db } from "../lib/db.js";
import type { Env } from "./types.js";
import { teamRouter } from "./teamRouter.js";

const app = new Hono<Env>();

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length", "Set-Cookie"],
    maxAge: 600,
    credentials: true,
  }),
);

export const appRouter = app
  .use("*", async (c, next) => {
    await next();
    if (c.error instanceof HttpStatusError) {
      c.json({ error: c.error.message }, c.error.statusCode);
    } else {
      c.json({ error: "Something went wrong" }, 500);
    }
  })
  .use("*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      c.set("user", null);
      c.set("session", null);
      return next();
    }

    const teamUser = await db
      .selectFrom("teamUser")
      .select("teamId")
      .where("userId", "=", session.user.id)
      .executeTakeFirst();

    c.set("user", {
      ...session.user,
      teamId: teamUser ? teamUser.teamId : null,
    });
    c.set("session", session.session);
    return next();
  })
  .on(["POST", "GET"], "/auth/*", (c) => {
    return auth.handler(c.req.raw);
  })
  .route("/issue", issueRouter)
  .route("/team", teamRouter)
  .route("/hono", codegenRouter);

export type AppRouter = typeof appRouter;
