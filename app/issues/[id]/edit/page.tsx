import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeletons from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeletons />,
});

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
