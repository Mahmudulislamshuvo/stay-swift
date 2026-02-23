import HotellRating from "./HotellRating";

const HotelSummaryInfo = ({ fromListPage, hotel }) => {
  return (
    <>
      <div className={fromListPage ? "flex-1" : "flex-1 container"}>
        <h2
          className={fromListPage ? "font-bold text-lg" : "font-bold text-2xl"}
        >
          {hotel?.name}
        </h2>
        <p>{hotel?.city}</p>
        <div className="flex gap-2 items-center my-4">
          <HotellRating id={hotel?.id} />
          <span>232 Reviews</span>
        </div>
        <div className="bg-yellow-300 py-1 px-3 rounded-md w-1/3">
          {hotel?.propertyCategory} Star Property
        </div>
      </div>

      <div className="flex flex-col gap-2 items-end justify-center">
        <h2 className="text-2xl font-bold text-right">
          {`${(hotel?.highRate + hotel?.lowRate) / 2}/Night`}
        </h2>
        <p className=" text-right">Per Night for 1 Rooms</p>
        {fromListPage ? (
          <button className="btn-primary">Details</button>
        ) : (
          <button className="btn-primary">Book</button>
        )}
      </div>
    </>
  );
};

export default HotelSummaryInfo;
