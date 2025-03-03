"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.models";
import User from "../models/user.models";
import { connectToDB } from "../mongoose";

interface Params {
    text: string;
    author: string;
    communityId: string | null;
    path: string;
}

export async function createThread({ text, author, communityId, path }: Params) {
    try {
        connectToDB();
        const createThread = await Thread.create({ text, author, community: null });
        await User.findByIdAndUpdate(author, {
            $push: { threads: createThread._id }
        })
        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Failed to add post: ${error.message}`);
    }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    try {
        connectToDB();
        const postsToSkip = (pageNumber - 1) * pageSize

        const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
            .sort({ createdAt: "desc" })
            .skip(postsToSkip)
            .limit(pageSize)
            .populate({ path: "author", model: User })
            .populate({
                path: "children",
                populate: { path: "author", model: User, select: "_id name parentId image" }
            })

        const totalPostsCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } })

        const posts = await postsQuery.exec();

        const isNext = totalPostsCount > (postsToSkip + posts.length)

        return { posts, isNext };
    } catch (error: any) {
        throw new Error(`Failed to fetch post: ${error.message}`);
    }

}