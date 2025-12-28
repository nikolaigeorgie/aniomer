import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

// Get the site password from environment variable
const SITE_PASSWORD = process.env.SITE_PASSWORD || "IMISSAVIYA";

// Cookie settings
const COOKIE_NAME = "site_access_granted";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  // Constant-time comparison to prevent timing attacks
  const isValid =
    password.length === SITE_PASSWORD.length &&
    password
      .split("")
      .every(
        (char: string, i: number) =>
          char.charCodeAt(0) === SITE_PASSWORD.charCodeAt(i)
      );

  if (!isValid) {
    return res.status(401).json({ error: "Invalid password" });
  }

  // Set the access cookie
  const cookie = serialize(COOKIE_NAME, "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
  return res.status(200).json({ success: true });
}

