"use client";

import { filterStatusMapper } from "@/utils/client/filterStatusMapper";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const addStatusFilter = (status: Status | "All") => {
    if (status === "All") {
      router.push(`/issues`);
      return "";
    }
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);
    const query = params.size ? `?${params.toString()}` : "";
    router.push(`/issues/${query}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status: Status) => addStatusFilter(status)}
    >
      <Select.Trigger placeholder="Filter By Status...." />
      <Select.Content>
        {filterStatusMapper?.map((status) => (
          <Select.Item key={status?.value} value={status?.value}>
            {status?.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
