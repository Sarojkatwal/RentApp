import haversine from "haversine";
function calculate_ratings(Room1, Room2) {
  const POWER_FACTOR = 0.5;
  const DISTANCE_RATING_FULL = 5;
  const PRICE_FULL_RATING = 4;
  const TYPE_FULL_RATING = 1;

  var ratings = {};

  const haversine_distance = haversine(Room1.location, Room2.location);
  const MULTIPLICATION_FACTOR = DISTANCE_RATING_FULL / 5;
  if (haversine_distance <= 1) {
    ratings.distance_rating = DISTANCE_RATING_FULL;
  } else {
    ratings.distance_rating =
      DISTANCE_RATING_FULL /
      Math.pow(haversine_distance * MULTIPLICATION_FACTOR, POWER_FACTOR);
  }

  const d = Math.abs(parseFloat(Room1.price) - parseFloat(Room2.price));

  var r;
  if (d > 1000) {

    r = Room2.price / Room1.price
    if (r > 1) {
      r = 1 / r;
    }

    ratings.price_rating = rating(d, r, PRICE_FULL_RATING);

  } else {
    ratings.price_rating = PRICE_FULL_RATING;
  }

  // code for type_rating

  if (Room1.roomType == Room2.roomType) {
    ratings.type_rating = 1
  }
  else { ratings.type_rating = 0 }
  ratings.distance = haversine_distance
  return ratings;
}
function power(x) {
  return 0.5 / (x + 1) - 0.2;
}
function rating(d, r, x) {
  return Math.pow(r / Math.pow(d / 100, d / 10000), power(r)) * x;
}

function sum_priority(priority) {
  return priority.price_rating + priority.distance_rating + priority.type_rating;
}
export { calculate_ratings, sum_priority };