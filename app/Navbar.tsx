import { Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import AuthStatus from "./components/AuthStatus";
import NavLinks from "./components/NavLinks";

const Navbar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>

            <NavLinks />
          </Flex>
          <Flex>
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
