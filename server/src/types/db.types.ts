import type { Account, Session, User, Verification } from "better-auth";

import type { Issue } from "../models/issues.js";
import type { Label } from "../models/labels.js";
import type { IssueLabel } from "../models/issueLabels.js";

export type Database = {
  user: User;
  session: Session;
  account: Account;
  verification: Verification;
  issues: Issue;
  labels: Label;
  issueLabels: IssueLabel;
};
