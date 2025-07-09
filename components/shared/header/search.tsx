"use client";

import { useEffect, useState, KeyboardEvent } from "react";
import { TbSearch } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { IconSearch } from "@tabler/icons-react";

export default function Search() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const popularTags = [
    { name: "New Arrivals", slug: "new-arrivals" },
    { name: "Featured", slug: "featured-products" },
    { name: "Best Sellers", slug: "best-sellers" },
    { name: "Today's Deals", slug: "todays-deals" },
  ];

  const toggleSearch = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePopularTagClick = (slug: string) => {
    router.push(`/search?tag=${slug}`);
    closeSearch();
  };

  const closeSearch = () => {
    setIsExpanded(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isExpanded]);

  const overlay = (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="fixed inset-0 w-screen h-screen bg-background z-[9999] p-4 flex flex-col overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="md:flex items-center gap-8 w-full">
              <h2 className="font-bold italic hidden md:block">S</h2>
              <motion.div
                className="relative flex-1 max-w-2xl"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="absolute inset-y-0 left-0 flex items-center ">
                  <TbSearch size={30} className="text-gray-500 " />
                </div>
                <input
                  autoFocus
                  className="w-full text-3xl py-3 pl-10 pr-4 outline-none transition-all duration-200"
                  placeholder="Search"
                  name="q"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </motion.div>
            </div>
            <Button
              variant="ghost"
              onClick={toggleSearch}
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Cancel
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <h3 className="text-lg font-semibold text-muted-foreground mb-4">
              Popular
            </h3>
            <div className="flex flex-col gap-3">
              {popularTags.map((tag, index) => (
                <motion.div
                  key={tag.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <h3
                    onClick={() => handlePopularTagClick(tag.slug)}
                    className=" text-2xl font-medium  transition-all duration-200 hover:scale-105"
                  >
                    {tag.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        onClick={toggleSearch}
        className="text-center py-1 font-semibold"
      >
        <IconSearch size={30}/>
      </button>
      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
