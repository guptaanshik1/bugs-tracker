import { Button, Flex, Select } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./[id]/IssueStatusFilter";

const IssueAction = () => {
  return (
    <Flex mb="5" justify="between">
      <IssueStatusFilter />

      <Button>
        <Link href={"/issues/new"}>Add New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueAction;
