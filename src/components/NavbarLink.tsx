import Link from "next/link";
import { PropsWithChildren } from "react";

interface NavbarLink {
  href: string;
}

export const NavbarLink: React.FC<PropsWithChildren<NavbarLink>> = ({
  href,
  children,
}) => <Link href={href}>{children}</Link>;
