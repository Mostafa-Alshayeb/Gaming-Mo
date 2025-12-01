import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

const Spinner = () => {
  return (
    <BiLoaderCircle className=" text-cyan-300 w-5 h-5 m-auto animate-spin text-center" />
  );
};

export default Spinner;
