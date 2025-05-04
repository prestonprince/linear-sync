import { z } from "zod";
import { fn } from "../../lib/fn.js";
import { IssueSchema } from "../issue/model.js";
import { Team } from "../team/index.js";
import { Linear } from "../../lib/linear.js";

export namespace Integration {
  export const createIssue = fn(
    z.object({
      teamId: z.string(),
      issue: IssueSchema,
      type: z.literal("Linear"),
    }),
    async ({ teamId, issue, type }) => {
      const team = await Team.getById(teamId);
      if (!team) {
        throw new Error("Team not found");
      }

      switch (type) {
        case "Linear": {
          if (!team.linearAccessToken || !team.linearTeamId) {
            throw new Error("Team not connected to linear");
          }
          const success = await Linear.createIssue({
            issue,
            linearAccessToken: team.linearAccessToken,
            linearTeamId: team.linearTeamId,
          });
          if (success) {
            console.log(
              "Successfully created Linear issue for issue ID: ",
              issue.id,
            );
          } else {
            console.log(
              "Failed to create Linear issue for issue ID: ",
              issue.id,
            );
          }
        }
        default:
          return;
      }
    },
  );
}
