import { z } from "zod";
import { fn } from "../../lib/fn.js";
import {
  IssuePriorityValues,
  IssueSchema,
  IssueStatusValues,
} from "./model.js";
import { db } from "../../lib/db.js";
import { HttpStatusError } from "../../lib/error.js";
import { v4 as uuid } from "uuid";
import { Team } from "../team/index.js";

export namespace Issue {
  export const byTeam = async (teamId: string) => {
    const team = await db
      .selectFrom("team")
      .select("id")
      .where("id", "=", teamId)
      .executeTakeFirst();
    if (!team) {
      throw new HttpStatusError("Team not found", 422);
    }

    const teamIssues = await db
      .selectFrom("issue")
      .selectAll()
      .where("teamId", "=", teamId)
      .execute();

    return teamIssues;
  };

  export const update = fn(
    z.object({
      update: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        status: z.enum(IssueStatusValues).optional(),
        priority: z.enum(IssuePriorityValues).optional(),
        assigneeId: z.string().nullable().optional(),
      }),
      issueId: z.string(),
    }),
    async ({ update, issueId }) => {
      const updatedIssue = await db
        .updateTable("issue")
        .set(update)
        .where("id", "=", issueId)
        .returningAll()
        .executeTakeFirst();
      if (!updatedIssue) {
        throw new HttpStatusError("Could not update issue", 422);
      }

      return updatedIssue;
    },
  );

  export const create = fn(
    z.object({
      title: z.string(),
      description: z.string(),
      status: z.enum(IssueStatusValues),
      priority: z.enum(IssuePriorityValues),
      teamId: z.string(),
      assigneeId: z.string().optional(),
    }),
    async ({ title, description, status, priority, teamId, assigneeId }) => {
      if (assigneeId) {
        const assignee = await db
          .selectFrom("user")
          .select("id")
          .where("id", "=", assigneeId)
          .executeTakeFirst();
        if (!assignee) {
          throw new HttpStatusError("Assignee not found", 422);
        }
      }

      const team = await Team.getById(teamId);
      if (!team) {
        throw new HttpStatusError("Team not found", 422);
      }

      const createdIssue = await db
        .insertInto("issue")
        .values({
          id: uuid(),
          title,
          description,
          status,
          priority,
          teamId,
          assigneeId,
        })
        .returningAll()
        .executeTakeFirst();
      if (!createdIssue) {
        throw new HttpStatusError("Could not create issue", 500);
      }

      return createdIssue;
    },
  );
}
