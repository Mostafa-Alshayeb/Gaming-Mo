import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MotionItem from "../defaults/MotionItem";

const CardInfo = ({
  desc,
  title,
  image,
  textBtn,
  btnClasses,
}: {
  desc: string;
  title: string;
  image: string;
  textBtn?: string;
  btnClasses?: string;
}) => {
  return (
    <MotionItem
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
      className="flex flex-col items-start absolute left-20 top-20 max-w-md "
    >
      <div className="w-96 h-40 relative">
        <Image src={image} fill alt={`${title}`} className=" object-contain" />
      </div>
      <h1 className=" text-2xl text-white font-semibold">{title}</h1>
      <p className=" text-base  text-gray-100">{desc}</p>
      <Button
        className={`
    ${btnClasses} 
    rounded-full 
     bg-amber-600
    text-white 
    px-6 py-3 
    mt-2
    font-semibold 
    
     hover:scale-120
      translate-3
    transition-colors 
    duration-300
     cursor-pointer
     hover:after:scale-110 lg:hover:after:scale-125
     hover:bg-amber-800 
  `}
        aria-label={textBtn}
      >
        {textBtn || "find out more !"}
      </Button>
    </MotionItem>
  );
};

export default CardInfo;
