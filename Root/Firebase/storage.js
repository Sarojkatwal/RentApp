import firebase from './config'

import {saveUsersData} from './api'
var storage=firebase.storage()


const uploadProfile=(imageUri,uid)=>
{
    
    if(imageUri)
    {
        const fileExtension='.png'
        
        const uuid='file1'
        var storageRef=storage.ref('images/profile/'+uuid+'.'+fileExtension)
        storageRef.put(imageUri).on(firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
              console.log("snapshot: " + snapshot.state);
              console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    
              if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                console.log("Success");
              }
            },(err)=>
            {
                console.log('Image upload error : '+ err.toString())
            },()=>
            {
                storageRef.getDownloadURL().then((downloadURL)=>
                {
                    console.log('profile pic uploaded at '+ downloadURL);
                    
                        
                        try{
                            saveUsersData(uid,{profile_pic:downloadURL},true)
                        }
                    
                    catch(err)
                    {
                        console.log(err)
                    }
                    
                    

                })
            })

    }
}




export {uploadProfile};