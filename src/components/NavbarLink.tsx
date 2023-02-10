import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

export const NavbarLink: React.FC<PropsWithChildren<LinkProps>> = ({
  href,
  children,
}) => <Link href={href}>{children}</Link>;
