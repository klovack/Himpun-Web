import {} from 'next/app';
import React from 'react';
import { withUrqlClient } from 'next-urql';

import { createUrqlClient } from '../util/urqlClient';
import { usePostsQuery } from '../generated/graphql';
import { Navbar } from '../components/Navbar';

const Index = () => {
    const [{data}] = usePostsQuery();
    return (
        <>
            <Navbar></Navbar>

            <div>Hello World</div>

            {!data ? null : data.posts.map((post) => {
                return (
                    <div key={post.id}>
                        {post.title}
                    </div>
                );
            })}
        </>
    );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
