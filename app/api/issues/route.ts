import { NextRequest } from "next/server";
import { createIssueSchema } from "./schema";
import { getPostResponse } from "@/utils/server/getResponseObject";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session) return getPostResponse({}, 401);

  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success)
    return getPostResponse(validation.error?.format(), 400);

  const issue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return getPostResponse(issue, 201);
};
