import { paths } from "../paths";
import { NavbarLink } from "./NavbarLink";

export const Navbar: React.FC = () => {
  return (
    <nav>
      <NavbarLink href={paths.home}>Home</NavbarLink>
      <NavbarLink href={paths.withCaching}>
        <strong>With</strong> caching
      </NavbarLink>
      <NavbarLink href={paths.withoutCaching}>
        <strong>Without</strong> caching
      </NavbarLink>
    </nav>
  );
};
