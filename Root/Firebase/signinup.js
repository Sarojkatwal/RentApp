import {signIn,signUp,saveUsersData,getUsersData} from  './api'

const onlogin=(username,password,navigationState)=>
{
    const login=async ()=>
    {
        try{
            const response=await signIn(username,password)
            const loginUser=response.user
            console.log('signed in with user ' + loginUser.email)
            try{
                const res=await getUsersData(loginUser.uid)
                console.log(res.data())

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
    login();
}

const onsignup=(username,password,confirmpassword,navigationState)=>
{
    const signup=async ()=>
    {
        try {
            const response = await signUp(username,password)
            const userData={
                id:response.user.uid,
                email:response.user.email
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