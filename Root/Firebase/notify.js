import firebase from './Firebase'


const save_likeNotifications=async (likedById,postId,roomFromIsOwner=true)=>
{
  var collectionName=roomFromIsOwner ? 'like_notifications_omode' : 'like_notifications_tmode'
  var post=roomFromIsOwner ? 'ownerPost' : 'tenantPost'
  var userId=firebase.firestore().collection(post).doc(postId).then((document)=>
  {
    return document.authorId
  })
var notification={
  likedBy:likedById,
  likedPost:postId,
  postOf:userId,
  isViewed:false,
  likedAt=firebase.firestore.Timestamp.fromDate(new Date())
}
firebase.firestore().collection(collectionName).add(notification)



}



const increaseLikeCount=async (postId,isOwner)=>
{
  var post=isOwner? 'ownerPost' : 'tenantPost'
  var postref=firebase.firestore().collection(post).doc(postId)
  postref.onSnapshot((document)=>
  {
    var likes_count=document.like_count
    postref.set({like_count:likes_count},{merge:true})
    
  }
  )
}

const save_matchingRoomNotifications=(roomId,roomMatchedToUserId,ratings,roomFromIsOwner=true)=>
{
  var collectionName=roomFromIsOwner ? 'match_notifications_omode' : 'match_notifications_tmode'
firebase.firestore().collection(collectionName).add({
  postId:roomId,
  matchedTo:roomMatchedToUserId,
  isViewed:false,
  rating:ratings,
  savedAt=firebase.firestore.Timestamp.fromDate(new Date())})
}

async function getMatchingNotifications (userId)
{
const data=[];
firebase.firestore().collection('match_notifications_omode').where('matchedTo','==',userId).where('isViewed','==',false).orderBy("rating","desc").get().then((documents)=>
{
  documents.forEach((document)=>
  [
    data.push(document)
  ])
  
})
  firebase.firestore().collection('match_notifications_tmode').where('matchedTo','==',userId).where('isViewed','==',false).orderBy("rating","desc").then((documents)=>
  {
    documents.forEach((document)=>
    {
      data.push(document)
    })
  })
  return data;
}



export {increaseLikeCount,save_likeNotifications,save_matchingRoomNotifications}
