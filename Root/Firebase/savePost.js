import firebase from './Firebase'
function savePost(postId, userId, isTenantmode = true) {

    var postName = isTenantmode == true ? 'tenantSavedPost' : 'ownerSavedPost'
    firebase.firestore().collection('users').doc(userId).collection(postName).add({ id: postId }).catch((err) => {
        alert(err)
    })
}
function getSavedPost(userId, isTenantmode = true) {
    var new_array = []
    var postName = isTenantmode == true ? 'tenantSavedPost' : 'ownerSavedPost'
    firebase.firestore().collection('users').doc(userId).collection(postName).get((posts) => {
        posts.forEach((post) => {
            new_array.push(post.data())
        })
    }).catch((err) => {
        console.log("error getting saved post ", err)
    })

    return new_array;

}
export { savePost, getSavedPost }
///savepost saves the postId to the users collection
//getsavedpost gets the postId that are saved in users collection
