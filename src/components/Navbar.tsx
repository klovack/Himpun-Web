import { Box, Flex, Image, Link } from '@chakra-ui/core';
import React from 'react'
import { Wrapper } from './Wrapper';
import NextLink from 'next/link';

interface NavbarProps {
  
}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <Box p={4}>
      <Wrapper
        size="large"
        padding="none"
        borderBottom="1px solid black"
      >
        <Flex align="center" justify="space-between">
          <NextLink href="/">
            <Link>
              <Image
                mr={4}
                rounded="full"
                size="40px"
                src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flogok.org%2Fwp-content%2Fuploads%2F2015%2F03%2FHublot-logo-350x302.png&f=1&nofb=1"
                alt="Himpun Logo"
              />
            </Link>
          </NextLink>

          <Box>
            <NextLink href="/login">
              <Link mr={5}>Login</Link>
            </NextLink>
            <NextLink href="/register">
              <Link>Register</Link>
            </NextLink>
          </Box>
        </Flex>
      </Wrapper>
    </Box>
  );
}