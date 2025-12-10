"use client";
import { Menu } from "lucide-react";
import Search from "./Search";
import ButtonGame from "../defaults/ButtonGame";
import { useGetUser } from "@/lib/QueryFunctions";
import User from "./User";
import SkeletonCustm from "./SkeletonCustm";
import { Button } from "@/components/ui/button";

const NavBar = ({ setOpen }: { setOpen: (v: boolean) => void }) => {
  const { user, isLoading } = useGetUser();

  return (
    <nav className=" relative top-0  bg-main ">
      <header className="flex justify-between items-center py-3 px-4 md:px-6 lg:px-8">
        <Button
          className="lg:hidden p-2 bg-transparent text-white"
          onClick={() => setOpen(true)}
        >
          <Menu size={28} />
        </Button>

        <div className="flex-1 mx-2 lg:mx-4">
          <Search />
        </div>

        <div className="flex items-center gap-3">
          {isLoading ? (
            <SkeletonCustm circle />
          ) : user?.data ? (
            <User user={user.data} />
          ) : (
            <div className="flex gap-2 sm:gap-3">
              <ButtonGame
                text="Login"
                link="/login"
                className="text-sm sm:text-base"
              />
              <ButtonGame
                text="Sign Up"
                link="/signup"
                className="text-sm sm:text-base "
              />
            </div>
          )}
        </div>
      </header>
    </nav>
  );
};

export default NavBar;
