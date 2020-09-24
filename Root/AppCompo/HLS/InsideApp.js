import React, { PureComponent } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import UserContext from '../../context'
import { getUsersData } from '../../Firebase/api'
import firebase from '../../Firebase/Firebase'
import Main from '../Component/Main'
export class InsideApp extends PureComponent {
    state = {
        userData: {}
    }
    componentDidMount = () => {
        getUsersData(firebase.auth().currentUser.uid, (data) => this.setState({ userData: data }));
    }
    render() {
        return (
            (this.state.userData !== undefined &&
                !(Object.keys(this.state.userData).length === 0 && this.state.userData.constructor === Object)) ?
                <UserContext.Provider value={this.state.userData}>
                    <Main />
                </UserContext.Provider>
                :
                <View style={styles.indicators}>
                    <ActivityIndicator size={100} />
                </View>

        )
    }
}

export default InsideApp

const styles = StyleSheet.create({
    indicators: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})