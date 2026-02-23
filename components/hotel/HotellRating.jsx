import { getRatingsForAHotel } from "@/database/queries";

const HotellRating = async ({ id }) => {
  const ratings = await getRatingsForAHotel(id);

  let avgRatings = 0;

  if (ratings?.length > 0) {
    const totalRatings = ratings.reduce(
      (sum, currentRating) => sum + currentRating.rating,
      0,
    );
    avgRatings = totalRatings / ratings.length;
  }

  const ratingComment = (rating) => {
    if (rating === 0) return "No Rating";
    if (rating > 0 && rating < 2) return "Very Poor";
    if (rating >= 2 && rating < 3) return "Poor";
    if (rating >= 3 && rating < 4) return "Average";
    if (rating >= 4 && rating < 5) return "Good";
    if (rating === 5) return "Excellent";

    return "Invalid Rating";
  };

  return (
    <>
      <div className="bg-primary w-[35px] h-[35px] rounded-sm text-white grid place-items-center font-bold">
        {avgRatings.toFixed(1)}
      </div>
      <span className="font-medium">{ratingComment(avgRatings)}</span>
    </>
  );
};

export default HotellRating;
