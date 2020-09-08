import firebase from './config'
import { firestore } from 'firebase';

const signUp=async (username,password)=>
{
    const response=firebase.auth().createUserWithEmailAndPassword(username + "@rent.com",password).catch((err)=>{throw err})
    return response;
}

const signIn=async (username,password)=>
{
    const response=firebase.auth().signInWithEmailAndPassword(username + "@rent.com",password).catch((err)=>{throw err})
    return response;

}

const saveUsersData= (uid,userData,ismerge=true)=>
{
    firebase.firestore().collection('users').doc(uid).set(userData,{merge:ismerge}).catch((err)=>{throw err})
}

const getUsersData=async (uid)=>
{
    const response=firebase.firestore().collection('users').doc(uid).get().catch((err)=>{throw err})
    return response;

}
const onAuthstatechanged=(onAuthchange)=>
{
    firebase.auth().onAuthStateChanged((user)=>
    {
        if(user)
        {
            onAuthchange(user)
        }
        else{
            console.log('no users logged in ')
        }
        

    })
}
const signout=(onsignout)=>
{
    firebase.auth().signOut().then(()=>
    {
        onsignout();
    })
}
const getLoggedUser=async ()=>
{
const uid=firebase.auth().currentUser.uid
    return uid;
}

const saveRoom=(roomData,find,onSave)=>
{
    if(find)
    {
        firebase.firestore().collection('tenant').add(roomData).then(()=>
        {
            onSave();
        }).catch((err)=>{throw err;})
    }
    else{
        firebase.firestore().collection('owner').add(roomData).then(()=>
            {
                onSave();
            }
        ).catch((err)=>{throw err;})
    }
    
}
const getRoomData=async (uid,isOwner)=>
{
    const Rooms=[]
   
   if(isOwner)
   {
       firebase.firestore().collection('owner').where('uid'==uid).get().then((querSnanpshot)=>
       {
           querSnanpshot.forEach((doc)=>
           {
               Rooms.append(doc)
           })
           return Rooms;

       }).catch((err)=>{throw err;})
   

   
}
}


export { saveUsersData,signIn,signUp,getUsersData,onAuthstatechanged,signout,getLoggedUser,saveRoom};