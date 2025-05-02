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
    const user = c.get("user");
    if (!user) {
      throw new HttpStatusError("User not found", 400);
    }
    if (user.teamId) {
      throw new HttpStatusError(
        `User already on a team with ID: ${user.teamId}`,
        422,
      );
    }
    const team = await Team.create({
      ...c.req.valid("json"),
      ownerId: user.id,
    });
    c.json(team, 201);
  },
);
