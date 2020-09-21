import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import UserContext from '../../context'
import { getUsersData } from '../../Firebase/api'
import firebase from '../../Firebase/Firebase'
import Main from '../Component/Main'
export class InsideApp extends PureComponent {
    state = {
        userData: {}
    }
    componentDidMount = () => {
        const userdata = getUsersData(firebase.auth().currentUser.uid, (data) => this.setState({ userData: data }));
    }
    render() {
        return (
            <UserContext.Provider value={this.state.userData}>
                <Main />
            </UserContext.Provider>
        )
    }
}

export default InsideApp
