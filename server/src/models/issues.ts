export type IssueStatus = 'backlog' |
  'todo' |
  'in_progress' |
  'in_review' |
  'done' |
  'canceled' |
  'duplicate'

export const IssueValues = [
  'backlog',
  'todo',
  'in_progress',
  'in_review',
  'done',
  'canceled',
  'duplicate',
] as const;

export type IssuePriority = 'no_priority' |
  'urgent' |
  'high' |
  'medium' |
  'low'

export const IssuePriorityValues = [
  'no_priority',
  'urgent',
  'high',
  'medium',
  'low',
] as const;

export type Issue = {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  assigneeId: string | null;
}
