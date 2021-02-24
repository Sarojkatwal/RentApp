import firebase from './Firebase'


const save_likeNotifications=(likedById,postId,omode=true)=>
{
  var collectionName='like_notification'
  var post=omode ? 'tenantPost' : 'ownerPost' //if omode is on then liked post should be from tenant .this is not opposite
  firebase.firestore().collection(post).doc(postId).get().then((document)=>
  {
    
    var notification={
      likedBy:likedById,
      likedPost:postId,
      postOf:document.data().authorId,
      isViewed:false,
      likedAt:firebase.firestore.Timestamp.fromDate(new Date())
    }
    firebase.firestore().collection(collectionName).add(notification).then((doc)=>
    {
      console.log("like notification added at "+collectionName+" with id "+doc.id)
      
    }).catch((err)=>
  {
    console.log('error occured while saving notification '+err)
  })

  }).catch((err)=>
  {
    console.log('error occured while getting the author id '+err)
  })


}



const increaseLikeCount=async (postId,omode)=>
{
  var post=omode? 'ownerPost' : 'tenantPost'
  var postref=firebase.firestore().collection(post).doc(postId)
  postref.onSnapshot((document)=>
  {
    var likes_count=document.like_count
    postref.set({like_count:likes_count},{merge:true})
    
  }
  )
}

const save_matchingRoomNotifications=(roomId,roomMatchedToUserId,ratings,omode=true)=>
{
  var collectionName=omode ? 'match_notifications_omode' : 'match_notifications_tmode'
firebase.firestore().collection(collectionName).add({
  postId:roomId,
  matchedTo:roomMatchedToUserId,
  isViewed:false,
  rating:ratings,
  savedAt: firebase.firestore.Timestamp.fromDate(new Date())})
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
  firebase.firestore().collection('match_notifications_tmode').where('matchedTo','==',userId).where('isViewed','==',false).orderBy("rating","desc").get().then((documents)=>
  {
    documents.forEach((document)=>
    {
      data.push(document)
    })
  })
  return data;
}



export {increaseLikeCount,save_likeNotifications,save_matchingRoomNotifications}
