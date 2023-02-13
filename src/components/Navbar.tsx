import { paths } from "../paths";
import { LoginButton } from "./LoginButton";
import { NavbarLink } from "./NavbarLink";
import { useRouter } from "next/router";

interface NavbarProps {
  showLoginToPreview?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ showLoginToPreview }) => {
  return (
    <nav>
      <NavbarLink href={paths.home}>Home</NavbarLink>
      <div className="nav-group">
        {showLoginToPreview && (
          <strong className="note">Log in to see preview content</strong>
        )}
        <LoginButton />
      </div>
    </nav>
  );
};
