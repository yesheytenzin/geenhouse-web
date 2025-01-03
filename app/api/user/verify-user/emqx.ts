import { Buffer } from "buffer";
import { env } from "@/env";

export function generateBrokerId(username: string, mobile: string) {
  const usernamePart = username.slice(0, 2).toUpperCase(); // Adjusted to 2 characters
  const mobilePart = mobile.slice(-3); // Adjusted to 3 characters
  const randomNumber = Math.floor(Math.random() * 100); // Adjusted to 2 digits
  const timestampPart = Date.now().toString().slice(-3); // Adjusted to 3 digits
  return `${usernamePart}${mobilePart}${randomNumber}${timestampPart}`;
}
interface IEmqx {
  user_id: string;
  password: string;
  is_superuser: boolean;
}
export const createEMQXUser = async (userData: IEmqx) => {
  const apiUrl = `${env.EMQX_BASE_URL}/authentication/password_based%3Abuilt_in_database/users`;
  const username = env.EMQX_APP_ID;
  const password = env.EMQX_APP_SECRET;
  const auth = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify(userData),
  });
  if (response.ok) {
    return { success: true };
  }
  return { success: false };
};
