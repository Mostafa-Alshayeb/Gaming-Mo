"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";
const MotionItem = ({
  children,
  className,
  initial,
  whileInView,
  exit,
}: {
  children: ReactNode;
  className?: string;
  initial?: any;
  whileInView?: any;
  exit?: any;
  animate?: any;
}) => {
  return (
    <motion.div
      initial={initial}
      exit={exit}
      whileInView={whileInView}
      className={`${className}` || ""}
    >
      {children}
    </motion.div>
  );
};

export default MotionItem;
