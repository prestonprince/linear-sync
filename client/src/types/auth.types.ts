import type {
  User as UserModel,
  Session as SessionModel,
  Account as AccountModel,
  Verification as VerificationModel,
} from "better-auth";

export type User = UserModel & {
  team: {
    id: string;
    name: string;
    ownerId: string;
    isLinearConnected: boolean;
  } | null;
};
export type Session = SessionModel;
export type Account = AccountModel;
export type Verification = VerificationModel;
