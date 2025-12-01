"use client";

import Link from "next/link";
import React from "react";
import {
  FaHome,
  FaThList,
  FaBook,
  FaUserFriends,
  FaUsers,
  FaHeart,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";
import NavLink from "./NavLink";
import Logo from "../defaults/Logo";
import { useGetUser } from "@/lib/QueryFunctions";
import SkeletonCustm from "./SkeletonCustm";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/actions/auth";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const NAV_LINKS = [
  {
    label: "Home",
    link: "/",
    icon: <FaHome />,
  },
  {
    label: "Category",
    link: "/Category",
    icon: <FaThList />,
  },
  {
    label: "Library",
    link: "/Library",
    icon: <FaBook />,
  },
  {
    label: "Friends",
    link: "/friends",
    icon: <FaUserFriends />,
  },
  {
    label: "Community",
    link: "/community",
    icon: <FaUsers />,
  },
  {
    label: "Wishlist",
    link: "/wishlist",
    icon: <FaHeart />,
  },
  {
    label: "Games",
    link: "/games",
    icon: <FaHome />,
  },
  {
    label: "Settings",
    link: "/Settings",
    icon: <Settings />,
  },
];

const SideBar = () => {
  const { user, isLoading } = useGetUser();
  const queryClient = useQueryClient();
  return (
    <div className="hidden lg:flex col-span-2  sticky inset-0 h-screen">
      <div className=" py-5 px-10  h-screen sticky inset-0 flex flex-col items-start bg-black/30 text-gray-50">
        {/* Logo */}

        <Logo />

        {/* Navigation Links */}
        <div className="flex flex-col items-start gap-4  text-lg my-11">
          {NAV_LINKS.map((navLink) => (
            <NavLink key={navLink.link} navLink={navLink} />
          ))}
        </div>
        {isLoading ? (
          <SkeletonCustm circle />
        ) : user?.data ? (
          <div className=" mt-auto ">
            <Button
              variant={"destructive"}
              className=" p-6 bg-cyan-600 font-semibold hover:scale-95 cursor-pointer"
              onClick={async () => {
                const res = await logout();
                if (res.success) {
                  toast.success(res.success);
                  queryClient.invalidateQueries({ queryKey: ["user"] });
                } else toast.error(res.error);
              }}
            >
              Logout
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SideBar;

{
  /* <div className="flex flex-col items-start gap-4  ml-6 text-lg ">
          <Link
            href="/"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaHome /> Home
          </Link>
          <Link
            href="/category"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaThList /> Category
          </Link>
          <Link
            href="/libary"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaBook /> Library
          </Link>
          <Link
            href="/friendes"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaUserFriends /> Friends
          </Link>
          <Link
            href="/community"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaUsers /> Community
          </Link>
          <Link
            href="/wishlist"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaHeart /> Wishlist
          </Link>
          <Link
            href="/downloads"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaDownload /> Downloads
          </Link>
        </div> */
}
