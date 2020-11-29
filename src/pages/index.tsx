import {} from 'next/app';
import React from 'react';
import { withUrqlClient } from 'next-urql';

import { createUrqlClient } from '../util/urqlClient';
import { usePostsQuery } from '../generated/graphql';
import { Navbar } from '../components/Navbar';
import { Box, Button, Heading, Stack, Text } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';

const Index = () => {
    const [{data}] = usePostsQuery({
        variables: {
            limit: 10
        }
    });
    return (
        <>
            <Navbar></Navbar>

            <Wrapper size="large" display="flex" alignItems="flex-start" flexDirection="row">
                <Stack pb={8} spacing={4} max-width="70%" mt={8}>
                    <Heading fontSize="xl">Recent Stories</Heading>
                    {!data ? (
                        <div>Waiting...</div>
                    ) : data.posts.map((post) => {
                        return (
                            <Box key={post.id} p={5} shadow="xs" borderWidth="1px">
                                <Heading fontSize="lg">{post.title}</Heading>
                                <Text mt={4}>{post.bodySnippet}</Text>
                            </Box>
                        );
                    })}

                    <Button>Load More</Button>
                </Stack>
            </Wrapper>
        </>
    );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
