import firebase from "./config";
import { FireSQL } from "firesql";
import "firesql/rx";
//import 'haversine';
import haversine from "haversine";
//import haversine from "haversine";

const fireSQL = new FireSQL(firebase.firestore());

const fetchRoom = (uid, isOwner, onFetch) => {
  const DIST_FACTOR = 0.051;

  const Rooms = [];
  if (isOwner) {
    var sql_owner = `SELECT * FROM ownerPost WHERE authorId = "` + uid + `"`;

    fireSQL.rxQuery(sql_owner).subscribe((documents) => {
      documents.forEach((Room) => {
        //console.log(doc.authorId);
        const ownerRoom_location = {
          latitude: Room.location.latitude,
          longitude: Room.location.longitude,
        };

        const latitude_threshold_for_T_greaterthan_O =
          ownerRoom_location.latitude + DIST_FACTOR;
        const latitude_threshold_for_T_lessthan_O =
          ownerRoom_location.latitude - DIST_FACTOR;
        const longitude_threshold_for_T_greaterthan_O =
          ownerRoom_location.longitude + DIST_FACTOR;
        const longitude_threshold_for_T_lessthan_O =
          ownerRoom_location.longitude - DIST_FACTOR;

        var sql1 =
          "SELECT * FROM tenantPost WHERE (`location.latitude`<" +
          latitude_threshold_for_T_greaterthan_O +
          " AND `location.latitude`>" +
          ownerRoom_location.latitude +
          ") OR ";
        var sql2 =
          "(`location.latitude`<" +
          ownerRoom_location.latitude +
          " AND `location.latitude`>" +
          latitude_threshold_for_T_lessthan_O +
          ") ";
        // var sql3="((`location.longitude`<"+longitude_threshold_for_T_greaterthan_O+" AND `location.longitude`>"+ownerRoom_location.longitude+") OR "
        //var sql4="(`location.longitude`<"+ownerRoom_location.longitude+" AND `location.longitude`>"+longitude_threshold_for_T_lessthan_O+"))"
        var sql5 = sql1 + sql2;

        fireSQL.rxQuery(sql5).subscribe((documents) => {
          documents.forEach((T) => {
            if (
              (T.location.longitude < ownerRoom_location.longitude &&
                T.location.longitude > longitude_threshold_for_T_lessthan_O) ||
              (T.location.longitude > ownerRoom_location.longitude &&
                T.location.longitude < longitude_threshold_for_T_greaterthan_O)
            ) {
              Rooms.push(T);
              var rating0=calculate_ratings(T, Room, true)
              console.log(rating0.distance_rating);
              console.log(rating0.price_rating)
            }
          });
        });
      });
      onFetch(Rooms);
    });
  }
};
function square(x) {
  return x * x;
}
function calculate_ratings(Room1, Room2, forOwner) {
  const POWER_FACTOR = 0.5;
  const DISTANCE_RATING_FULL = 4;
  const PRICE_FULL_RATING = 3;
  const TYPE_FULL_RATING = 3;

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
  console.log("distance in km ",haversine_distance)
  const d = Math.abs(Room1.price - Room2.price);
  var r;
  if(d>100)
  {
    r = Room2.price / Room1.price;
    r = Room1.price > Room2.price ? r : 1 / r;
     
    ratings.price_rating=rating(d,r,PRICE_FULL_RATING)
  }
  else{
      ratings.price_rating=PRICE_FULL_RATING;

  }
  return ratings;
}
function power(x) {
  return 0.5 / (x + 1) - 0.2;
}

function rating(d, r,x) {
  return Math.pow(r / Math.pow(d / 100, d / 10000), power(r)) * x;
}

export { fetchRoom };
