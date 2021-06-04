import React, { Component } from 'react';
import {
    Platform,
    Text,
    StyleSheet,
    View,
    StatusBar,
} from 'react-native';
import MapView from 'react-native-maps';
import { Button } from 'react-native-paper';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

export default class ShowMap extends Component {
    state = {
        location: {}
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
            this.setState({
                location: this.props.route.params.location
            })
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                this.setState({
                    ...this.state,
                    errorMsg: 'Permission to access location was denied',
                });
                return;
            }

        })();
    };
    goBack = () => {
        this.props.navigation.goBack()
    }
    render() {
        let text = 'Waiting..';
        let x = {
            latitude: this.state.location.latitude !== undefined ? this.state.location.latitude : 0,
            longitude: this.state.location.longitude !== undefined ? this.state.location.longitude : 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        if (this.state.errorMsg) {
            text = this.state.errorMsg;
        }
        // var mmm = JSON.stringify(x);
        //console.log(this.state.allresult);
        return (
            <View
                style={{
                    flex: 1,
                }}>
                <StatusBar color="green" translucent={false} />
                <View style={styles.MainContainer}>

                    <>
                        <MapView
                            style={styles.mapStyle}
                            showsUserLocation={false}
                            zoomEnabled={true}
                            zoomControlEnabled={true}
                            region={x}>
                            <Marker
                                coordinate={{ latitude: x.latitude, longitude: x.longitude }}
                            />
                        </MapView>
                        <Button style={styles.locc} onPress={this.goBack}>Back</Button>
                    </>

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
