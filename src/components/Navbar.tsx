import { Box, Flex, Image, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/core';
import React from 'react'
import NextLink from 'next/link';

import {useMeQuery, useLogoutMutation} from '../generated/graphql'
import { Wrapper } from './Wrapper';
import { isServer } from '../util/isServer';

interface NavbarProps {
  
}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{fetching: logoutFetching}, logout] = useLogoutMutation();
  const [ {data, fetching} ] = useMeQuery({
    pause: isServer(),
  });

  // Determine the states of the login
  let body = null;
  // Waiting response from the server
  if (fetching) {
    // Maybe disabling the button
  }else if (!data?.profile) { // User not logged in
    body = (
      <Box>
        <NextLink href="/login">
          <Link mr={5}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </Box>
    );
  } else { // User logged in
    body = (
      <Menu>
        <MenuButton as={Link}>
          {data.profile.firstname}
        </MenuButton>

        <MenuList>
          <MenuItem onClick={
            () => {
              logout();
            }
          }
          isDisabled={logoutFetching}
          >Logout</MenuItem>
        </MenuList>
      </Menu>
    )
  }

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

          {body}
        </Flex>
      </Wrapper>
    </Box>
  );
}