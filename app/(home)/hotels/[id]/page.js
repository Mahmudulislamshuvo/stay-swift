import Gallery from "@/components/hotel/details/Gallery";
import Overview from "@/components/hotel/details/Overview";
import Summary from "@/components/hotel/details/Summary";
import { getHotelById } from "@/database/queries";

const HotelDetailsPage = async ({
  params: { id },
  searchParams: { checkin, checkout },
}) => {
  const singleHotelInfo = await getHotelById(id, checkin, checkout);

  return (
    <>
      <Summary hotel={singleHotelInfo} />
      <Gallery gallery={singleHotelInfo?.gallery} />
      <Overview overview={singleHotelInfo?.overview} />
    </>
  );
};

export default HotelDetailsPage;
