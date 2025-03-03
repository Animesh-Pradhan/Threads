"use client"

import React, { ChangeEvent, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { UserSchema } from '@/lib/validation/userSchema';
import { Button, Fieldset, Flex, Image, Input, Stack, Text, Textarea } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import * as z from 'zod';
import { useUploadThing } from "@/lib/uploadThing"
import { isBase64Image } from '@/lib/utils';
import { updateUser } from '@/lib/actions/user.actions';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };

    btnTitle: string;
}

export default function AccountProfile({ user, btnTitle }: Props) {
    const [files, setFiles] = useState<File[]>([]);

    const pathname = usePathname();
    const router = useRouter();

    const { startUpload } = useUploadThing("media");
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            profile_photo: user?.image || "",
            name: user.name || "",
            username: user.username || "",
            bio: user.bio || ""
        }
    });

    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            setFiles(Array.from(e.target.files));

            if (!file.type.includes('image')) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            }

            fileReader.readAsDataURL(file);
        }
    }

    const onSubmit = async (values: z.infer<typeof UserSchema>) => {
        const blob = values.profile_photo;
        const hasImageChanged = isBase64Image(blob);

        console.log(hasImageChanged);
        console.log(files);

        if (hasImageChanged && files.length > 0) {

            const imageRes = await startUpload(files)

            console.log(imageRes);
            if (imageRes && imageRes[0].ufsUrl) {
                values.profile_photo = imageRes[0].ufsUrl;
            }


        }

        await updateUser({ userId: user.id, name: values.name, username: values.username, bio: values.bio, image: values.profile_photo, path: pathname });

        if (pathname === "/profile/edit") {
            router.back();
        } else {
            router.push(`/`);
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset.Root size="md" w={'full'}>
                <Fieldset.Content>
                    <Field label="Profile Photo" invalid={!!errors.profile_photo}>
                        <Controller
                            name="profile_photo"
                            control={control}
                            render={({ field }) => (
                                <Flex flexDir={{ base: 'column', sm: 'row' }} alignItems={{ base: 'start', sm: 'center' }} gap={{ base: 2, sm: 10 }}>
                                    {/* {allValues.profile_photo ?
                                        <Image src={allValues.profile_photo} alt='profile photo' w={'150px'} h={'150px'} borderRadius={'full'} /> :
                                        <Image src={"./assets/profile.svg"} alt='profile photo' w={'150px'} h={'150px'} borderRadius={'full'} />
                                    }
                                    <Input type='file' p={2} border={'none'} onChange={(e) => handleImage(e, field.onChange)} accept="image/*" /> */}

                                    {field.value ? <Image
                                        src={field.value || "./assets/profile.svg"}
                                        alt="Profile Photo"
                                        w={{ base: '100px', xl: "150px" }}
                                        h={{ base: '100px', xl: "150px" }}
                                        borderRadius="full"
                                    /> : <Image src={"./assets/profile.svg"} alt='profile photo' w={{ base: '100px', xl: "150px" }} h={{ base: '100px', xl: "150px" }} borderRadius={'full'} />}

                                    <Input
                                        type="file"
                                        p={2}
                                        border="none"
                                        accept="image/*"
                                        onChange={(e) => handleImage(e, field.onChange)}
                                    />
                                </Flex>
                            )}
                        />
                    </Field>

                    <Field label="Name" invalid={!!errors.name}>
                        <Input placeholder='Name' {...register("name")} bg={'#0a0a0a'} border={'none'} />
                        {errors.name && <Text color={'#f87171'} fontSize={'12px'} mt={0}>{errors.name?.message}</Text>}
                    </Field>

                    <Field label="User name" invalid={!!errors.username}>
                        <Input placeholder='User Name' {...register("username")} bg={'#0a0a0a'} border={'none'} />
                        {errors.username && <Text color={'#f87171'} fontSize={'12px'} mt={0}>{errors.bio?.message}</Text>}
                    </Field>

                    <Field label="bio" invalid={!!errors.bio}>
                        <Textarea placeholder='About yourself' rows={5} {...register("bio")} bg={'#0a0a0a'} border={'none'} />
                        {errors.bio && <Text color={'#f87171'} fontSize={'12px'} mt={0}>{errors.bio?.message}</Text>}
                    </Field>
                </Fieldset.Content>

                <Button w={{ base: '100%', md: 'max-content' }} type="submit" alignSelf="flex-start" bg={"#7b40ed"} _hover={{ bg: "#531dbdb8" }} color={'white'}>
                    {btnTitle}
                </Button>
            </Fieldset.Root>
        </form>
    )
}