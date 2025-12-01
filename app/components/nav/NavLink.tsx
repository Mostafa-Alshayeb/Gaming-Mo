import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactElement } from "react";

const NavLink = ({
  navLink,
}: {
  navLink: { link: string; label: string; icon: ReactElement };
}) => {
  const pathNmae = usePathname();
  const isActive = pathNmae === navLink.link;

  return (
    <Link
      href={navLink.link}
      className={`flex ${
        isActive ? "text-cyan-400" : "text-gray-50"
      } items-center gap-3 hover:text-cyan-400`}
    >
      {navLink.icon} {navLink.label}
    </Link>
  );
};

export default NavLink;
