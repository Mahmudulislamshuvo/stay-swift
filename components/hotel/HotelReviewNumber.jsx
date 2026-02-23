import { getReviewsForAHotel } from "@/database/queries";
import Link from "next/link";

const HotelReviewNumber = async ({ id }) => {
  const reviews = await getReviewsForAHotel(id);

  return (
    <>
      {reviews.length === 0 ? (
        <Link href={`/hotel/${id}/review`}>Write a Review</Link>
      ) : (
        <Link href={`/hotel/${id}/review`}>{reviews.length} Reviews</Link>
      )}
    </>
  );
};

export default HotelReviewNumber;
