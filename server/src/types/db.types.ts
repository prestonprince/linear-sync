import type { Account, Session, User, Verification } from "better-auth";

export type Database = {
  user: User;
  session: Session;
  account: Account;
  verification: Verification;
};
