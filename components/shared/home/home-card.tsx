/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card } from "@/components/ui/card";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type CardItem = {
  title: string;
  variant?: "hero" | "grid" | "banner" | string;
  link?: { text: string; href: string };
  items: {
    name: string;
    brand: string;
    category: string;
    image: string;
    href: string;
    description?: string;
  }[];
};

// Animation variants with valid easing values
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants :any = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut", // Changed to valid CSS easing
    },
  },
};

const titleVariants :any = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut", // Changed to valid CSS easing
    },
  },
};

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
};

export function HomeCard({ cards }: { cards: CardItem[] }) {
  return (
    <div className="space-y-20 bg-background px-4 py-12">
      {cards.map((card) => (
        <SectionWrapper key={card.title}>
          <div className="space-y-8">
            <motion.h2
              variants={titleVariants}
              className="text-4xl font-bold tracking-tight"
            >
              {card.title}
            </motion.h2>
            
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            >
              {card.items.map((item) => (
                <motion.div
                  key={item.name}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, ease: "easeInOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href={item.href} className="block h-full">
                    <Card className="flex flex-col items-center h-full space-y-3 border-none shadow-none transition-all duration-300 ">
                      <div className="w-full aspect-[3/4] bg-secondary rounded-xl relative overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="text-center p-3 w-full">
                        <p className="text-md font-medium">{item.category} - {item.brand}</p>
                        {item.description && (
                          <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                        )}
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </SectionWrapper>
      ))}
    </div>
  );
}