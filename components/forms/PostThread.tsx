"use client"

import React from 'react'
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Heading, Button, Fieldset, Flex, Image, Input, Text, Textarea } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { usePathname, useRouter } from 'next/navigation';

// import { updateUser } from '@/lib/actions/user.actions';
import { ThreadSchema } from '@/lib/validation/threadSchema';
import { LuPlus } from 'react-icons/lu';
import { createThread } from '@/lib/actions/thread.actions';

export default function PostThread({ userId }: { userId: string }) {

    const pathname = usePathname();
    const router = useRouter();

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(ThreadSchema),
        defaultValues: {
            thread: "",
            accountId: userId
        }
    });

    const onSubmit = async (data: z.infer<typeof ThreadSchema>) => {
        console.log(data);

        await createThread({
            text: data.thread,
            author: userId,
            communityId: null,
            path: pathname
        });

        router.push('/')
    }

    return (
        <Box mt={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Fieldset.Root size="md" w={'full'}>
                    <Fieldset.Content>
                        <Field label="content" invalid={!!errors.thread}>
                            <Textarea placeholder='About yourself' rows={15} {...register("thread")} bg={'#0a0a0a'} border={'none'} />
                            {errors.thread && <Text color={'#f87171'} fontSize={'12px'} mt={0}>{errors.thread?.message}</Text>}
                        </Field>
                    </Fieldset.Content>

                    <Button w={{ base: '100%', md: 'max-content' }} type="submit" alignSelf="flex-start" bg={"#7b40ed"} _hover={{ bg: "#531dbdb8" }} color={'white'}>
                        <LuPlus /> Post Thread
                    </Button>
                </Fieldset.Root>
            </form>
        </Box>
    )
}