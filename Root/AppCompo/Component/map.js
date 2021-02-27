import React, { Component } from 'react';
import {
    Platform,
    Text,
    StyleSheet,
    View,
    ActivityIndicator,
    StatusBar,
    TextInput,
} from 'react-native';
import MapView from 'react-native-maps';
import { Button } from 'react-native-paper';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import fetch from 'cross-fetch';
const MAPBOX_API_KEY =
    'pk.eyJ1Ijoia2F0d2Fsc2Fyb2oiLCJhIjoiY2tsMHJvazloMG93MzJ3cGVuYWEwZXNtdSJ9.f3xyBiyuvkf5Q8yrmwZKPA';

export default class MMap extends Component {
    state = {
        location: null,
        errorMsg: null,
        addr: '',
        allresult: [],
        inc: 0,
    };
    componentDidMount = () => {
        (async () => {
            if (Platform.OS === 'android' && !Constants.isDevice) {
                this.setState({
                    ...this.state,
                    errorMsg:
                        'Oops, this will not work on Snack in an Android emulator. Try it on your device!',
                });
                return;
            }
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                this.setState({
                    ...this.state,
                    errorMsg: 'Permission to access location was denied',
                });
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            this.setState({
                ...this.state,
                location: {
                    long: location.coords.longitude,
                    lat: location.coords.latitude,
                },
            });
        })();
    };

    fetchr = async () => {
        var yy = [];
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            this.state.addr + ' Nepal'
        )}.json?limit=2&access_token=${MAPBOX_API_KEY}`;
        fetch(url).then((response) => {
            response.json().then((data) => {
                //console.log(data);
                yy = data.features;
                for (var i = 0; i < yy.length; i++) {
                    var obj = {
                        text: yy[i].text,
                        name: yy[i].place_name,
                        long: yy[i].center[0],
                        lat: yy[i].center[1],
                    };
                    this.setState({
                        ...this.state,
                        allresult: yy,
                    });
                }
            });
        });
    };
    nextAddress = () => {
        if (this.state.allresult.length != 0) {
            //console.log(this.state.inc);
            if (this.state.inc === this.state.allresult.length - 1) {
                this.setState({
                    ...this.state,
                    inc: 0,
                });
            } else {
                this.setState({
                    ...this.state,
                    inc: this.state.inc + 1,
                });
            }
        }
    };
    goBack = () => {
        if (this.state.allresult.length != 0) {
            const cloc = {
                longitude: this.state.allresult[this.state.inc].center[0],
                latitude: this.state.allresult[this.state.inc].center[1],
                text: this.state.allresult[this.state.inc].text,
                name: this.state.allresult[this.state.inc].place_name
            }
            if (this.props.route.params.from === "Add") {
                this.props.navigation.navigate('Add', { loc: cloc, type: 2 });
            }
            else if (this.props.route.params.from === "Search") {
                this.props.navigation.navigate('Search', { loc: cloc, type: 2 });
            }
        }
        else {
            alert("Search and select any address or press back....")
        }
    }


    render() {
        let text = 'Waiting..';
        let x = {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        if (this.state.errorMsg) {
            text = this.state.errorMsg;
        } else if (this.state.allresult.length !== 0) {
            x.latitude = this.state.allresult[this.state.inc].center[1];
            x.longitude = this.state.allresult[this.state.inc].center[0];
        } else if (this.state.location) {
            x.latitude = this.state.location.lat;
            x.longitude = this.state.location.long;
        }
        var mmm = JSON.stringify(x);
        //console.log(this.state.allresult);
        return (
            <View
                style={{
                    flex: 1,
                }}>
                <StatusBar backgroundColor='green' translucent={false} />
                <View style={styles.MainContainer}>
                    {x.latitude == 0 && x.longitude == 0 ? (
                        <ActivityIndicator
                            size="large"
                            color="red"
                            style={{ position: 'absolute', top: 0 }}
                        />
                    ) : (
                            <>
                                <MapView
                                    style={styles.mapStyle}
                                    showsUserLocation={false}
                                    zoomEnabled={true}
                                    zoomControlEnabled={true}
                                    region={x}>
                                    {this.state.allresult.length !== 0 ?
                                        <Marker
                                            coordinate={{ latitude: x.latitude, longitude: x.longitude }}
                                            title={this.state.allresult[this.state.inc].text}
                                            description={this.state.allresult[this.state.inc].place_name}
                                        /> :
                                        <Marker
                                            coordinate={{ latitude: x.latitude, longitude: x.longitude }}
                                        />}
                                </MapView>

                                <TextInput
                                    style={styles.searchbar}
                                    placeholder="Search Address..."
                                    autoFocus={true}
                                    value={this.state.text}
                                    onChangeText={(text) =>
                                        this.setState({
                                            ...this.state,
                                            addr: text,
                                        })
                                    }
                                    onSubmitEditing={this.fetchr}
                                />
                                {this.state.allresult.length >= 2 &&
                                    <Button
                                        color="green"
                                        size={90}
                                        style={styles.next}
                                        onPress={this.nextAddress}>
                                        Next
                            </Button>}
                                <Button style={styles.locc} onPress={this.goBack}>OK</Button>
                            </>
                        )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    searchbar: {
        position: 'absolute',
        top: 4,
        left: 4,
        right: 4,
        backgroundColor: 'grey',
        paddingHorizontal: 10,
        borderRadius: 20,
        height: 50,
        alignSelf: 'stretch',
    },
    next: {
        backgroundColor: "black",
        position: 'absolute',
        top: 10,
        right: 4,
        borderRadius: 20,
        zIndex: 100,
    },
    locc: {
        position: 'absolute',
        bottom: 4,
        left: 4,
        right: 4,
        backgroundColor: 'green',
        paddingHorizontal: 10,
        borderRadius: 20,
        height: 50,
    },
});
