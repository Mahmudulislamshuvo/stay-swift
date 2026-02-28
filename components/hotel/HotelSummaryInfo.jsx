import Link from "next/link";
import HotellRating from "./HotellRating";
import HotelReviewNumber from "./HotelReviewNumber";

const HotelSummaryInfo = ({ fromListPage, hotel, checkin, checkout }) => {
  let params = "";

  if (checkin && checkout) {
    params = `?checkin=${checkin}&checkout=${checkout}`;
  }

  return (
    <>
      <div className={fromListPage ? "flex-1" : "flex-1 container"}>
        <Link href={`/hotels/${hotel?.id}${params}`}>
          <h2
            className={
              fromListPage ? "font-bold text-lg" : "font-bold text-2xl"
            }
          >
            {hotel?.name}
          </h2>
        </Link>
        <p>{hotel?.city}</p>
        <div className="flex gap-2 items-center my-4">
          <HotellRating id={hotel?.id} />
          <HotelReviewNumber id={hotel?.id} />
          {hotel?.isBooked && (
            <span className="text-green-500 font-medium">Sold Out</span>
          )}
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
          <Link className="btn-primary" href={`/hotels/${hotel?.id}${params}`}>
            Details
          </Link>
        ) : (
          <button
            className={hotel?.isBooked ? "btn-disabled" : "btn-primary"}
            disabled={hotel?.isBooked}
          >
            Book
          </button>
        )}
      </div>
    </>
  );
};

export default HotelSummaryInfo;
