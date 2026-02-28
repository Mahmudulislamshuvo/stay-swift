import HotelSummaryInfo from "./HotelSummaryInfo";

import Images from "./Images";

const HotelCard = ({ hotel, checkin, checkout }) => {
  return (
    <div className="flex gap-6 border border-gray/20 p-4 rounded-md">
      <Images hotel={hotel} />
      <HotelSummaryInfo
        fromListPage={true}
        hotel={hotel}
        checkin={checkin}
        checkout={checkout}
      />
    </div>
  );
};

export default HotelCard;
