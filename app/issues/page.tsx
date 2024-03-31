import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssueAction from "./IssueAction";
import Link from "../components/Link";
import { Issue, Status } from "@prisma/client";
import { statuses } from "@/utils/client/filterStatusMapper";
import { issueTableColumns } from "@/utils/client/issueTableColumns";
import NextLink from "next/link";

interface IProps {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
  };
}

const IssuesPage = async ({ searchParams }: IProps) => {
  const appliedOrderBy = issueTableColumns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined,
    },
    orderBy: appliedOrderBy,
  });

  return (
    <div>
      <IssueAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {issueTableColumns.map((column) => (
              <Table.ColumnHeaderCell
                key={column?.value}
                className={column?.className}
              >
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column?.value },
                  }}
                >
                  {column?.label}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues?.map((issue) => {
            return (
              <Table.Row key={issue?.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue?.id}`}>{issue?.title}</Link>
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue?.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue?.createdAt.toDateString()}
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue?.status} />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
