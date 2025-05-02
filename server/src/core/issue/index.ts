import { z } from "zod";
import { fn } from "../../lib/fn.js";
import { IssuePriorityValues, IssueStatusValues } from "./model.js";
import { db } from "../../lib/db.js";
import { HttpStatusError } from "../../lib/error.js";
import { v4 } from "uuid";

export namespace Issue {
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

      const createdIssue = await db
        .insertInto("issue")
        .values({
          id: v4(),
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
