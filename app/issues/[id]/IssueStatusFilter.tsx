"use client";

import { filterStatusMapper } from "@/utils/client/filterStatusMapper";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const IssueStatusFilter = () => {
  const router = useRouter();

  const addStatusFilter = (status: Status | "All") => {
    if (status === "All") {
      router.push(`/issues`);
      return "";
    }
    router.push(`/issues/?status=${status}`);
  };

  return (
    <Select.Root onValueChange={(status: Status) => addStatusFilter(status)}>
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
