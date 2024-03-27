import { Status } from "@prisma/client";

export type TIssueStatusMapper = Record<
  Status,
  { label: string; color: "red" | "green" | "orange" }
>;

export const issueStatusMapper: TIssueStatusMapper = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "orange" },
  CLOSED: { label: "Closed", color: "green" },
};
