import firebase from './config';
// async operator has been removed fro sign up , sign in ,getUsersData,getLoggedUser,fetchroomfor logged in user

const signUp= (username,password)=>
{
    const response=firebase.auth().createUserWithEmailAndPassword(username + "@rent.com",password).catch((err)=>{throw err})
    return response;
}

const signIn= (username,password)=>
{
    const response=firebase.auth().signInWithEmailAndPassword(username + "@rent.com",password).catch((err)=>{throw err})
    return response;

}

const saveUsersData= (uid,userData,ismerge=true)=>
{
    firebase.firestore().collection('users').doc(uid).set(userData,{merge:ismerge}).catch((err)=>{throw err})
}

const getUsersData= (uid)=>
{
    const response=firebase.firestore().collection('users').doc(uid).get()
    .catch((err)=>{throw err})
    return response;
    

}
const getLoggedUser= (onValueGet)=>
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


const storeRoom=(roomData,istenant,onSave)=>
{
    var post=istenant?'tenantPost':'ownerPost'
    firebase.firestore().collection('tenantPost').add(roomData).then(
        ()=>
        {
            onSave();
        }
    ).catch((err)=>{console.log(err)})
}



const fetchRoomforloggedInUser= (uid,isOwner)=>
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
export {getLoggedUser,storeRoom,fetchRoomforloggedInUser}