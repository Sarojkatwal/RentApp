import firebase from './Firebase'
import  {uploadRoom} from './storage'

const saveUsersData = (uid, userData, ismerge = true) => {
    firebase.firestore().collection('users').doc(uid).
        set(userData, { merge: ismerge })
        .catch((err) => console.log('Error is here'))
}

const signUp = async (username, password) => {
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
            province: '',
            district: '',
            localLevel: '',
            wardno: ''
        },
        profilePic: ''

    }
    firebase.auth()
        .createUserWithEmailAndPassword(username + "@rent.com", password)
        .then((res) => {
            saveUsersData(res.user.uid, userData)
            return res
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                return ('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                return ('That email address is invalid!');
            }

            console.error(error);
            return null
        })
}

const signIn = async (username, password) => {
    const response = firebase.auth()
        .signInWithEmailAndPassword(username + "@rent.com", password)
        .catch((err) => { return })
    return response;

}


const getUsersData = async(uid, func) => {
    firebase.firestore().collection('users').doc(uid)
        .onSnapshot((doc) => {
            func(doc.data())
        })
    return;
}

const signout = () => {
    firebase.auth().signOut()
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
const saveTenantPost =async (uid,roomData, ismerge = true) => {
    firebase.firestore().collection('tenantPost')
        .add({authorId:uid,roomData})
        .catch((err) => { console.log(err) })
}
//
const saveOwnerRoom =async (uid,images,roomData, ismerge = true) => {
    firebase.firestore().collection('ownerPost').
        add({authorId:uid,roomData}).then((document)=>{
            
            uploadRoom(images, document.id)
        })
        .catch((err) => {
            alert("Error")
            console.log('Error is here')
        })

}


const fetchRoomforloggedInUser = async (uid, isOwner) => {
    const Rooms = []
    var post;
if(isOwner)
{
    post='ownerPost'


}
else{
    post='tenantPost'
}
    if (isOwner) {
        firebase.firestore().collection(post)
            .where('authorId' == uid).get()
            .then((querSnanpshot) => {
                querSnanpshot.forEach((doc) => {
                    Rooms.append(doc)
                })
                console.log(Rooms)
                return Rooms;

            }).catch((err) => { throw err; })



    }
}


export { saveUsersData, signIn, signUp, getUsersData, signout }
export { getLoggedUser, saveTenantPost, saveOwnerRoom, fetchRoomforloggedInUser }