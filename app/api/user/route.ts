import prisma from "@/prisma/client";
import { getPostResponse } from "@/utils/server/getResponseObject";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  return getPostResponse(users, 200);
};
