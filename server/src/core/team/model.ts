import { z } from "zod";

export type Team = {
  id: string;
  name: string;
  ownerId: string;
  linearAccessToken: string | null;
  linearOauthState: string | null;
  linearTeamId: string | null;
};

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  ownerId: z.string(),
  linearAccessToken: z.string().nullable().optional(),
  linearOauthState: z.string().nullable().optional(),
  linearTeamId: z.string().nullable().optional(),
});

export type TeamUser = {
  id: string;
  userId: string;
  teamId: string;
};
