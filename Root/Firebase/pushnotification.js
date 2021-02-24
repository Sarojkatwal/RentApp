import * as Notifications from 'expo-notifications'
import * as Permissions from  'expo-permissions'
import firebase from './Firebase'

const registerForPushNotifications=async()=>
{
    const {status}=await Permissions.getAsync(Permissions.NOTIFICATIONS)
    if(!status)
    {
        status=await Permissions.askAsync(Permissions.NOTIFICATIONS)
    }
    if(!status)
    {
        alert('push notifications disabled ')
    }
    var token=await Notifications.getExpoPushTokenAsync()
    firebase.firestore().collection('users').doc(uid).set({expoToken:token},{merge:true}).then((doc)=>
    {
        console.log('expo push token added with token '+doc.data().expoToken)
    })
    return token
}
export {registerForPushNotifications}