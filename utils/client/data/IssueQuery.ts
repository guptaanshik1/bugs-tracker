import { Issue, Status } from "@prisma/client";

export interface IIssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}
