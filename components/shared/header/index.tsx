import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/lib/actions/product.actions";
import Search from "./search";
import Sidebar from "./sidebar";
import { getSetting } from "@/lib/actions/setting.actions";
import CartButton from "./cart-button";
import ScrollEffects from "./scroll-effects";

export default async function Header() {
  const categories = await getAllCategories();
  const { site } = await getSetting();

  return (
    <>
      <header className="fixed top-8 z-50 w-full">
        <div className="flex items-center w-full justify-around h-[60px]">
          <div id="sidebar" className="transition-all duration-300 transform">
            <Sidebar categories={categories} />
          </div>

          <div className="bg-secondary/75 backdrop-blur-2xl saturate-200 rounded-xl px-2 pt-2 flex flex-col justify-center items-center">
            <div className="bg-background p-2 rounded-lg">
              <Link
                href="/"
                className="flex items-center header-button font-semibold tracking-tighter text-2xl"
              >
                <Image
                  src={site.logo}
                  width={40}
                  height={40}
                  alt={`${site.name} logo`}
                />
                {site.name}
              </Link>
            </div>
           <div className="p-2">
           <CartButton />
           </div>
          </div>

          <div id="cart-button" className="transition-all relative duration-300 transform">
            <Search />
          </div>
        </div>
      </header>
      
      <ScrollEffects />
    </>
  );
}