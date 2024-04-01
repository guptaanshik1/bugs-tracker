import prisma from "@/prisma/client";
import { getStatusSummaryMapper } from "@/utils/client/statusSummaryMapper";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueSummaryCard = async () => {
  const openIssuesCount = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const inProgressIssuesCount = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedIssuesCount = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  return (
    <Flex gap="6">
      {getStatusSummaryMapper(
        openIssuesCount,
        closedIssuesCount,
        inProgressIssuesCount
      )?.map((container) => {
        return (
          <Card key={container?.status}>
            <Flex direction="column" gap="1">
              <Link
                className="text-sm font-medium hover:underline"
                href={`/issues?status=${container?.status}`}
              >
                {container?.label}
              </Link>
              <Text className="font-bold">{container?.value}</Text>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};

export default IssueSummaryCard;
