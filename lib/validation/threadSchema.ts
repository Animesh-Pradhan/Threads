import * as z from "zod";

export const ThreadSchema = z.object({
    thread: z.string().nonempty({ message: "Thread is Required" }).min(3, { message: "Thread must be at least 3 characters" }),
    accountId: z.string(),
})

export const CommentSchema = z.object({
    thread: z.string().nonempty().min(3, { message: "Minimum 3 characters" }),
    accountId: z.string(),
});