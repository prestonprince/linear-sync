import type { Account, Session, User, Verification } from "better-auth";

import type { Issue } from "../core/issue/model.js";
import type { Team, TeamUser } from "../core/team/model.js";

export type Database = {
  user: User;
  session: Session;
  account: Account;
  verification: Verification;
  issue: Issue;
  team: Team;
  teamUser: TeamUser;
};
