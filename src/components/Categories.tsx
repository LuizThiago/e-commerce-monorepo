"use client";

import {
  Briefcase,
  Footprints,
  Glasses,
  Hand,
  Shirt,
  ShoppingBasket,
  Venus,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// TEMPORARY --->
const categories = [
  {
    name: "All",
    icon: <ShoppingBasket className="w-4 h-4" />,
    slug: "all",
  },
  {
    name: "T-shirts",
    icon: <Shirt className="w-4 h-4" />,
    slug: "t-shirts",
  },
  {
    name: "Shoes",
    icon: <Footprints className="w-4 h-4" />,
    slug: "shoes",
  },
  {
    name: "Accessories",
    icon: <Glasses className="w-4 h-4" />,
    slug: "accessories",
  },
  {
    name: "Bags",
    icon: <Briefcase className="w-4 h-4" />,
    slug: "bags",
  },
  {
    name: "Dresses",
    icon: <Venus className="w-4 h-4" />,
    slug: "dresses",
  },
  {
    name: "Jackets",
    icon: <Shirt className="w-4 h-4" />,
    slug: "jackets",
  },
  {
    name: "Gloves",
    icon: <Hand className="w-4 h-4" />,
    slug: "gloves",
  },
];
// <--- TEMPORARY

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const selectedCategory = searchParams.get("category");

  // This function updates the URL with the selected category while preserving other search params
  const handleChangeCategory = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString()); // Copy existing params like filter, sort, etc...
    params.set("category", categorySlug || "all"); // And set the new category
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      className={
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 bg-gray-100 p-2 rounded-lg mb-4 text-sm"
      }
    >
      {categories.map((category) => (
        <div
          className={`flex items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded-md ${
            selectedCategory === category.slug
              ? "bg-[#fac23c]"
              : "text-gray-700"
          }`}
          key={category.name}
          onClick={() => handleChangeCategory(category.slug)}
        >
          {category.icon} {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
