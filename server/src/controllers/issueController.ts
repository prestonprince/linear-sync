import { v4 as uuid } from "uuid";

import { db } from "../lib/db.js";
import type { Issue } from "../models/issues.js";
import type { Label } from "../models/labels.js";
import type { Kysely } from "kysely";
import type { Database } from "../types/db.types.js";

const IssueControllerErrors = {
  CreateIssueError: "Could not create issue",
  InvalidLabel: "Could not create Issue with invalid label",
} as const;

export async function createIssue(
  db: Kysely<Database>,
  issue: Omit<Issue, 'id'>,
  labels: Array<string> = [],
): Promise<[
  Issue & { labels: Array<Label> } | null,
  string | null
]> {
  try {
    const createdIssueWithLabels = await db
      .transaction()
      .execute(async (trx) => {
        const createdIssue = await trx
          .insertInto('issues')
          .values({
            id: uuid(),
            ...issue,
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        if (!labels.length) {
          return Object.assign(createdIssue, { labels: [] });
        }

        const foundLabels = await trx
          .selectFrom('labels')
          .selectAll()
          .where('id', 'in', labels)
          .execute();

        if (!foundLabels.length) {
          throw new Error(IssueControllerErrors.InvalidLabel);
        }

        await trx
          .insertInto('issueLabels')
          .values(labels.map(labelId => ({
            id: uuid(),
            issueId: createdIssue.id,
            labelId,
          })))
          .executeTakeFirstOrThrow();

        return {
          ...createdIssue,
          labels: foundLabels,
        }
      })

    return [createdIssueWithLabels, null];
  } catch (e: any) {
    return [null, e.message];
  }
}
