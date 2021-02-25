import firebase from "./Firebase";

const save_likeNotifications = (likedById, postId, omode = true) => {
  var collectionName = "like_notifications";
  var post = omode ? "tenantPost" : "ownerPost"; //if omode is on then liked post should be from tenant .this is not opposite
  firebase
    .firestore()
    .collection(post)
    .doc(postId)
    .get()
    .then(async (document) => {
      var pos_of = await document.data().authorId
      console.log(pos_of)
      var notification = {
        likedBy: likedById,
        likedPost: postId,
        postOf: pos_of,
        postType: post,
        postType: post,
        likedAt: new Date().getTime(),
      };
      firebase
        .firestore()
        .collection(collectionName)
        .add(notification)
        .then((doc) => {
          console.log(
            "like notification added at " +
            collectionName +
            " with id " +
            doc.id
          );
        })
        .catch((err) => {
          console.log("error occured while saving notification " + err);
        });
    })
    .catch((err) => {
      console.log("error occured while getting the author id " + err);
    });
};

const getLikeNotifications = (uid) => {
  var notifications = [];
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("like_notifications")
      .where("postOf", "==", uid)
      .orderBy("likedAt")
      .limit(25)
      .get()
      .then(
        (docs) => {
          docs.forEach((doc) => {
            notifications.push(doc.data());
          });
          resolve(notifications);
        },
        (err) => reject(err)
      );
  });
};

const increaseLikeCount = async (postId, omode) => {
  var post = omode ? "tenantPost" : "ownerPost";
  var postref = firebase.firestore().collection(post).doc(postId);
  postref.onSnapshot((document) => {
    var likes_count = document.data().like_count;
    postref
      .set({ like_count: likes_count }, { merge: true })
      .then((doc) => {
        console.log("liked count increased of " + doc.id);
      })
      .catch((err) => {
        console.log("error while increasing like count " + err);
      });
  });
};
const create_matchingRoomNotifications = (//jun post match garxa tesko type ho omode chai 
  roomId,
  roomMatchedToUserId,
  ratings,
  ownerPost = true
) => {
  var post = ownerPost ? 'ownerPost' : 'tenantPost';
  firebase
    .firestore()
    .collection(post)
    .doc(roomId)
    .get()
    .then((document) => {
      var collectionName = "match_notifications";
      firebase
        .firestore()
        .collection(collectionName)
        .add({
          postId: roomId,
          postOf: document.data().authorId,
          matchedTo: roomMatchedToUserId,
          postType: post,
          rating: ratings,
          savedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    });
};

function getMatchingNotifications(userId) {
  const data = [];
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("match_notifications")
      .where("matchedTo", "==", userId)

      .orderBy("savedAt").limit(20)
      .get()
      .then((documents) => {
        documents.forEach((document) => [data.push(document)]);
        resolve(data)
      }).catch((err) => {
        reject(err)
      });
  })
}

export {
  increaseLikeCount,
  save_likeNotifications,
  create_matchingRoomNotifications,
  getMatchingNotifications,
  getLikeNotifications
};