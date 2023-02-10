import { NextApiHandler } from "next";
import {
  MOCK_AUTHORIZATION_COOKIE_NAME,
  VERCEL_NO_CACHE_COOKIE_NAME,
} from "@/config";

const login: NextApiHandler = (req, res) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  const mockAuthorizationCookie = `${MOCK_AUTHORIZATION_COOKIE_NAME}=1; path=/; ${
    isDevelopment ? "" : "Secure;"
  }`;

  const vercelNoCacheCookie = `${VERCEL_NO_CACHE_COOKIE_NAME}=1; path=/;`;

  res
    .setHeader("Set-Cookie", [mockAuthorizationCookie, vercelNoCacheCookie])
    .status(200)
    .json({ login: "Successful" });
};

export default login;
