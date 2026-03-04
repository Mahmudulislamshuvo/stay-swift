"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SortBy = () => {
  const [sortBy, setSortBy] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortBy) {
      params.set("sort", sortBy);
    } else {
      params.delete("sort");
    }
    replace(`${pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  return (
    <div>
      <h3 className="font-bold text-lg">Sort By</h3>

      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="hightolow">
          <input
            type="radio"
            name="sort"
            value="hightolow"
            id="hightolow"
            onChange={handleChange}
            className="mr-1"
          />
          Price High to Low
        </label>

        <label htmlFor="lowtohigh">
          <input
            type="radio"
            name="sort"
            value="lowtohigh"
            id="lowtohigh"
            onChange={handleChange}
            className="mr-1"
          />
          Price Low to High
        </label>
      </div>
    </div>
  );
};

export default SortBy;
