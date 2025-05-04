import { Hono } from "hono";
import { cors } from "hono/cors";

import { auth } from "../lib/auth.js";
import { codegenRouter } from "./codegenRouter.js";
import { issueRouter } from "./issueRouter.js";
import { HttpStatusError } from "../lib/error.js";
import { db } from "../lib/db.js";
import type { Env } from "./types.js";
import { teamRouter } from "./teamRouter.js";
import { Team } from "../core/team/index.js";
import { LinearClient } from "@linear/sdk";
import { authRequired } from "./middleware.js";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { v4 } from "uuid";
import { Linear } from "../lib/linear.js";
import { webhookRouter } from "./webhooks.js";

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
      return c.json({ error: c.error.message }, c.error.statusCode);
    } else {
      return c.json({ error: "Something went wrong" }, 500);
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
  .on(["POST", "GET"], "/auth/*", async (c) => {
    const res = await auth.handler(c.req.raw);

    if (c.req.path === "/api/auth/get-session" && res.ok) {
      try {
        const authBody = await res.clone().json();
        if (!authBody) {
          return res;
        }
        const modifiedBody = {
          ...authBody,
          user: {
            ...authBody.user,
            team: null,
          },
        };

        const teamId = c.get("user")?.teamId;
        if (teamId) {
          const fetchedTeamData = await Team.getById(teamId);
          modifiedBody.user.team = {
            ...fetchedTeamData,
            isLinearConnected: !!fetchedTeamData?.linearAccessToken,
            linearAccessToken: undefined,
            linearOauthState: undefined,
          };
        }

        const newHeaders = new Headers(res.headers);
        newHeaders.set("Content-Type", "application/json");

        return new Response(JSON.stringify(modifiedBody), {
          status: res.status,
          statusText: res.statusText,
          headers: newHeaders,
        });
      } catch (error) {
        console.error("Error modifying auth response:", error);
        return res;
      }
    } else {
      return res;
    }
  })
  .get("/oauth/linear", authRequired, async (c) => {
    const teamId = c.get("user")?.teamId;
    if (!teamId) {
      throw new HttpStatusError("User not on team", 422);
    }

    const state = v4();
    const clientID = "466b2b2bc0e383db4a702b2935abf7b2";
    const linearUrl = new URL("https://linear.app/oauth/authorize");

    await Team.upsertLinearOauthState({ teamId, state });

    linearUrl.searchParams.set("client_id", clientID);
    linearUrl.searchParams.set(
      "redirect_uri",
      new URL("http://localhost:3000/callback").toString(),
    );
    linearUrl.searchParams.set("response_type", "code");
    linearUrl.searchParams.set(
      "scope",
      ["read", "write", "issues:create", "comments:create", "admin"].join(","),
    );
    linearUrl.searchParams.set("state", state);
    linearUrl.searchParams.set("prompt", "consent");
    linearUrl.searchParams.set("actor", "application");

    return c.json({ url: linearUrl.toString() });
  })
  .post(
    "/oauth/linear/callback",
    authRequired,
    zValidator(
      "json",
      z.object({
        code: z.string(),
        state: z.string(),
      }),
    ),
    async (c) => {
      const teamId = c.get("user")?.teamId;
      if (!teamId) {
        throw new HttpStatusError("User not on team", 422);
      }

      const team = await Team.getById(teamId);
      if (!team) {
        throw new HttpStatusError("Team not found", 422);
      }

      const { state, code } = c.req.valid("json");
      if (team.linearOauthState !== state) {
        throw new HttpStatusError("Oauth state does not match", 422);
      }

      const clientID = process.env.LINEAR_CLIENT_ID;
      const clientSecret = process.env.LINEAR_CLIENT_SECRET;

      try {
        const response = await fetch("https://api.linear.app/oauth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            code,
            redirect_uri: "http://localhost:3000/callback",
            client_id: clientID as string,
            client_secret: clientSecret as string,
            grant_type: "authorization_code",
          }),
        });

        if (!response.ok) {
          const resData = await response.json();
          console.error({ resData });
          throw new HttpStatusError("Something went wrong", 500);
        }

        const { access_token } = await response.json();
        const linearTeam = await Linear.getTeam(access_token);
        const webhookSuccess = await Linear.createWebhook({
          accessToken: access_token,
          linearTeamId: linearTeam.id,
        });

        if (webhookSuccess) {
          console.log("SUCCESFULLY CREATED WEBHOOK");
        } else {
          console.log("FAILED TO CREATE WEBHOOK");
        }

        await Team.update({
          teamId,
          update: {
            linearAccessToken: access_token,
            linearTeamId: linearTeam.id,
          },
        });
        return c.json({ message: "Success!" });
      } catch (e: any) {
        throw new HttpStatusError(e.message, 500);
      }
    },
  )
  .route("/issue", issueRouter)
  .route("/team", teamRouter)
  .route("/webhook", webhookRouter)
  .route("/hono", codegenRouter);

export type AppRouter = typeof appRouter;
