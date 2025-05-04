import { z } from "zod";

import { fn } from "./fn";
import { honoClient } from "./api";

export const IssueStatusValues = [
  "backlog",
  "todo",
  "in_progress",
  "in_review",
  "done",
  "canceled",
  "duplicate",
] as const;

export const IssuePriorityValues = [
  "no_priority",
  "urgent",
  "high",
  "medium",
  "low",
] as const;

export const createIssueSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(IssueStatusValues),
  priority: z.enum(IssuePriorityValues),
});

export type CreateIssue = z.infer<typeof createIssueSchema>;

export const createIssue = fn(createIssueSchema, async (issue) => {
  await honoClient.issue.$post({ json: issue });
});

export const getIssues = async () => {
  const res = await honoClient.issue.$get();
  return res.json();
};
