// import firebase from "./Firebase";

// import { FireSQL } from "firesql";
// import { isViewed } from "./isViewed";

// import { calculate_ratings, priority } from "./priority";
// import { call } from "react-native-reanimated";

// const fireSQL = new FireSQL(firebase.firestore(), { includeId: true });


// //the three priorities are price_rating,distance_rating and .....
// global.Roomt = [];
// global.Roomo = [];
// const searchMatchingRoom = (uid, tmode = true) => {
//   return new Promise(async(resolve, reject) => {
//     console.log("search matching room called ");

//     var Post;
//     var otherPost;
//     if (tmode) {
//       Post = "tenantPost";
//       otherPost = "ownerPost";
//     } else {
//       Post = "ownerPost";
//       otherPost = "tenantPost";
//     }

//     const DIST_FACTOR = 0.051;

//     var sql_init = `SELECT * FROM ` + Post + ` WHERE authorId = "` + uid + `"`;

//     await fireSQL.query(sql_init).then(async (documents) => {
//       const call_1=async()=>
//       {
//         documents.forEach(async (Room, index) =>
//        {
//         const Room_Location = {
//           latitude: Room.roomData.location.latitude,
//           longitude: Room.roomData.location.longitude,
//         };

//         const latitude_threshold_for_T_greaterthan_O =
//           Room_Location.latitude + DIST_FACTOR;
//         const latitude_threshold_for_T_lessthan_O =
//           Room_Location.latitude - DIST_FACTOR;
//         const longitude_threshold_for_T_greaterthan_O =
//           Room_Location.longitude + DIST_FACTOR;
//         const longitude_threshold_for_T_lessthan_O =
//           Room_Location.longitude - DIST_FACTOR;

//         var sql1 =
//           "SELECT * FROM " +
//           otherPost +
//           " WHERE (`roomData.location.latitude`<" +
//           latitude_threshold_for_T_greaterthan_O +
//           " AND `roomData.location.latitude`>" +
//           Room_Location.latitude +
//           ") OR ";
//         var sql2 =
//           "(`roomData.location.latitude`<" +
//           Room_Location.latitude +
//           " AND `roomData.location.latitude`>" +
//           latitude_threshold_for_T_lessthan_O +
//           ") ";

//         const call_2=async()=>
//         {
//           await fireSQL.query(sql1 + sql2).then(async (documentst) => {
//             documentst.forEach(async (T, tindex) => {
              
//               if (
//                 (T.roomData.location.longitude < Room_Location.longitude &&
//                   T.roomData.location.longitude >
//                     longitude_threshold_for_T_lessthan_O) ||
//                 (T.roomData.location.longitude > Room_Location.longitude &&
//                   T.roomData.location.longitude <
//                     longitude_threshold_for_T_greaterthan_O)
//               ) {
//                 var priorit=await calculate_ratings(T.roomData,Room.roomData)
//                console.log("priority ofroom "+priorit.distance_rating)
//                 console.log(T.__name__);
//                const v=isViewed(T.__name__,uid,!tmode)
//                //console.log('view',view)
               
//                //,viewed:view
//                var myRoom=
//                {roomInfo:T,priority:priorit,view:v}
//               global.Roomt.push(myRoom)
                
                
//               }
  
              
             
//             });
//           })

//         };
//        await call_2()
//       })
//       }

//       await call_1()
//       resolve()
//     })
//   });
// };

// export { searchMatchingRoom };
