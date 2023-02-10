import { useEffect, useState } from "react";
import { MOCK_AUTHORIZATION_COOKIE_NAME } from "@/config";

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isMockAuthorizationCookiePresent = document.cookie.includes(
      MOCK_AUTHORIZATION_COOKIE_NAME
    );

    setIsLoggedIn(isMockAuthorizationCookiePresent);
  }, []);

  return [isLoggedIn, setIsLoggedIn] as const;
};
