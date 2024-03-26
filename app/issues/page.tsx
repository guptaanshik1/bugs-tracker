"use client";
import React from "react";
import { Button, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { ICreateIssueForm } from "@/utils/client/data/CreateIssue";
import { createIssueFieldsConstants } from "@/utils/client/constants/formFieldsConstants";
import axios from "axios";
import { useRouter } from "next/navigation";

const IssuesPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<ICreateIssueForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post("/api/issues", data);
          router.push("/issues");
        } catch (err) {
          console.error("Error while posting an issue:", err);
        }
      })}
    >
      <TextField.Root
        placeholder="Enter Title...."
        {...register(createIssueFieldsConstants.TITLE as "title")}
      />
      <Controller
        name={createIssueFieldsConstants.DESCRIPTION as "description"}
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Enter Description...." {...field} />
        )}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default IssuesPage;
