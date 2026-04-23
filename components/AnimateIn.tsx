"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "up" | "left" | "right";

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}

const directionOffset: Record<Direction, { x?: number; y?: number }> = {
  up:    { y: 32 },
  left:  { x: -32 },
  right: { x: 32 },
};

export function AnimateIn({
  children,
  delay = 0,
  direction = "up",
  className,
}: AnimateInProps) {
  const offset = directionOffset[direction];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
