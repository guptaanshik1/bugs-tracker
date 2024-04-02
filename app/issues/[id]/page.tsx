import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import IssueDetails from "./IssueDetails";
import EditIssue from "./EditIssue";
import DeleteIssue from "./DeleteIssue";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

interface IProps {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: IProps) => {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: { id: +id },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box className="col-span-1">
          <Flex direction={"column"} gap="5">
            <AssigneeSelect issue={issue} />
            <EditIssue issueId={issue?.id} />
            <DeleteIssue issueId={issue?.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params: { id } }: IProps) {
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  return {
    title: issue?.title,
    description: `Details of the issue ${issue?.id}`,
  };
}

export default IssueDetailPage;
