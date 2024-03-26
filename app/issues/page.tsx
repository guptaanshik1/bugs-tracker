import React from "react";
import { Button, TextArea, TextField } from "@radix-ui/themes";

const IssuesPage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Enter Title...." />
      <TextArea placeholder="Enter Description...." />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default IssuesPage;
