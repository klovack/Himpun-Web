import {} from 'next/app';
import React, { useState } from 'react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';

import { createUrqlClient } from '../util/urqlClient';
import { usePostsQuery } from '../generated/graphql';
import { Navbar } from '../components/Navbar';
import { Box, Button, Heading, Stack, Text } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';

const Index = () => {
    const [variables, setVariables] = useState({
        limit: 10, 
        cursor: null as null | string,
        filter: {
            isPublished: true,
        }
    });
    const [{data, fetching}] = usePostsQuery({
        variables,
    });
    
    return (
        <>
            <Navbar></Navbar>

            <Wrapper size="large" display="flex" alignItems="flex-start" flexDirection="row">
                <Stack pb={8} spacing={4} width="70%" max-width="70%" mt={8}>
                    <Box display="flex" justifyContent="stretch" borderRadius="5px" backgroundColor="white" p={5} shadow="xs" borderWidth="1px">
                        <NextLink href="/create-post">
                           <Button width="100%" justifyContent="left">Create Post</Button>
                        </NextLink>
                    </Box>

                    <Heading fontSize="xl">Recent Stories</Heading>
                    {!data && fetching ? (
                        <div>Waiting...</div>
                    ) : (!data && !fetching) ? ( 
                        <Box borderRadius="5px" backgroundColor="white" p={5} shadow="xs" borderWidth="1px">
                            <Heading fontSize="lg">Oops! Something went wrong</Heading>
                        </Box>
                    ) : data?.posts.map((post) => {
                        return (
                            <Box borderRadius="5px" backgroundColor="white" key={post.id} p={5} shadow="xs" borderWidth="1px">
                                <Heading fontSize="lg">{post.title}</Heading>
                                <Text mt={4}>{post.bodySnippet}</Text>
                            </Box>
                        );
                    })}

                    {data && (
                        <Button 
                            onClick={() => {
                                setVariables({
                                    limit: variables.limit,
                                    cursor: data.posts[data.posts.length - 1].createdAt,
                                });
                            }}
                            isLoading={fetching}>Load More</Button>
                    )}
                </Stack>
            </Wrapper>
        </>
    );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
