import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface IProps {
  pageSize: number;
  itemCount: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: IProps) => {
  const pagesCount = Math.ceil(itemCount / pageSize);

  if (pagesCount <= 1) return null;

  return (
    <Flex align={"center"} gap="2">
      <Button color="gray" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>
      <Text size="2">
        Page {currentPage} of {pagesCount}
      </Text>
      <Button color="gray" disabled={currentPage === pagesCount}>
        <ChevronRightIcon />
      </Button>
      <Button color="gray" disabled={currentPage === pagesCount}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
