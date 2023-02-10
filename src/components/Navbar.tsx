import { paths } from "../paths";
import { LoginButton } from "./LoginButton";
import { NavbarLink } from "./NavbarLink";

export const Navbar: React.FC = () => (
  <nav>
    <NavbarLink href={paths.home}>Home</NavbarLink>
    <div className="link-group">
      <NavbarLink href={paths.withCaching}>Published</NavbarLink>
      <NavbarLink href={`${paths.withCaching}?wait`}>
        Published (wait 3 sec)
      </NavbarLink>
    </div>
    <div className="link-group">
      <NavbarLink href={`${paths.withCaching}?preview`}>Preview</NavbarLink>
      <NavbarLink href={`${paths.withCaching}?preview&wait`}>
        Preview (wait 3 sec)
      </NavbarLink>
    </div>

    <LoginButton />
  </nav>
);
