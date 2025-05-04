import { z } from "zod";
import { fn } from "../../lib/fn.js";
import { db } from "../../lib/db.js";
import { HttpStatusError } from "../../lib/error.js";
import { v4 as uuid } from "uuid";
import type { Team as TeamType } from "./model.js";

export namespace Team {
  export const upsertLinearOauthState = fn(
    z.object({
      teamId: z.string(),
      state: z.string(),
    }),
    async ({ teamId, state }) => {
      const team = await db
        .selectFrom("team")
        .select("id")
        .where("id", "=", teamId)
        .executeTakeFirst();
      if (!team) {
        throw new HttpStatusError("Team not found", 422);
      }
      const updatedTeam = await db
        .updateTable("team")
        .set({
          linearOauthState: state,
        })
        .where("id", "=", teamId)
        .returning(["id", "linearAccessToken"])
        .executeTakeFirst();

      if (!updatedTeam) {
        throw new HttpStatusError("Could not update oauth state");
      }

      return updatedTeam;
    },
  );

  export const update = fn(
    z.object({
      teamId: z.string(),
      update: z.object({
        name: z.string().optional(),
        linearAccessToken: z.string().or(z.null()).optional(),
        linearOauthState: z.string().or(z.null()).optional(),
        linearTeamId: z.string().or(z.null()).optional(),
      }),
    }),
    async ({ teamId, update }) => {
      const team = await db
        .selectFrom("team")
        .select("id")
        .where("id", "=", teamId)
        .executeTakeFirst();
      if (!team) {
        throw new HttpStatusError("Team not found", 422);
      }
      const updatedTeam = await db
        .updateTable("team")
        .set(update)
        .where("id", "=", teamId)
        .returningAll()
        .executeTakeFirst();
      if (!updatedTeam) {
        throw new HttpStatusError("Could not update access token");
      }

      return updatedTeam;
    },
  );

  export const upsertLinearAccessToken = fn(
    z.object({
      teamId: z.string(),
      accessToken: z.string(),
    }),
    async ({ teamId, accessToken }) => {
      const team = await db
        .selectFrom("team")
        .select("id")
        .where("id", "=", teamId)
        .executeTakeFirst();
      if (!team) {
        throw new HttpStatusError("Team not found", 422);
      }

      const updatedTeam = await db
        .updateTable("team")
        .set({
          linearAccessToken: accessToken,
        })
        .where("id", "=", teamId)
        .returning(["id", "linearAccessToken"])
        .executeTakeFirst();

      if (!updatedTeam) {
        throw new HttpStatusError("Could not update access token");
      }

      return updatedTeam;
    },
  );

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
          linearAccessToken: null,
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
