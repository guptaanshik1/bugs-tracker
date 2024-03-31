import { Issue } from "@prisma/client";

export const issueTableColumns: Array<{
  label: string;
  value: keyof Issue;
  className?: string;
}> = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];
