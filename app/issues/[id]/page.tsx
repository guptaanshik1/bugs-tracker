import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import IssueDetails from "./IssueDetails";
import EditIssue from "./EditIssue";

interface IProps {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: IProps) => {
  const issue = await prisma.issue.findUnique({
    where: { id: +id },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssue issueId={issue?.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
