"use client";

import { UNASSIGNED } from "@/utils/client/constants/constants";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface IProps {
  issue: Issue;
}

const AssigneeSelect = ({ issue }: IProps) => {
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

  const handleIssueAssign = async (userId: string) => {
    try {
      await axios.put(`/api/issues/${issue?.id}`, {
        assignedToUserId: userId === UNASSIGNED ? null : userId,
      });
    } catch (error) {}
  };

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <Select.Root
      defaultValue={issue?.assignedToUserId || UNASSIGNED}
      onValueChange={(userId) => handleIssueAssign(userId)}
    >
      <Select.Trigger placeholder="Assign...." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value={UNASSIGNED}>Unassigned</Select.Item>
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
