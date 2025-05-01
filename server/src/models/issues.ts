export type IssueStatus = 'backlog' |
  'todo' |
  'in_progress' |
  'in_review' |
  'done' |
  'canceled' |
  'duplicate'

export type IssuePriority = 'no_priority' |
  'urgent' |
  'high' |
  'medium' |
  'low'

export type Issue = {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  assigneeId: string | null;
}
