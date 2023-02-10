import { NextApiHandler } from "next";
import {
  MOCK_AUTHORIZATION_COOKIE_NAME,
  VERCEL_NO_CACHE_COOKIE_NAME,
} from "@/config";

const logout: NextApiHandler = (req, res) => {
  const expiresAttribute = "expires=Thu, 01 Jan 1970 00:00:00 GMT;";
  const expiredMockAuthorizationCookie = `${MOCK_AUTHORIZATION_COOKIE_NAME}=; path=/; ${expiresAttribute}`;

  const expiredVercelNoCacheCookie = `${VERCEL_NO_CACHE_COOKIE_NAME}=; path=/; ${expiresAttribute}`;

  res
    .setHeader("Set-Cookie", [
      expiredMockAuthorizationCookie,
      expiredVercelNoCacheCookie,
    ])
    .status(200)
    .json({ logout: "Successful" });
};

export default logout;
