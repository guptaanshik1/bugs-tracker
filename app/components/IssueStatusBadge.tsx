import { issueStatusMapper } from "@/utils/client/issueStatusMapper";
import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface IProps {
  status: Status;
}

const IssueStatusBadge = ({ status }: IProps) => {
  return (
    <Badge className="rounded-2" color={issueStatusMapper[status]?.color}>
      {issueStatusMapper[status]?.label}
    </Badge>
  );
};

export default IssueStatusBadge;
