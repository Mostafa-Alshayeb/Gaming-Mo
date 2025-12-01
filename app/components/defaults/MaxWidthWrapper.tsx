import { cn } from "@/lib/utils";
import React from "react";

const MaxWidthWrapper = ({
  children,
  className,
  noPaddinng,
  customPadding,
}: {
  children?: React.ReactNode;
  className?: string;
  noPaddinng?: boolean;
  customPadding?: string;
}) => {
  return (
    <section
      className={cn(
        ` max-w-[1375px] w-full mx-auto px-5 md:px-10 lg:px-20`,
        className || "",
        { "py-0": noPaddinng && customPadding },
        { "py-10": !noPaddinng && !customPadding },
        customPadding
      )}
    >
      {children}
    </section>
  );
};

export default MaxWidthWrapper;
