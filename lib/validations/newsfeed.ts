import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const globalMessageString = "The content is required and must be between 3 and 255 characters long.";
export const newsfeedSchema = z.object({
  title: z.string().min(3, { message: globalMessageString }).max(255),
  content: z.string().min(1, { message: globalMessageString }),
  image: z.custom<FileList>()
    .refine((files) => files?.length == 1, "Image is required.")
    .transform((files) => files[0])
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), ".jpg, .jpeg, .png and .webp files are accepted."),
});
