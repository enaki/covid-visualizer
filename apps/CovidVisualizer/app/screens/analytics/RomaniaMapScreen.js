import React from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, View } from 'react-native'
import MapView, { Geojson } from 'react-native-maps'
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import ConnectorService from "../../services/ConnectorService";
import roCountyColorService from '../../services/color/MapRoCountyColorService';
import LoadDataService from "../../services/LoadDataService";

const height = Dimensions.get('window').height;
const roCountiesGeoMaps = require('../../assets/data/parsed.ro_counties.geo.json');


class RomaniaMapScreen extends React.Component {

    constructor(props) {
        console.log("[RomaniaMapScreen] - Constructor");
        super(props);
        this.state = {
            loadingData: true,
            loadingMap: true
        };
    }

    async componentDidMount() {
        console.log("[RomaniaMapScreen] - componentDidMount");
        let data = await LoadDataService.getData("RoMap", ConnectorService.getRoCountiesActivePerOneHundred);
        roCountyColorService.setData(data);
        this.setState({ loadingData: false });
        console.log("[RomaniaMapScreen] - Data Loaded");
    }


    render() {
        console.log("[RomaniaMapScreen] - Call render method ");
        return (
            <View style={{}}>
                {
                    this.state.loadingData ?
                        <ActivityIndicator
                            size="large"
                            color="#bc2b78"
                            style={styles.activityIndicator}
                        />:
                        this.renderMap()
                }
                {
                    this.state.loadingMap ?
                        <ActivityIndicator
                            size="large"
                            color="#bc2b78"
                            style={styles.activityIndicator}
                        />: null
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
                    latitude: 44.21921941263342,
                    longitude: 24.883000218245233,
                    latitudeDelta: 10,
                    longitudeDelta: 10
                }}
                showsBuildings={false}
                showsTraffic={false}
                showsIndoors={false}
                rotateEnabled={false}
                onMapReady={ () => {this.setState({ loadingMap: false });}}
            >
                {
                    Object.keys(roCountiesGeoMaps).map(key => (
                        <Geojson
                            key={key}
                            geojson={roCountiesGeoMaps[key]} // geojson of the countries you want to highlight
                            fillColor={roCountyColorService.colorSpectrumByROCountyKey(key)}
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


export default RomaniaMapScreen;
