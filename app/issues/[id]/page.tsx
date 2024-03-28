import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import IssueDetails from "./IssueDetails";
import EditIssue from "./EditIssue";
import DeleteIssue from "./DeleteIssue";

interface IProps {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: IProps) => {
  const issue = await prisma.issue.findUnique({
    where: { id: +id },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box className="col-span-1">
        <Flex direction={"column"} gap="5">
          <EditIssue issueId={issue?.id} />
          <DeleteIssue issueId={issue?.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
