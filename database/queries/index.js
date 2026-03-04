"use server";

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

export async function getAllHotels(
  destination,
  checkin,
  checkout,
  category,
  sort,
  pricerange,
) {
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

  allHotels = allHotels.map((hotel) => ({
    ...hotel,
    avgRate: (hotel.highRate + hotel.lowRate) / 2,
  }));

  if (sort === "hightolow") {
    allHotels.sort((a, b) => b.avgRate - a.avgRate);
  }

  if (sort === "lowtohigh") {
    allHotels.sort((a, b) => a.avgRate - b.avgRate);
  }

  if (category) {
    const categoriesToMatch = category.split("|");

    allHotels = allHotels.filter((hotel) => {
      return categoriesToMatch.includes(hotel.propertyCategory.toString());
    });
  }

  // -------- price range filter --------
  if (pricerange) {
    const decodedRange = decodeURIComponent(pricerange);
    const priceRangesToMatch = decodedRange.split("|");

    allHotels = allHotels.filter((hotel) => {
      return priceRangesToMatch.some((range) => {
        if (range.includes("-")) {
          const [min, max] = range.split("-").map(Number);
          return hotel.avgRate >= min && hotel.avgRate <= max;
        } else if (range.includes("+")) {
          const min = Number(range.replace("+", ""));
          return hotel.avgRate >= min;
        }
        return false;
      });
    });
  }

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

export async function getBookingsByUserId(userId) {
  await dbConnect();
  const bookings = await bookingModel.find({ userId: userId }).lean();
  return replaceMongoIdInArray(bookings);
}

export async function getDestinations(searchTerm) {
  await dbConnect();
  const regex = new RegExp(searchTerm, "i");
  const destinations = await hotelModel.distinct("city", {
    city: { $regex: regex },
  });
  return destinations.slice(0, 5);
}
