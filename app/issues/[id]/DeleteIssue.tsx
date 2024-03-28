"use client";

import Spinner from "@/app/components/Spinner";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";

interface IProps {
  issueId: number;
}

const DeleteIssue = ({ issueId }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleIssueDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button disabled={isLoading} color="red" onClick={handleIssueDelete}>
          <AiTwotoneDelete />
          Delete Issue
          {isLoading && <Spinner />}
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue changes cannot be reverted
          once done?
        </AlertDialog.Description>
        <Flex gap="3" mt="4">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red">Delete</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssue;
