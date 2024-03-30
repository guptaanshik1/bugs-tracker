"use client";

import { UNASSIGNED } from "@/utils/client/constants/constants";
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, Toaster } from "react-hot-toast";
import { useUsers } from "../_hooks/useUser";

interface IProps {
  issue: Issue;
}

const AssigneeSelect = ({ issue }: IProps) => {
  const { users, error, isLoading } = useUsers();

  const handleIssueAssign = async (userId: string) => {
    try {
      await axios.put(`/api/issues/${issue?.id}`, {
        assignedToUserId: userId === UNASSIGNED ? null : userId,
      });
      toast.success(
        `Issue has been successfully ${
          userId === UNASSIGNED ? "unassigned" : "assigned"
        }.`
      );
    } catch (error) {
      console.error("Error while assigning issue:", error);
      toast.error("Could not assign this issue.");
    }
  };

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <>
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

      <Toaster />
    </>
  );
};

export default AssigneeSelect;
