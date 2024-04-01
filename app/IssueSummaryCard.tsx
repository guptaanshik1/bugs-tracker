import { IIssueCount } from "@/utils/client/data/IssueCount";
import { getStatusSummaryMapper } from "@/utils/client/statusSummaryMapper";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueSummaryCard = ({ open, closed, inProgress }: IIssueCount) => {
  return (
    <Flex gap="6">
      {getStatusSummaryMapper(open, closed, inProgress)?.map((container) => {
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
