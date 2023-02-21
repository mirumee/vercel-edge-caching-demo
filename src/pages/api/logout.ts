import { NextApiHandler } from "next";
import {
  MOCK_AUTHORIZATION_COOKIE_NAME,
  VERCEL_NO_CACHE_COOKIE_NAME,
} from "@/config";
import { getCacheControlValue } from "@/lib/ssrUtils";

const logout: NextApiHandler = (req, res) => {
  const maxAgeZeroAttribute = "Max-Age=0";
  const expiredMockAuthorizationCookie = `${MOCK_AUTHORIZATION_COOKIE_NAME}=; path=/; SameSite=Strict; ${maxAgeZeroAttribute}`;

  const expiredVercelNoCacheCookie = `${VERCEL_NO_CACHE_COOKIE_NAME}=; path=/; SameSite=Strict; ${maxAgeZeroAttribute}`;

  res
    .setHeader("Set-Cookie", [
      expiredMockAuthorizationCookie,
      expiredVercelNoCacheCookie,
    ])
    .setHeader("Access-Control-Expose-Headers", "Set-Cookie")
    .setHeader("Cache-Control", getCacheControlValue(true))
    .status(200)
    .json({ logout: "Successful" });
};

export default logout;
