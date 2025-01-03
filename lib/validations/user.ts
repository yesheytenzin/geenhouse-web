import { z } from "zod";

export const UserTableColumnSchema = z
  .object({
    id: z.string().uuid(),
    username: z
      .string()
      .min(3)
      .max(20, { message: "Username must be between 3 and 20 characters" }),
    mobile: z.string().min(8).max(8, { message: "Mobile number must be 8 digits" }),
    cid: z.string().min(11).max(11, { message: "CID must be 11 digits" }),
    dzongkhag: z.string().min(3).max(20, { message: "Dzongkhag must be between 3 and 20 characters" }),
    gewog: z.string().min(3).max(20, { message: "Gewog must be between 3 and 20 characters" }),
    registeredAt: z.date(),
    irrigationCount: z.number().min(0).max(100, { message: "Irrigation controller count must be between 0 and 100" }),
    greenhouseCount: z.number().min(0).max(100, { message: "Greenhouse count must be between 0 and 100" }),
  })
