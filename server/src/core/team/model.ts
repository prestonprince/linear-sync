export type Team = {
  id: string;
  name: string;
  ownerId: string;
  linearAccessToken: string | null;
  linearOauthState: string | null;
};

export type TeamUser = {
  id: string;
  userId: string;
  teamId: string;
};
