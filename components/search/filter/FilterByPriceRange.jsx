"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FilterByPriceRange = () => {
  const [selectedRanges, setSelectedRanges] = useState([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams.toString());

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedRanges((prev) => [...prev, name]);
    } else {
      setSelectedRanges((prev) => prev.filter((range) => range !== name));
    }
  };

  useEffect(() => {
    const category = params.get("pricerange");
    if (category) {
      setSelectedRanges(category.split("|"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedRanges.length > 0) {
      params.set("pricerange", selectedRanges.join("|"));
    } else {
      params.delete("pricerange");
    }

    replace(`${pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRanges]);

  return (
    <div>
      <h3 className="font-bold text-lg">Price Range</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="range1">
          <input
            type="checkbox"
            name="500-1000"
            id="range1"
            onChange={handleCheckboxChange}
            checked={selectedRanges.includes("500-1000")}
          />
          ৳ 500 - ৳ 1000
        </label>

        <label htmlFor="range2">
          <input
            type="checkbox"
            name="1000-1500"
            id="range2"
            onChange={handleCheckboxChange}
            checked={selectedRanges.includes("1000-1500")}
          />
          ৳ 1000 - ৳ 1500
        </label>

        <label htmlFor="range3">
          <input
            type="checkbox"
            name="1500-2000"
            id="range3"
            onChange={handleCheckboxChange}
            checked={selectedRanges.includes("1500-2000")}
          />
          ৳ 1500 - ৳ 2000
        </label>

        <label htmlFor="range4">
          <input
            type="checkbox"
            name="2000-2500"
            id="range4"
            onChange={handleCheckboxChange}
            checked={selectedRanges.includes("2000-2500")}
          />
          ৳ 2000 - ৳ 2500
        </label>

        <label htmlFor="range5">
          <input
            type="checkbox"
            name="2500-3000"
            id="range5"
            onChange={handleCheckboxChange}
            checked={selectedRanges.includes("2500-3000")}
          />
          ৳ 2500 - ৳ 3000
        </label>

        <label htmlFor="range6">
          <input
            type="checkbox"
            name="3000+"
            id="range6"
            onChange={handleCheckboxChange}
            checked={selectedRanges.includes("3000+")}
          />
          ৳ 3000+
        </label>
      </form>
    </div>
  );
};

export default FilterByPriceRange;
