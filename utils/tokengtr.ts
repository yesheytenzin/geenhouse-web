import * as crypto from "crypto";

export function generateAccessToken(): string {
  return crypto.randomUUID();
}

export function setExpirationDate(): Date {
  const expirationDate = new Date();
  expirationDate.setMonth(expirationDate.getMonth() + 1);
  return expirationDate;
}
