"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ICarousel } from "@/types";

export function HomeCarousel({ items }: { items: ICarousel[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const t = useTranslations("Home");

  return (
    <Carousel
      dir="ltr"
      plugins={[plugin.current]}
      className="w-full mx-auto relative group "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {items?.map((item) => (
          <CarouselItem key={item.title}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative z-10 w-full "
            >
              {/* Optional top title section */}
            </motion.div>

            {/* Animated Image Container */}
            <motion.div
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex md:aspect-[16/6] aspect-[3/4]  items-center justify-center relative overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            {/* Text & Button Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="h-full flex flex-col  w-full "
            >
              <div className="bg-secondary space-y-4 p-[24px]">
                <motion.h2
                  whileHover={{
                    letterSpacing: "0.03em",
                    transition: { duration: 0.3 },
                  }}
                  className={cn(
                    "text-3xl lg:text-9xl md:text-6xl font-medium leading-tight tracking-tighter",
                    "text-foreground"
                  )}
                >
                  {item.title}
                </motion.h2>

                <motion.div whileHover={{ x: 4 }}>
                  <Link
                    href={item.url}
                    className="border-b-2 hover:opacity-80 text-muted-foreground font-medium text-md  inline-block"
                  >
                    {t(item.buttonCaption)}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation Arrows - Hidden on mobile */}
      {/* <CarouselPrevious 
        className="hidden md:flex left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        variant="secondary"
        size="lg"
      />
      <CarouselNext 
        className="hidden md:flex right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        variant="secondary"
        size="lg"
      /> */}
    </Carousel>
  );
}
