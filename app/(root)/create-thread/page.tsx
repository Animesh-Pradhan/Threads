import PostThread from '@/components/forms/PostThread';
import { fetchUserDetails } from '@/lib/actions/user.actions';
import { Box, Heading } from '@chakra-ui/react';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const page: React.FC = async () => {

    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUserDetails(user.id);

    if (!userInfo?.onBoarded) redirect('/onboarding');

    return (
        <Box>
            <Heading>Create Thread</Heading>

            <PostThread userId={userInfo._id.toString()} />
        </Box>
    )
}

export default page;