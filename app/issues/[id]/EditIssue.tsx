import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface IProps {
  issueId: number;
}

const EditIssue = ({ issueId }: IProps) => {
  return (
    <Button>
      <Link href={`/issues/${issueId}/edit`}>
        <Pencil2Icon /> Edit Issue
      </Link>
    </Button>
  );
};

export default EditIssue;
