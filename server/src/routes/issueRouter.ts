import { Hono } from "hono";

import { auth } from "../lib/auth.js";

type Env = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  }
}

export const issueRouter = new Hono<Env>()
  .post('/', async (c) => {
  })
  .get('/', async (c) => {
  })
  .get('/:id', async (c) => {

  })
  .put('/:id', async (c) => {

  })
  .delete('/:id', async (c) => {

  })
