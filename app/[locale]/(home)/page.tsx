import BrowsingHistoryList from "@/components/shared/browsing-history-list";
import { HomeCard } from "@/components/shared/home/home-card";
import { HomeCarousel } from "@/components/shared/home/home-carousel";
import CategoryScroll from "@/components/shared/home/shop-by-style";
import ProductSlider from "@/components/shared/product/product-slider";

import {
  getProductsForCard,
  getProductsByTag,
  getAllCategories,
} from "@/lib/actions/product.actions";
import { getSetting } from "@/lib/actions/setting.actions";
import { toSlug } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("Home");
  const { carousels } = await getSetting();
  const todaysDeals = await getProductsByTag({ tag: "todays-deal" });
  const bestSellingProducts = await getProductsByTag({ tag: "best-seller" });

  const categories = (await getAllCategories()).slice(0, 4);
  const newArrivals = await getProductsForCard({
    tag: "new-arrival",
  });
  const featureds = await getProductsForCard({
    tag: "featured",
  });
  const bestSellers = await getProductsForCard({
    tag: "best-seller",
  });

  const cards = [
    // {
    //   title: t('Categories to explore'),
    //   variant: 'grid',
    //   link: {
    //     text: t('See More'),
    //     href: '/search',
    //   },
    //   items: categories?.map((category) => ({
    //     name: category,
    //     image: `/images/${toSlug(category)}.png`,
    //     href: `/search?category=${category}`,
    //   })),
    // },
    {
      title: t("Explore New Arrivals"),
      variant: "hero",
      items: newArrivals,
      link: {
        text: t("View All"),
        href: "/search?tag=new-arrival",
      },
    },
    {
      title: t("Discover Best Sellers"),
      variant: "banner",
      items: bestSellers,
      link: {
        text: t("View All"),
        href: "/search?tag=new-arrival",
      },
    },
    {
      title: t("Featured Products"),
      variant: "hero",
      items: featureds,
      link: {
        text: t("Shop Now"),
        href: "/search?tag=new-arrival",
      },
    },
  ];

  return (
    <>
      <HomeCarousel items={carousels} />
      <div className="md:space-y-4  bg-secondary">
        <CategoryScroll
          title={t("Categories to explore")}
          variant="scroll"
          // link={{ text: t('See More'), href: '/search' }}
          items={categories?.map((category) => ({
            name: category,
            image: `/images/${toSlug(category)}.jpg`,
            href: `/search?category=${category}`,
          }))}
        />
        <HomeCard cards={cards} />
        <ProductSlider title={t("Today's Deals")} products={todaysDeals} />

        <ProductSlider
          title={t("Best Selling Products")}
          products={bestSellingProducts}
          
        />
      </div>

      <div className="p-4 bg-background">
        <BrowsingHistoryList />
      </div>
    </>
  );
}
