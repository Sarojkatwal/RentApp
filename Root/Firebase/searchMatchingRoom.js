import firebase from './Firebase'
import { calculate_ratings, priority } from "./priority";
import { FireSQL } from "firesql";

const fireSQL = new FireSQL(firebase.firestore());
global.Room_priority1 = [];
global.Room_priority2 = [];

//the three priorities are price_rating,distance_rating and .....

last_fetched = new Date();
async function searchMatchingRoom(uid, isSearchingForTenant = true, onPush) {
  var time_ref = new Date();

  var Post;
  var otherPost;
  if (isSearchingForTenant) {
    Post = "tenantPost";
    otherPost = "ownerPost";
  } else {
    Post = "ownerPost";
    otherPost = "tenantPost";
  }

  const DIST_FACTOR = 0.051;

  var sql_init = `SELECT * FROM ` + Post + ` WHERE authorId = "` + uid + `"`;

  fireSQL.query(sql_init).then((documents) => {
    if (global.Room_priority1.length != 0) {
      //global.global.Room_priority2 = global.global.Room_priority1;
      //global.global.Room_priority1=[];
      global.Room_priority2 = [];
      global.Room_priority1.forEach((Room, index) => {
        if (Room.viewed) {
          global.Room_priority2.push(Room);
          global.Room_priority1.splice(index, index + 1);//delete Room from priority 1 if viewed by the user
        }
      });
    }
    documents.forEach((Room) => {
      const Room_Location = {
        latitude: Room.roomData.location.latitude,
        longitude: Room.roomData.location.longitude,
      };

      const latitude_threshold_for_T_greaterthan_O =
        Room_Location.latitude + DIST_FACTOR;
      const latitude_threshold_for_T_lessthan_O =
        Room_Location.latitude - DIST_FACTOR;
      const longitude_threshold_for_T_greaterthan_O =
        Room_Location.longitude + DIST_FACTOR;
      const longitude_threshold_for_T_lessthan_O =
        Room_Location.longitude - DIST_FACTOR;

      var sql1 =
        "SELECT * FROM " +
        otherPost +
        " WHERE (`location.latitude`<" +
        latitude_threshold_for_T_greaterthan_O +
        " AND `location.latitude`>" +
        Room_Location.latitude +
        ") OR ";
      var sql2 =
        "(`location.latitude`<" +
        Room_Location.latitude +
        " AND `location.latitude`>" +
        latitude_threshold_for_T_lessthan_O +
        ") ";

      fireSQL.query(sql1 + sql2).then((documents) => {
        //console.log(documents)
        function returnPromise() {
          return new Promise((resolve, reject) => {
            documents.forEach((T) => {
              if (
                (T.location.longitude < Room_Location.longitude &&
                  T.location.longitude >
                    longitude_threshold_for_T_lessthan_O) ||
                (T.location.longitude > Room_Location.longitude &&
                  T.location.longitude <
                    longitude_threshold_for_T_greaterthan_O)
                // &&  T.createdAt > last_fetched
              ) {
                
                var T_rating=calculate_ratings(T,Room)
                var full_room={
                  Roominfo: T,
                  priority: T_rating,
                  viewed: false,
                }
                var new_array = [];//just for sorting
                var flag = false;//just for sorting
                var i = 0;//for sorting
                while (i < global.Room_priority1.length) {
                  if (
                    priority(full_room) < priority(global.Room_priority1[i]) ||
                    flag == true
                  ) {
                    new_array.push(global.Room_priority1[i]);
                    i++;
                  } else {
                    new_array.push(full_room);
                    flag = true;
                  }
                }
                if (flag == false) {
                  new_array.push(full_room);
                }
                global.Room_priority1 = new_array;
                
                
              }
            });
          });
        }

        async function call()
        {
          
          returnPromise();
          
          
          onPush();

        }
        
        call();
      });
    });
  });
  
  last_fetched = time_ref;
}

export { searchMatchingRoom };
