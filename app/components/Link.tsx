import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link";

interface IProps {
  href: string;
  children: string;
}

const Link = ({ href, children }: IProps) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
