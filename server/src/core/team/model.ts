export type Team = {
  id: string;
  name: string;
  ownerId: string;
};

export type TeamUser = {
  id: string;
  userId: string;
  teamId: string;
};
