import firebase from './Firebase'
const isViewed = async (postId, userId, postMadeByOwner) => {
    var post;

    post = postMadeByOwner ? 'ownerPost' : 'tenantPost'
    await firebase.firestore().collection(post).doc(postId).collection('viewedBy').get().then((documents) => {

        documents.forEach((document) => {
            if (document.viewedBy == userId) {

                return true

            }
        })

    })
    return false
}

//whenever a post is rendered in user's feed make it viewed by calling makeViewed.
const makeViewed = (postId, userId, postMadeByOwner) => {
    var post;
    post = postMadeByOwner ? 'ownerPost' : 'tenantPost'
    firebase.firestore().collection(post).doc(postId).collection('viewedBy').add({ viewedBy: userId }).catch((err) => {
        console.log(err)
    })
}
export { makeViewed, isViewed }