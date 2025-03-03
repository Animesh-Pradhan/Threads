"use client";

import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { OrganizationSwitcher, SignedIn, SignOutButton } from '@clerk/nextjs';
import { dark } from "@clerk/themes";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'


const Navbar: React.FC = () => {
    const router = useRouter();
    return (
        <Flex h={'60px'} alignItems={'center'} justifyContent={'space-between'} py={3} ps={{ base: 4, lg: 6 }} bg={'#1c1c1c'}>
            <Link href={'/'}>
                <Flex gap={'12px'} alignItems={'center'}>
                    <Image src={"./assets/logo.svg"} alt='logo' w={"30px"} h={'30px'} />
                    <Heading>Threads</Heading>
                </Flex>
            </Link>

            <Flex gap={2} alignItems={'center'}>
                <Box display={{ base: 'block', md: 'none' }}>
                    <SignedIn>
                        <SignOutButton redirectUrl='/sign-in'>
                            <Box onClick={() => router.push('/sign-in')}>
                                <Image src='./assets/logout.svg' alt='logout' w={'24px'} h={'24px'} />
                            </Box>
                        </SignOutButton>
                    </SignedIn>
                </Box>

                <OrganizationSwitcher appearance={{
                    baseTheme: dark,
                    elements: {
                        organizationSwitcherTrigger: "py-2 px-4"
                    }
                }} />
            </Flex>
        </Flex>
    )
}

export default Navbar;