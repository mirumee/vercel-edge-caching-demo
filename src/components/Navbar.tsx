import { paths } from "../paths";
import { NavbarLink } from "./NavbarLink";

export const Navbar: React.FC = () => {
  return (
    <nav>
      <NavbarLink href={paths.home}>Home</NavbarLink>
      <div className="link-group">
        <NavbarLink href={paths.withCaching}>With caching</NavbarLink>
        <NavbarLink href={`${paths.withCaching}?wait`}>
          With caching (wait 3 sec)
        </NavbarLink>
      </div>
      <NavbarLink href={paths.withoutCaching}>
        Without caching (preview)
      </NavbarLink>
    </nav>
  );
};
