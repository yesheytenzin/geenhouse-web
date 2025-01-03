import { z } from "zod";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3)
      .max(20, { message: "Username must be between 3 and 20 characters" }),
    password: z
      .string()
      .min(8)
      .max(100, { message: "Password must be between 8 and 100 characters" }),
    confirmPassword: z
      .string()
      .min(8)
      .max(100, { message: "Password must be between 8 and 100 characters" }),
    email: z.string().email(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be between 3 and 20 characters" })
    .max(20, { message: "Username must be between 3 and 20 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be between 8 and 100 characters" })
    .max(100, { message: "Password must be between 8 and 100 characters" }),
});

export { signUpSchema, loginSchema };
