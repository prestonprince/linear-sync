import { z } from "zod";
import { fn } from "../../lib/fn.js";
import { db } from "../../lib/db.js";
import { HttpStatusError } from "../../lib/error.js";
import { v4 as uuid } from "uuid";

export namespace Team {
  export const addUser = fn(
    z.object({
      teamId: z.string(),
      userId: z.string(),
    }),
    async ({ teamId, userId }) => {
      const [foundTeam, foundUserId, foundTeamUser] = await Promise.all([
        getById(teamId),
        db
          .selectFrom("user")
          .select("id")
          .where("id", "=", userId)
          .executeTakeFirst(),
        db
          .selectFrom("teamUser")
          .select("userId")
          .where("userId", "=", userId)
          .executeTakeFirst(),
      ]);

      if (!foundTeam) {
        throw new HttpStatusError("Team not found", 404);
      }
      if (!foundUserId) {
        throw new HttpStatusError("User not found", 404);
      }
      if (foundTeamUser) {
        throw new HttpStatusError("User already on team", 422);
      }

      await db
        .insertInto("teamUser")
        .values({
          id: uuid(),
          teamId,
          userId,
        })
        .executeTakeFirst();
    },
  );
  export const create = fn(
    z.object({
      name: z.string(),
      ownerId: z.string(),
    }),
    async ({ name, ownerId }) => {
      const createdTeam = await db
        .insertInto("team")
        .values({
          id: uuid(),
          name,
          ownerId,
        })
        .returningAll()
        .executeTakeFirst();
      if (!createdTeam) {
        throw new HttpStatusError("Could not create team", 500);
      }

      await addUser({ teamId: createdTeam.id, userId: ownerId });
      return createdTeam;
    },
  );

  export const getById = async (teamId: string) => {
    const team = await db
      .selectFrom("team")
      .selectAll()
      .where("id", "=", teamId)
      .executeTakeFirst();

    if (!team) {
      return null;
    }

    return team;
  };
}
