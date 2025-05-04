import { Hono } from "hono";
import { Issue } from "../core/issue/index.js";
import { Linear } from "../lib/linear.js";

export const webhookRouter = new Hono().post("/linear-consumer", async (c) => {
  // TODO: verify signature
  try {
    const payload = await c.req.text();
    const { action, data } = JSON.parse(payload);

    if (action === "update") {
      const {
        id,
        title,
        priority,
        description,
      }: {
        id: string;
        title: string;
        priority: keyof typeof Linear.appPriorityMap;
        description: string;
      } = data;

      const appPriority = Linear.appPriorityMap[priority];
      const updatedIssue = await Issue.update({
        issueId: id,
        update: {
          title,
          priority: appPriority,
          description,
        },
      });
      if (updatedIssue) {
        console.log("SUCCESSFULLY UPDATED ISSUE FROM WEBHOOK");
      } else {
        console.log("FAILED UPDATED ISSUE FROM WEBHOOK");
      }
    }

    return c.body(null, 200);
  } catch {
    return c.body(null, 200);
  }
});
