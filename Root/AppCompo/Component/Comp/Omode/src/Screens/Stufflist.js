import React, { Component } from "react";
import { View, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { FAB, Banner } from 'react-native-paper'
import Stufflistitem from '../components/Stufflistitem';
import Stuffdetail from './Stuffdetail'
import { fetchRoomforloggedInUser } from '../../../../../../Firebase/api'
import firebase from '../../../../../../Firebase/Firebase'
import { startSearch } from '../../../../../../Firebase/match'
import { getLikedIdForUser } from '../../../../../../Firebase/api'

class Stufflist extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        visible: true,
        stuff: [],
        likedPost: []
    }
    componentDidMount = () => {
        this.updateStuff()
        //console.log("ok=", global.Roomt)
    }
    updateStuff = async () => {
        this.setState({
            stuff: [],
            visible: true
        }, () => {
            const uid = firebase.auth().currentUser.uid
            startSearch(uid, false).then(() => {
                getLikedIdForUser(uid).then((data) => {
                    //console.log(data)
                    this.setState({
                        likedPost: data,
                        stuff: global.Roomo,

                    }, () => {
                        this.setState({
                            ...this.state,
                            visible: false
                        })

                    })
                })

            }).catch((err) => { console.log(err) });
        })
    };
    onListItemPress = stuff => {
        this.props.navigation.navigate('Details', { stuff, mode: 'O' });
    };
    renderItem = ({ item }) => (
        <Stufflistitem key={item.key} item={item} likedPost={this.state.likedPost} onPress={this.onListItemPress} />
    );
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "blue",
                }}
            />
        );
    };
    render() {
        //  console.log(this.state.stuff.length)
        return (
            <>
                <FAB
                    style={styles.fab}
                    icon="plus"
                    animated={true}
                    onPress={() =>
                        this.props.navigation.navigate('Add')
                    }
                />
                <View style={styles.container}>

                    {!this.state.visible ?
                        <FlatList
                            data={this.state.stuff}
                            renderItem={this.renderItem}
                            numColumns={1}
                            keyExtractor={(stuff, index) => `${stuff.key}${index}`}
                            refreshing={false}
                            onRefresh={this.updateStuff}
                        /> :
                        <ActivityIndicator size={40} />}
                    {/* <FlatList
                        data={this.state.stuff}
                        renderItem={this.renderItem}
                        numColumns={1}
                        keyExtractor={(stuff, index) => `${stuff.key}${index}`}
                        refreshing={false}
                        onRefresh={this.updateStuff}
                    /> */}
                </View>
            </>
        );
    }
}

export default Stufflist;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    fab: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        margin: 15,
        zIndex: 1
    }
});
