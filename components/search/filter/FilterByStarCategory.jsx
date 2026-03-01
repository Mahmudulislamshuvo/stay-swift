"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FilterByStarCategory = () => {
  const [query, setQuery] = useState([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams.toString());

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setQuery((prev) => [...prev, name]);
    } else {
      setQuery((prev) => prev.filter((q) => q !== name));
    }
  };

  useEffect(() => {
    const category = params.get("category");
    if (category) {
      setQuery(category.split("|").map((c) => decodeURI(c)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      params.set("category", encodeURI(query.join("|")));
    } else {
      params.delete("category");
    }

    replace(`${pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div>
      <h3 className="font-bold text-lg">Star Category</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="fiveStar">
          <input
            type="checkbox"
            name="5"
            id="fiveStar"
            onChange={handleChange}
            checked={query.includes("5")}
          />
          5 Star
        </label>

        <label htmlFor="fourStar">
          <input
            type="checkbox"
            name="4"
            id="fourStar"
            onChange={handleChange}
            checked={query.includes("4")}
          />
          4 Star
        </label>

        <label htmlFor="threeStar">
          <input
            type="checkbox"
            name="3"
            id="threeStar"
            onChange={handleChange}
            checked={query.includes("3")}
          />
          3 Star
        </label>

        <label htmlFor="twoStar">
          <input
            type="checkbox"
            name="2"
            id="twoStar"
            onChange={handleChange}
            checked={query.includes("2")}
          />
          2 Star
        </label>

        <label htmlFor="oneStar">
          <input
            type="checkbox"
            name="1"
            id="oneStar"
            onChange={handleChange}
            checked={query.includes("1")}
          />
          1 Star
        </label>
      </form>
    </div>
  );
};

export default FilterByStarCategory;
