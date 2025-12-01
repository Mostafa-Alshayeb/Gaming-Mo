"use client";
import React from "react";
import Search from "./Search";
import ButtonGame from "../defaults/ButtonGame";
import { useGetUser } from "@/lib/QueryFunctions";
import User from "./User";
import SkeletonCustm from "./SkeletonCustm";

const NavBar = () => {
  const { user, isLoading } = useGetUser();

  return (
    <nav>
      <header className="flex justify-between items-center sticky top-0 z-50 bg-main ">
        <Search />

        {isLoading ? (
          <SkeletonCustm circle />
        ) : user?.data ? (
          // user موجود
          <User user={user.data} />
        ) : (
          // user غير موجود
          <div className="flex gap-3">
            <ButtonGame text="Login" link="/login" />
            <ButtonGame text="Sign Up" link="/signup" className="md:px-5" />
          </div>
        )}
      </header>
    </nav>
  );
};

export default NavBar;
