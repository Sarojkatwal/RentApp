import firebase from './Firebase'
import { uploadRoom } from './storage'
import { deletePushToken } from './pushnotification'

const saveUsersData = (uid, userData, ismerge = true) => {
    firebase.firestore().collection('users').doc(uid).
        set(userData, { merge: ismerge })
        .catch((err) => console.log('Error is here'))
}

const signUp = async (username, password, func) => {
    const userData = {
        email: username + '@rent.com',
        createdAt: new Date(),
        username: username,
        name: {
            firstName: '',
            lastName: '',
        },
        gender: '',
        address:
        {
            zone: '',
            district: '',
        },
        profilePic: 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png'

    }
    return firebase.auth()
        .createUserWithEmailAndPassword(username + "@rent.com", password)
        .then((res) => {
            saveUsersData(res.user.uid, userData)
            return res
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                func('That email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
                func('That email address is invalid!');
            }
            // console.error(error);
            return null
        })
}

const signIn = async (username, password) => {
    const response = firebase.auth()
        .signInWithEmailAndPassword(username + "@rent.com", password)
        .catch((err) => { return })
    return response;

}


const getUsersData = (uid, func) => {
    firebase.firestore().collection('users').doc(uid)
        .onSnapshot((doc) => {
            func(doc.data())
        })
    return;
}

const signout = () => {
    global.Roomt = []
    global.Roomo = []

    deletePushToken().then((msg) => {
        //  console.log(msg)
        firebase.auth().signOut().then(() => {

        })
    }).catch((err) => console.log(err))
}
const getLoggedUser = (onValueGet) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            onValueGet(user)
        }
        else {
            onValueGet(null)
        }
    })

}

const saveTenantPost = async (uid, roomData, ismerge = true) => {
    firebase.firestore().collection('tenantPost')
        .add({ authorId: uid, roomData, like_count: 0 })
        .catch((err) => { console.log(err) })
}
//
const saveOwnerRoom = async (uid, images, roomData, ismerge = true) => {
    firebase.firestore().collection('ownerPost').
        add({ authorId: uid, roomData, like_count: 0 }).then((document) => {

            uploadRoom(images, document.id)
        })
        .catch((err) => {
            alert("Error")
            console.log('Error is here')
        })

}


const fetchRoomforloggedInUser = (uid, isOwner, saveResult) => {
    var post;
    if (isOwner) {
        post = 'ownerPost'
    }
    else {
        post = 'tenantPost'
    }
    if (isOwner) {
        const RoomData = [];
        return firebase.firestore().collection(post)
            .where('authorId', "==", uid).get()
            .then((querSnanpshot) => {
                querSnanpshot.forEach((doc) => {
                    if (doc.exists) {
                        getRoomimg(post, doc.id).then((data) => {
                            //console.log("DATA=", data)
                            const roomData = {
                                key: doc.id,
                                roomimg: data,
                                ...doc.data()
                            }
                            saveResult(roomData)
                            //RoomData.push(roomData)
                            //console.log("roomdata=", RoomData.length)
                        })
                    } else {
                        console.log("No such document!");
                    }
                })
                //console.log("Rooms=", RoomData)
                //return Rooms;

            })
            .catch((err) => { throw err; })

    }
}
const getRoomimg = async (post, iid) => {
    const ImgRoom = [];
    //console.log("Document data:", doc.id);
    return firebase.firestore().collection(post).doc(iid).collection("roomImg").get()
        .then((querSnanpshot) => {
            querSnanpshot.forEach((doc1) => {
                if (doc1.exists) {
                    //console.log("Document data:", doc1.data().roomimg);
                    ImgRoom.push(doc1.data().roomimg)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
        }).then(() => {
            //console.log("Return=", ImgRoom)
            return ImgRoom
        })
        .catch((err) => { throw err; })

}

const getPpandPhoneno = async (uid) => {
    return firebase.firestore().collection('users').doc(uid).get()
        .then((doc) => {
            //return doc.data()
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                return doc.data()
            }
            // console.log("DATA=", doc.data())
        })
        .catch((err) => { throw err; })
}

const fetchPostforloggedInUser = (uid, saveResult) => {
    return firebase.firestore().collection('tenantPost')
        .where('authorId', "==", uid).get()
        .then((querSnanpshot) => {
            var i = 1;
            querSnanpshot.forEach((doc) => {
                if (doc.exists) {

                    const postData = {
                        sn: i,
                        key: doc.id,
                        ...doc.data()
                    }
                    i++;
                    //console.log(postData)
                    saveResult(postData)
                } else {
                    console.log("No such document!");
                }
            })
        })
        .catch((err) => { throw err; })

}

const fetchGivenPost = async (post, uid, func) => {
    return firebase.firestore().collection(post).doc(uid).get()
        .then((doc) => {
            //return doc.data()
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                if (post == "ownerPost") {
                    getRoomimg(post, uid).then((data) => {
                        //console.log("DATA=", data)
                        const roomData = {
                            roomimg: data,
                            ...doc.data()
                        }
                        func(roomData)
                    })
                }
                else {
                    func(doc.data())
                }

            }
            // console.log("DATA=", doc.data())
        })
        .catch((err) => { throw err; })
}

const getLikedIdForUser = async (uid) => {
    var likedId = [];
    return firebase
        .firestore()
        .collection("like_notifications")
        .where("likedBy", "==", uid)
        .orderBy("likedAt")
        .limit(25)
        .get()
        .then((querSnanpshot) => {
            querSnanpshot.forEach((doc1) => {
                if (doc1.exists) {
                    //console.log("Document data:", doc1.data().roomimg);
                    likedId.push(doc1.data().likedPost)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
        }).then(() => {
            //console.log("Return=", likedId)
            return likedId
        })
        .catch((err) => { throw err; })
}

const deleteTenantPost = (id) => {
    firebase.firestore().collection('tenantPost').doc(id).delete()
        .then(() => {
            alert("Done")
        }).catch((err) => { throw err; })
}

export { saveUsersData, signIn, signUp, getUsersData, signout, getRoomimg, getPpandPhoneno, fetchGivenPost, getLikedIdForUser }
export { getLoggedUser, saveTenantPost, saveOwnerRoom, fetchRoomforloggedInUser, fetchPostforloggedInUser, deleteTenantPost }