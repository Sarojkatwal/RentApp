import {signIn,signUp,saveUsersData,saveRoom} from  './api'
import {uploadProfile} from './storage'

const onlogin=(username,password,navigationState)=>
{
    const login=async ()=>
    {
        try{
            const response=await signIn(username,password)
            const loginUser=response.user
            console.log('signed in with user ' + loginUser.email)
            
            fetch('https://github.githubassets.com/images/icons/emoji/unicode/1f4af.png?v8').then((res)=>
            
                res.blob()
                
            ).then((blob)=>
            {
                uploadProfile(blob,loginUser.uid)

                
            }).catch((err)=>{console.log(err)})
            navigationState.navigate('InsideApp')
            
                

            

            }
        catch(err)
        {
            alert(err)
        }
    }
    login();
}

const onsignup=(username,password,confirmpassword,navigationState)=>
{
    const signup=async ()=>
    {
        try {
            const response = await signUp(username,password)
            var today = new Date();
            
            const userData={
                id:response.user.uid,
                email:response.user.email,
                created_at:today,
                name:'kundan',
                profile_pic:'pic1',
                
            }

            console.log('signed up new user ' + userData.email)
            try{
                saveUsersData(userData.id,userData)

            }
            catch(err)
            {
                alert(err)

            }
            
            navigationState.navigate('InsideApp')

        }
        catch(err)
        {
            alert(err)
        }
    }
    if(password==confirmpassword)
    {
        signup();
    }
    else{
        alert('Passwords donot match');
        return;
    }
}


export {onlogin,onsignup};