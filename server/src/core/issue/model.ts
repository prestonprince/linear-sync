import { z } from "zod";

export type IssueStatus =
  | "backlog"
  | "todo"
  | "in_progress"
  | "in_review"
  | "done"
  | "canceled"
  | "duplicate";

export const IssueStatusValues = [
  "backlog",
  "todo",
  "in_progress",
  "in_review",
  "done",
  "canceled",
  "duplicate",
] as const;

export type IssuePriority =
  | "no_priority"
  | "urgent"
  | "high"
  | "medium"
  | "low";

export const IssuePriorityValues = [
  "no_priority",
  "urgent",
  "high",
  "medium",
  "low",
] as const;

export type Issue = {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  teamId: string;
  assigneeId: string | null;
};

export const IssueSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(IssueStatusValues),
  priority: z.enum(IssuePriorityValues),
  teamId: z.string(),
  assigneeId: z.string().nullable().optional(),
});
