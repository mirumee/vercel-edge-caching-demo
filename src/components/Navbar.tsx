import { paths } from "../paths";
import { LoginButton } from "./LoginButton";
import { NavbarLink } from "./NavbarLink";
import { useRouter } from "next/router";

export const Navbar: React.FC = () => {
  const { pathname, query } = useRouter();

  return (
    <nav>
      <NavbarLink href={paths.home}>Home</NavbarLink>
      <div className="link-group">
        <NavbarLink href={{ href: pathname, query: { slug: query.slug } }}>
          Published
        </NavbarLink>
        <NavbarLink
          href={{ href: pathname, query: { slug: query.slug, wait: "" } }}
        >
          Published (wait 3 sec)
        </NavbarLink>
      </div>
      <NavbarLink
        href={{ href: pathname, query: { slug: query.slug, preview: "" } }}
      >
        Preview
      </NavbarLink>
      <LoginButton />
    </nav>
  );
};
