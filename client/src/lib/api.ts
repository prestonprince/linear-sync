import { hc } from "hono/client";

import type { AppRouter } from "@/hono-api";

export const honoClient = hc<AppRouter>("http://localhost:3001/api", {
  fetch: ((input, init) => {
    return fetch(input, {
      ...init,
      credentials: "include",
    });
  }) satisfies typeof fetch,
});
