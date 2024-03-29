"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AssigneeSelect = () => {
  const getUsers = async () => {
    const { data } = await axios.get<User[]>("/api/user");
    return data;
  };
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 60 * 1000,
  });

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign...." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user?.id} value={user?.id}>
              {user?.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
