import type { Context, Next } from "hono";
import type { BlankInput } from "hono/types";

import type { Env } from "./types.js";
import { HttpStatusError } from "../lib/error.js";

export const authRequired = async (
  c: Context<Env, "/", BlankInput>,
  next: Next,
) => {
  const user = c.get("user");
  if (!user) {
    throw new HttpStatusError("Unauthorized", 401);
  }
  return next();
};
