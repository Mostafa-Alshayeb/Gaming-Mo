// "use client";
// import React from "react";
// import Search from "./Search";
// import ButtonGame from "../defaults/ButtonGame";
// import { useGetUser } from "@/lib/QueryFunctions";
// import User from "./User";
// import SkeletonCustm from "./SkeletonCustm";

// const NavBar = () => {
//   const { user, isLoading } = useGetUser();

//   return (
//     <nav>
//       <header className="flex justify-between items-center sticky top-0 z-50 bg-main ">
//         <Search />

//         {isLoading ? (
//           <SkeletonCustm circle />
//         ) : user?.data ? (
//           // user موجود
//           <User user={user.data} />
//         ) : (
//           // user غير موجود
//           <div className="flex gap-3">
//             <ButtonGame text="Login" link="/login" />
//             <ButtonGame text="Sign Up" link="/signup" className="md:px-5" />
//           </div>
//         )}
//       </header>
//     </nav>
//   );
// };

// export default NavBar;

"use client";
import React from "react";
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
    <nav>
      <header className="flex justify-between items-center sticky top-0 z-50 bg-main py-3 px-2">
        <Button
          className="lg:hidden p-4 bg-transparent text-2xl text-white font-bold "
          onClick={() => setOpen(true)}
        >
          <Menu size={32} className=" " />
        </Button>

        <Search />

        {isLoading ? (
          <SkeletonCustm circle />
        ) : user?.data ? (
          <User user={user.data} />
        ) : (
          <div className="flex gap-3">
            <ButtonGame text="Login" link="/login" />
            <ButtonGame
              text="Sign Up"
              link="/signup"
              className="md:px-5 lg:text-xl"
            />
          </div>
        )}
      </header>
    </nav>
  );
};

export default NavBar;
