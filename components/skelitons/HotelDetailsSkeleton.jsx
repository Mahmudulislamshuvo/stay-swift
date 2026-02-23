const HotelDetailsSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* --- Summary Skeleton --- */}
      <section className="py-4 mt-[100px]">
        <div className="flex container gap-6">
          {/* Left Side (Info) */}
          <div className="flex-1 container">
            {/* Title Skeleton */}
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            {/* City Skeleton */}
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>

            {/* Rating & Review Skeleton */}
            <div className="flex gap-2 items-center my-4">
              <div className="w-[35px] h-[35px] bg-gray-200 rounded-sm"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>

            {/* Star Category Skeleton */}
            <div className="h-8 bg-gray-200 rounded-md w-1/3 mt-2"></div>
          </div>

          {/* Right Side (Price & Button) */}
          <div className="flex flex-col gap-2 items-end justify-center">
            {/* Price Skeleton */}
            <div className="h-8 bg-gray-200 rounded w-32 mb-1"></div>
            {/* Per Night text Skeleton */}
            <div className="h-4 bg-gray-200 rounded w-40 mb-3"></div>
            {/* Book Button Skeleton */}
            <div className="h-10 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </section>

      {/* --- Gallery Skeleton --- */}
      <section className="container mt-8">
        <div className="grid grid-cols-2 gap-2">
          {/* Big Image (Left) */}
          <div className="bg-gray-200 h-[400px] w-full rounded-md"></div>

          {/* 4 Small Images (Right) */}
          <div className="grid grid-cols-2 grid-rows-2 gap-2 h-[400px]">
            <div className="bg-gray-200 w-full h-full rounded-md"></div>
            <div className="bg-gray-200 w-full h-full rounded-md"></div>
            <div className="bg-gray-200 w-full h-full rounded-md"></div>
            <div className="bg-gray-200 w-full h-full rounded-md"></div>
          </div>
        </div>
      </section>

      {/* --- Overview Skeleton --- */}
      <section>
        <div className="container py-8">
          {/* Heading Skeleton */}
          <div className="h-6 bg-gray-200 rounded w-32 my-4"></div>

          {/* Paragraph Lines Skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-11/12"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelDetailsSkeleton;
