import { honoClient } from "./api";

export async function createTeam(name: string) {
  await honoClient.team.$post({
    json: { name },
  });
}
