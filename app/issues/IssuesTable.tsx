import { issueTableColumns } from "@/utils/client/issueTableColumns";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusBadge from "../components/IssueStatusBadge";
import NextLink from "next/link";
import { IIssueQuery } from "@/utils/client/data/IssueQuery";
import { Issue } from "@prisma/client";

interface IProps {
  searchParams: IIssueQuery;
  issues: Issue[];
}

const IssuesTable = ({ searchParams, issues }: IProps) => {
  return (
    <Table.Root variant="surface" mb="5">
      <Table.Header>
        <Table.Row>
          {issueTableColumns.map((column) => (
            <Table.ColumnHeaderCell
              key={column?.value}
              className={column?.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column?.value,
                    orderType:
                      searchParams.orderType === "asc" ? "desc" : "asc",
                  },
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
  );
};

export default IssuesTable;
