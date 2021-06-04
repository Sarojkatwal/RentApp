import firebase from './Firebase'


var storage = firebase.storage()


const uploadProfile = (imageUri) => {
    const uid = firebase.auth().currentUser.uid
    console.log("Hello")
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
                console.log(err.code)
            }, () => {
                storageRef.getDownloadURL().then((downloadURL) => {
                    //console.log('profile pic uploaded at ' + downloadURL);
                    try {
                        //saveUsersData(uid, { profilePic: downloadURL }, true)
                        firebase.firestore().collection('users').doc(uid).set({ profilePic: downloadURL }, { merge: true })
                    }
                    catch (err) {
                        console.log("Err go")
                    }
                });
            })
    }
}

const uploadRoom = async (imageUris, postId) => {
    //console.log("congratulation i am inside uploadroom")

    for (var j = 0; j < imageUris.length; j++) {
        const response = await fetch(imageUris[j]);
        const blob = await response.blob();
        var storageRef = storage.ref('images/rooms/' + postId + j)
        const x = await saveImg(postId, blob, storageRef)

    }

}

const saveImg = async (postId, blob, storageRef) => {
    storageRef.put(blob).on(firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
            console.log("snapshot: " + snapshot.state);
            console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            if ((snapshot.bytesTransferred / snapshot.totalBytes) * 100 === 100) {
                storageRef.getDownloadURL().then((downloadURL) => {

                    console.log('room uploaded at:=>  ' + downloadURL);
                    //console.log("Hello")
                    try {
                        firebase.firestore().collection('ownerPost').doc(postId).collection('roomImg')
                            .add({
                                roomimg: downloadURL
                            }).then((doc) => {
                                //console.log(doc.id)
                            })
                    }
                    catch (err) {
                        console.log(err)
                    }

                })
            }
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                console.log("Success");
            }
        }, (err) => {
            console.log('Image upload error : ' + err.toString())
            alert("Error in image" + j)
        })
}



export { uploadProfile, uploadRoom };