import Link from "next/link";
import { PropsWithChildren } from "react";

interface NavbarLink {
  href: string;
}

export const NavbarLink: React.FC<PropsWithChildren<NavbarLink>> = ({
  href,
  children,
}) => {
  return <Link href={href}>{children}</Link>;
};
