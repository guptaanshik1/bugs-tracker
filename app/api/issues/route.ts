import { NextRequest } from "next/server";
import { createIssueSchema } from "./schema";
import { getPostResponse } from "@/utils/server/getResponseObject";
import prisma from "@/prisma/client";

export const POST = async (request: NextRequest) => {
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
