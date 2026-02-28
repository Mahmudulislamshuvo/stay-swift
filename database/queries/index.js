import { hotelModel } from "@/models/hotel-model";
import { ratingModel } from "@/models/rating-model";
import { reviewModel } from "@/models/review-model";
import {
  isDateInBetween,
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

import { dbConnect } from "@/lib/mongoDb";
import { bookingModel } from "@/models/booking-model";
import { userModel } from "@/models/userModel";

export async function getAllHotels(destination, checkin, checkout) {
  await dbConnect();

  const regex = new RegExp(destination, "i"); // Case-insensitive regex for matching destination

  const hotelsByDestination = await hotelModel
    .find({ city: { $regex: regex } })
    .select([
      "thumbNailUrl",
      "name",
      "highRate",
      "lowRate",
      "city",
      "propertyCategory",
    ])
    .lean();

  let allHotels = hotelsByDestination;

  // If check-in and check-out dates are provided, filter hotels based on availability
  if (checkin && checkout) {
    allHotels = await Promise.all(
      allHotels.map(async (hotel) => {
        const found = await findBooking(hotel._id, checkin, checkout);

        if (found) {
          hotel["isBooked"] = true;
        } else {
          hotel["isBooked"] = false;
        }

        return hotel;
      }),
    );
  }

  return replaceMongoIdInArray(allHotels);
}

async function findBooking(hotelId, checkin, checkout) {
  const matchBooking = await bookingModel
    .find({ hotelId: hotelId.toString() })
    .lean(); // return a arreay of booking for a hotel

  const found = matchBooking.find((booking) => {
    return (
      isDateInBetween(checkin, booking.checkin, booking.checkout) ||
      isDateInBetween(checkout, booking.checkin, booking.checkout)
    );
  });

  return found;
}

export async function getHotelById(hotelId, checkin, checkout) {
  await dbConnect();
  const hotel = await hotelModel.findById(hotelId).lean();
  if (checkin && checkout) {
    const found = await findBooking(hotelId, checkin, checkout);
    if (found) {
      hotel["isBooked"] = true;
    } else {
      hotel["isBooked"] = false;
    }
  }
  return replaceMongoIdInObject(hotel);
}

export async function getRatingsForAHotel(hotelId) {
  await dbConnect();
  const ratings = await ratingModel.find({ hotelId: hotelId }).lean();
  return replaceMongoIdInArray(ratings);
}

export async function getReviewsForAHotel(hotelId) {
  await dbConnect();
  const reviews = await reviewModel.find({ hotelId: hotelId }).lean();
  return replaceMongoIdInArray(reviews);
}

export async function getUserByEmail(email) {
  await dbConnect();
  const user = await userModel.findOne({ email: email }).lean();
  return replaceMongoIdInObject(user);
}
