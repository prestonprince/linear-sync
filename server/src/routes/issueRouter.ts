import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import { auth } from "../lib/auth.js";
import { IssuePriorityValues, IssueValues } from "../models/issues.js";

type Env = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  }
}

export const issueRouter = new Hono<Env>()
  .post('/',
    zValidator("json", z.object({
      issue: z.object({
        title: z.string(),
        description: z.string(),
        status: z.enum(IssueValues),
        priority: z.enum(IssuePriorityValues),
        assigneeId: z.string().optional(),
      }),
      labels: z.string().array(), // array of label ids
    })),
    async (c) => {
    })
  .get('/', async (c) => {
  })
  .get('/:id', async (c) => {

  })
  .put('/:id', async (c) => {

  })
  .delete('/:id', async (c) => {

  })
