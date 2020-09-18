import React, { Component } from "react";
import { View, FlatList, StyleSheet, Image, Button } from 'react-native';
import { FAB, Banner } from 'react-native-paper'
import { getStuff } from '../api';
import Stufflistitem from '../components/Stufflistitem';

class Stufflist extends Component {
    state = {
        stuff: [],
        visible: true,
    }
    componentDidMount = () => {
        this.updateStuff()
    }
    updateStuff = async () => {
        this.setState({
            stuff: getStuff()
        });
    };
    onListItemPress = stuff => {
        global.Show = false
        this.props.navigation.navigate('stuffdetail', { stuff });
    };
    renderItem = ({ item }) => (
        <Stufflistitem key={item.key} item={item} onPress={this.onListItemPress} recomm={(this.props.route.params == undefined) ? true : false} />
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
                            <Banner
                                visible={this.state.visible}
                                actions={[
                                    {
                                        label: 'Hide it',
                                        onPress: () => this.setState({ visible: false }),
                                    },

                                ]}
                                icon={({ size }) => (
                                    <Image
                                        source={{
                                            uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
                                        }}
                                        style={{
                                            width: size,
                                            height: size,
                                        }}
                                    />
                                )}
                            >
                                You can search for a room clicking on add button at the bottom of the page
                </Banner>
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
