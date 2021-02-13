import firebase from './Firebase'

import { saveUsersData, saveOwnerRoom } from './api'
var storage = firebase.storage()


const uploadProfile = (imageUri) => {
    const uid = firebase.auth().currentUser.uid
    if (imageUri) {
        var storageRef = storage.ref('images/profile/' + uid);
        storageRef.put(imageUri).on(firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
                console.log("snapshot: " + snapshot.state);
                console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                    console.log("Success");
                }
            }, (err) => {
                console.log('Image upload error : ' + err.toString())
            }, () => {
                storageRef.getDownloadURL().then((downloadURL) => {
                    //console.log('profile pic uploaded at ' + downloadURL);
                    try {
                        saveUsersData(uid, { profilePic: downloadURL }, true)
                    }
                    catch (err) {
                        console.log(err)
                    }

                })
            })

    }
}

const uploadRoom = async (imageUris, uid, uuid) => {
    var allimg = [];
    for (var j = 0; j < imageUris.length; j++) {
        const response = await fetch(imageUris[j]);
        const blob = await response.blob();
        var storageRef = storage.ref('images/rooms/' + uid + '/' + uuid + j)
        storageRef.put(blob).on(firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
                console.log("snapshot: " + snapshot.state);
                console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                    console.log("Success");
                }
            }, (err) => {
                console.log('Image upload error : ' + err.toString())
                alert("Error in image" + j)
            }, () => {
                storageRef.getDownloadURL().then((downloadURL) => {
                    allimg.push(downloadURL)
                    //console.log('room uploaded at' + downloadURL);
                    //console.log("Hello")
                    try {
                        firebase.firestore().collection('ownerPost').doc(uid).collection('Rooms').doc(uuid)
                            .set({
                                rooming: allimg
                            }, { merge: true })
                    }
                    catch (err) {
                        console.log(err)
                    }

                })
            })

    }
}




export { uploadProfile, uploadRoom };