"use client";

import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react'

import { sidebarLinks } from "../../constants/index"
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SignedIn, SignOutButton } from '@clerk/nextjs';


const LeftSidebar: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <Flex display={{ base: 'none', md: 'flex' }} flexDir={'column'} justifyContent={'space-between'} pt={'20px'} w={'full'} flex={1} bg={'#1c1c1c'}>
            <Flex flexDir={'column'} px={{ md: 4, lg: 6 }} gap={6} w={'100%'}>
                {sidebarLinks?.map(link => {
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

                    return <Link href={link?.route} key={link.label}>
                        <Box w={'100%'} borderRadius={'10px'} bg={isActive ? "#7b40ed" : "transparent"} p={'10px 12px'}>
                            <Flex alignItems={'center'} gap={2} w={'max-content'}>
                                <Image src={link.imgURL} alt={link.label} w={'24px'} h={'24px'} />
                                <Text display={{ base: 'none', lg: 'block' }} fontSize={'14px'}>{link.label}</Text>
                            </Flex>
                        </Box>
                    </Link>
                })}
            </Flex>

            <Box px={6} mt={2}>
                <SignedIn>
                    <SignOutButton redirectUrl='/sign-in'>
                        <Flex onClick={() => router.push('/sign-in')} gap={2} p={'10px 12px'} alignItems={'center'} cursor={'pointer'}>
                            <Image src='./assets/logout.svg' alt='logout' w={'24px'} h={'24px'} />
                            <Text display={{ base: 'none', lg: 'block' }} fontSize={'14px'} color={"#b4b4b4"}>Logout</Text>
                        </Flex>
                    </SignOutButton>
                </SignedIn>
            </Box>
        </Flex>
    )
}

export default LeftSidebar;