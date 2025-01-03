import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    GEOCOD_API_KEY: z.string().min(5),
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL_INTERNAL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    TWILIO_ACCOUNT_SID: z.string().optional(),
    TWILIO_AUTH_TOKEN: z.string().optional(),
    HTTP_SMS_API_KEY: z.string(),
    EMQX_APP_ID: z.string(),
    EMQX_APP_SECRET: z.string(),
    EMQX_BASE_URL: z.string(),
    EMQX_PORT: z.string(),
    EMQX_CONNECT_URL: z.string(),
  },
  clientPrefix: "NEXT_PUBLIC",
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    GEOCOD_API_KEY: process.env.GEOCOD_API_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL,
    NODE_ENV: process.env.NODE_ENV,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    HTTP_SMS_API_KEY: process.env.HTTP_SMS_API_KEY,
    EMQX_APP_ID: process.env.EMQX_APP_ID,
    EMQX_APP_SECRET: process.env.EMQX_APP_SECRET,
    EMQX_BASE_URL: process.env.EMQX_BASE_URL,
    EMQX_PORT: process.env.EMQX_PORT,
    EMQX_CONNECT_URL: process.env.EMQX_CONNECT_URL,
  },
});
