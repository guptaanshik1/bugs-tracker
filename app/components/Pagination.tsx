"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface IProps {
  pageSize: number;
  itemCount: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: IProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pagesCount = Math.ceil(itemCount / pageSize);

  if (pagesCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Flex align={"center"} gap="2">
      <Button
        color="gray"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Text size="2">
        Page {currentPage} of {pagesCount}
      </Text>
      <Button
        color="gray"
        disabled={currentPage === pagesCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        disabled={currentPage === pagesCount}
        onClick={() => changePage(pagesCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
