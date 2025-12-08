"use client";

import {
  FaHome,
  FaThList,
  FaBook,
  FaUserFriends,
  FaUsers,
  FaHeart,
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
import { motion } from "framer-motion";
import { X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", link: "/", icon: <FaHome /> },
  { label: "Category", link: "/Category", icon: <FaThList /> },
  { label: "Library", link: "/Library", icon: <FaBook /> },
  { label: "Friends", link: "/friends", icon: <FaUserFriends /> },
  { label: "Community", link: "/community", icon: <FaUsers /> },
  { label: "Wishlist", link: "/wishlist", icon: <FaHeart /> },
  { label: "Games", link: "/games", icon: <FaHome /> },
  { label: "Settings", link: "/Settings", icon: <Settings /> },
];

const SideBar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const { user, isLoading } = useGetUser();
  const queryClient = useQueryClient();

  return (
    <>
      <div className="hidden lg:flex col-span-2 sticky inset-0 h-screen">
        <div className="py-5 px-10 h-screen bg-black/30 flex flex-col text-gray-50">
          <Logo />
          <div className="flex flex-col gap-4 my-11 text-lg">
            {NAV_LINKS.map((navLink) => (
              <NavLink key={navLink.link} navLink={navLink} />
            ))}
          </div>

          {isLoading ? (
            <SkeletonCustm circle />
          ) : user?.data ? (
            <Button
              variant="destructive"
              className="mt-auto p-6 bg-cyan-600 font-semibold hover:scale-95"
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
          ) : null}
        </div>
      </div>

      {open && (
        <div
          className="lg:hidden fixed inset-0 z-[999] bg-black/30"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="w-72 h-full bg-black/90 text-white p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <Button className="mb-6" onClick={() => setOpen(false)}>
              <X size={28} />
            </Button>

            <Logo />

            <div className="flex flex-col gap-4 my-11 text-lg">
              {NAV_LINKS.map((navLink) => (
                <NavLink
                  key={navLink.link}
                  navLink={navLink}
                  onClick={() => setOpen(false)}
                />
              ))}
            </div>
            {isLoading ? (
              <SkeletonCustm circle />
            ) : user?.data ? (
              <Button
                variant="destructive"
                className="mt-auto p-6 bg-cyan-600 font-semibold hover:scale-95"
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
            ) : null}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default SideBar;
