import prisma from "@/prisma/client";
import React from "react";
import IssueAction from "./IssueAction";
import { statuses } from "@/utils/client/filterStatusMapper";
import { issueTableColumns } from "@/utils/client/issueTableColumns";

import Pagination from "../components/Pagination";
import IssuesTable from "./IssuesTable";
import { IIssueQuery } from "@/utils/client/data/IssueQuery";
import { Metadata } from "next";

interface IProps {
  searchParams: IIssueQuery;
}

const pageSize = 10;

const IssuesPage = async ({ searchParams }: IProps) => {
  const page = +searchParams.page || 1;
  const appliedOrderBy = issueTableColumns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.orderType }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined,
    },
    orderBy: appliedOrderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: { status: searchParams.status },
  });

  return (
    <div>
      <IssueAction />
      <IssuesTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues.",
};

export default IssuesPage;
