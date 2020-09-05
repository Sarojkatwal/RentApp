import firebase from './config'

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

const saveUsersData= (uid,userData,ismerge)=>
{
    firebase.firestore().collection('users').doc(uid).set(userData,ismerge).catch((err)=>{throw err})
}

const getUsersData=async (uid)=>
{
    const response=firebase.firestore().collection('users').doc(uid).get().catch((err)=>{throw err})
    return response;

}
export {saveUsersData,signIn,signUp,getUsersData}