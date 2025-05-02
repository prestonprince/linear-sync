import { Hono } from "hono";
import type { Env } from "./types.js";
import { authRequired } from "./middleware.js";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HttpStatusError } from "../lib/error.js";
import { Team } from "../core/team/index.js";

export const teamRouter = new Hono<Env>().use("*", authRequired).post(
  "/",
  zValidator(
    "json",
    z.object({
      name: z.string(),
    }),
  ),
  async (c) => {
    const userId = c.get("user")?.id;
    if (!userId) {
      throw new HttpStatusError("User not found", 400);
    }
    const team = await Team.create({
      ...c.req.valid("json"),
      ownerId: userId,
    });
    c.json(team, 201);
  },
);
