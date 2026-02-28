import BookingCard from "./BookingCard";

const UpcomingBooking = ({ bookings }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">⌛️ Upcoming Bookings</h2>

      {bookings.length === 0 && (
        <p className="text-gray-500">No upcoming bookings.</p>
      )}
      {bookings.length > 0 &&
        bookings.map((booking) => (
          <div key={booking.id} className="bg-[#F6F3E9] p-4 rounded-md">
            <BookingCard
              hotelId={booking?.hotelId}
              checkin={booking?.checkin}
              checkout={booking?.checkout}
            />
          </div>
        ))}
    </div>
  );
};

export default UpcomingBooking;
