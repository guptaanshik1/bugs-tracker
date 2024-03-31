"use client";

import { filterStatusMapper } from "@/utils/client/filterStatusMapper";
import { Select } from "@radix-ui/themes";
import React from "react";

const IssueStatusFilter = () => {
  return (
    <Select.Root>
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
