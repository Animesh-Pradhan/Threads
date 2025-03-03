import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { currentUser } from "@clerk/nextjs/server";

const f = createUploadthing();

const getUser = async () => {
    try {
        return await currentUser();
    } catch (error) {
        console.error("Error fetching Clerk user:", error);
        return null;
    }
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    media: f({
        image: { maxFileSize: "4MB", maxFileCount: 1 },
    }).middleware(async ({ req }) => {
        // This code runs on your server before upload
        const user = await getUser();

        // If you throw, the user will not be able to upload
        if (!user) {
            console.error("Unauthorized upload attempt");
            throw new UploadThingError("Unauthorized");
        }

        return { userId: user.id };
    }).onUploadComplete(async ({ metadata, file }) => {
        // This code RUNS ON YOUR SERVER after upload

        console.log("Upload complete for userId:", metadata.userId);

        console.log("file url", file.url);

        return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
