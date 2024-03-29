import { NextRequest } from "next/server";
import { createIssueSchema } from "../schema";
import prisma from "@/prisma/client";
import { getPostResponse } from "@/utils/server/getResponseObject";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

interface IParams {
  params: { id: string };
}

export const PUT = async (
  request: NextRequest,
  { params: { id } }: IParams
) => {
  const session = await getServerSession(authOptions);
  if (!session) return getPostResponse({}, 401);

  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success)
    return getPostResponse(validation.error?.format(), 400);

  const issue = await prisma.issue.findUnique({
    where: {
      id: +id,
    },
  });

  if (!issue) return getPostResponse("Issue not found", 404);

  const updatedIssue = await prisma.issue.update({
    where: { id: +id },
    data: { title: body.title, description: body.description },
  });

  return getPostResponse(updatedIssue, 200);
};

export const DELETE = async (
  _request: NextRequest,
  { params: { id } }: IParams
) => {
  const session = await getServerSession(authOptions);
  if (!session) return getPostResponse({}, 401);

  const issue = await prisma.issue.findUnique({
    where: { id: +id },
  });

  if (!issue) return getPostResponse("Issue not found", 404);

  await prisma.issue.delete({
    where: { id: issue?.id },
  });

  return getPostResponse({}, 200);
};
