import { Status } from "@prisma/client";

export const getStatusSummaryMapper = (
  open: number,
  closed: number,
  inProgress: number
): Array<{ label: string; value: number; status: Status }> => {
  return [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
    { label: "In Progress Issues", value: inProgress, status: "IN_PROGRESS" },
  ];
};

export const getStatusChartMapper = (
  open: number,
  closed: number,
  inProgress: number
): Array<{ label: string; value: number }> => {
  return [
    { label: "Open Issues", value: open },
    { label: "Closed Issues", value: closed },
    { label: "In Progress Issues", value: inProgress },
  ];
};
