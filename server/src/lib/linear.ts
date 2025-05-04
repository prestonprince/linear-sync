import { LinearClient } from "@linear/sdk";
import { IssueSchema, type IssuePriority } from "../core/issue/model.js";
import { fn } from "./fn.js";
import { z } from "zod";

export namespace Linear {
  const linearPriorityMap: Record<IssuePriority, 0 | 1 | 2 | 3 | 4> = {
    no_priority: 0,
    urgent: 1,
    high: 2,
    medium: 3,
    low: 4,
  };

  const toLinearIssue = fn(
    z.object({
      linearTeamId: z.string(),
      issue: IssueSchema,
    }),
    ({ linearTeamId, issue }) => {
      const linearPriority = linearPriorityMap[issue.priority];
      const { teamId: _, assigneeId: __, status: ___, ...rest } = issue;
      return {
        ...rest,
        priority: linearPriority,
        teamId: linearTeamId,
      };
    },
  );

  export const getTeam = async (accessToken: string) => {
    const client = new LinearClient({ accessToken });
    const teams = await client.teams();
    return teams.nodes[0];
  };

  export const createIssue = fn(
    z.object({
      linearAccessToken: z.string(),
      linearTeamId: z.string(),
      issue: IssueSchema,
    }),
    async ({ linearAccessToken, linearTeamId, issue }) => {
      const client = new LinearClient({ accessToken: linearAccessToken });
      const linearIssue = toLinearIssue({
        linearTeamId,
        issue,
      });
      const createdLinearIssue = await client.createIssue(linearIssue);
      return createdLinearIssue.success;
    },
  );
}
