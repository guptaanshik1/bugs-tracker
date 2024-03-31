import { Status } from "@prisma/client";

export const filterStatusMapper: Array<{
  label: string;
  value: Status | "All";
}> = [
  { label: "All", value: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In Progress", value: "IN_PROGRESS" },
];
