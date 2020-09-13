import { signIn, signUp, saveUsersData, getLoggedUser, signout, getUsersData } from './api'
import firebase from './Firebase'


const onlogin = (username, password, navigationState) => {

    const login = async () => {
        try {
            const response = await signIn(username, password)
            const loginUser = response.user
            console.log('signed in with user ' + loginUser.email)


            navigationState.navigate('InsideApp')

            try {
                const res = await getUsersData(loginUser.uid)
                console.log(res.data().profile_pic)
                global.dp = res.data().profile_pic
            }
            catch (err) {
                alert(err)
            }
        }
        catch (err) {
            alert(err)
        }
    }
    login();
}

const onsignup = (userState, navigationState) => {
    const signup = async () => {

        try {
            const response = await signUp(userState.username, userState.password)
            var today = new Date();

            const userData = {
                uid: response.user.uid,
                email: response.user.email,
                created_at: today,
                firstName: userState.firstName,
                middleName: userState.middleName,
                lastName: userState.lastName,
                gender: userState.gender,
                address:
                {
                    province: userState.address.province,
                    district: userState.address.district,
                    city: userState.address.city
                },
                profile_pic: ''
            }
            firebase.storage().ref().child('images/profile/man-profile-cartoon_18591-58482.jpg').getDownloadURL().then((url) => {
                global.dp = url
                userData.profile_pic = url
                try {
                    saveUsersData(userData.uid, userData)

                }
                catch (err) {
                    alert(err)

                }

            }).catch((err) => {
                alert(err);
            })





            navigationState.navigate('InsideApp')

        }
        catch (err) {
            alert(err)
        }
    }
    if (userState.password == userState.confirm_password) {
        signup();
    }
    else {
        alert('Passwords donot match');
        return;
    }
}


export { onlogin, onsignup };