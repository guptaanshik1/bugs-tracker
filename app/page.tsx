import LatestIssues from "./LatestIssues";
import IssueSummaryCard from "./IssueSummaryCard";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummaryCard
          open={openIssuesCount}
          closed={closedIssuesCount}
          inProgress={inProgressIssuesCount}
        />
        <IssueChart
          open={openIssuesCount}
          closed={closedIssuesCount}
          inProgress={inProgressIssuesCount}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Bug Tracker - Dashboard",
  description: "View a summary of project issues.",
};
