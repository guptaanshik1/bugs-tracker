"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";

interface IProps {
  issueId: number;
}

const DeleteIssue = ({ issueId }: IProps) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          <AiTwotoneDelete />
          Delete Issue
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
