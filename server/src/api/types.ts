import { auth } from "../lib/auth.js";

export type Env = {
  Variables: {
    user:
      | (typeof auth.$Infer.Session.user & {
          teamId: string | null;
        })
      | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};
