"use clinet";

import { Button } from "@/components/ui/button";
import React, { ReactElement } from "react";
import ButtonSvg from "../nav/ButtonSvg";
import Link from "next/link";
import Spinner from "./Spinner";
import { fa } from "zod/v4/locales";
const ButtonGame = ({
  className,
  onClick,
  link,
  text,
  icon,
  disabled,
}: {
  className?: string;
  onClick?: () => void;
  link?: string;
  text: string;
  icon?: ReactElement;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`${
        className || ""
      }  relative px-4 flex-initial text-white gap-2 py-2 min-w-[80px] duration-150 hover:text-cyan-300 cursor-pointer text-center m-auto`}
    >
      {ButtonSvg({ white: false })}
      <span className="relative">
        {disabled ? <Spinner /> : link ? <Link href={link}>{text}</Link> : text}
      </span>
      {icon && icon}
    </button>
  );
};

export default ButtonGame;
