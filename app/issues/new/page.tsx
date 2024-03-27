"use client";

import React, { useState } from "react";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { createIssueFieldsConstants } from "@/utils/client/constants/formFieldsConstants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/api/issues/schema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type TIssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TIssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsLoading(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (err) {
            console.error("Error while posting an issue:", err);
            setIsLoading(false);
            setError("An unexpected error occurred.");
          }
        })}
      >
        <TextField.Root
          placeholder="Enter Title...."
          {...register(createIssueFieldsConstants.TITLE as "title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name={createIssueFieldsConstants.DESCRIPTION as "description"}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Enter Description...." {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={!isValid || isLoading}>
          Submit New Issue {isLoading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
