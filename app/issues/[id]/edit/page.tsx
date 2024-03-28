import React from "react";
import IssueForm from "../../_components/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface IProps {
  params: { id: string };
}

const EditIssuePage = async ({ params: { id } }: IProps) => {
  const issue = await prisma.issue.findUnique({
    where: { id: +id },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
