import firebase from "./Firebase";

import { FireSQL } from "firesql";
import { isViewed } from "./isViewed";

import { calculate_ratings, sum_priority } from "./priority";
import { call } from "react-native-reanimated";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: true });

//the three priorities are price_rating,distance_rating and .....
global.Roomt = [];
global.Roomo = [];

const getMyRoom = (uid, Post) => {
  return new Promise((resolve, reject) => {
    var sql_init = `SELECT * FROM ` + Post + ` WHERE authorId = "` + uid + `"`;

    fireSQL
      .query(sql_init)
      .then((userDocuments) => {
        resolve(userDocuments);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const startSearch = (uid, tmode = true) => {
  return new Promise((resolvef, rejectf) => {
    const DIST_FACTOR = 0.031;
    var Post;
    var otherPost;
    if (tmode) {
      Post = "tenantPost";
      otherPost = "ownerPost";
    } else {
      Post = "ownerPost";
      otherPost = "tenantPost";
    }
    getMyRoom(uid, Post, tmode)
      .then((userDocuments) => {
        if (userDocuments.length !== 0) {
          userDocuments.forEach((Room) => {
            // console.log('your room is ')
            // console.log(Room.roomData.location.name)
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
              " WHERE (`roomData.location.latitude`<" +
              latitude_threshold_for_T_greaterthan_O +
              " AND `roomData.location.latitude`>" +
              latitude_threshold_for_T_lessthan_O +
              ")";
            const getForEachRoom = () => {
              return new Promise((res, rej) => {
                fireSQL
                  .query(sql1)
                  .then((Rooms) => {
                    res(Rooms);
                  })
                  .catch((err) => {
                    rej(err);
                  });
              });
            };
            getForEachRoom().then(async (rooms) => {
              // console.log('before filtering the longitude rooms found are ')
              //console.log(rooms.length)
              rooms = await rooms.filter((T) => {
                return (
                  // (T.roomData.location.longitude < Room_Location.longitude &&
                  //   T.roomData.location.longitude >
                  //     longitude_threshold_for_T_lessthan_O) ||
                  // (T.roomData.location.longitude > Room_Location.longitude &&
                  //   T.roomData.location.longitude <
                  //     longitude_threshold_for_T_greaterthan_O)
                  (T.roomData.location.longitude < longitude_threshold_for_T_greaterthan_O &&
                    T.roomData.location.longitude >
                    longitude_threshold_for_T_lessthan_O)
                );
              });
              // console.log('after filtering the longitude')
              //rooms.forEach((room) => { //console.log(room.roomData.location.name) })
              if (tmode) {
                rooms.forEach((room) => {
                  var priority_ = calculate_ratings(Room.roomData, room.roomData);

                  //var v=isViewed(room.__name__,uid,tmode)

                  var full_room = {
                    matchedTo: Room.roomData.location.name,
                    matchedToId: Room.__name__,
                    roomInformation: room,
                    ratings: priority_,
                    view: false,
                  };

                  var new_array = []; //just for sorting
                  var flag = false; //just for sorting
                  var i = 0; //for sorting
                  while (i < global.Roomt.length) {
                    if (
                      sum_priority(full_room.ratings) <
                      sum_priority(global.Roomt[i].ratings) ||
                      flag == true
                    ) {
                      new_array.push(global.Roomt[i]);
                      i++;
                    } else {
                      new_array.push(full_room);
                      flag = true;
                    }
                  }
                  if (flag == false) {
                    new_array.push(full_room);
                  }
                  global.Roomt = new_array;
                  var ids = global.Roomt.map(function (obj) { //fitering duplicates 
                    return obj.roomInformation.__name__;
                  });

                  global.Roomt = global.Roomt.filter(function (item, pos) {
                    return ids.indexOf(item.roomInformation.__name__) == pos;
                  });
                  resolvef()
                });
              } else {
                rooms.forEach((room) => {
                  var priority_ = calculate_ratings(Room.roomData, room.roomData);

                  //var v=isViewed(room.__name__,uid,tmode)


                  var full_room = {
                    matchedTo: Room.roomData.location.name,
                    matchedToId: Room.__name__,
                    roomInformation: room,
                    ratings: priority_,
                    view: false,
                  };
                  var new_array = []; //just for sorting
                  var flag = false; //just for sorting
                  var i = 0; //for sorting
                  while (i < global.Roomo.length) {
                    if (
                      sum_priority(full_room.ratings) <
                      sum_priority(global.Roomo[i].ratings) ||
                      flag == true
                    ) {
                      new_array.push(global.Roomo[i]);
                      i++;
                    } else {
                      new_array.push(full_room);
                      flag = true;
                    }
                  }
                  if (flag == false) {
                    new_array.push(full_room);
                  }
                  global.Roomo = new_array;
                  var ids = global.Roomo.map(function (obj) { //fitering duplicates 
                    return obj.roomInformation.__name__;
                  });
                  global.Roomo = global.Roomo.filter(function (item, pos) {
                    return ids.indexOf(item.roomInformation.__name__) == pos;
                  });
                  resolvef()
                });
              }
            });
          });
        }
        else {
          resolvef()
        }
      })
      .catch((err) => {
        rejectf(err);
      });

  })

};
export { startSearch };