import { NextApiHandler } from "next";
import {
  MOCK_AUTHORIZATION_COOKIE_NAME,
  VERCEL_NO_CACHE_COOKIE_NAME,
} from "@/config";

const login: NextApiHandler = (req, res) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  const maxAge = "Max-Age=3600;";
  const secure = isDevelopment ? "" : "Secure;";

  const mockAuthorizationCookie = `${MOCK_AUTHORIZATION_COOKIE_NAME}=1; path=/; ${secure} ${maxAge}`;

  const vercelNoCacheCookie = `${VERCEL_NO_CACHE_COOKIE_NAME}=1; path=/; ${secure} ${maxAge}`;

  res
    .setHeader("Set-Cookie", [mockAuthorizationCookie, vercelNoCacheCookie])
    .setHeader("Access-Control-Expose-Headers", "Set-Cookie")
    .setHeader("Cache-Control", "no-cache")
    .status(200)
    .json({ login: "Successful" });
};

export default login;
