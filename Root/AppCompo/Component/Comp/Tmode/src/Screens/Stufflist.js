import React, { Component } from "react";
import { View, FlatList, StyleSheet, Image, Button, ActivityIndicator } from 'react-native';
import { FAB, Banner } from 'react-native-paper'
//import { getStuff } from '../api';
import firebase from '../../../../../../Firebase/Firebase'
import { startSearch } from '../../../../../../Firebase/match'
import { getLikedIdForUser } from '../../../../../../Firebase/api'
import Stufflistitem from '../components/Stufflistitem';

class Stufflist extends Component {
    state = {
        visible: true,
        stuff: [],
        likedPost: []
    }
    componentDidMount = () => {
        this.updateStuff()
    }
    updateStuff = async () => {
        this.setState({
            stuff: [],
            visible: true
        }, () => {
            const tmode = true;
            const uid = firebase.auth().currentUser.uid
            startSearch(uid, tmode).then(() => {
                getLikedIdForUser(uid).then((data) => {
                    // console.log(data)
                    this.setState({
                        likedPost: data,
                        stuff: global.Roomt,

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
        this.props.navigation.navigate('Details', { stuff, mode: 'T' });
    };
    renderItem = ({ item }) => {
        return (
            <Stufflistitem key={item.key} likedPost={this.state.likedPost} item={item} {...this.props} onPress={this.onListItemPress} recomm={(this.props.route.params == undefined) ? true : false} />
        );
    }
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
        return (
            <View style={styles.container}>
                {this.props.route.params == undefined &&
                    (
                        <>
                            <FAB
                                style={styles.fab}
                                icon="plus"
                                animated={true}
                                onPress={() =>
                                    this.props.navigation.push('Search')
                                }
                            />
                        </>
                    )
                }
                {this.state.visible ? <ActivityIndicator size={40} /> :
                    <>


                        <FlatList
                            data={this.state.stuff}
                            renderItem={this.renderItem}
                            numColumns={1}
                            keyExtractor={(stuff, index) => `${stuff.key}${index}`}
                            refreshing={false}
                            onRefresh={this.updateStuff}
                        //ItemSeparatorComponent={this.renderSeparator}
                        />
                    </>}

            </View>
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
        right: 0,
        margin: 10,
        zIndex: 1
    }
});
