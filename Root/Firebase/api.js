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
    const response=firebase.firestore().collection('users').doc(uid).get()
    .catch((err)=>{throw err})
    return response;
    

}
const getLoggedUser=async (onValueGet)=>
{
    firebase.auth().onAuthStateChanged(function(user){
        onValueGet(user.uid)
    })
    
}
const signout=(onsignout)=>
{
    firebase.auth().signOut().then(()=>
    {
        onsignout();
    })
}


const saveTenantRoom=(roomData,onSave)=>
{
    firebase.firestore().collection('tenantPost').add(roomData,{merge:true}).then(
        ()=>
        {
            onSave();
        }
    ).catch((err)=>{console.log(err)})
}



const fetchRoomforloggedInUser=async (uid,isOwner)=>
{
    const Rooms=[]
   
   if(isOwner)
   {
       firebase.firestore().collection('ownerPost').where('authorId'==uid).get().then((querSnanpshot)=>
       {
           querSnanpshot.forEach((doc)=>
           {
               Rooms.append(doc)
           })
           return Rooms;

       }).catch((err)=>{throw err;})
   

   
}
}




export { saveUsersData,signIn,signUp,getUsersData,signout}
export {getLoggedUser,saveTenantRoom,fetchRoomforloggedInUser}