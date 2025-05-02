import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import type { Env } from "./types.js";
import { IssuePriorityValues, IssueStatusValues } from "../core/issue/model.js";
import { Issue } from "../core/issue/index.js";
import { authRequired } from "./middleware.js";
import { HttpStatusError } from "../lib/error.js";

export const issueRouter = new Hono<Env>()
  .use("*", authRequired)
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        title: z.string(),
        description: z.string(),
        status: z.enum(IssueStatusValues),
        priority: z.enum(IssuePriorityValues),
      }),
    ),
    async (c) => {
      const teamId = c.get("user")?.teamId;
      if (!teamId) {
        throw new HttpStatusError("User not on team", 400);
      }
      const issue = await Issue.create({
        ...c.req.valid("json"),
        teamId,
      });
      return c.json(issue, 201);
    },
  )
  .get("/", async (c) => {})
  .get("/:id", async (c) => {})
  .put("/:id", async (c) => {})
  .delete("/:id", async (c) => {});
