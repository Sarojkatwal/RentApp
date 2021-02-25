import React, { Component } from "react";
import { View, FlatList, StyleSheet, Image, Button } from 'react-native';
import { FAB, Banner } from 'react-native-paper'
//import { getStuff } from '../api';
import firebase from '../../../../../../Firebase/Firebase'
import { startSearch } from '../../../../../../Firebase/match'
import Stufflistitem from '../components/Stufflistitem';

class Stufflist extends Component {
    state = {
        visible: true,
        stuff: global.Roomt,
    }
    componentDidMount = () => {
        // this.updateStuff()
    }
    updateStuff = async () => {
        const tmode = true;
        const uid = firebase.auth().currentUser.uid
        startSearch(uid, tmode).then(() => {
            // use global.Roomt and global.Roomo here 
            //console.log("Global:=>", global.Roomt)
            this.setState({
                stuff: global.Roomt
            });
        }).catch((err) => { console.log(err) });

    };
    onListItemPress = stuff => {
        this.props.navigation.navigate('Details', { stuff, mode: 'T' });
    };
    renderItem = ({ item }) => (
        <Stufflistitem key={item.key} item={item} {...this.props} onPress={this.onListItemPress} recomm={(this.props.route.params == undefined) ? true : false} />
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

                <FlatList
                    data={this.state.stuff}
                    renderItem={this.renderItem}
                    numColumns={1}
                    keyExtractor={(stuff, index) => `${stuff.key}${index}`}
                    refreshing={false}
                    onRefresh={this.updateStuff}
                //ItemSeparatorComponent={this.renderSeparator}
                />

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
