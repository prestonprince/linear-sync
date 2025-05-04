import { z } from "zod";
import { fn } from "./fn";
import { honoClient } from "./api";

export async function connectLinear() {
  const res = await honoClient.oauth.linear.$get();
  const { url } = await res.json();
  window.open(url);
}

export const handleRedirect = fn(
  z.object({
    code: z.string(),
    state: z.string(),
  }),
  async ({ code, state }) => {
    const res = await honoClient.oauth.linear.callback.$post({
      json: { code, state },
    });
    return res.ok;
  },
);
