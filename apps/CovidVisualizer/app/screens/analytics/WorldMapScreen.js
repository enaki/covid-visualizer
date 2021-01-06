import React from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native'
import MapView, { Geojson } from 'react-native-maps'
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import ConnectorService from "../../services/ConnectorService";
import worldColorService from '../../services/color/MapWorldColorService';

const height = Dimensions.get('window').height;
const geoMaps = require('../../assets/data/parsed.low.geo.json');


class WorldMapScreen extends React.Component {
    constructor(props) {
        console.log("\n[WorldMapScreen] - Constructor");
        super(props);
        this.state = {
            loadingData: true,
            loadingMap: true
        };
    }

    async componentDidMount() {
        console.log("[WorldMapScreen] - componentDidMount");
        let data;
        try {
            let localData = JSON.parse(await AsyncStorage.getItem("WorldMap"));
            let needUpdate = false;
            if (localData == null) {
                needUpdate = true;
            } else {
                if (localData["updated"] == null || localData["data"] == null) {
                    needUpdate = true;
                } else {
                    let seconds = moment().diff(moment(localData["updated"]), 'seconds');
                    console.log("[WorldMapScreen] - Seconds passed since the last update: " + seconds);
                    if (seconds > 3600) { //o ora
                        needUpdate = true;
                    }
                }
            }
            console.log("[WorldMapScreen] - Checked data in AsyncStorage. NeedUpdate? " + needUpdate);
            if (needUpdate) {
                data = await ConnectorService.getCountriesActivePerMillion();
                AsyncStorage.setItem("WorldMap", JSON.stringify({ "data": data, "updated": moment().valueOf() }));

                console.log("\n\t***AsyncStorage: Setting data WorldMap on " + moment().format('MMMM Do YYYY, HH:mm:ss'));
            } else {
                data = localData["data"];
            }
            worldColorService.setData(data);
            this.setState({ loadingData: false });
        } catch (err) {
            throw err;
        }
        console.log("[WorldMapScreen] - Data Loaded");
    }

    render() {
        console.log("[WorldMapScreen] - IN render callback");
        return (
            <View style={{}}>
                {
                    this.state.loadingData ?
                        <ActivityIndicator
                            size="large"
                            color="#bc2b78"
                            style={styles.activityIndicator}
                        /> :
                        this.renderMap()
                }
                {
                    this.state.loadingMap ?
                        <ActivityIndicator
                            size="large"
                            color="#bc2b78"
                            style={styles.activityIndicator}
                        /> : null
                }
            </View>
        );
    }

    renderMap() {
        return (
            <MapView
                provider={null}
                style={styles.map}
                region={{
                    latitude: 10.0,
                    longitude: 18,
                    latitudeDelta: 100,
                    longitudeDelta: 100
                }}
                showsBuildings={false}
                showsTraffic={false}
                showsIndoors={false}
                rotateEnabled={false}
                onMapReady={() => { this.setState({ loadingMap: false }); }}
                onLongPress={async (event) => {
                    const coordinates = {
                        lat: event.nativeEvent.coordinate.latitude,
                        long: event.nativeEvent.coordinate.longitude
                    };
                    try {
                        const res = await ConnectorService.getCountryLatestDataByLatAndLong(coordinates.lat, coordinates.long);
                        if(res.length === 0)
                        {
                            throw 'Invalid country';
                        }
                        this.props.navigation.navigate('Country Statistics',
                            {data: res[0]});
                    }
                    catch (err) {
                        console.log("[WorldMapScreen] - Error: " + err);
                        Alert.alert(
                            "Error",
                            err
                        );
                    }
                }}
            >
                {
                    Object.keys(geoMaps).map(key => (
                        <Geojson
                            key={key}
                            geojson={geoMaps[key]} // geojson of the countries you want to highlight
                            fillColor={worldColorService.colorSpectrumByCountryKey(key)}
                        />
                    ))
                }
            </MapView >
        );
    }
}

const styles = StyleSheet.create({
    map: {
        height
    },
    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default WorldMapScreen;
