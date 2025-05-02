import { Hono } from "hono";
import { readFile } from "fs/promises";

export const codegenRouter = new Hono().get("/", async (c) => {
  const text = await readFile("./typegen/hono-api.d.ts", "utf8");
  return c.text(text);
});
