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

const uploadRoom = (roomData, imageUri, onUpload) => {

    const fileExtension = 'png'

    const uuid = 'room1'
    var storageRef = storage.ref('images/rooms/' + uuid + '.' + fileExtension)
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
                console.log('room uploaded at' + downloadURL);

                firebase.firestore().collection('ownerPost').add(roomData).then((doc) => {
                    firebase.firestore().collection('ownerPost').doc(doc.id).collection('images')
                        .add({ download_url: downloadURL }).then(() => {
                            onUpload(doc.id);
                        }).catch((err) => { console.log(err) })

                }).catch((err) => { console.log(err); })



            })
        })


}




export { uploadProfile, uploadRoom };