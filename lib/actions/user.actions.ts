"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.models";
import { connectToDB } from "../mongoose"

interface Params {
    userId: string;
    name: string;
    username: string;
    bio: string;
    image: string;
    path: string;
}

export async function updateUser({ userId, name, username, bio, image, path }: Params): Promise<void> {
    connectToDB();

    try {
        await User.findOneAndUpdate({ id: userId }, {
            username: username.toLowerCase(),
            name,
            bio,
            image,
            onBoarded: true
        }, { upsert: true });

        if (path === "/profile/edit") {
            revalidatePath(path);
        }
    } catch (error: any) {
        console.log(error);

        throw new Error(`Failed to Create/Update user: ${error.message}`);
    }

}

export async function fetchUserDetails(userId: string) {
    try {
        connectToDB();
        return await User.findOne({ id: userId })
        // .populate({
        //     path: 'communities',
        //     model: "Community",
        // });

    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }

}
