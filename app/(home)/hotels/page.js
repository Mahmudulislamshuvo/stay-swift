import HotelList from "@/components/hotel/HotelList";
import Filter from "@/components/search/filter/Filter";

import Search from "@/components/search/Search";

// export const dynamic = "force-dynamic";

const refinedCategory = (category) => {
  const decodedCategory = decodeURI(category);
  if (decodedCategory === "undefined") return "";
  return decodedCategory;
};

const HotelsPage = ({
  searchParams: { destination, checkin, checkout, category, sort, pricerange },
}) => {
  return (
    <>
      <section className="bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center pt-[100px] pb-[60px]">
        <div className="container items-center py-12 ">
          <Search
            fromList={true}
            destination={destination}
            checkin={checkin}
            checkout={checkout}
          />
        </div>
      </section>
      <section className="py-12">
        <div className="container grid grid-cols-12">
          <Filter />
          <HotelList
            destination={destination}
            checkin={checkin}
            checkout={checkout}
            category={refinedCategory(category)}
            sort={sort}
            pricerange={pricerange}
          />
        </div>
      </section>
    </>
  );
};

export default HotelsPage;
