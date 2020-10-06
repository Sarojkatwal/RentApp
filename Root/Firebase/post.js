import firebase from "./config";
import { FireSQL } from "firesql";
import "firesql/rx";
const fireSQL = new FireSQL(firebase.firestore());

const fetchRoom = (uid, isOwner,onFetch) =>
 {
  const DIST_FACTOR = 0.051;

  const Rooms = [];
  if (isOwner) {
    

    
    var sql_owner = `SELECT * FROM ownerPost WHERE authorId = "` + uid + `"`
    
    
    

fireSQL.rxQuery(sql_owner).subscribe((documents) => {
            documents.forEach((Room) => {
              //console.log(doc.authorId);
               const ownerRoom_location={
                    latitude:Room.location.latitude,
                    longitude:Room.location.longitude

                }
                console.log("owner location latitude "+ownerRoom_location.latitude)
                const latitude_threshold_for_T_greaterthan_O=ownerRoom_location.latitude + DIST_FACTOR
                const latitude_threshold_for_T_lessthan_O=ownerRoom_location.latitude-DIST_FACTOR
                const longitude_threshold_for_T_greaterthan_O=ownerRoom_location.longitude + DIST_FACTOR
                const longitude_threshold_for_T_lessthan_O=ownerRoom_location.longitude-DIST_FACTOR

                var sql1="SELECT * FROM tenantPost WHERE (`location.latitude`<"+latitude_threshold_for_T_greaterthan_O+" AND `location.latitude`>"+ownerRoom_location.latitude+") OR "
                var sql2="(`location.latitude`<"+ownerRoom_location.latitude+" AND `location.latitude`>"+latitude_threshold_for_T_lessthan_O+") "
                var sql3="((`location.longitude`<"+longitude_threshold_for_T_greaterthan_O+" AND `location.longitude`>"+ownerRoom_location.longitude+") OR "
                var sql4="(`location.longitude`<"+ownerRoom_location.longitude+" AND `location.longitude`>"+longitude_threshold_for_T_lessthan_O+"))"
                var sql5=sql1+sql2
                console.log(sql5)
                fireSQL.rxQuery(sql5).subscribe((documents)=>
                {
                   documents.forEach((T)=>
                   {
                       if((T.location.longitude<ownerRoom_location.longitude && T.location.longitude>longitude_threshold_for_T_lessthan_O) || (T.location.longitude>ownerRoom_location.longitude && T.location.longitude<longitude_threshold_for_T_greaterthan_O))
                       {
                           Rooms.push(T)
                       }


                   })
                })
              
            })
            onFetch(Rooms)





            })
       

     
  }
  }
export { fetchRoom };
