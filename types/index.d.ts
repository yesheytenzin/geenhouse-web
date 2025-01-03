import { z } from "zod";
import { signUpSchema, loginSchema } from "@/lib/validations/auth";
import { newsfeedSchema } from "@/lib/validations/newsfeed";
import { UserTableColumnSchema } from "@/lib/validations/user";

export type signUpSchemaType = z.infer<typeof signUpSchema>;
export type loginSchemaType = z.infer<typeof loginSchemaType>;
export type newsFeedSchemaType = z.infer<typeof newsfeedSchema>;
export type userTableColumnSchemaType = z.infer<typeof UserTableColumnSchema>;

export type NewsFeedType = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  image: string;
  author: string;
}
