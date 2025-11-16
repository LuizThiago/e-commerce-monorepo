"use Client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  // This function updates the URL with the selected category while preserving other search params
  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString()); // Copy existing params like filter, sort, etc...
    params.set("sort", value); // And set the new category
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-end gap-2 text-sm text-gray-500 my-6">
      <span>Sort by:</span>
      <select
        name="sort"
        id="sort"
        className="ring-1 ring-gray-200 shadow-md rounded-ms p-1 rounded-sm"
        onChange={(e) => handleFilterChange(e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="price-low-high">Price: Low to High</option>
        <option value="price-high-low">Price: High to Low</option>
      </select>
    </div>
  );
};

export default Filter;
