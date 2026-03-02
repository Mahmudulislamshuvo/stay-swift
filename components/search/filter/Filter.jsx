import FilterByAmenities from "./FilterByAmenities";
import FilterByPriceRange from "./FilterByPriceRange";
import FilterByStarCategory from "./FilterByStarCategory";
import SortBy from "./SortBy";

const Filter = () => {
  return (
    <>
      <div className="col-span-3 space-y-4">
        <SortBy />

        <FilterByPriceRange />

        <FilterByStarCategory />

        <FilterByAmenities />
      </div>
    </>
  );
};

export default Filter;
