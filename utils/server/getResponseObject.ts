import { NextResponse } from "next/server";

export const getPostResponse = (responseBody: any, status: number) => {
  return NextResponse.json(responseBody, { status });
};
