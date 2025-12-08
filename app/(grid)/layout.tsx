"use client";

import { useState } from "react";
import GridContainer from "../components/defaults/GridContainer";
import MaxWidthWrapper from "../components/defaults/MaxWidthWrapper";
import { ButtonGradient } from "../components/nav/ButtonGradient";
import NavBar from "../components/nav/NavBar";
import SideBar from "../components/nav/SideBar";
import { WishlistProvider } from "../context/WishlistContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <WishlistProvider>
      <main className="dark background grid min-h-screen h-full">
        <ButtonGradient />
        <GridContainer cols={12}>
          {/* Sidebar Desktop + Mobile */}
          <SideBar open={open} setOpen={setOpen} />

          {/* Main Content */}
          <MaxWidthWrapper className="col-span-full lg:col-span-10">
            <NavBar setOpen={setOpen} />
            {children}
          </MaxWidthWrapper>
        </GridContainer>
      </main>
    </WishlistProvider>
  );
}
