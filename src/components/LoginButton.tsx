import { useIsLoggedIn } from "@/hooks/login";

export const LoginButton: React.FC = ({}) => {
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedIn();

  const handleLogin = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
    });

    const body = await response.json();
    const isLoginSuccessful = body.login === "Successful";

    setIsLoggedIn(isLoginSuccessful);
  };

  const handleLogOut = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
    });

    const body = await response.json();
    const isLogOutSuccessful = body.logout === "Successful";

    setIsLoggedIn(!isLogOutSuccessful);
  };

  const buttonText = isLoggedIn ? "Log out" : "Log in";

  const handleLoginClick = isLoggedIn ? handleLogOut : handleLogin;

  return <input type="button" onClick={handleLoginClick} value={buttonText} />;
};
