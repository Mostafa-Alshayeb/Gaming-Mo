"use client";

import Link from "next/link";
import React, { ReactElement } from "react";
import ButtonSvg from "../nav/ButtonSvg";
import Spinner from "./Spinner";

const ButtonGame = ({
  className = "",
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
  const content = (
    <>
      <ButtonSvg white={false} />
      <span className="relative z-10 whitespace-nowrap">
        {disabled ? <Spinner /> : text}
      </span>
      {icon && <span className="relative z-10">{icon}</span>}
    </>
  );

  return link ? (
    <Link
      href={link}
      className={`
        relative flex items-center justify-center
        h-[44px] min-w-[100px]
        px-4 gap-2
        text-white text-sm sm:text-base
        hover:text-cyan-300
        transition
        ${className}
      `}
    >
      {content}
    </Link>
  ) : (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative flex items-center justify-center
        h-[44px] min-w-[100px]
        px-4 gap-2
        text-white text-sm sm:text-base
        hover:text-cyan-300
        transition
        disabled:opacity-50
        ${className}
      `}
    >
      {content}
    </button>
  );
};

export default ButtonGame;
