import { Button } from "@radix-ui/themes";
import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";

interface IProps {
  issueId: number;
}

const DeleteIssue = ({ issueId }: IProps) => {
  return (
    <Button color="red">
      <AiTwotoneDelete />
      Delete Issue
    </Button>
  );
};

export default DeleteIssue;
